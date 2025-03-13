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
    const recipeContent = card.querySelector(".recipe-content")
    const recipeImage = card.querySelector(".recipe-image")

    if (recipeContent && recipeImage) {
      // Crear overlay para el hover
      const overlay = document.createElement("div")
      overlay.className = "recipe-overlay"

      // Obtener información de la receta
      const title = recipeContent.querySelector("h3").textContent
      const description =
        card.querySelector(".description p")?.textContent ||
        "Deliciosa receta tradicional con ingredientes frescos y sabores únicos."

      // Crear contenido del overlay con una clase específica para el título
      overlay.innerHTML = `
        <h3 class="title">${title}</h3>
        <p>${description}</p>
      `

      // Añadir overlay a la tarjeta
      card.appendChild(overlay)

      // Eliminar la descripción original para evitar duplicados
      const oldDescription = card.querySelector(".description")
      if (oldDescription) {
        oldDescription.remove()
      }
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
  const scrollToTopButton = document.querySelector(".scroll-to-top")
  if (scrollToTopButton) {
    scrollToTopButton.addEventListener("click", () => {
      // Animación suave de scroll hacia arriba
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
})


    slider.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => moveSlide(1), 5000);
    });

    window.onload = function() {
        const loggedIn = localStorage.getItem('loggedIn');
        const email = localStorage.getItem('email'); // Obtener el correo electrónico

        if (loggedIn === 'true') {
            // Mostrar el correo electrónico en la barra de navegación
            document.getElementById('user-name').textContent = email || 'Usuario';
            document.getElementById('user-name').onclick = function() {
                window.location.href = 'US7_PaginaDeUsuario/usuario.html'; // Redirigir al perfil
            };
        }
    };
});

// Añade este código a tu archivo JavaScript existente
document.getElementById('menuToggle').addEventListener('click', function() {
  const dropdownMenu = document.getElementById('dropdownMenu');
  dropdownMenu.classList.toggle('active');
});

document.addEventListener('click', function(event) {
  const dropdownMenu = document.getElementById('dropdownMenu');
  const menuToggle = document.getElementById('menuToggle');
  
  if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.classList.remove('active');
  }
});
