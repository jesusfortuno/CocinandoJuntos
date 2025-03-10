document.addEventListener("DOMContentLoaded", () => {
    // Configuración del slider de recetas
    const track = document.querySelector(".recipe-track")
    const prevButton = document.querySelector(".prev-button")
    const nextButton = document.querySelector(".next-button")
    const cards = track.querySelectorAll(".recipe-card")
    const cardCount = cards.length
    const cardsToShow = 5
    let currentIndex = 0
  
    // Función para actualizar la posición del slider
    function updateSliderPosition() {
      const cardWidth = track.offsetWidth / cardsToShow
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`
      track.style.transition = "transform 0.5s ease"
  
      // Actualizar estado de los botones
      prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
      prevButton.style.cursor = currentIndex === 0 ? "default" : "pointer"
      nextButton.style.opacity = currentIndex >= cardCount - cardsToShow ? "0.5" : "1"
      nextButton.style.cursor = currentIndex >= cardCount - cardsToShow ? "default" : "pointer"
    }
  
    // Event listeners para los botones de navegación
    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex -= cardsToShow
        if (currentIndex < 0) currentIndex = 0
        updateSliderPosition()
      }
    })
  
    nextButton.addEventListener("click", () => {
      if (currentIndex < cardCount - cardsToShow) {
        currentIndex += cardsToShow
        if (currentIndex > cardCount - cardsToShow) {
          currentIndex = cardCount - cardsToShow
        }
        updateSliderPosition()
      }
    })
  
    // Inicialización
    updateSliderPosition()
  
    // Event listener para resize
    let resizeTimer
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        currentIndex = 0 // Reset position on resize
        updateSliderPosition()
      }, 250)
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
  })
  
  