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

// Función para obtener la ruta de la imagen según el título y categoría
function getImagePath(titulo, categoria) {
  // Obtener la ruta base para cargar los componentes
  const scriptTag = document.querySelector('script[src*="random-recipes.js"]')
  const scriptSrc = scriptTag ? scriptTag.getAttribute("src") : ""
  let pathToRoot = ""

  if (scriptSrc) {
    const parts = scriptSrc.split("/")
    const depth = parts.length - 1
    if (depth > 0) {
      pathToRoot = Array(depth).fill("..").join("/") + "/"
    }
  }

  // Mapeo de títulos a rutas de imágenes
  const imageMap = {
    "Pollo Agridulce": `../Imagenes/China/pollo-agridulce.jpg`,
    "Paella": `../Imagenes/España/paella.png`,
    "Tortilla de Patatas": `../Imagenes/España/tortilla-patatas.jpeg`,
    "Crepas Dulces": `../Imagenes/Francia/crepas-dulces.jpg`,
    "Coq au Vin": `../Imagenes/Francia/coq-au-vin.jpg`,
    "Bizcocho Capuccino": `../Imagenes/Italia/bizcocho-capuccino.jpg`,
    "Pizza Margarita": `../Imagenes/Italia/pizza-margarita.jpg`,
    "Sushi": `../Imagenes/Japon/sushi.jpeg`,
    "Arepa Venezolana": `../Imagenes/Venezuela/arepa-venezolana.jpg`,
    "Galletas de Sésamo": `../Imagenes/China/galletas-de-sesamo.jpg`,
    "Bolitas Chinas": `../Imagenes/China/bollitos-chinos.jpg`,
    "Fideos Salteados": `../Imagenes/China/fideos-salteados.jpg`,
    "Pan con Tomate": `../Imagenes/España/pan-tomate.jpg`,
    "Churros con Chocolate": `../Imagenes/España/churros-chocolate.jpg`,
    "Quiche Lorraine": `../Imagenes/Francia/quiche-lorraine.pn.webp`,
    "Tostada Francesa": `../Imagenes/Francia/tostada-francesa.jpg`,
    "Cannoli": `../Imagenes/Italia/cannoli.png`,
    "Lasaña": `../Imagenes/Italia/lasaña.jpg`,
  }

  // Buscar coincidencia exacta
  if (imageMap[titulo]) {
    return imageMap[titulo]
  }

  // Imagen por defecto según categoría
  if (categoria) {
    const categoriaLower = categoria.toLowerCase()
    if (categoriaLower.includes("china")) {
      return `Imagenes/China/pollo-agridulce.jpg`
    } else if (
      categoriaLower.includes("españa") ||
      categoriaLower.includes("spain") ||
      categoriaLower.includes("espanya")
    ) {
      return `Imagenes/España/paella.png`
    } else if (
      categoriaLower.includes("francia") ||
      categoriaLower.includes("france") ||
      categoriaLower.includes("frança")
    ) {
      return `Imagenes/Francia/crepas-dulces.jpg`
    } else if (
      categoriaLower.includes("italia") ||
      categoriaLower.includes("italy") ||
      categoriaLower.includes("itàlia")
    ) {
      return `Imagenes/Italia/pizza-margarita.jpg`
    } else if (categoriaLower.includes("venezuela") || categoriaLower.includes("veneçuela")) {
      return `Imagenes/Venezuela/arepa-venezolana.jpg`
    } else if (
      categoriaLower.includes("japón") ||
      categoriaLower.includes("japan") ||
      categoriaLower.includes("japó")
    ) {
      return `Imagenes/Japon/sushi.jpeg`
    }
  }

  // Imagen por defecto basada en el título
  const tituloLower = titulo.toLowerCase()
  if (tituloLower.includes("pollo")) {
    return `Imagenes/China/pollo-agridulce.jpg`
  } else if (tituloLower.includes("paella")) {
    return `Imagenes/España/paella.png`
  } else if (tituloLower.includes("tortilla")) {
    return `Imagenes/España/tortilla-patatas.jpeg`
  } else if (tituloLower.includes("crepa")) {
    return `Imagenes/Francia/crepas-dulces.jpg`
  } else if (tituloLower.includes("coq")) {
    return `Imagenes/Francia/coq-au-vin.jpg`
  } else if (tituloLower.includes("bizcocho")) {
    return `Imagenes/Italia/bizcocho-capuccino.jpg`
  } else if (tituloLower.includes("pizza")) {
    return `Imagenes/Italia/pizza-margarita.jpg`
  } else if (tituloLower.includes("sushi")) {
    return `Imagenes/Japon/sushi.jpeg`
  } else if (tituloLower.includes("arepa")) {
    return `Imagenes/Venezuela/arepa-venezolana.jpg`
  }

  // Imagen por defecto
  return `Imagenes/placeholder-recipe.jpg`
}

