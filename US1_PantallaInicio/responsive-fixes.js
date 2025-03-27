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
  
      function updateSliderPosition() {
        // Calcular el ancho de la tarjeta y el margen
        const cardWidth = cards[0].offsetWidth
        const cardMargin = Number.parseInt(window.getComputedStyle(cards[0]).marginRight) || 20
        const totalCardWidth = cardWidth + cardMargin
  
        // Actualizar la posición del track
        track.style.transform = `translateX(-${currentIndex * totalCardWidth}px)`
  
        // Actualizar estado de los botones
        prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
        prevButton.style.cursor = currentIndex === 0 ? "default" : "pointer"
  
        const maxIndex = Math.max(0, cardCount - cardsToShow)
        nextButton.style.opacity = currentIndex >= maxIndex ? "0.5" : "1"
        nextButton.style.cursor = currentIndex >= maxIndex ? "default" : "pointer"
      }
  
      // Event listeners para los botones
      prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--
          updateSliderPosition()
        }
      })
  
      nextButton.addEventListener("click", () => {
        const maxIndex = Math.max(0, cardCount - cardsToShow)
        if (currentIndex < maxIndex) {
          currentIndex++
          updateSliderPosition()
        }
      })
  
      // Actualizar al cambiar el tamaño de la ventana
      window.addEventListener("resize", () => {
        cardsToShow = getCardsToShow()
        // Asegurarse de que el índice actual sea válido
        const maxIndex = Math.max(0, cardCount - cardsToShow)
        if (currentIndex > maxIndex) currentIndex = maxIndex
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
  
      if (scrollToTopBtn) {
        // Mostrar/ocultar el botón según la posición de scroll
        window.addEventListener("scroll", () => {
          if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = "1"
          } else {
            scrollToTopBtn.style.opacity = "0.7"
          }
        })
  
        // Asegurar que el evento de clic funcione correctamente
        scrollToTopBtn.addEventListener("click", (e) => {
          e.preventDefault()
          e.stopPropagation()
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        })
      }
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
  })
  
  