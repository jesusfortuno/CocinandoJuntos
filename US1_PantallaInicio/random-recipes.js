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
  // Mapeo de títulos a rutas de imágenes
  const imageMap = {
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
    Paella: "./Imagenes/España/paella.png",
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
    Cannoli: "./Imagenes/Italia/cannoli.jpg",
    Lasaña: "./Imagenes/Italia/lasaña.jpg",
    "Pizza Margarita": "./Imagenes/Italia/pizza-margarita.jpg",
    Sushi: "./Imagenes/Japon/sushi.jpeg",
  }

  // Buscar coincidencia exacta
  if (imageMap[titulo]) {
    return imageMap[titulo]
  }

  // Imagen por defecto según categoría
  if (categoria) {
    const categoriaLower = categoria.toLowerCase()
    if (categoriaLower.includes("china")) {
      return "./Imagenes/China/pollo-agridulce.jpg"
    } else if (
      categoriaLower.includes("españa") ||
      categoriaLower.includes("spain") ||
      categoriaLower.includes("espanya")
    ) {
      return "./Imagenes/España/paella.png"
    } else if (
      categoriaLower.includes("francia") ||
      categoriaLower.includes("france") ||
      categoriaLower.includes("frança")
    ) {
      return "./Imagenes/Francia/crepas-dulces.jpg"
    } else if (
      categoriaLower.includes("italia") ||
      categoriaLower.includes("italy") ||
      categoriaLower.includes("itàlia")
    ) {
      return "./Imagenes/Italia/pizza-margarita.jpg"
    } else if (categoriaLower.includes("venezuela") || categoriaLower.includes("veneçuela")) {
      return "./Imagenes/Venezuela/arepa-venezolana.jpg"
    } else if (
      categoriaLower.includes("japón") ||
      categoriaLower.includes("japan") ||
      categoriaLower.includes("japó")
    ) {
      return "./Imagenes/Japon/sushi.jpeg"
    }
  }

  // Imagen por defecto
  return "./Imagenes/placeholder-recipe.jpg"
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

  return `
    <div class="difficulty-dots">
      <span class="dot ${nivel >= 1 ? "dot-filled" : "dot-empty"}"></span>
      <span class="dot ${nivel >= 2 ? "dot-filled" : "dot-empty"}"></span>
      <span class="dot ${nivel >= 3 ? "dot-filled" : "dot-empty"}"></span>
    </div>
  `
}

