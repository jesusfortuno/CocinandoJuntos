document.addEventListener("DOMContentLoaded", () => {
    let currentSlide = 0
    const slider = document.querySelector(".slider")
    const slides = document.querySelectorAll(".slide")
    const totalSlides = slides.length
    const dotsContainer = document.querySelector(".dots-container")
  
    // Función para actualizar la visibilidad de las tarjetas según el ancho de la pantalla
    function updateCardsVisibility() {
      const windowWidth = window.innerWidth
      slides.forEach((slide, slideIndex) => {
        // Ocultar todos los slides excepto el actual
        slide.style.display = slideIndex === currentSlide ? "flex" : "none"
  
        const cards = slide.querySelectorAll(".slide-card")
        cards.forEach((card, index) => {
          if (windowWidth <= 768) {
            // Mostrar solo 1 tarjeta
            card.style.display = index === 0 ? "block" : "none"
          } else if (windowWidth <= 1024) {
            // Mostrar 2 tarjetas
            card.style.display = index < 2 ? "block" : "none"
          } else {
            // Mostrar todas las tarjetas
            card.style.display = "block"
          }
        })
      })
    }
  
    // Crear los dots
    slides.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.classList.add("dot")
      if (index === 0) dot.classList.add("active")
      dot.addEventListener("click", () => goToSlide(index))
      dotsContainer.appendChild(dot)
    })
  
    function updateDots() {
      document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide)
      })
    }
  
    function moveSlide(direction) {
      currentSlide = (currentSlide + direction + totalSlides) % totalSlides
      updateSlider()
    }
  
    function goToSlide(index) {
      currentSlide = index
      updateSlider()
    }
  
    function updateSlider() {
      // En lugar de usar transform, cambiamos la visibilidad de los slides
      slides.forEach((slide, index) => {
        slide.style.display = index === currentSlide ? "flex" : "none"
      })
      updateDots()
    }
  
    // Event listeners
    window.addEventListener("resize", updateCardsVisibility)
    window.moveSlide = moveSlide
    window.goToSlide = goToSlide
  
    // Inicialización
    updateCardsVisibility()
  
    // Iniciar el autoplay
    let autoplayInterval = setInterval(() => moveSlide(1), 5000)
  
    // Opcional: Pausar el autoplay cuando el usuario interactúa
    slider.addEventListener("mouseenter", () => {
      clearInterval(autoplayInterval)
    })
  
    slider.addEventListener("mouseleave", () => {
      autoplayInterval = setInterval(() => moveSlide(1), 5000)
    })
  
    // Obtener el usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const userInfo = document.getElementById("user-info")
    const authButton = document.getElementById("auth-button")
  
    console.log("Datos del usuario:", usuario) // Para depuración
  
    // Si el usuario está registrado en localStorage
    if (usuario) {
      // Mostrar la información del usuario
      userInfo.style.display = "flex"
      document.getElementById("user-name").textContent = usuario.username || "Usuario"
      authButton.style.display = "none"
  
      // Agregar funcionalidad de cerrar sesión
      document.getElementById("logout-btn").addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.removeItem("usuario")
        window.location.reload()
      })
    } else {
      // Si no hay usuario, mostrar el botón de login
      userInfo.style.display = "none"
      authButton.style.display = "block"
    }
  
    // Menú desplegable - Actualizado para coincidir con "Recetas Dificultad Fácil"
    document.getElementById("menuToggle").addEventListener("click", (e) => {
      e.preventDefault()
      const overlayMenu = document.getElementById("overlayMenu")
      overlayMenu.classList.add("active")
    })
  
    document.getElementById("closeMenu").addEventListener("click", () => {
      const overlayMenu = document.getElementById("overlayMenu")
      overlayMenu.classList.remove("active")
    })
  
    // Cerrar al hacer clic fuera del menú
    document.getElementById("overlayMenu").addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active")
      }
    })
  })
  
  