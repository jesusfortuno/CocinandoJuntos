// Script para manejar el cambio de idioma en la interfaz

document.addEventListener("DOMContentLoaded", () => {
  // Referencia al selector de idioma
  const languageSelector = document.getElementById("language")

  // Verificar si el selector existe
  if (!languageSelector) {
    console.error("No se encontró el selector de idioma")
    return
  }

  // Cargar el idioma guardado si existe
  const savedLanguage = localStorage.getItem("language")
  if (savedLanguage) {
    languageSelector.value = savedLanguage

    // Aplicar traducciones inmediatamente si el sistema i18n está disponible
    if (window.i18n && typeof window.i18n.translatePage === "function") {
      window.i18n.translatePage(savedLanguage)
    }
  }

  // Evento para cambiar el idioma cuando se selecciona una opción
  languageSelector.addEventListener("change", function () {
    const selectedLanguage = this.value

    // Guardar la preferencia de idioma
    localStorage.setItem("language", selectedLanguage)

    // Cambiar el idioma de la página
    if (window.i18n && typeof window.i18n.changeLanguage === "function") {
      window.i18n.changeLanguage(selectedLanguage)
    } else {
      console.error("El sistema de internacionalización no está inicializado correctamente")
      // Intentar recargar la página como fallback
      window.location.reload()
    }
  })

  // Actualizar elementos dinámicos cuando cambia el idioma
  document.addEventListener("languageChanged", (e) => {
    updateDynamicElements(e.detail.language)
  })

  // Función para actualizar elementos que se generan dinámicamente
  function updateDynamicElements(language) {
    // Actualizar elementos que podrían haberse generado después de la carga inicial

    // Actualizar el placeholder del buscador
    const searchInput = document.getElementById("search-input")
    if (searchInput && window.i18n.translations[language]["Buscar recetas..."]) {
      searchInput.placeholder = window.i18n.translations[language]["Buscar recetas..."]
    }

    // Actualizar los resultados de búsqueda si están visibles
    const searchResults = document.getElementById("search-results")
    if (searchResults && searchResults.style.display !== "none") {
      // Si hay un término de búsqueda activo, volver a ejecutar la búsqueda
      const searchInput = document.getElementById("search-input")
      if (searchInput && searchInput.value.trim()) {
        // Disparar un evento de búsqueda para actualizar los resultados
        const event = new Event("input")
        searchInput.dispatchEvent(event)
      }
    }

    // Actualizar elementos generados dinámicamente en el slider
    const recipeCards = document.querySelectorAll(".recipe-card")
    recipeCards.forEach((card) => {
      // Buscar elementos dentro de las tarjetas que necesiten traducción
      const elementsToTranslate = card.querySelectorAll("[data-i18n]")
      elementsToTranslate.forEach((element) => {
        const key = element.getAttribute("data-i18n")
        if (window.i18n.translations[language][key]) {
          element.textContent = window.i18n.translations[language][key]
        }
      })
    })

    // Actualizar el copyright en el footer
    const copyright = document.querySelector(".copyright")
    if (copyright) {
      const year = new Date().getFullYear()
      if (window.i18n.translations[language]["© 2025 Cocinando Juntos - Todos los derechos reservados"]) {
        copyright.textContent =
          window.i18n.translations[language]["© 2025 Cocinando Juntos - Todos los derechos reservados"]
      }
    }

    // Forzar la actualización de los overlays de recetas
    document.querySelectorAll(".recipe-overlay").forEach((overlay) => {
      const title = overlay.querySelector(".title")
      const description = overlay.querySelector("p")
      const readMore = overlay.querySelector(".read-more")

      if (title && title.hasAttribute("data-i18n")) {
        const key = title.getAttribute("data-i18n")
        if (window.i18n.translations[language][key]) {
          title.textContent = window.i18n.translations[language][key]
        }
      }

      if (description && description.hasAttribute("data-i18n")) {
        const key = description.getAttribute("data-i18n")
        if (window.i18n.translations[language][key]) {
          description.textContent = window.i18n.translations[language][key]
        }
      }

      if (readMore && readMore.hasAttribute("data-i18n")) {
        const key = readMore.getAttribute("data-i18n")
        if (window.i18n.translations[language][key]) {
          readMore.textContent = window.i18n.translations[language][key]
        }
      }
    })
  }
})