// Función para obtener la URL de la receta
function getRecipeUrl(receta) {
  // Convertir el título a un formato de URL amigable
  const slug = receta.titulo
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")

  // Mapeo de títulos específicos a URLs específicas
  const urlMap = {
    "pollo-agridulce": `../US6_GuardarRecetas/pollo-agridulce.html`,
    paella: `../US6_GuardarRecetas/paella.html`,
    "tortilla-de-patatas": `../US6_GuardarRecetas/tortilla-de-patatas.html`,
    "crepas-dulces": `../US6_GuardarRecetas/crepas-dulces.html`,
    "coq-au-vin": `../US6_GuardarRecetas/coq-au-vin.html`,
    "bizcocho-capuccino": `../US6_GuardarRecetas/bizcocho-capuccino.html`,
    "pizza-margarita": `../US6_GuardarRecetas/pizza-margarita.html`,
    sushi: `../US6_GuardarRecetas/sushi.html`,
    "arepa-venezolana": `../US6_GuardarRecetas/arepa-venezolana.html`,
  }

  // Si existe una URL específica para este slug, usarla
  if (urlMap[slug]) {
    return urlMap[slug]
  }

  // URL genérica basada en el ID de la receta
  return `../US6_GuardarRecetas/receta.html?id=${receta.id}`
}

// Función para convertir nivel de dificultad a puntos visuales
function getDifficultyDots(dificultad) {
  let nivel = 0

  if (dificultad === "Fácil" || dificultad === "Easy" || dificultad === "Fàcil") {
    nivel = 1
  } else if (dificultad === "Media" || dificultad === "Medium" || dificultad === "Mitjana") {
    nivel = 2
  } else if (dificultad === "Difícil" || dificultad === "Hard" || dificultad === "Difícil") {
    nivel = 3
  }

  let dotsHTML = '<span style="display: inline-flex; gap: 2px;">'

  for (let i = 1; i <= 3; i++) {
    if (i <= nivel) {
      dotsHTML +=
        '<span style="width: 8px; height: 8px; background-color: #6b4423; border-radius: 50%; display: inline-block;"></span>'
    } else {
      dotsHTML +=
        '<span style="width: 8px; height: 8px; background-color: #d4c3b5; border-radius: 50%; display: inline-block;"></span>'
    }
  }

  dotsHTML += "</span>"
  return dotsHTML
}

// Función para crear una tarjeta de receta
function createRecipeCard(receta) {
  const card = document.createElement("div")
  card.className = "recipe-card"

  // Obtener imagen para la receta
  const imageSrc = getImagePath(receta.titulo, receta.categoria)

  // Crear el contenido de la tarjeta
  card.innerHTML = `
    <img src="${imageSrc}" alt="${receta.titulo}">
    <div class="content">
      <h3>${receta.titulo}</h3>
      <div class="meta">
        <span class="category">${receta.categoria}</span>
        <span class="difficulty">Dificultad: ${getDifficultyDots(receta.dificultad)}</span>
      </div>
      <div class="description">
        <p>${receta.descripcion ? receta.descripcion.substring(0, 100) + "..." : "Deliciosa receta tradicional."}</p>
      </div>
      <div class="tags">
        <span class="tag">${receta.tiempo || "30 min"}</span>
      </div>
    </div>
    <div class="recipe-overlay">
      <h3 class="title">${receta.titulo}</h3>
      <p>${receta.descripcion || "Deliciosa receta tradicional con ingredientes frescos y sabores únicos."}</p>
      <a href="${getRecipeUrl(receta)}" class="read-more">Leer más</a>
    </div>
  `

  // Añadir eventos de hover
  card.addEventListener("mouseenter", () => {
    const overlay = card.querySelector(".recipe-overlay")
    if (overlay) overlay.classList.add("active")
  })

  card.addEventListener("mouseleave", () => {
    const overlay = card.querySelector(".recipe-overlay")
    if (overlay) overlay.classList.remove("active")
  })

  // Añadir evento de clic para ir a la página de la receta
  card.addEventListener("click", () => {
    window.location.href = getRecipeUrl(receta)
  })

  return card
}

