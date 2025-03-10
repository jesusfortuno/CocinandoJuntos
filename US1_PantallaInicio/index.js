document.addEventListener("DOMContentLoaded", () => {
  // Configuración del slider de recetas
  const track = document.querySelector(".recipe-track")
  const prevButton = document.querySelector(".prev-button")
  const nextButton = document.querySelector(".next-button")
  const cards = track.querySelectorAll(".recipe-card")
  const cardCount = cards.length
  const cardsToShow = 5
  let currentIndex = 0
  let autoSlideInterval

  // Función para mostrar el slider
  function showSlider() {
    document.getElementById("recipe-slider-section").style.display = "block"
    updateSliderPosition()
    startAutoSlide()
  }

  // Función para ocultar el slider
  function hideSlider() {
    document.getElementById("recipe-slider-section").style.display = "none"
    clearInterval(autoSlideInterval)
  }

  // Función para actualizar la posición del slider
  function updateSliderPosition() {
    // Calcular el ancho total de 5 tarjetas
    const cardWidth = track.querySelector(".recipe-card").offsetWidth
    const cardMargin = Number.parseInt(window.getComputedStyle(cards[0]).marginRight)
    const totalCardWidth = cardWidth + cardMargin

    // Mover el track para mostrar el grupo actual de 5 tarjetas
    track.style.transform = `translateX(-${currentIndex * cardsToShow * totalCardWidth}px)`
    track.style.transition = "transform 0.5s ease"

    // Actualizar estado de los botones
    prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
    prevButton.style.cursor = currentIndex === 0 ? "default" : "pointer"

    // Calcular el número máximo de grupos de 5 tarjetas
    const maxGroups = Math.ceil(cardCount / cardsToShow) - 1
    nextButton.style.opacity = currentIndex >= maxGroups ? "0.5" : "1"
    nextButton.style.cursor = currentIndex >= maxGroups ? "default" : "pointer"
  }

  // Función para iniciar el auto-slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      // Calcular el número máximo de grupos de 5 tarjetas
      const maxGroups = Math.ceil(cardCount / cardsToShow) - 1

      if (currentIndex < maxGroups) {
        currentIndex += 1
      } else {
        currentIndex = 0 // Reiniciar al principio
      }
      updateSliderPosition()
    }, 25000) // Cambiar cada 25 segundos
  }

  // Event listeners para los botones de navegación
  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1
      updateSliderPosition()
    }
  })

  nextButton.addEventListener("click", () => {
    // Calcular el número máximo de grupos de 5 tarjetas
    const maxGroups = Math.ceil(cardCount / cardsToShow) - 1

    if (currentIndex < maxGroups) {
      currentIndex += 1
    } else {
      currentIndex = 0 // Reiniciar al principio si se llega al final
    }
    updateSliderPosition()
  })

  // Inicialización
  hideSlider() // Ocultar el slider al inicio
  showSlider() // Mostrar el slider después de cargar las recetas

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

