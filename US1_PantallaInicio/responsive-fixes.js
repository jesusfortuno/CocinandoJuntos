document.addEventListener("DOMContentLoaded", () => {
  // Función para ajustar el slider de recetas de forma responsiva
  function setupResponsiveSlider() {
    const track = document.querySelector(".recipe-track")
    const prevButton = document.querySelector(".prev-button")
    const nextButton = document.querySelector(".next-button")
    const cards = track.querySelectorAll(".recipe-card")
    const cardCount = cards.length

    if (!track || !prevButton || !nextButton || cardCount === 0) {
      console.error("Error: Elementos del slider no encontrados o no hay tarjetas.")
      return
    }

    // Determinar cuántas tarjetas mostrar según el ancho de la ventana
    function getCardsToShow() {
      if (window.innerWidth >= 1200) return 5
      if (window.innerWidth >= 992) return 4
      if (window.innerWidth >= 768) return 3
      if (window.innerWidth >= 576) return 2
      return 1
    }

    let cardsToShow = getCardsToShow()
    let currentIndex = 0
    let isSliding = false // Declare isSliding here

    // Reemplazar la función updateSliderPosition en setupResponsiveSlider con esta versión mejorada
    function updateSliderPosition() {
      // Calcular el ancho de la tarjeta y el margen
      const cardWidth = cards[0].offsetWidth
      const cardMargin = Number.parseInt(window.getComputedStyle(cards[0]).marginRight) || 20
      const totalCardWidth = cardWidth + cardMargin
      const maxIndex = Math.max(0, cardCount - cardsToShow)

      // Asegurar que el índice actual sea válido
      if (currentIndex > maxIndex) currentIndex = maxIndex

      // Usar un enfoque basado en display en lugar de transform para mayor estabilidad
      cards.forEach((card, index) => {
        const startIndex = currentIndex
        const endIndex = startIndex + cardsToShow
        const isVisible = index >= startIndex && index < endIndex
        card.style.display = isVisible ? "block" : "none"
      })

      // Actualizar estado de los botones
      prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
      prevButton.style.cursor = currentIndex === 0 ? "default" : "pointer"
      nextButton.style.opacity = currentIndex >= maxIndex ? "0.5" : "1"
      nextButton.style.cursor = currentIndex >= maxIndex ? "default" : "pointer"
    }

    // Modificar los event listeners para los botones en setupResponsiveSlider
    // Reemplazar los event listeners de los botones en setupResponsiveSlider con estas versiones mejoradas
    prevButton.addEventListener("click", () => {
      if (isSliding) return
      isSliding = true

      if (currentIndex > 0) {
        currentIndex--
        updateSliderPosition()
      } else {
        isSliding = false // Permitir nuevos clics inmediatamente si no hay cambio
      }

      setTimeout(() => {
        isSliding = false
      }, 350) // Tiempo suficiente para que termine la animación
    })

    nextButton.addEventListener("click", () => {
      if (isSliding) return
      isSliding = true

      const maxIndex = Math.max(0, cardCount - cardsToShow)
      if (currentIndex < maxIndex) {
        currentIndex++
        updateSliderPosition()
      } else {
        isSliding = false // Permitir nuevos clics inmediatamente si no hay cambio
      }

      setTimeout(() => {
        isSliding = false
      }, 350) // Tiempo suficiente para que termine la animación
    })

    // Reemplazar el event listener de resize en setupResponsiveSlider con esta versión mejorada
    window.addEventListener("resize", () => {
      const newCardsToShow = getCardsToShow()
      if (cardsToShow !== newCardsToShow) {
        cardsToShow = newCardsToShow
        // Verificar si el índice actual es válido con el nuevo tamaño
        const maxIndex = Math.max(0, cardCount - cardsToShow)
        if (currentIndex > maxIndex) currentIndex = maxIndex
      }
      updateSliderPosition()
    })

    // Inicializar
    updateSliderPosition()
  }

  // Función para mejorar el comportamiento del menú desplegable
  function enhanceMenu() {
    const menuToggle = document.getElementById("menuToggle")
    const overlayMenu = document.getElementById("overlayMenu")
    const closeMenu = document.getElementById("closeMenu")

    if (menuToggle && overlayMenu) {
      // Asegurar que el menú se cierre al hacer clic fuera
      document.addEventListener("click", (e) => {
        if (overlayMenu.classList.contains("active") && !overlayMenu.contains(e.target) && e.target !== menuToggle) {
          overlayMenu.classList.remove("active")
        }
      })

      // Mejorar la accesibilidad con teclado
      menuToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          overlayMenu.classList.toggle("active")
        }
      })

      if (closeMenu) {
        closeMenu.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            overlayMenu.classList.remove("active")
          }
        })
      }
    }
  }

  // Función para mejorar el botón de scroll
  function enhanceScrollButton() {
    const scrollToTopBtn = document.getElementById("scrollToTop")

    if (!scrollToTopBtn) {
      console.error("Scroll to top button not found")
      return
    }

    // Configuración inicial del botón
    scrollToTopBtn.style.display = "none"

    // Función para manejar la visibilidad del botón
    function handleScroll() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = "block"
        scrollToTopBtn.style.opacity = "1"
      } else {
        scrollToTopBtn.style.opacity = "0"
        setTimeout(() => {
          if (window.pageYOffset <= 300) {
            scrollToTopBtn.style.display = "none"
          }
        }, 300)
      }
    }

    // Función para realizar el scroll suave
    function scrollToTop(e) {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

    // Añadir event listeners
    window.addEventListener("scroll", handleScroll, { passive: true })
    scrollToTopBtn.addEventListener("click", scrollToTop)

    // Verificar la posición inicial del scroll
    handleScroll()

    // Log para debugging
    console.log("Scroll button initialized with new configuration")
  }

  // Inicializar todas las mejoras
  setupResponsiveSlider()
  enhanceMenu()
  enhanceScrollButton()

  // Cargar estilos responsivos adicionales
  const responsiveStyles = document.createElement("link")
  responsiveStyles.rel = "stylesheet"
  responsiveStyles.href = "styles-responsive.css"
  document.head.appendChild(responsiveStyles)

  console.log("DOM loaded, initializing scroll button")
})

