// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Inicializar Supabase
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

    // Obtener el contenedor de recetas
    const recipeTrack = document.querySelector(".recipe-track")
    if (!recipeTrack) {
      throw new Error("No se encontró el contenedor de recetas")
    }

    // Obtener todas las recetas de la base de datos
    const { data: recetas, error } = await supabase.from("recetas").select("*")

    if (error) {
      throw new Error(`Error al obtener recetas: ${error.message}`)
    }

    if (!recetas || recetas.length === 0) {
      throw new Error("No se encontraron recetas en la base de datos")
    }

    // Mezclar las recetas aleatoriamente
    const recetasAleatorias = shuffleArray(recetas).slice(0, 10)

    // Limpiar el contenedor de recetas
    recipeTrack.innerHTML = ""

    // Añadir las recetas al contenedor
    recetasAleatorias.forEach((receta) => {
      const recipeCard = createRecipeCard(receta)
      recipeTrack.appendChild(recipeCard)
    })

    // Inicializar el slider
    initializeSlider()

    console.log(`✅ Se han cargado ${recetasAleatorias.length} recetas aleatorias`)
  } catch (error) {
    console.error("Error al cargar las recetas:", error)
    const recipeTrack = document.querySelector(".recipe-track")
    if (recipeTrack) {
      recipeTrack.innerHTML = `
        <div class="error-message">
          <p>Error al cargar las recetas. Por favor, intenta recargar la página.</p>
        </div>
      `
    }
  }
})

function shuffleArray(array) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

function createRecipeCard(receta) {
  const card = document.createElement("div")
  card.className = "recipe-card"
  card.setAttribute("data-recipe-id", receta.id)
  card.setAttribute("data-culture", receta.categoria || "Internacional")
  card.setAttribute("data-time", receta.tiempo || "30")
  card.setAttribute("data-difficulty", receta.dificultad || "Media")

  const currentLanguage = localStorage.getItem("language") || "es"
  const imagePath = receta.imagen_url || getImagePath(receta)

  card.innerHTML = `
    <div class="recipe-image">
      <img src="${imagePath}" alt="${receta.titulo}" onerror="this.src='./Imagenes/default-recipe.jpg'">
    </div>
    <div class="recipe-content">
      <h3 data-i18n="${receta.titulo}">${receta.titulo}</h3>
      <div class="recipe-meta">
        <span class="difficulty" data-i18n="${receta.dificultad}">${receta.dificultad || "Media"}</span>
        <span class="time">${receta.tiempo || "30"} min</span>
        <span class="category" data-i18n="${receta.categoria}">${receta.categoria || "Plato principal"}</span>
      </div>
      <div class="description">
        <h3 class="title" data-i18n="${receta.titulo}">${receta.titulo}</h3>
        <p data-i18n="description-${receta.id}">${receta.descripcion || "Deliciosa receta tradicional."}</p>
        <a href="#" class="read-more" data-i18n="Leer más">Leer más</a>
      </div>
    </div>
  `

  // Añadir evento de clic para redirigir a la página de la receta
  card.addEventListener("click", () => {
    window.location.href = `/US6_GuardarRecetas/receta.html?id=${receta.id}`
  })

  // Traducir elementos si hay traducciones disponibles
  if (window.i18n?.translations[currentLanguage]) {
    const elementsToTranslate = card.querySelectorAll("[data-i18n]")
    elementsToTranslate.forEach((element) => {
      const key = element.getAttribute("data-i18n")
      if (window.i18n.translations[currentLanguage][key]) {
        element.textContent = window.i18n.translations[currentLanguage][key]
      }
    })
  }

  return card
}

function getImagePath(receta) {
  const categoryImages = {
    Desayuno: "./Imagenes/China/bollitos-chinos.jpg",
    Comida: "./Imagenes/China/pollo-agridulce.jpg",
    Merienda: "./Imagenes/China/galletas-de-sesamo.jpg",
    Cena: "./Imagenes/China/fideos-salteados.jpg",
    Bebida: "./Imagenes/Bebidas/smoothie.jpg",
    Ensalada: "./Imagenes/España/ensalada.jpg",
    Sopa: "./Imagenes/China/sopa-wonton.jpg",
  }

  return categoryImages[receta.categoria] || "./Imagenes/default-recipe.jpg"
}

