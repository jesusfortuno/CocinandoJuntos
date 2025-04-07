// Configuración de Supabase
window.RECIPE_CONFIG = window.RECIPE_CONFIG || {
  SUPABASE_URL: "https://uonkcjrokwtgvimjxawm.supabase.co",
  SUPABASE_API_KEY:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU",
}

// Función para mezclar aleatoriamente un array
function shuffleArray(array) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Función para obtener la ruta de la imagen según la receta
function getImagePath(receta) {
  // Mapeo de títulos específicos a imágenes
  const titleImages = {
    "Pollo Agridulce": "./Imagenes/China/pollo-agridulce.jpg",
    "Sweet and Sour Chicken": "./Imagenes/China/pollo-agridulce.jpg",
    "Pollastre Agredolç": "./Imagenes/China/pollo-agridulce.jpg",
    "Galletas de Sésamo": "./Imagenes/China/galletas-de-sesamo.jpg",
    "Sesame Cookies": "./Imagenes/China/galletas-de-sesamo.jpg",
    "Galetes de Sèsam": "./Imagenes/China/galletas-de-sesamo.jpg",
    "Bolitas Chinas": "./Imagenes/China/bollitos-chinos.jpg",
    "Chinese Buns": "./Imagenes/China/bollitos-chinos.jpg",
    "Panets Xinesos": "./Imagenes/China/bollitos-chinos.jpg",
    "Fideos Salteados": "./Imagenes/China/fideos-salteados.jpg",
    "Stir-Fried Noodles": "./Imagenes/China/fideos-salteados.jpg",
    "Fideus Saltats": "./Imagenes/China/fideos-salteados.jpg",
    "Paella": "./Imagenes/España/paella.png",
    "Bizcocho Capuccino": "./Imagenes/Italia/bizcocho-capuccino.jpg",
    "Cappuccino Cake": "./Imagenes/Italia/bizcocho-capuccino.jpg",
    "Churros con Chocolate": "./Imagenes/España/churros-chocolate.jpg",
    "Crepas Dulces": "./Imagenes/Francia/crepas-dulces.jpg",
    "Sweet Crepes": "./Imagenes/Francia/crepas-dulces.jpg",
    "Tortilla de Patatas": "./Imagenes/España/tortilla-patatas.jpeg",
    "Spanish Omelette": "./Imagenes/España/tortilla-patatas.jpeg",
    "Quiche Lorraine": "./Imagenes/Francia/quiche-lorraine.pn.webp",
    "Coq au Vin": "./Imagenes/Francia/coq-au-vin.jpg",
    "Arepa Venezolana": "./Imagenes/Venezuela/arepa-venezolana.jpg",
    "Pan con Tomate": "./Imagenes/España/pan-tomate.jpg",
    "Tostada Francesa": "./Imagenes/Francia/tostada-francesa.jpg",
    "Cannoli": "./Imagenes/Italia/cannoli.jpg",
    "Lasaña": "./Imagenes/Italia/lasaña.jpg",
    "Pizza Margarita": "./Imagenes/Italia/pizza-margarita.jpg",
  }


  // Primero intentar encontrar una imagen por título exacto
  if (titleImages[receta.titulo]) {
    return titleImages[receta.titulo]
  }

  // Imagen por defecto
  return "./Imagenes/default-recipe.jpg"
}

// Función para traducir la descripción de la receta
function getTranslatedDescription(receta, language) {
  // Si hay una descripción en la receta, usarla
  if (receta.descripcion) {
    // Intentar traducir la descripción si existe una traducción
    const descKey = `description-${receta.id}`
    if (window.i18n?.translations[language]?.[descKey]) {
      return window.i18n.translations[language][descKey]
    }

    // Si no hay traducción específica, devolver la descripción original
    return receta.descripcion
  }

  // Si no hay descripción, usar un texto predeterminado según el idioma
  if (language === "es") {
    return "Deliciosa receta tradicional con ingredientes frescos y sabores únicos."
  } else if (language === "ca") {
    return "Deliciosa recepta tradicional amb ingredients frescos i sabors únics."
  } else {
    return "Delicious traditional recipe with fresh ingredients and unique flavors."
  }
}

