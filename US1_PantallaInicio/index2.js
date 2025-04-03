// 💡 Configurar Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, inicializando buscador...")
  // Inicializar el buscador
  initializeSearchBar()

  // Inicializar el slider (mantenemos la funcionalidad existente)
  initializeSlider()
})

// Función para inicializar el buscador
function initializeSearchBar() {
  const searchInput = document.getElementById("search-input")
  const searchResults = document.getElementById("search-results")
  const searchButton = document.getElementById("search-button")
  const searchCloseButton = document.getElementById("search-close")

  console.log("Elementos del buscador:", { searchInput, searchResults, searchButton, searchCloseButton })

  // Verificar que los elementos existan
  if (!searchInput || !searchResults) {
    console.error("Error: Elementos del buscador no encontrados")
    return
  }

  // Actualizar el placeholder según el idioma actual
  updateSearchPlaceholder()

  // Mostrar resultados cuando se hace clic en el botón de búsqueda
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      console.log("Botón de búsqueda clickeado")
      if (searchInput.value.trim() === "") {
        searchResults.style.display = "none"
        return
      }

      searchResults.style.display = "block"
      searchInput.focus()
      performSearch(searchInput.value)
    })
  }

  // Cerrar resultados cuando se hace clic en el botón de cerrar
  if (searchCloseButton) {
    searchCloseButton.addEventListener("click", () => {
      searchInput.value = ""
      searchResults.style.display = "none"
      searchCloseButton.style.display = "none"
    })
  }

  // Buscar mientras se escribe
  searchInput.addEventListener("input", () => {
    console.log("Input detectado:", searchInput.value)
    if (searchInput.value.trim() === "") {
      searchResults.style.display = "none"
      if (searchCloseButton) searchCloseButton.style.display = "none"
      return
    }

    if (searchCloseButton) searchCloseButton.style.display = "block"
    searchResults.style.display = "block"
    performSearch(searchInput.value)
  })

  // Cerrar resultados cuando se hace clic fuera
  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".search-container") &&
      !event.target.closest("#search-results") &&
      !event.target.closest("#search-button")
    ) {
      searchResults.style.display = "none"
    }
  })

  // Escuchar cambios de idioma
  document.addEventListener("languageChanged", (e) => {
    updateSearchPlaceholder()

    // Si hay una búsqueda activa, actualizar los resultados
    if (searchInput.value.trim() !== "" && searchResults.style.display === "block") {
      performSearch(searchInput.value)
    }
  })

  // Inicialmente ocultar el botón de cerrar
  if (searchCloseButton) {
    searchCloseButton.style.display = "none"
  }
}

// Función para actualizar el placeholder según el idioma
function updateSearchPlaceholder() {
  const searchInput = document.getElementById("search-input")
  if (!searchInput) return

  const language = getCurrentLanguage()
  const placeholder = translate("Buscar recetas...", language)

  if (placeholder) {
    searchInput.placeholder = placeholder
  }
}

// Función para obtener el idioma actual
function getCurrentLanguage() {
  return localStorage.getItem("language") || "es"
}

// Función para traducir texto
function translate(text, language) {
  if (!window.i18n || !window.i18n.translations || !window.i18n.translations[language]) {
    return text
  }
  return window.i18n.translations[language][text] || text
}