// Reemplazar completamente la función initializeSlider con esta versión mejorada
function initializeSlider() {
  const track = document.querySelector(".recipe-track")
  const prevButton = document.querySelector(".prev-button")
  const nextButton = document.querySelector(".next-button")
  const cards = track.querySelectorAll(".recipe-card")
  const cardCount = cards.length

  // Variables para controlar el estado del slider
  let currentIndex = 0
  let isSliding = false
  let autoSlideTimer = null
  let resizeTimer = null

  // Función para determinar cuántas tarjetas mostrar según el ancho de la ventana
  function getCardsToShow() {
    if (window.innerWidth >= 1200) return 5
    if (window.innerWidth >= 992) return 4
    if (window.innerWidth >= 768) return 3
    if (window.innerWidth >= 576) return 2
    return 1
  }

  let cardsToShow = getCardsToShow()

  // Función para actualizar la posición del slider de manera segura
  function updateSliderPosition() {
    const currentLanguage = localStorage.getItem("language") || "es"

    // Recalcular cardsToShow por si ha cambiado el tamaño de la ventana
    cardsToShow = getCardsToShow()

    // Asegurar que el índice actual sea válido
    const maxGroups = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)
    if (currentIndex > maxGroups) currentIndex = maxGroups

    // Mostrar/ocultar tarjetas según el índice actual
    cards.forEach((card, index) => {
      const startIndex = currentIndex * cardsToShow
      const endIndex = startIndex + cardsToShow
      const isVisible = index >= startIndex && index < endIndex

      // Usar display en lugar de transform para mayor estabilidad
      card.style.display = isVisible ? "block" : "none"

      // Actualizar traducciones
      if (window.i18n?.translations[currentLanguage]) {
        const elementsToTranslate = card.querySelectorAll("[data-i18n]")
        elementsToTranslate.forEach((element) => {
          const key = element.getAttribute("data-i18n")
          if (window.i18n.translations[currentLanguage][key]) {
            element.textContent = window.i18n.translations[currentLanguage][key]
          }
        })
      }
    })

    // Actualizar estado de los botones
    prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
    prevButton.style.cursor = currentIndex === 0 ? "default" : "pointer"

    nextButton.style.opacity = currentIndex >= maxGroups ? "0.5" : "1"
    nextButton.style.cursor = currentIndex >= maxGroups ? "default" : "pointer"

    // Permitir nuevos clics después de un tiempo
    setTimeout(() => {
      isSliding = false
    }, 350)
  }

  // Función para iniciar el autoplay de manera segura
  function startAutoSlide() {
    // Limpiar cualquier temporizador existente
    if (autoSlideTimer) {
      clearTimeout(autoSlideTimer)
      autoSlideTimer = null
    }

    // Crear un nuevo temporizador
    autoSlideTimer = setTimeout(() => {
      if (!isSliding) {
        isSliding = true
        const maxGroups = Math.ceil(cardCount / cardsToShow) - 1
        currentIndex = currentIndex < maxGroups ? currentIndex + 1 : 0
        updateSliderPosition()
      }
      // Reiniciar el autoplay
      startAutoSlide()
    }, 25000)
  }

  // Event listeners para los botones con protección contra clics múltiples
  prevButton.addEventListener("click", () => {
    if (isSliding) return
    isSliding = true

    // Detener el autoplay para evitar conflictos
    if (autoSlideTimer) {
      clearTimeout(autoSlideTimer)
      autoSlideTimer = null
    }

    if (currentIndex > 0) {
      currentIndex--
      updateSliderPosition()
    } else {
      isSliding = false
    }

    // Reiniciar el autoplay
    startAutoSlide()
  })

  nextButton.addEventListener("click", () => {
    if (isSliding) return
    isSliding = true

    // Detener el autoplay para evitar conflictos
    if (autoSlideTimer) {
      clearTimeout(autoSlideTimer)
      autoSlideTimer = null
    }

    const maxGroups = Math.ceil(cardCount / cardsToShow) - 1
    if (currentIndex < maxGroups) {
      currentIndex++
      updateSliderPosition()
    } else {
      isSliding = false
    }

    // Reiniciar el autoplay
    startAutoSlide()
  })

  // Actualizar cuando cambie el idioma
  document.addEventListener("languageChanged", () => {
    if (!isSliding) {
      updateSliderPosition()
    }
  })

  // Actualizar cuando cambie el tamaño de la ventana
  window.addEventListener("resize", () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer)
      resizeTimer = null
    }

    resizeTimer = setTimeout(() => {
      const newCardsToShow = getCardsToShow()
      if (cardsToShow !== newCardsToShow) {
        cardsToShow = newCardsToShow
        // Ajustar el índice actual para evitar espacios vacíos
        const maxGroups = Math.ceil(cardCount / cardsToShow) - 1
        if (currentIndex > maxGroups) currentIndex = maxGroups
        updateSliderPosition()
      }
    }, 250)
  })

  // Inicializar el slider
  updateSliderPosition()
  startAutoSlide()

  // Exponer la función para que pueda ser llamada desde otros scripts
  window.updateRandomRecipesSlider = updateSliderPosition
}