// Función para crear una tarjeta de receta
function createRecipeCard(receta, language) {
  const card = document.createElement("div")
  card.className = "recipe-card"
  card.setAttribute("data-recipe-id", receta.id)
  card.setAttribute("data-culture", receta.categoria || "Internacional")
  card.setAttribute("data-time", receta.tiempo || "30")
  card.setAttribute("data-difficulty", receta.dificultad || "Media")

  // Obtener traducciones según el idioma actual
  let titulo = receta.titulo
  let dificultad = receta.dificultad || "Media"
  let categoria = receta.categoria || "Plato principal"
  const tiempo = receta.tiempo || "30"
  const descripcion = getTranslatedDescription(receta, language)
  let leerMas = "Read more"

  // Traducir título
  if (window.i18n?.translations[language]?.[titulo]) {
    titulo = window.i18n.translations[language][titulo]
  }

  // Traducir dificultad
  if (window.i18n?.translations[language]?.[dificultad]) {
    dificultad = window.i18n.translations[language][dificultad]
  }

  // Traducir categoría
  if (window.i18n?.translations[language]?.[categoria]) {
    categoria = window.i18n.translations[language][categoria]
  }

  // Traducir "Read more"
  if (window.i18n?.translations[language]?.["Leer más"]) {
    leerMas = window.i18n.translations[language]["Leer más"]
  } else if (language === "es") {
    leerMas = "Leer más"
  } else if (language === "ca") {
    leerMas = "Llegir més"
  }

  // Obtener la ruta de la imagen
  const imagePath = receta.imagen_url || getImagePath(receta)

  // Crear el HTML de la tarjeta con el overlay para el hover
  card.innerHTML = `
    <div class="recipe-image">
      <img src="${imagePath}" alt="${titulo}">
    </div>
    <div class="recipe-content">
      <h3 data-i18n="${receta.titulo}">${titulo}</h3>
      <div class="recipe-meta">
        <span class="difficulty" data-i18n="${receta.dificultad}">${dificultad}</span>
        <span class="time">${tiempo} min</span>
        <span class="category" data-i18n="${receta.categoria}">${categoria}</span>
      </div>
    </div>
    <div class="recipe-overlay">
      <h3 class="title" data-i18n="${receta.titulo}">${titulo}</h3>
      <p data-i18n="description-${receta.id}">${descripcion}</p>
      <a href="#" class="read-more" data-i18n="Leer más">${leerMas}</a>
    </div>
  `

  // Añadir eventos de mouse para el overlay
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

  // Añadir evento de clic para redirigir a la página de la receta
  card.addEventListener("click", (e) => {
    // No redirigir si se hizo clic en el enlace "Leer más"
    if (e.target.classList.contains("read-more")) {
      e.preventDefault()
      window.location.href = `/US6_GuardarRecetas/receta.html?id=${receta.id}`
      return
    }

    // Si se hizo clic en cualquier otra parte de la tarjeta
    if (!e.target.classList.contains("read-more")) {
      window.location.href = `/US6_GuardarRecetas/receta.html?id=${receta.id}`
    }
  })

  return card
}

// Función para actualizar las traducciones de las recetas
function updateRecipeTranslations(language) {
  const cards = document.querySelectorAll(".recipe-card")

  cards.forEach((card) => {
    // Obtener elementos a traducir
    const title = card.querySelector("h3")
    const overlayTitle = card.querySelector(".recipe-overlay .title")
    const difficulty = card.querySelector(".difficulty")
    const category = card.querySelector(".category")
    const description = card.querySelector(".recipe-overlay p")
    const readMore = card.querySelector(".read-more")

    // Traducir título
    if (title && title.hasAttribute("data-i18n")) {
      const titleKey = title.getAttribute("data-i18n")
      if (window.i18n?.translations[language]?.[titleKey]) {
        title.textContent = window.i18n.translations[language][titleKey]
        if (overlayTitle) {
          overlayTitle.textContent = window.i18n.translations[language][titleKey]
        }
      }
    }

    // Traducir dificultad
    if (difficulty && difficulty.hasAttribute("data-i18n")) {
      const difficultyKey = difficulty.getAttribute("data-i18n")
      if (window.i18n?.translations[language]?.[difficultyKey]) {
        difficulty.textContent = window.i18n.translations[language][difficultyKey]
      }
    }

    // Traducir categoría
    if (category && category.hasAttribute("data-i18n")) {
      const categoryKey = category.getAttribute("data-i18n")
      if (window.i18n?.translations[language]?.[categoryKey]) {
        category.textContent = window.i18n.translations[language][categoryKey]
      }
    }

    // Traducir descripción
    if (description && description.hasAttribute("data-i18n")) {
      const descKey = description.getAttribute("data-i18n")
      if (window.i18n?.translations[language]?.[descKey]) {
        description.textContent = window.i18n.translations[language][descKey]
      }
    }

    // Traducir "Read more"
    if (readMore) {
      if (language === "es") {
        readMore.textContent = "Leer más"
      } else if (language === "ca") {
        readMore.textContent = "Llegir més"
      } else {
        readMore.textContent = "Read more"
      }
    }
  })
}