// Función para inicializar el slider
function initializeSlider() {
  const track = document.querySelector(".recipe-track")
  const prevButton = document.querySelector(".prev-button")
  const nextButton = document.querySelector(".next-button")
  const cards = track.querySelectorAll(".recipe-card")
  const cardCount = cards.length
  let cardsToShow = getCardsToShow() // Función para determinar cuántas tarjetas mostrar según el ancho de la pantalla
  let currentIndex = 0
  let autoSlideInterval
  let isAnimating = false

  // Verificar si los elementos existen
  if (!prevButton || !nextButton || cardCount === 0) {
    console.error("Error: Elementos del slider no encontrados o no hay tarjetas.")
    return
  }

  console.log("Slider inicializado con", cardCount, "tarjetas")

  // Función para actualizar la posición del slider
  function updateSliderPosition() {
    const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)
    if (currentIndex > maxIndex) currentIndex = maxIndex

    // Usar un enfoque basado en display en lugar de transform para mayor estabilidad
    cards.forEach((card, index) => {
      // Determinar si la tarjeta debería ser visible
      const startIndex = currentIndex * cardsToShow
      const endIndex = startIndex + cardsToShow
      const isVisible = index >= startIndex && index < endIndex

      // Aplicar display directamente en lugar de transform
      card.style.display = isVisible ? "block" : "none"
    })

    // Actualizar estado de los botones de navegación
    prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
    prevButton.style.cursor = currentIndex === 0 ? "default" : "pointer"
    nextButton.style.opacity = currentIndex >= Math.max(0, Math.ceil(cardCount / cardsToShow) - 1) ? "0.5" : "1"
    nextButton.style.cursor =
      currentIndex >= Math.max(0, Math.ceil(cardCount / cardsToShow) - 1) ? "default" : "pointer"

    // Permitir nuevos clics después de un tiempo
    setTimeout(() => {
      isAnimating = false
    }, 300)
  }

  // Función para determinar cuántas tarjetas mostrar según el ancho de la pantalla
  function getCardsToShow() {
    const windowWidth = window.innerWidth
    if (windowWidth < 576) return 1 // Móviles pequeños
    if (windowWidth < 768) return 2 // Móviles y tablets pequeñas
    if (windowWidth < 992) return 3 // Tablets y pantallas medianas
    if (windowWidth < 1200) return 4 // Pantallas grandes
    return 5 // Pantallas muy grandes
  }

  // Función para iniciar el autoplay
  function startAutoSlide() {
    // Limpiar cualquier intervalo existente para evitar múltiples intervalos
    clearInterval(autoSlideInterval)

    autoSlideInterval = setInterval(() => {
      // No hacer nada si hay una animación en curso
      if (isAnimating) return

      isAnimating = true
      const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)

      // Avanzar al siguiente grupo o volver al principio
      currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0
      updateSliderPosition()
    }, 25000) // Intervalo de 25 segundos
  }

  // Evento para el botón anterior
  prevButton.addEventListener("click", () => {
    // Evitar clics durante la animación
    if (isAnimating) return
    isAnimating = true

    // Detener el autoplay para evitar conflictos
    clearInterval(autoSlideInterval)

    if (currentIndex > 0) {
      currentIndex--
      updateSliderPosition()
    } else {
      isAnimating = false // Permitir nuevos clics si no hay cambio
    }

    // Reiniciar el autoplay
    startAutoSlide()
  })

  // Evento para el botón siguiente
  nextButton.addEventListener("click", () => {
    // Evitar clics durante la animación
    if (isAnimating) return
    isAnimating = true

    // Detener el autoplay para evitar conflictos
    clearInterval(autoSlideInterval)

    const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)
    if (currentIndex < maxIndex) {
      currentIndex++
      updateSliderPosition()
    } else {
      isAnimating = false // Permitir nuevos clics si no hay cambio
    }

    // Reiniciar el autoplay
    startAutoSlide()
  })

  // Evento para redimensionar la ventana
  window.addEventListener("resize", () => {
    // Actualizar el número de tarjetas a mostrar
    const newCardsToShow = getCardsToShow()
    if (newCardsToShow !== cardsToShow) {
      // Si cambia el número de tarjetas a mostrar, actualizar y reiniciar el slider
      cardsToShow = newCardsToShow
      currentIndex = 0
      updateSliderPosition()
    }
  })

  // Inicializar slider
  updateSliderPosition()
  startAutoSlide()
}