// Modificar el mapeo de imágenes para incluir las rutas correctas
function getImagePath(titulo) {
  // Mapeo de títulos a rutas de imágenes
  const imageMap = {
    "Pollo Agridulce": "./Imagenes/China/pollo-agridulce.jpg",
    "Sweet and Sour Chicken": "./Imagenes/China/pollo-agridulce.jpg", // Versión en inglés
    "Pollastre Agredolç": "./Imagenes/China/pollo-agridulce.jpg", // Versión en catalán
    Paella: "./Imagenes/España/paella.png",
    "Crepas Dulces": "./Imagenes/Francia/crepas-dulces.jpg",
    "Sweet Crepes": "./Imagenes/Francia/crepas-dulces.jpg", // Versión en inglés
    "Creps Dolços": "./Imagenes/Francia/crepas-dulces.jpg", // Versión en catalán
    "Bizcocho Capuccino": "./Imagenes/Italia/bizcocho-capuccino.jpg",
    "Cappuccino Cake": "./Imagenes/Italia/bizcocho-capuccino.jpg", // Versión en inglés
    "Pastís de Capuccino": "./Imagenes/Italia/bizcocho-capuccino.jpg", // Versión en catalán
    "Arepa Venezolana": "./Imagenes/Venezuela/arepa-venezolana.jpg",
    "Galletas de Sésamo": "./Imagenes/China/galletas-de-sesamo.jpg",
    "Sesame Cookies": "./Imagenes/China/galletas-de-sesamo.jpg", // Versión en inglés
    "Galetes de Sèsam": "./Imagenes/China/galletas-de-sesamo.jpg", // Versión en catalán
    "Bolitas Chinas": "./Imagenes/China/bolitas-chinas.jpg",
    "Bollitos Chinos": "./Imagenes/China/bollitos-chinos.jpg",
    "Chinese Buns": "./Imagenes/China/bollitos-chinos.jpg", // Versión en inglés
    "Panets Xinesos": "./Imagenes/China/bollitos-chinos.jpg", // Versión en catalán
    "Fideos Salteados": "./Imagenes/China/fideos-salteados.jpg",
    "Stir-Fried Noodles": "./Imagenes/China/fideos-salteados.jpg", // Versión en inglés
    "Fideus Saltats": "./Imagenes/China/fideos-salteados.jpg", // Versión en catalán
    "Tortilla de Patatas": "./Imagenes/España/tortilla-patatas.jpeg",
    "Tacos Mexicanos": "./Imagenes/Mexico/tacos.jpg",
    "Smoothie de Frutas": "./Imagenes/Bebidas/smoothie.jpg",
    "Pasta al Pesto": "./Imagenes/Italia/pasta.jpg",
    "Batido Energético": "./Imagenes/Francia/coq-au-vin.jpg",
    "Sopa Wonton": "./Imagenes/China/fideos-salteados.jpg",
    "Wonton Soup": "./Imagenes/China/fideos-salteados.jpg", // Versión en inglés
    patata: "./Imagenes/España/tortilla-patatas.jpeg",
  }

  // Buscar coincidencia exacta
  if (imageMap[titulo]) {
    return imageMap[titulo]
  }

  // Buscar coincidencia parcial
  for (const key in imageMap) {
    if (titulo.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(titulo.toLowerCase())) {
      return imageMap[key]
    }
  }

  // Imagen por defecto según categoría
  if (titulo.toLowerCase().includes("pollo")) {
    return "./Imagenes/China/pollo-agridulce.jpg"
  } else if (titulo.toLowerCase().includes("pasta") || titulo.toLowerCase().includes("pizza")) {
    return "./Imagenes/Italia/pizza-margarita.jpg"
  } else if (titulo.toLowerCase().includes("sushi") || titulo.toLowerCase().includes("ramen")) {
    return "./Imagenes/Japon/sushi.jpeg"
  }

  // Imagen por defecto si no hay coincidencia
  return "./Imagenes/default-recipe.jpg"
}

// Función para obtener la URL de la página según el título de la receta
function getRecipeUrl(receta) {
  // Convertir el título a un formato de URL amigable
  const slug = receta.titulo
    .toLowerCase()
    .replace(/\s+/g, "-") // Reemplazar espacios con guiones
    .replace(/[^\w-]+/g, "") // Eliminar caracteres especiales
    .replace(/--+/g, "-") // Reemplazar múltiples guiones con uno solo
    .replace(/^-+/, "") // Eliminar guiones al inicio
    .replace(/-+$/, "") // Eliminar guiones al final

  // Mapeo de títulos específicos a URLs específicas
  const urlMap = {
    "pollo-agridulce": "./../US6_GuardarRecetas/pollo-agridulce.html",
    "sweet-and-sour-chicken": "./../US6_GuardarRecetas/pollo-agridulce.html", // Versión en inglés
    "pollastre-agredolc": "./../US6_GuardarRecetas/pollo-agridulce.html", // Versión en catalán
    paella: "./../US6_GuardarRecetas/paella.html",
    "crepas-dulces": "./../US6_GuardarRecetas/crepas-dulces.html",
    "sweet-crepes": "./../US6_GuardarRecetas/crepas-dulces.html", // Versión en inglés
    "creps-dolcos": "./../US6_GuardarRecetas/crepas-dulces.html", // Versión en catalán
    "bizcocho-capuccino": "./../US6_GuardarRecetas/bizcocho-capuccino.html",
    "cappuccino-cake": "./../US6_GuardarRecetas/bizcocho-capuccino.html", // Versión en inglés
    "pastis-de-capuccino": "./../US6_GuardarRecetas/bizcocho-capuccino.html", // Versión en catalán
    "arepa-venezolana": "./../US6_GuardarRecetas/arepa-venezolana.html",
    "galletas-de-sesamo": "./../US6_GuardarRecetas/galletas-de-sesamo.html",
    "sesame-cookies": "./../US6_GuardarRecetas/galletas-de-sesamo.html", // Versión en inglés
    "galetes-de-sesam": "./../US6_GuardarRecetas/galletas-de-sesamo.html", // Versión en catalán
    "tortilla-de-patatas": "./../US6_GuardarRecetas/tortilla-de-patatas.html",
    patata: "./../US6_GuardarRecetas/tortilla-de-patatas.html",
  }

  // Si existe una URL específica para este slug, usarla
  if (urlMap[slug]) {
    return urlMap[slug]
  }

  // URL genérica basada en el ID de la receta
  return `./../US6_GuardarRecetas/receta.html?id=${receta.id}`
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

  let dotsHTML = '<div class="difficulty-indicator">'

  for (let i = 1; i <= 3; i++) {
    if (i <= nivel) {
      dotsHTML += '<span class="difficulty-dot active"></span>'
    } else {
      dotsHTML += '<span class="difficulty-dot"></span>'
    }
  }

  dotsHTML += "</div>"
  return dotsHTML
}