// Función para crear una tarjeta de receta
function createRecipeCard(receta) {
  const card = document.createElement("div")
  card.className = "recipe-card"
  card.setAttribute("data-recipe-id", receta.id)
  card.setAttribute("data-culture", receta.categoria || "Internacional")
  card.setAttribute("data-time", receta.tiempo || "30")
  card.setAttribute("data-difficulty", receta.dificultad || "Media")

  // Obtener imagen para la receta
  const imageSrc = receta.imagen_url || getImagePath(receta.titulo, receta.categoria)

  // Descripción para el overlay
  const descripcion = receta.descripcion || "Deliciosa receta tradicional con ingredientes frescos y sabores únicos."

  // Crear el contenido de la tarjeta
  card.innerHTML = `
    <div class="recipe-image">
      <img src="${imageSrc}" alt="${receta.titulo}" loading="lazy">
    </div>
    <div class="recipe-content">
      <h3>${receta.titulo}</h3>
      <div class="recipe-meta">
        <div class="meta-row">
          <span class="category">${receta.categoria || "Comida"}</span>
          <span class="time">${receta.tiempo || "30"} min</span>
        </div>
        <div class="meta-row">
          <span class="difficulty">Dificultad: ${getDifficultyDots(receta.dificultad || "Media")}</span>
        </div>
      </div>
    </div>
    <div class="recipe-overlay">
      <div class="overlay-content">
        <h3 class="title">${receta.titulo}</h3>
        <p>${descripcion}</p>
        <button class="read-more">Leer más</button>
      </div>
    </div>
  `

  // Añadir evento de clic para ir a la página de la receta
  card.querySelector(".read-more").addEventListener("click", (e) => {
    e.stopPropagation() // Evitar que el clic se propague a la tarjeta
    window.location.href = `/US6_GuardarRecetas/receta.html?id=${receta.id}`
  })

  card.addEventListener("click", () => {
    window.location.href = `/US6_GuardarRecetas/receta.html?id=${receta.id}`
  })

  return card
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

  console.log(`Slider inicializado con ${cardCount} tarjetas`)

  // Variables para controlar el estado del slider
  let currentPage = 0
  let cardsPerPage = getCardsPerPage()
  let totalPages = Math.ceil(cardCount / cardsPerPage)

  // Función para determinar cuántas tarjetas mostrar por página según el ancho de la ventana
  function getCardsPerPage() {
    const windowWidth = window.innerWidth
    if (windowWidth >= 1400) return 5 // Mostrar 5 tarjetas en pantallas muy grandes
    if (windowWidth >= 1100) return 4 // Mostrar 4 tarjetas en pantallas grandes
    if (windowWidth >= 768) return 3 // Mostrar 3 tarjetas en pantallas medianas
    if (windowWidth >= 576) return 2 // Mostrar 2 tarjetas en pantallas pequeñas
    return 1 // Mostrar 1 tarjeta en pantallas muy pequeñas
  }

  // Función para actualizar la visualización del slider
  function updateSlider() {
    // Recalcular el número total de páginas
    totalPages = Math.ceil(cardCount / cardsPerPage)

    // Asegurarse de que la página actual sea válida
    if (currentPage >= totalPages) {
      currentPage = Math.max(0, totalPages - 1)
    }

    // Calcular qué tarjetas deben mostrarse en la página actual
    const startIdx = currentPage * cardsPerPage
    const endIdx = Math.min(startIdx + cardsPerPage, cardCount)

    // Mostrar/ocultar tarjetas según la página actual
    cards.forEach((card, index) => {
      if (index >= startIdx && index < endIdx) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })

    // Actualizar estado de los botones de navegación
    prevButton.style.opacity = currentPage === 0 ? "0.5" : "1"
    prevButton.style.cursor = currentPage === 0 ? "default" : "pointer"
    nextButton.style.opacity = currentPage >= totalPages - 1 ? "0.5" : "1"
    nextButton.style.cursor = currentPage >= totalPages - 1 ? "default" : "pointer"
  }

  // Evento para el botón anterior
  prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--
      updateSlider()
    }
  })

  // Evento para el botón siguiente
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
      currentPage++
      updateSlider()
    }
  })

  // Actualizar cuando cambie el tamaño de la ventana
  window.addEventListener("resize", () => {
    const newCardsPerPage = getCardsPerPage()
    if (newCardsPerPage !== cardsPerPage) {
      cardsPerPage = newCardsPerPage
      updateSlider()
    }
  })

  // Inicializar el slider
  updateSlider()
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
      tiempo: "45",
    },
    {
      id: 2,
      titulo: "Paella",
      descripcion:
        "Auténtica paella valenciana con arroz, azafrán, pollo, conejo y verduras de temporada. Un plato emblemático de la cocina española.",
      dificultad: "Difícil",
      categoria: "España",
      tiempo: "90",
    },
    {
      id: 3,
      titulo: "Crepas Dulces",
      descripcion:
        "Delicadas crepas francesas servidas con una variedad de rellenos dulces como Nutella, fresas frescas y plátano.",
      dificultad: "Fácil",
      categoria: "Francia",
      tiempo: "30",
    },
    {
      id: 4,
      titulo: "Coq au Vin",
      descripcion:
        "Clásico francés de pollo cocinado lentamente en vino tinto con champiñones, tocino y hierbas aromáticas.",
      dificultad: "Media",
      categoria: "Francia",
      tiempo: "120",
    },
    {
      id: 5,
      titulo: "Bizcocho Capuccino",
      descripcion:
        "Esponjoso bizcocho con sabor a café, cubierto con una deliciosa crema de mascarpone y espolvoreado con cacao.",
      dificultad: "Media",
      categoria: "Italia",
      tiempo: "60",
    },
    {
      id: 6,
      titulo: "Pizza Margarita",
      descripcion:
        "La clásica pizza italiana con salsa de tomate, mozzarella fresca, albahaca y un chorrito de aceite de oliva virgen extra.",
      dificultad: "Fácil",
      categoria: "Italia",
      tiempo: "45",
    },
    {
      id: 7,
      titulo: "Sushi",
      descripcion:
        "Variedad de rollos de sushi frescos con pescado de temporada, aguacate y pepino, acompañados de wasabi y salsa de soja.",
      dificultad: "Difícil",
      categoria: "Japón",
      tiempo: "90",
    },
    {
      id: 8,
      titulo: "Arepa Venezolana",
      descripcion: "Tradicionales arepas venezolanas rellenas de carne mechada, aguacate, queso y frijoles negros.",
      dificultad: "Fácil",
      categoria: "Venezuela",
      tiempo: "40",
    },
    {
      id: 9,
      titulo: "Tortilla de Patatas",
      descripcion:
        "La clásica tortilla española con patatas, cebolla y huevos. Perfecta para cualquier momento del día.",
      dificultad: "Media",
      categoria: "España",
      tiempo: "45",
    },
    {
      id: 10,
      titulo: "Cannoli",
      descripcion:
        "Deliciosos tubos de masa frita rellenos de una cremosa mezcla de ricotta, azúcar y trozos de chocolate. Un postre italiano clásico.",
      dificultad: "Media",
      categoria: "Italia",
      tiempo: "60",
    },
    {
      id: 11,
      titulo: "Lasaña",
      descripcion:
        "Capas de pasta intercaladas con salsa boloñesa, bechamel y queso, horneadas hasta conseguir una textura perfecta.",
      dificultad: "Media",
      categoria: "Italia",
      tiempo: "105",
    },
    {
      id: 12,
      titulo: "Churros con Chocolate",
      descripcion:
        "Deliciosos churros crujientes por fuera y tiernos por dentro, acompañados de una taza de chocolate caliente espeso.",
      dificultad: "Media",
      categoria: "España",
      tiempo: "35",
    },
    {
      id: 13,
      titulo: "Fideos Salteados",
      descripcion:
        "Fideos salteados al wok con verduras crujientes, brotes de soja, salsa de soja y un toque de jengibre fresco.",
      dificultad: "Media",
      categoria: "China",
      tiempo: "40",
    },
    {
      id: 14,
      titulo: "Pan con Tomate",
      descripcion:
        "Tradicional pan con tomate español, frotado con ajo y tomate maduro, rociado con aceite de oliva y sal. Simple pero delicioso.",
      dificultad: "Fácil",
      categoria: "España",
      tiempo: "15",
    },
    {
      id: 15,
      titulo: "Tostada Francesa",
      descripcion:
        "Pan empapado en una mezcla de huevo, leche y canela, dorado a la perfección y servido con sirope de arce y frutas frescas.",
      dificultad: "Fácil",
      categoria: "Francia",
      tiempo: "20",
    },
  ]

  // Mezclar las recetas aleatoriamente
  const recetasAleatorias = shuffleArray(recetasEjemplo)

  // Limpiar el contenedor
  const recipeTrack = document.querySelector(".recipe-track")
  if (recipeTrack) {
    recipeTrack.innerHTML = ""
  }

  // Crear tarjetas de recetas
  recetasAleatorias.forEach((receta) => {
    const recipeCard = createRecipeCard(receta)
    if (recipeTrack) {
      recipeTrack.appendChild(recipeCard)
    }
  })

  // Inicializar el slider
  initializeRecipeSlider()
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

    // Mezclar las recetas aleatoriamente
    const recetasAleatorias = shuffleArray(recetas)

    // Limpiar el contenedor de recetas
    recipeTrack.innerHTML = ""

    // Añadir las recetas al contenedor
    recetasAleatorias.forEach((receta) => {
      const recipeCard = createRecipeCard(receta)
      recipeTrack.appendChild(recipeCard)
    })

    // Inicializar el slider
    initializeRecipeSlider()

    console.log(`✅ Se han cargado ${recetasAleatorias.length} recetas aleatorias`)
  } catch (error) {
    console.error("Error al cargar las recetas:", error)

    // Mostrar mensaje de error
    const recipeTrack = document.querySelector(".recipe-track")
    if (recipeTrack) {
      recipeTrack.innerHTML = `
        <div class="error-message">
          <p><i class="fas fa-exclamation-circle"></i> Error al cargar las recetas. Cargando recetas de ejemplo...</p>
        </div>
      `
    }

    // Usar datos de ejemplo como fallback después de un breve retraso
    setTimeout(loadFallbackRecipes, 1000)
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
    setTimeout(() => {
      if (window.supabase) {
        loadRandomRecipes()
      } else {
        console.warn("Supabase no se cargó correctamente. Usando recetas de ejemplo.")
        loadFallbackRecipes()
      }
    }, 1500)
  }
})
