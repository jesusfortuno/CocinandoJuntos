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
    // Calcular el número máximo de grupos
    const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)

    // Asegurar que currentIndex nunca exceda el máximo permitido
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex
    }

    // Mostrar todas las tarjetas pero ajustar su visibilidad
    cards.forEach((card, index) => {
      // Determinar si la tarjeta debe mostrarse en el grupo actual
      const isVisible = index >= currentIndex * cardsToShow && index < (currentIndex + 1) * cardsToShow
      card.style.display = isVisible ? "block" : "none"
    })

    // Actualizar estado de los botones
    prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
    prevButton.style.cursor = currentIndex === 0 ? "default" : "pointer"

    nextButton.style.opacity = currentIndex >= maxIndex ? "0.5" : "1"
    nextButton.style.cursor = currentIndex >= maxIndex ? "default" : "pointer"

    // Después de un breve retraso, permitir nuevamente la animación
    setTimeout(() => {
      isAnimating = false
    }, 300)
  }

  // Función para iniciar el auto-slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (isAnimating) return

      const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)

      if (currentIndex < maxIndex) {
        currentIndex += 1
      } else {
        currentIndex = 0 // Reiniciar al principio
      }

      updateSliderPosition()
    }, 25000) // Cambiar cada 25 segundos
  }

  // Event listeners para los botones de navegación
  prevButton.addEventListener("click", () => {
    if (isAnimating) return // Evitar clics rápidos
    isAnimating = true

    if (currentIndex > 0) {
      currentIndex -= 1
    }

    updateSliderPosition()
  })

  nextButton.addEventListener("click", () => {
    if (isAnimating) return // Evitar clics rápidos
    isAnimating = true

    const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)

    if (currentIndex < maxIndex) {
      currentIndex += 1
    } else {
      currentIndex = 0 // Reiniciar al principio
    }

    updateSliderPosition()
  })

  // Inicializar la visibilidad de las tarjetas
  updateSliderPosition()
  startAutoSlide()

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

  // Event listeners para las tarjetas de recetas
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const description = card.querySelector(".description")
      if (description) {
        description.style.display = "block" // Mostrar descripción
      }
    })

    card.addEventListener("mouseleave", () => {
      const description = card.querySelector(".description")
      if (description) {
        description.style.display = "none" // Ocultar descripción
      }
    })
  })
})