// Función para realizar la búsqueda en Supabase
async function performSearch(query) {
  console.log("Iniciando búsqueda con query:", query)
  const searchResults = document.getElementById("search-results")
  if (!searchResults) {
    console.error("Elemento de resultados de búsqueda no encontrado")
    return
  }

  searchResults.innerHTML = "" // Limpiar resultados anteriores

  if (!query || query.trim() === "") {
    return
  }

  const language = getCurrentLanguage()
  console.log("Realizando búsqueda con query:", query, "idioma:", language)

  try {
    // CORRECCIÓN PRINCIPAL: Simplificar la consulta y usar correctamente el operador ilike
    console.log("Ejecutando consulta a Supabase...")
    const { data: recetas, error } = await supabase
      .from("recetas")
      .select("*")
      .or(`titulo.ilike.%${query}%,categoria.ilike.%${query}%,ingredientes.ilike.%${query}%`)

    if (error) {
      console.error("Error de búsqueda:", error.message)
      searchResults.innerHTML = `
        <div class="error-message">
          <p>Error al buscar recetas: ${error.message}</p>
        </div>
      `
      return
    }

    console.log("Resultados de búsqueda:", recetas)

    // Filtrar resultados duplicados basados en el ID
    const recetasUnicas = recetas
      ? recetas.filter((receta, index, self) => index === self.findIndex((r) => r.id === receta.id))
      : []

    // Mostrar resultados
    if (recetasUnicas && recetasUnicas.length > 0) {
      // Añadir un encabezado a los resultados
      const resultsHeader = document.createElement("div")
      resultsHeader.classList.add("search-results-header")
      resultsHeader.textContent = `${translate("Resultados para", language)} "${query}"`
      searchResults.appendChild(resultsHeader)

      recetasUnicas.forEach((receta) => {
        const resultItem = document.createElement("div")
        resultItem.classList.add("result-item")

        // Obtener imagen específica para esta receta
        const imageSrc = getImagePath(receta.titulo)

        // Traducir categoría y dificultad
        const categoriaTraducida = translate(receta.categoria, language) || receta.categoria
        const dificultadTraducida = translate(receta.dificultad, language) || receta.dificultad

        // Obtener indicador visual de dificultad
        const difficultyDots = getDifficultyDots(receta.dificultad)

        resultItem.innerHTML = `
          <img src="${imageSrc}" alt="${receta.titulo}" class="result-image">
          <div class="result-info">
            <div class="result-title">${receta.titulo}</div>
            <div class="result-category">${categoriaTraducida || "Categoría no especificada"}</div>
            <div class="result-difficulty">${translate("Dificultad:", language)} ${difficultyDots}</div>
          </div>
        `

        // Obtener URL específica para esta receta
        const recipeUrl = getRecipeUrl(receta)

        // Añadir evento de clic para navegar a la receta específica
        resultItem.addEventListener("click", () => {
          window.location.href = recipeUrl
        })

        searchResults.appendChild(resultItem)
      })

      // Añadir botón "Ver Todo"
      const verTodoButton = document.createElement("div")
      verTodoButton.classList.add("ver-todo-button")
      verTodoButton.textContent = translate("Ver todas las recetas", language)
      verTodoButton.addEventListener("click", () => {
        window.location.href = `./busqueda.html?q=${query}`
      })
      searchResults.appendChild(verTodoButton)
    } else {
      // No hay resultados
      const noResults = document.createElement("div")
      noResults.classList.add("no-results")
      noResults.innerHTML = `
        <i class="fas fa-search" style="font-size: 24px; margin-bottom: 10px; color: #d4c3b5;"></i>
        <p>${translate("No se encontraron resultados", language)} "${query}"</p>
        <p style="font-size: 13px; margin-top: 5px;">${translate("Intenta con otra búsqueda", language)}</p>
      `
      searchResults.appendChild(noResults)
    }
  } catch (error) {
    console.error("Error en la búsqueda:", error)
    searchResults.innerHTML = `
      <div class="error-message">
        <p>Error inesperado: ${error.message}</p>
      </div>
    `
  }
}

// Función para inicializar el slider (mantenemos la funcionalidad existente)
function initializeSlider() {
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

  // Crear los dots si existe el contenedor
  if (dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.classList.add("dot")
      if (index === 0) dot.classList.add("active")
      dot.addEventListener("click", () => goToSlide(index))
      dotsContainer.appendChild(dot)
    })
  }

  function updateDots() {
    const dots = document.querySelectorAll(".dot")
    if (dots.length > 0) {
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide)
      })
    }
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

  // Iniciar el autoplay si existe el slider
  if (slider) {
    let autoplayInterval = setInterval(() => moveSlide(1), 5000)

    // Opcional: Pausar el autoplay cuando el usuario interactúa
    slider.addEventListener("mouseenter", () => {
      clearInterval(autoplayInterval)
    })

    slider.addEventListener("mouseleave", () => {
      autoplayInterval = setInterval(() => moveSlide(1), 5000)
    })
  }
}