// Función para cargar recetas de ejemplo como fallback
function loadFallbackRecipes() {
  console.log("Cargando recetas de ejemplo como fallback")

  // Datos de ejemplo para recetas
  const recetasEjemplo = [
    {
      id: 1,
      titulo: "Pollo Agridulce",
      descripcion:
        "Delicioso pollo agridulce al estilo chino, con una salsa perfectamente equilibrada entre dulce y ácido, acompañado de piña y pimientos.",
      dificultad: "Media",
      categoria: "China",
      tiempo: "45 min",
    },
    {
      id: 2,
      titulo: "Paella",
      descripcion:
        "Auténtica paella valenciana con arroz, azafrán, pollo, conejo y verduras de temporada. Un plato emblemático de la cocina española.",
      dificultad: "Difícil",
      categoria: "España",
      tiempo: "1h 30min",
    },
    {
      id: 3,
      titulo: "Crepas Dulces",
      descripcion:
        "Delicadas crepas francesas servidas con una variedad de rellenos dulces como Nutella, fresas frescas y plátano.",
      dificultad: "Fácil",
      categoria: "Francia",
      tiempo: "30 min",
    },
    {
      id: 4,
      titulo: "Coq au Vin",
      descripcion:
        "Clásico francés de pollo cocinado lentamente en vino tinto con champiñones, tocino y hierbas aromáticas.",
      dificultad: "Media",
      categoria: "Francia",
      tiempo: "2h",
    },
    {
      id: 5,
      titulo: "Bizcocho Capuccino",
      descripcion:
        "Esponjoso bizcocho con sabor a café, cubierto con una deliciosa crema de mascarpone y espolvoreado con cacao.",
      dificultad: "Media",
      categoria: "Italia",
      tiempo: "1h",
    },
    {
      id: 6,
      titulo: "Pizza Margarita",
      descripcion:
        "La clásica pizza italiana con salsa de tomate, mozzarella fresca, albahaca y un chorrito de aceite de oliva virgen extra.",
      dificultad: "Fácil",
      categoria: "Italia",
      tiempo: "45 min",
    },
    {
      id: 7,
      titulo: "Sushi",
      descripcion:
        "Variedad de rollos de sushi frescos con pescado de temporada, aguacate y pepino, acompañados de wasabi y salsa de soja.",
      dificultad: "Difícil",
      categoria: "Japón",
      tiempo: "1h 30min",
    },
    {
      id: 8,
      titulo: "Arepa Venezolana",
      descripcion: "Tradicionales arepas venezolanas rellenas de carne mechada, aguacate, queso y frijoles negros.",
      dificultad: "Fácil",
      categoria: "Venezuela",
      tiempo: "40 min",
    },
    {
      id: 9,
      titulo: "Tortilla de Patatas",
      descripcion:
        "La clásica tortilla española con patatas, cebolla y huevos. Perfecta para cualquier momento del día.",
      dificultad: "Media",
      categoria: "España",
      tiempo: "45 min",
    },
  ]

  // Limpiar el contenedor
  const recipeTrack = document.querySelector(".recipe-track")
  if (recipeTrack) {
    recipeTrack.innerHTML = ""
  }

  // Crear tarjetas de recetas
  recetasEjemplo.forEach((receta) => {
    const recipeCard = createRecipeCard(receta)
    if (recipeTrack) {
      recipeTrack.appendChild(recipeCard)
    }
  })

  // Inicializar el slider
  initializeSlider()
}

// Función para cargar estilos necesarios
function loadRequiredStyles() {
  // Verificar si ya existen los estilos
  if (!document.querySelector('link[href="styles-recipes.css"]')) {
    const recipesStyle = document.createElement("link")
    recipesStyle.rel = "stylesheet"
    recipesStyle.href = "styles-recipes.css"
    document.head.appendChild(recipesStyle)
  }

  if (!document.querySelector('link[href="styles-responsive.css"]')) {
    const responsiveStyle = document.createElement("link")
    responsiveStyle.rel = "stylesheet"
    responsiveStyle.href = "styles-responsive.css"
    document.head.appendChild(responsiveStyle)
  }
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
        <p><i class="fas fa-spinner fa-spin"></i> Cargando recetas...</p>
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

    // Limpiar el contenedor de recetas
    recipeTrack.innerHTML = ""

    // Añadir las recetas al contenedor
    recetas.forEach((receta) => {
      const recipeCard = createRecipeCard(receta)
      recipeTrack.appendChild(recipeCard)
    })

    // Inicializar el slider
    initializeSlider()

    console.log(`✅ Se han cargado ${recetas.length} recetas aleatorias`)
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
    // Usar datos de ejemplo como fallback
    loadFallbackRecipes()
  }
}

// Cargar estilos necesarios
loadRequiredStyles()

// Cargar recetas aleatorias cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  console.log("Cargando recetas aleatorias...")

  // Asegurarse de que Supabase esté cargado antes de intentar cargar las recetas
  if (window.supabase) {
    loadRandomRecipes()
  } else {
    // Si Supabase no está cargado, esperar un poco y volver a intentar
    console.log("Esperando a que Supabase se cargue...")
    setTimeout(loadRandomRecipes, 1000)
  }
})
