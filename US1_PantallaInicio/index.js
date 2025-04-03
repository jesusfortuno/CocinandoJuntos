document.addEventListener("DOMContentLoaded", () => {
  // Configuración del slider de recetas
  const track = document.querySelector(".recipe-track")
  const prevButton = document.querySelector(".prev-button")
  const nextButton = document.querySelector(".next-button")
  const cards = track ? track.querySelectorAll(".recipe-card") : []
  const cardCount = cards.length
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
    const maxIndex = Math.max(0, Math.ceil(cardCount / 5) - 1)
    if (currentIndex > maxIndex) currentIndex = maxIndex

    // Obtener el idioma actual
    const currentLanguage = localStorage.getItem("language") || "es"

    // Usar un enfoque basado en display en lugar de transform para mayor estabilidad
    cards.forEach((card, index) => {
      // Determinar si la tarjeta debería ser visible
      const startIndex = currentIndex * 5
      const endIndex = startIndex + 5
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
      const maxIndex = Math.max(0, Math.ceil(cardCount / 5) - 1)

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

    const maxIndex = Math.max(0, Math.ceil(cardCount / 5) - 1)
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
      const maxIndex = Math.max(0, Math.ceil(cardCount / 5) - 1)
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

  // Añadir un event listener para el cambio de idioma
  document.addEventListener("languageChanged", (e) => {
    updateSliderPosition() // Actualizar las traducciones cuando cambie el idioma
  })
})

// Añadir esta función al final del archivo para asegurar que el menú hamburguesa funcione correctamente
document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const menuToggle = document.getElementById("menuToggle")
  const overlayMenu = document.getElementById("overlayMenu")
  const closeMenu = document.getElementById("closeMenu")

  if (menuToggle && overlayMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault()
      overlayMenu.classList.toggle("active")
      console.log("Menú toggle clicked, overlay active:", overlayMenu.classList.contains("active"))
    })

    if (closeMenu) {
      closeMenu.addEventListener("click", () => {
        overlayMenu.classList.remove("active")
        console.log("Menú cerrado")
      })
    }

    // Cerrar al hacer clic fuera del menú
    overlayMenu.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active")
        console.log("Cerrado por clic fuera")
      }
    })
  } else {
    console.error("Elementos del menú no encontrados:", { menuToggle, overlayMenu })
  }
})

// Asegurar que esta función se ejecute cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
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
  setupScrollToTop()
})

// Asegurarse de que no haya conflictos con otros manejadores de eventos
document.addEventListener("DOMContentLoaded", () => {
  // Remover cualquier manejador de eventos existente del botón de scroll
  const scrollBtn = document.getElementById("scrollToTop")
  if (scrollBtn) {
    const newScrollBtn = scrollBtn.cloneNode(true)
    scrollBtn.parentNode.replaceChild(newScrollBtn, scrollBtn)
  }
})

// Añadir al final del archivo, justo después de la inicialización del slider
document.addEventListener("languageChanged", (e) => {
  if (typeof window.updateRecipeSliderPosition === "function") {
    window.updateRecipeSliderPosition()
  }
})

// Eliminar o comentar la función updateSliderPosition global al final del archivo
// window.updateSliderPosition = updateSliderPosition;

