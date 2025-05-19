document.addEventListener("DOMContentLoaded", () => {
    // Configuración de la barra de navegación
    setupNavigation()
  
    // Configuración del footer
    setupFooter()
  
    // Configuración del selector de idioma
    setupLanguageSelector()
  })
  
  // Configurar la navegación
  function setupNavigation() {
    // Usuario y login
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const userInfo = document.getElementById("user-info")
    const authButton = document.getElementById("auth-button")
    const logoutBtn = document.getElementById("logout-btn")
    const userProfileLink = document.getElementById("user-profile-link")
  
    if (usuario) {
      // Usuario logueado
      userInfo.style.display = "flex"
      document.getElementById("user-name").textContent = usuario.username || "Usuario"
      authButton.style.display = "none"
      logoutBtn.style.display = "inline-block"
  
      // Determinar tipo de usuario y enlace correcto
      if (usuario.username === "admin") {
        userProfileLink.href = "./../US10_PaginaAdmin/PaginaAdmin.html"
      } else {
        userProfileLink.href = "../US7_PaginaDeUsuario/usuario.html"
      }
  
      // Funcionalidad de cierre de sesión
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.removeItem("usuario")
        window.location.reload()
      })
    } else {
      // Usuario no logueado
      userInfo.style.display = "none"
      authButton.style.display = "inline-block"
      logoutBtn.style.display = "none"
    }
  
    // Menú desplegable
    const menuToggle = document.getElementById("menuToggle")
    const overlayMenu = document.getElementById("overlayMenu")
    const closeMenu = document.getElementById("closeMenu")
  
    if (menuToggle && overlayMenu) {
      menuToggle.addEventListener("click", (e) => {
        e.preventDefault()
        overlayMenu.classList.toggle("active")
      })
  
      if (closeMenu) {
        closeMenu.addEventListener("click", () => {
          overlayMenu.classList.remove("active")
        })
      }
  
      // Cerrar al hacer clic fuera del menú
      overlayMenu.addEventListener("click", function (e) {
        if (e.target === this) {
          this.classList.remove("active")
        }
      })
    }
  
    // Búsqueda
    const searchInput = document.getElementById("search-input")
    const searchButton = document.getElementById("search-button")
    const searchClose = document.getElementById("search-close")
    const searchResults = document.getElementById("search-results")
  
    if (searchButton && searchInput) {
      searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim()
        if (query) {
          // Mostrar resultados y botón de cerrar
          searchResults.style.display = "block"
          searchClose.style.display = "block"
  
          // Aquí iría la lógica de búsqueda real
          // Por ahora, mostraremos resultados de ejemplo
          showExampleSearchResults(query)
        }
      })
  
      // También buscar al presionar Enter
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          searchButton.click()
        }
      })
    }
  
    if (searchClose) {
      searchClose.addEventListener("click", () => {
        searchResults.style.display = "none"
        searchClose.style.display = "none"
        searchInput.value = ""
      })
    }
  }
  
  // Mostrar resultados de búsqueda de ejemplo
  function showExampleSearchResults(query) {
    const searchResults = document.getElementById("search-results")
  
    // Limpiar resultados anteriores
    searchResults.innerHTML = ""
  
    // Ejemplos de resultados
    const exampleResults = [
      {
        name: "Pollo Agridulce",
        image: "./Imagenes/China/pollo-agridulce.jpg",
        difficulty: "Media",
        type: "Lunch",
      },
      {
        name: "Paella",
        image: "./Imagenes/España/paella.jpg",
        difficulty: "Media",
        type: "Lunch",
      },
      {
        name: "Arepa Venezolana",
        image: "./Imagenes/Venezuela/arepa-venezolana.jpg",
        difficulty: "Fácil",
        type: "Breakfast",
      },
      {
        name: "Galletas de Sésamo",
        image: "./Imagenes/China/galletas-sesamo.jpg",
        difficulty: "Fácil",
        type: "Snack",
      },
    ]
  
    // Filtrar resultados que coincidan con la búsqueda
    const filteredResults = exampleResults.filter((result) => result.name.toLowerCase().includes(query.toLowerCase()))
  
    // Crear elementos HTML para cada resultado
    if (filteredResults.length > 0) {
      filteredResults.forEach((result) => {
        const resultItem = document.createElement("div")
        resultItem.className = "search-result-item"
  
        resultItem.innerHTML = `
          <img src="${result.image}" alt="${result.name}">
          <div class="search-result-info">
            <h4>${result.name}</h4>
            <div class="meta">
              <span>${result.type}</span>
              <span>Difficulty: ${result.difficulty}</span>
            </div>
          </div>
        `
  
        // Hacer que los resultados sean clickeables
        resultItem.addEventListener("click", () => {
          // Aquí iría la redirección a la página de la receta
          console.log(`Clicked on ${result.name}`)
        })
  
        searchResults.appendChild(resultItem)
      })
    } else {
      // Mostrar mensaje si no hay resultados
      searchResults.innerHTML = `
        <div class="search-result-item">
          <p>No se encontraron resultados para "${query}"</p>
        </div>
      `
    }
  }
  
  // Configurar el footer
  function setupFooter() {
    // No necesitamos hacer nada especial aquí por ahora
    // El footer es estático y sus enlaces funcionan directamente
  }
  
  // Configurar el selector de idioma
  function setupLanguageSelector() {
    const languageSelector = document.getElementById("language")
    if (languageSelector) {
      // Establecer el idioma actual basado en localStorage o default
      const currentLanguage = localStorage.getItem("language") || "es"
      languageSelector.value = currentLanguage
  
      // Cambiar idioma cuando se selecciona una opción
      languageSelector.addEventListener("change", function () {
        const selectedLanguage = this.value
        localStorage.setItem("language", selectedLanguage)
  
        // Llamar a la función de cambio de idioma si existe
        if (typeof window.changeLanguage === "function") {
          window.changeLanguage(selectedLanguage)
        } else {
          console.log("Cambiando idioma a:", selectedLanguage)
          // Recargar la página para aplicar el cambio de idioma
          // window.location.reload();
        }
      })
    }
  }
  