// Función principal para cargar recetas aleatorias
async function loadRandomRecipes() {
  try {
    // Obtener el contenedor de recetas
    const recipeTrack = document.querySelector(".recipe-track")
    if (!recipeTrack) {
      console.error("No se encontró el contenedor de recetas")
      return
    }

    // Mostrar mensaje de carga
    recipeTrack.innerHTML = `
      <div class="loading-indicator">
        <p>Cargando recetas...</p>
      </div>
    `

    // Inicializar Supabase
    const supabase = window.supabase.createClient(
      window.RECIPE_CONFIG.SUPABASE_URL,
      window.RECIPE_CONFIG.SUPABASE_API_KEY,
    )

    // Obtener todas las recetas de la base de datos
    const { data: recetas, error } = await supabase.from("recetas").select("*")

    if (error) {
      throw new Error(`Error al obtener recetas: ${error.message}`)
    }

    if (!recetas || recetas.length === 0) {
      throw new Error("No se encontraron recetas en la base de datos")
    }

    // Mezclar las recetas aleatoriamente y tomar las primeras 10
    const recetasAleatorias = shuffleArray(recetas).slice(0, 10)

    // Limpiar el contenedor de recetas
    recipeTrack.innerHTML = ""

    // Obtener el idioma actual
    const currentLanguage = localStorage.getItem("language") || "es"

    // Añadir las recetas al contenedor
    recetasAleatorias.forEach((receta) => {
      const recipeCard = createRecipeCard(receta, currentLanguage)
      recipeTrack.appendChild(recipeCard)
    })

    // Inicializar el slider
    initializeRecipeSlider()

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
}

// Función para inicializar el slider
function initializeRecipeSlider() {
  const track = document.querySelector(".recipe-track")
  const prevButton = document.querySelector(".prev-button")
  const nextButton = document.querySelector(".next-button")

  if (!track || !prevButton || !nextButton) {
    console.error("Error: No se encontraron los elementos del slider")
    return
  }

  const cards = track.querySelectorAll(".recipe-card")
  const cardCount = cards.length

  if (cardCount === 0) {
    console.error("Error: No hay tarjetas de recetas")
    return
  }

  // Variables para controlar el estado del slider
  let currentIndex = 0
  let isSliding = false

  // Función para determinar cuántas tarjetas mostrar según el ancho de la ventana
  function getCardsToShow() {
    if (window.innerWidth >= 1400) return 5 // Mostrar 5 tarjetas en pantallas muy grandes
    if (window.innerWidth >= 1100) return 5 // Mantener 5 tarjetas en pantallas grandes
    if (window.innerWidth >= 850) return 4 // Mostrar 4 tarjetas en pantallas medianas
    if (window.innerWidth >= 600) return 3 // Mostrar 3 tarjetas en pantallas pequeñas
    return 1 // Mostrar 1 tarjeta en pantallas muy pequeñas
  }

  let cardsToShow = getCardsToShow()

  // Función para actualizar la posición del slider
  function updateRecipeSliderPosition() {
    // Asegurar que el índice actual sea válido
    const maxIndex = Math.max(0, cardCount - cardsToShow)
    if (currentIndex > maxIndex) currentIndex = maxIndex

    // Mostrar/ocultar tarjetas según el índice actual
    cards.forEach((card, index) => {
      const isVisible = index >= currentIndex && index < currentIndex + cardsToShow
      card.style.display = isVisible ? "block" : "none"
    })

    // Actualizar estado de los botones
    prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
    prevButton.style.cursor = currentIndex === 0 ? "default" : "pointer"
    nextButton.style.opacity = currentIndex >= maxIndex ? "0.5" : "1"
    nextButton.style.cursor = currentIndex >= maxIndex ? "default" : "pointer"

    // Permitir nuevos clics después de un tiempo
    setTimeout(() => {
      isSliding = false
    }, 300)
  }

  // Event listeners para los botones
  prevButton.addEventListener("click", () => {
    if (isSliding) return
    isSliding = true

    if (currentIndex > 0) {
      currentIndex--
      updateRecipeSliderPosition()
    } else {
      isSliding = false
    }
  })

  nextButton.addEventListener("click", () => {
    if (isSliding) return
    isSliding = true

    const maxIndex = Math.max(0, cardCount - cardsToShow)
    if (currentIndex < maxIndex) {
      currentIndex++
      updateRecipeSliderPosition()
    } else {
      isSliding = false
    }
  })

  // Actualizar cuando cambie el tamaño de la ventana
  window.addEventListener("resize", () => {
    const newCardsToShow = getCardsToShow()
    if (cardsToShow !== newCardsToShow) {
      cardsToShow = newCardsToShow
      updateRecipeSliderPosition()
    }
  })

  // Inicializar el slider
  updateRecipeSliderPosition()

  // Exponer la función para que pueda ser llamada desde otros scripts
  window.updateRecipeSliderPosition = updateRecipeSliderPosition
}

// Exponer funciones para uso global
window.loadRandomRecipes = loadRandomRecipes
window.initializeRecipeSlider = initializeRecipeSlider

// Cargar recetas aleatorias cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Asegurarse de que Supabase esté cargado antes de intentar cargar las recetas
  if (window.supabase) {
    loadRandomRecipes()
  } else {
    // Si Supabase no está cargado, esperar un poco y volver a intentar
    console.log("Esperando a que Supabase se cargue...")
    setTimeout(loadRandomRecipes, 1000)
  }

  // Añadir la hoja de estilos para las recetas
  const recipeStyles = document.createElement("link")
  recipeStyles.rel = "stylesheet"
  recipeStyles.href = "styles-recipes.css"
  document.head.appendChild(recipeStyles)
})

// Escuchar cambios de idioma
document.addEventListener("languageChanged", (e) => {
  // Recargar las recetas cuando cambie el idioma para actualizar las traducciones
  loadRandomRecipes()
})

