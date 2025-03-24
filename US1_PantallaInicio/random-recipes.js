// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"

document.addEventListener("DOMContentLoaded", async () => {
  // Inicializar Supabase
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

  // Obtener el contenedor de recetas
  const recipeTrack = document.querySelector(".recipe-track")

  if (!recipeTrack) {
    console.error("No se encontró el contenedor de recetas")
    return
  }

  try {
    // Obtener todas las recetas de la base de datos
    const { data: recetas, error } = await supabase.from("recetas").select("*")

    if (error) {
      console.error("Error al obtener recetas:", error)
      return
    }

    if (!recetas || recetas.length === 0) {
      console.warn("No se encontraron recetas en la base de datos")
      return
    }

    console.log("Recetas obtenidas:", recetas.length)

    // Mezclar las recetas para obtener un orden aleatorio
    const recetasAleatorias = shuffleArray(recetas)

    // Limpiar el contenedor de recetas
    recipeTrack.innerHTML = ""

    // Añadir las recetas al contenedor
    recetasAleatorias.forEach((receta) => {
      const recipeCard = createRecipeCard(receta)
      recipeTrack.appendChild(recipeCard)
    })

    // Inicializar el slider y los efectos hover después de cargar las recetas
    initializeSlider()
    initializeHoverEffects()
  } catch (error) {
    console.error("Error inesperado:", error)
  }
})

// Función para mezclar un array (algoritmo Fisher-Yates)
function shuffleArray(array) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Función para determinar la ruta de la imagen según el título o categoría de la receta
function getImagePath(receta) {
  // Mapeo de títulos específicos a rutas de imágenes
  const imageMapping = {
    "Pollo Agridulce": "./Imagenes/China/pollo-agridulce.jpg",
    Paella: "./Imagenes/España/paella.png",
    "Crepes Dulces": "./Imagenes/Francia/crepes-dulces.jpg",
    "Bizcocho Capuccino": "./Imagenes/Italia/bizcocho-capuccino.jpg",
    "Arepa Venezolana": "./Imagenes/Venezuela/arepa-venezolana.jpg",
    "Galletas de Sésamo": "./Imagenes/China/galletas-de-sesamo.jpg",
    "Bollitos Chinos": "./Imagenes/China/bollitos-chinos.jpg",
    "Bolitas Chinas": "./Imagenes/China/bollitos-chinos.jpg",
    "Fideos Salteados": "./Imagenes/China/fideos-salteados.jpg",
    "Tortilla de Patatas": "./Imagenes/España/tortilla-patatas.jpeg",
    "Pasta al Pesto": "./Imagenes/Italia/pasta.jpg",
    Sushi: "./Imagenes/Japon/sushi.jpeg",
    "Tacos Mexicanos": "./Imagenes/Mexico/tacos.jpg",
    "Smoothie de Frutas": "./Imagenes/Bebidas/smoothie.jpg",
    "Batido Energético": "./Imagenes/Bebidas/batido.jpg",
  }

  // Verificar si existe una imagen específica para el título
  if (receta.titulo && imageMapping[receta.titulo]) {
    return imageMapping[receta.titulo]
  }

  // Si no hay imagen específica para el título, usar la categoría
  switch (receta.categoria) {
    case "Desayuno":
      return "./Imagenes/China/bollitos-chinos.jpg"
    case "Comida":
      return "./Imagenes/China/pollo-agridulce.jpg"
    case "Merienda":
      return "./Imagenes/China/galletas-de-sesamo.jpg"
    case "Cena":
      return "./Imagenes/China/fideos-salteados.jpg"
    case "Bebida":
      return "./Imagenes/Bebidas/smoothie.jpg"
    case "Ensalada":
      return "./Imagenes/España/ensalada.jpg"
    case "Sopa":
      return "./Imagenes/China/sopa-wonton.jpg"
    default:
      return "./Imagenes/placeholder.jpg"
  }
}

// Función para crear una tarjeta de receta
function createRecipeCard(receta) {
  // Crear el elemento div principal
  const card = document.createElement("div")
  card.className = "recipe-card"
  card.setAttribute("data-culture", receta.categoria || "Internacional")
  card.setAttribute("data-time", receta.tiempo || "30")
  card.setAttribute("data-difficulty", receta.dificultad || "Media")

  // Obtener la ruta de la imagen adecuada
  const imagePath = getImagePath(receta)

  // Estructura HTML de la tarjeta con la estructura correcta para mantener el hover
  card.innerHTML = `
        <div class="recipe-image">
            <img src="${imagePath}" alt="${receta.titulo}">
        </div>
        <div class="recipe-content">
            <h3>${receta.titulo}</h3>
            <div class="recipe-meta">
                <span class="difficulty">${receta.dificultad || "Media"}</span>
                <span class="time">${receta.tiempo || "30"} min</span>
                <span class="category">${receta.categoria || "Plato principal"}</span>
            </div>
            <div class="description">
                <h3 class="title">${receta.titulo}</h3>
                <p>${receta.description || "Deliciosa receta para disfrutar en cualquier momento."}</p>
                <a href="#" class="read-more">Leer más</a>
            </div>
        </div>
        <div class="recipe-overlay">
            <h3 class="title">${receta.titulo}</h3>
            <p>${receta.description || "Deliciosa receta para disfrutar en cualquier momento."}</p>
        </div>
    `

  return card
}

// Función para inicializar el slider
function initializeSlider() {
  const track = document.querySelector(".recipe-track")
  const prevButton = document.querySelector(".prev-button")
  const nextButton = document.querySelector(".next-button")
  const cards = track.querySelectorAll(".recipe-card")
  const cardCount = cards.length
  const cardsToShow = 5
  let currentIndex = 0

  if (!track || !prevButton || !nextButton || cardCount === 0) {
    console.error("Error: Elementos del slider no encontrados o no hay tarjetas.")
    return
  }

  function updateSliderPosition() {
    // Mostrar/ocultar tarjetas según el índice actual
    cards.forEach((card, index) => {
      card.style.display =
        index >= currentIndex * cardsToShow && index < (currentIndex + 1) * cardsToShow ? "block" : "none"
    })

    // Actualizar estado de los botones
    prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
    prevButton.style.cursor = currentIndex === 0 ? "default" : "pointer"

    const maxGroups = Math.ceil(cardCount / cardsToShow) - 1
    nextButton.style.opacity = currentIndex >= maxGroups ? "0.5" : "1"
    nextButton.style.cursor = currentIndex >= maxGroups ? "default" : "pointer"
  }

  // Evento para el botón anterior
  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1
      updateSliderPosition()
    }
  })

  // Evento para el botón siguiente
  nextButton.addEventListener("click", () => {
    const maxGroups = Math.ceil(cardCount / cardsToShow) - 1
    if (currentIndex < maxGroups) {
      currentIndex += 1
      updateSliderPosition()
    }
  })

  // Inicializar la posición del slider
  updateSliderPosition()
}

// Función para inicializar los efectos hover
function initializeHoverEffects() {
  const cards = document.querySelectorAll(".recipe-card")

  cards.forEach((card) => {
    // Eventos de mouse para mostrar/ocultar el overlay
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
}

