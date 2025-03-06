// 💡 Configurar Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

document.addEventListener("DOMContentLoaded", () => {
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

  // Mostrar resultados cuando se hace clic en el botón de búsqueda
  searchButton.addEventListener("click", () => {
    if (searchResults.style.display === "block") {
      searchResults.style.display = "none"
    } else {
      searchResults.style.display = "block"
      searchInput.focus()
      performSearch(searchInput.value)
    }
  })

  // Cerrar resultados cuando se hace clic en el botón de cerrar
  if (searchCloseButton) {
    searchCloseButton.addEventListener("click", () => {
      searchResults.style.display = "none"
    })
  }

  // Buscar mientras se escribe
  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
      searchResults.style.display = "none"
      return
    }

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
}

// Función para realizar la búsqueda en Supabase
async function performSearch(query) {
  const searchResults = document.getElementById("search-results")
  searchResults.innerHTML = "" // Limpiar resultados anteriores

  if (!query || query.trim() === "") {
    return
  }

  try {
    // Buscar en la tabla recetas
    const { data: recetas, error } = await supabase
      .from("recetas")
      .select("id, titulo, categoria, dificultad")
      .ilike("titulo", `%${query.toLowerCase()}%`)
      .limit(10)

    if (error) {
      console.error("Error de búsqueda:", error.message)
      return
    }

    // Mostrar resultados
    if (recetas && recetas.length > 0) {
      recetas.forEach((receta) => {
        const resultItem = document.createElement("div")
        resultItem.classList.add("result-item")

        // Crear imagen de miniatura (usamos placeholder si no hay imagen)
        const imageSrc = receta.imagen || `/placeholder.svg?height=50&width=50`

        resultItem.innerHTML = `
                    <img src="${imageSrc}" alt="${receta.titulo}" class="result-image">
                    <div class="result-info">
                        <span class="result-title">${receta.titulo}</span>
                        <span class="result-category">${receta.categoria}</span>
                    </div>
                `

        // Añadir evento de clic para navegar a la receta
        resultItem.addEventListener("click", () => {
          window.location.href = `./receta.html?id=${receta.id}`
        })

        searchResults.appendChild(resultItem)
      })

      // Añadir botón "Ver Todo"
      const verTodoButton = document.createElement("div")
      verTodoButton.classList.add("ver-todo-button")
      verTodoButton.innerHTML = "Ver Todo"
      verTodoButton.addEventListener("click", () => {
        window.location.href = `./busqueda.html?q=${query}`
      })
      searchResults.appendChild(verTodoButton)
    } else {
      // No hay resultados
      const noResults = document.createElement("div")
      noResults.classList.add("no-results")
      noResults.textContent = "No se encontraron resultados"
      searchResults.appendChild(noResults)
    }
  } catch (error) {
    console.error("Error:", error)
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

