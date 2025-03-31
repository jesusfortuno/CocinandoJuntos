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
  }

  // Evento para cambiar el idioma cuando se selecciona una opción
  languageSelector.addEventListener("change", function () {
    const selectedLanguage = this.value
    localStorage.setItem("language", selectedLanguage)

    // Solo traducir elementos que tengan el atributo data-i18n
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      // Ignorar enlaces del footer y elementos de navegación
      if (!element.closest(".footer-links, .social-icons, nav")) {
        const key = element.getAttribute("data-i18n")
        if (window.i18n.translations[selectedLanguage][key]) {
          if (element.placeholder !== undefined) {
            element.placeholder = window.i18n.translations[selectedLanguage][key]
          } else {
            element.textContent = window.i18n.translations[selectedLanguage][key]
          }
        }
      }
    })

    // Disparar un evento personalizado para notificar que el idioma ha cambiado
    document.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: { language: selectedLanguage },
      }),
    )
  })

  // Actualizar elementos dinámicos cuando cambia el idioma
  document.addEventListener("languageChanged", (e) => {
    updateDynamicElements(e.detail.language)

    // Añadir esta línea para actualizar las traducciones de las recetas
    if (typeof window.updateRecipeTranslations === "function") {
      window.updateRecipeTranslations(e.detail.language)
    }
  })

  // Función para actualizar elementos que se generan dinámicamente
  function updateDynamicElements(language) {
    // Actualizar elementos que podrían haberse generado después de la carga inicial
    // Por ejemplo, resultados de búsqueda, modales, etc.

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

    // Actualizar específicamente las recetas en el slider
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

      // Traducir también los elementos que no tienen data-i18n pero que podrían necesitar traducción
      // como los botones "Leer más" o textos específicos
      const readMoreLinks = card.querySelectorAll(".read-more")
      readMoreLinks.forEach((link) => {
        const readMoreKey = "Leer más"
        if (window.i18n.translations[language][readMoreKey]) {
          link.textContent = window.i18n.translations[language][readMoreKey]
        }
      })
    })

    // Actualizar el copyright en el footer
    const copyright = document.querySelector(".copyright")
    if (copyright) {
      const year = new Date().getFullYear()
      const text =
        window.i18n.translations[language]["Todos los derechos reservados"] || "Todos los derechos reservados"
      copyright.textContent = `© ${year} Cocinando Juntos - ${text}`
    }

    // Asegurar que las imágenes de las culturas se muestren correctamente
    document.querySelectorAll(".culture-card img").forEach((img) => {
      // Forzar la recarga de la imagen
      if (img.complete) {
        const src = img.getAttribute("src")
        if (src) {
          const newSrc = src.split("?")[0] + "?t=" + new Date().getTime()
          img.setAttribute("src", newSrc)
        }
      }
    })

    // Actualizar los enlaces del footer
    document.querySelectorAll(".footer-links a, .footer-links h3").forEach((element) => {
      const key = element.getAttribute("data-i18n")
      if (key && window.i18n.translations[language][key]) {
        element.textContent = window.i18n.translations[language][key]
      }
    })

    // Actualizar elementos de la sección hero
    document.querySelectorAll(".video-overlay [data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n")
      if (key && window.i18n.translations[language][key]) {
        element.textContent = window.i18n.translations[language][key]
      }
    })

    // Actualizar las notificaciones
    const notificationElements = document.querySelectorAll(".notification-panel [data-i18n]")
    notificationElements.forEach((element) => {
      const key = element.getAttribute("data-i18n")
      if (window.i18n.translations[language][key]) {
        element.textContent = window.i18n.translations[language][key]
      }
    })

    // Actualizar específicamente los elementos de notificación
    const notificationTitle = document.querySelector(".notification-header h3")
    if (notificationTitle) {
      notificationTitle.textContent = window.i18n.translations[language]["Notificaciones"]
    }

    const markAllReadBtn = document.getElementById("mark-all-read")
    if (markAllReadBtn) {
      markAllReadBtn.textContent = window.i18n.translations[language]["Marcar todas como leídas"]
    }

    const emptyMessage = document.querySelector(".notification-empty")
    if (emptyMessage) {
      emptyMessage.textContent = window.i18n.translations[language]["No tienes notificaciones"]
    }

    // Actualizar el botón de cerrar sesión
    const logoutBtn = document.getElementById("logout-btn")
    if (logoutBtn) {
      logoutBtn.textContent = window.i18n.translations[language]["Cerrar Sesión"]
    }

    // Actualizar elementos del menú desplegable
    document.querySelectorAll(".overlay-menu [data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n")
      if (window.i18n.translations[language][key]) {
        element.textContent = window.i18n.translations[language][key]
      }
    })

    // Actualizar las descripciones de las recetas
    document.querySelectorAll(".description p[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n")
      if (window.i18n.translations[language][key]) {
        element.textContent = window.i18n.translations[language][key]
      }
    })

    // Intentar actualizar el slider de recetas aleatorias si existe la función
    if (typeof window.updateRandomRecipesSlider === "function") {
      window.updateRandomRecipesSlider()
    }
  }
})

