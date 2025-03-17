document.addEventListener("DOMContentLoaded", () => {
  // Configuración del slider de recetas
  const track = document.querySelector(".recipe-track")
  const prevButton = document.querySelector(".prev-button")
  const nextButton = document.querySelector(".next-button")
  const cards = track.querySelectorAll(".recipe-card")
  const cardCount = cards.length
  const cardsToShow = 5 // Mostrar 5 tarjetas a la vez
  let currentIndex = 0
  let autoSlideInterval
  let isAnimating = false // Bandera para evitar clics rápidos

  // Verificar si los elementos existen
  if (!track || !prevButton || !nextButton || cardCount === 0) {
    console.error("Error: Elementos del slider no encontrados o no hay tarjetas.")
    return
  }

  // Función para actualizar la posición del slider
  function updateSliderPosition() {
    const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)
    if (currentIndex > maxIndex) currentIndex = maxIndex

    cards.forEach((card, index) => {
      const isVisible = index >= currentIndex * cardsToShow && index < (currentIndex + 1) * cardsToShow
      card.style.display = isVisible ? "block" : "none"
    })

    prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
    prevButton.style.cursor = currentIndex === 0 ? "default" : "pointer"
    nextButton.style.opacity = currentIndex >= maxIndex ? "0.5" : "1"
    nextButton.style.cursor = currentIndex >= maxIndex ? "default" : "pointer"

    setTimeout(() => {
      isAnimating = false
    }, 300)
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (isAnimating) return
      const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)
      currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0
      updateSliderPosition()
    }, 25000)
  }

  prevButton.addEventListener("click", () => {
    if (isAnimating) return
    isAnimating = true
    if (currentIndex > 0) currentIndex -= 1
    updateSliderPosition()
  })

  nextButton.addEventListener("click", () => {
    if (isAnimating) return
    isAnimating = true
    const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)
    currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0
    updateSliderPosition()
  })

  // Inicializar slider
  updateSliderPosition()
  startAutoSlide()

  // Event listener para resize
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      currentIndex = 0
      updateSliderPosition()
    }, 250)
  })

  // Event listeners para las tarjetas de recetas
  cards.forEach((card) => {
    // Crear overlay para el hover si no existe
    if (!card.querySelector(".recipe-overlay")) {
      const overlay = document.createElement("div")
      overlay.className = "recipe-overlay"

      // Obtener información de la receta
      const title = card.querySelector("h3")?.textContent || "Receta"
      const description =
        card.querySelector(".description p")?.textContent ||
        "Deliciosa receta tradicional con ingredientes frescos y sabores únicos."

      // Crear contenido del overlay
      overlay.innerHTML = `
        <h3 class="title">${title}</h3>
        <p>${description}</p>
      `

      // Añadir overlay a la tarjeta
      card.appendChild(overlay)
    }

    // Eventos de mouse
    card.addEventListener("mouseenter", () => {
      const overlay = card.querySelector(".recipe-overlay")
      if (overlay) {
        overlay.classList.add("active")
      }
    })

    card.addEventListener("mouseleave", () => {
      const overlay = card.querySelector(".recipe-overlay")
      if (overlay) {
        overlay.classList.remove("active")
      }
    })
  })

  // Scroll suave para los enlaces de anclaje
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      if (targetId === "#") return
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Funcionalidad para el botón de scroll hacia arriba
  // Usar una función independiente para asegurar que se ejecute correctamente
  function setupScrollToTop() {
    const scrollToTopButton = document.getElementById("scrollToTop")

    if (scrollToTopButton) {
      console.log("Botón de scroll encontrado:", scrollToTopButton)

      // Asegurar que el evento se añada correctamente
      scrollToTopButton.onclick = (e) => {
        e.preventDefault()
        console.log("Botón de scroll clickeado - función onclick")

        // Usar requestAnimationFrame para asegurar que el scroll se ejecute en el momento adecuado
        requestAnimationFrame(() => {
          // Animación suave de scroll hacia arriba
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        })
      }

      // Añadir también un event listener como respaldo
      scrollToTopButton.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("Botón de scroll clickeado - event listener")

        // Animación suave de scroll hacia arriba
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    } else {
      console.error("Botón de scroll no encontrado")
    }
  }

  // Ejecutar la configuración del botón de scroll
  setupScrollToTop()

  // Añadir funcionalidad para el menú desplegable
  const menuToggle = document.getElementById("menuToggle")
  const overlayMenu = document.getElementById("overlayMenu")

  if (menuToggle && overlayMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault()
      overlayMenu.classList.toggle("active")
    })

    const closeMenu = document.getElementById("closeMenu")
    if (closeMenu) {
      closeMenu.addEventListener("click", () => {
        overlayMenu.classList.remove("active")
      })
    }

    // Cerrar al hacer clic fuera del menú
    overlayMenu.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active")
      }
    })
  }

  // Asegurar que el footer se muestre correctamente
  function adjustFooterPosition() {
    const footer = document.querySelector("footer")
    const body = document.body
    const html = document.documentElement

    // Obtener la altura del documento
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    )

    // Si la altura del documento es menor que la ventana, ajustar el footer
    if (height <= window.innerHeight) {
      footer.style.position = "absolute"
      footer.style.bottom = "0"
      footer.style.width = "100%"
    } else {
      footer.style.position = "relative"
      footer.style.bottom = "auto"
    }
  }

  // Ejecutar al cargar y al cambiar el tamaño de la ventana
  adjustFooterPosition()
  window.addEventListener("resize", adjustFooterPosition)
})

