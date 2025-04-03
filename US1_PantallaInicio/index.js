document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado en index.js")

  // Configuración del slider de recetas
  const track = document.querySelector(".recipe-track")
  const prevButton = document.querySelector(".prev-button")
  const nextButton = document.querySelector(".next-button")

  if (!track) {
    console.error("No se encontró el elemento .recipe-track")
    return
  }

  const cards = track.querySelectorAll(".recipe-card")
  const cardCount = cards.length
  const cardsToShow = 5 // Mostrar 5 tarjetas a la vez
  let currentIndex = 0
  let autoSlideInterval
  let isAnimating = false // Bandera para evitar clics rápidos

  // Verificar si los elementos existen
  if (!prevButton || !nextButton || cardCount === 0) {
    console.error("Error: Elementos del slider no encontrados o no hay tarjetas.")
    return
  }

  console.log("Slider inicializado con", cardCount, "tarjetas")

  // Función para actualizar la posición del slider
  function updateSliderPosition() {
    const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)
    if (currentIndex > maxIndex) currentIndex = maxIndex

    // Obtener el idioma actual
    const currentLanguage = localStorage.getItem("language") || "es"

    // Usar un enfoque basado en display en lugar de transform para mayor estabilidad
    cards.forEach((card, index) => {
      // Determinar si la tarjeta debería ser visible
      const startIndex = currentIndex * cardsToShow
      const endIndex = startIndex + cardsToShow
      const isVisible = index >= startIndex && index < endIndex

      // Aplicar display directamente en lugar de transform
      card.style.display = isVisible ? "block" : "none"

      // Traducir TODAS las tarjetas, no solo las visibles
      const elementsToTranslate = card.querySelectorAll("[data-i18n]")
      elementsToTranslate.forEach((element) => {
        const key = element.getAttribute("data-i18n")
        if (
          window.i18n &&
          window.i18n.translations[currentLanguage] &&
          window.i18n.translations[currentLanguage][key]
        ) {
          element.textContent = window.i18n.translations[currentLanguage][key]
        }
      })
    })

    // Actualizar estado de los botones de navegación
    prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
    prevButton.style.cursor = currentIndex === 0 ? "default" : "pointer"
    nextButton.style.opacity = currentIndex >= maxIndex ? "0.5" : "1"
    nextButton.style.cursor = currentIndex >= maxIndex ? "default" : "pointer"

    // Permitir nuevos clics después de un tiempo
    setTimeout(() => {
      isAnimating = false
    }, 300)
  }

  function startAutoSlide() {
    // Limpiar cualquier intervalo existente para evitar múltiples intervalos
    clearInterval(autoSlideInterval)

    autoSlideInterval = setInterval(() => {
      // No hacer nada si hay una animación en curso
      if (isAnimating) return

      isAnimating = true
      const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)

      // Avanzar al siguiente grupo o volver al principio
      currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0
      updateSliderPosition()
    }, 25000) // Mantener el intervalo de 25 segundos
  }

  prevButton.addEventListener("click", () => {
    // Evitar clics durante la animación
    if (isAnimating) return
    isAnimating = true

    // Detener el autoplay para evitar conflictos
    clearInterval(autoSlideInterval)

    if (currentIndex > 0) {
      currentIndex--
      updateSliderPosition()
    } else {
      isAnimating = false // Permitir nuevos clics si no hay cambio
    }

    // Reiniciar el autoplay
    startAutoSlide()
  })

  nextButton.addEventListener("click", () => {
    // Evitar clics durante la animación
    if (isAnimating) return
    isAnimating = true

    // Detener el autoplay para evitar conflictos
    clearInterval(autoSlideInterval)

    const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)
    if (currentIndex < maxIndex) {
      currentIndex++
      updateSliderPosition()
    } else {
      isAnimating = false // Permitir nuevos clics si no hay cambio
    }

    // Reiniciar el autoplay
    startAutoSlide()
  })

  // Inicializar slider
  updateSliderPosition()
  startAutoSlide()

  // Event listener para resize
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      // No reiniciar a 0 para evitar saltos bruscos
      // Verificar si el índice actual es válido con el nuevo tamaño
      const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)
      if (currentIndex > maxIndex) currentIndex = maxIndex
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
    const scrollToTopButton = document.querySelector(".scroll-to-top")

    if (scrollToTopButton) {
      console.log("Botón de scroll encontrado:", scrollToTopButton)

      // Usar un manejador de eventos directo y simple
      scrollToTopButton.onclick = (e) => {
        e.preventDefault()
        console.log("Botón de scroll clickeado")

        // Scroll suave hacia arriba
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
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
    // Asegurarse de que el menú esté inicialmente oculto
    overlayMenu.classList.remove("active")

    menuToggle.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation() // Evitar que el clic se propague
      overlayMenu.classList.toggle("active")
      console.log("Menú toggle clicked, active:", overlayMenu.classList.contains("active"))
    })

    const closeMenu = document.getElementById("closeMenu")
    if (closeMenu) {
      closeMenu.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation() // Evitar que el clic se propague
        overlayMenu.classList.remove("active")
        console.log("Menú cerrado")
      })
    }

    // Cerrar al hacer clic fuera del menú
    document.addEventListener("click", (e) => {
      if (overlayMenu.classList.contains("active") && !overlayMenu.contains(e.target) && e.target !== menuToggle) {
        overlayMenu.classList.remove("active")
        console.log("Cerrado por clic fuera")
      }
    })

    // Evitar que los clics dentro del menú lo cierren
    overlayMenu.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  } else {
    console.warn("Elementos del menú no encontrados:", {
      menuToggle: menuToggle ? "encontrado" : "no encontrado",
      overlayMenu: overlayMenu ? "encontrado" : "no encontrado",
    })
  }

  // Asegurar que el footer se muestre correctamente
  function adjustFooterPosition() {
    const footer = document.querySelector("footer")
    if (!footer) return

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

  // Añadir un event listener para el cambio de idioma
  document.addEventListener("languageChanged", (e) => {
    updateSliderPosition() // Actualizar las traducciones cuando cambie el idioma

    // Actualizar las traducciones del menú desplegable
    if (window.i18n && window.i18n.translations) {
      const language = e.detail.language
      const translations = window.i18n.translations[language]

      if (translations) {
        // Actualizar los textos del menú según el idioma
        document.querySelectorAll("#overlayMenu [data-i18n]").forEach((element) => {
          const key = element.getAttribute("data-i18n")
          if (translations[key]) {
            element.textContent = translations[key]
          }
        })
      }
    }
  })

  // Exponer la función updateSliderPosition globalmente para que pueda ser llamada desde otros scripts
  window.updateRecipeSliderPosition = updateSliderPosition

  console.log("Inicialización de index.js completada")
})

// Asegurar que esta función se ejecute cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", setupScrollToTop)

function setupScrollToTop() {
  const scrollToTopButton = document.getElementById("scrollToTop")
  if (scrollToTopButton) {
    scrollToTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      console.log("Botón de scroll clickeado")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

