// Script para arreglar problemas de responsividad en la página
document.addEventListener("DOMContentLoaded", () => {
  console.log("Aplicando arreglos de responsividad...")

  // Arreglar el slider de recetas
  setupResponsiveSlider()

  // Arreglar el menú de navegación en dispositivos móviles
  setupResponsiveNavigation()

  // Arreglar el footer en dispositivos móviles
  setupResponsiveFooter()

  // Arreglar la sección de culturas en dispositivos móviles
  setupResponsiveCultures()

  // Crear imagen de placeholder si no existe
  createPlaceholderImage()
})

// Función para arreglar el slider de recetas
function setupResponsiveSlider() {
  const recipeSlider = document.querySelector(".recipe-slider")
  const recipeTrack = document.querySelector(".recipe-track")
  const prevButton = document.querySelector(".prev-button")
  const nextButton = document.querySelector(".next-button")

  if (!recipeSlider || !recipeTrack || !prevButton || !nextButton) {
    console.error("Error: Elementos del slider no encontrados o no hay tarjetas.")
    return
  }

  // Ajustar el tamaño del slider según el ancho de la pantalla
  function adjustSliderSize() {
    const windowWidth = window.innerWidth

    if (windowWidth < 576) {
      // Móviles pequeños
      recipeSlider.style.padding = "10px 0"
      prevButton.style.left = "5px"
      nextButton.style.right = "5px"
      prevButton.style.width = "30px"
      nextButton.style.width = "30px"
      prevButton.style.height = "30px"
      nextButton.style.height = "30px"
    } else if (windowWidth < 768) {
      // Móviles y tablets pequeñas
      recipeSlider.style.padding = "15px 0"
      prevButton.style.left = "8px"
      nextButton.style.right = "8px"
      prevButton.style.width = "35px"
      nextButton.style.width = "35px"
      prevButton.style.height = "35px"
      nextButton.style.height = "35px"
    } else {
      // Tablets y pantallas más grandes
      recipeSlider.style.padding = "20px 0"
      prevButton.style.left = "10px"
      nextButton.style.right = "10px"
      prevButton.style.width = "40px"
      nextButton.style.width = "40px"
      prevButton.style.height = "40px"
      nextButton.style.height = "40px"
    }
  }

  // Ajustar el tamaño de las tarjetas según el ancho de la pantalla
  function adjustCardSize() {
    const cards = recipeTrack.querySelectorAll(".recipe-card")
    const windowWidth = window.innerWidth

    cards.forEach((card) => {
      if (windowWidth < 576) {
        // Móviles pequeños
        card.style.width = "calc(100% - 20px)"
        card.style.margin = "0 10px 15px 10px"
      } else if (windowWidth < 768) {
        // Móviles y tablets pequeñas
        card.style.width = "calc(50% - 20px)"
        card.style.margin = "0 10px 15px 10px"
      } else if (windowWidth < 992) {
        // Tablets y pantallas medianas
        card.style.width = "calc(33.33% - 20px)"
        card.style.margin = "0 10px"
      } else if (windowWidth < 1200) {
        // Pantallas grandes
        card.style.width = "calc(25% - 20px)"
        card.style.margin = "0 10px"
      } else {
        // Pantallas muy grandes
        card.style.width = "calc(20% - 20px)"
        card.style.margin = "0 10px"
      }
    })
  }

  // Aplicar ajustes iniciales
  adjustSliderSize()
  adjustCardSize()

  // Aplicar ajustes al cambiar el tamaño de la ventana
  window.addEventListener("resize", () => {
    adjustSliderSize()
    adjustCardSize()
  })
}

// Función para arreglar el menú de navegación en dispositivos móviles
function setupResponsiveNavigation() {
  const nav = document.querySelector("nav")
  const searchContainer = document.querySelector(".search-container")
  const logo = document.querySelector(".logo")
  const menuToggle = document.getElementById("menuToggle")
  const overlayMenu = document.getElementById("overlayMenu")

  if (!nav) return

  // Ajustar el menú según el ancho de la pantalla
  function adjustNavigation() {
    const windowWidth = window.innerWidth
    
    if (windowWidth < 768) {
      // Móviles
      if (nav) nav.style.padding = "0.6rem 1rem"
      if (logo) {
        logo.style.width = "60px"
        logo.style.height = "60px"
        logo.style.marginRight = "1rem"
      }
      if (searchContainer) {
        searchContainer.style.maxWidth = "100%"
        searchContainer.style.margin = "10px 0"
        searchContainer.style.order = "3"
      }
      if (menuToggle) menuToggle.style.fontSize = "1.3rem"
    } else if (windowWidth < 992) {
      // Tablets
      if (nav) nav.style.padding = "0.8rem 1.5rem"
      if (logo) {
        logo.style.width = "70px"
        logo.style.height = "70px"
        logo.style.marginRight = "1.5rem"
      }
      if (searchContainer) {
        searchContainer.style.maxWidth = "400px"
        searchContainer.style.margin = "0 auto"
        searchContainer.style.order = "2"
      }
      if (menuToggle) menuToggle.style.fontSize = "1.4rem"
    } else {
      // Pantallas grandes
      if (nav) nav.style.padding = "0.8rem 2rem"
      if (logo) {
        logo.style.width = "80px"
        logo.style.height = "80px"
        logo.style.marginRight = "2rem"
      }
      if (searchContainer) {
        searchContainer.style.maxWidth = "600px"
        searchContainer.style.margin = "0 auto"
        searchContainer.style.order = "2"
      }
      if (menuToggle) menuToggle.style.fontSize = "1.5rem"
    }
  }

  // Ajustar el menú desplegable según el ancho de la pantalla
  function adjustOverlayMenu() {
    const windowWidth = window.innerWidth
    
    if (!overlayMenu) return
    
    if (windowWidth < 768) {
// Móviles
