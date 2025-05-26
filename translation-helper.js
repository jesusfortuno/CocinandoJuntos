/**
 * Script auxiliar para ayudar con la traducción
 * Este archivo proporciona funciones útiles para trabajar con traducciones
 */

// Función para traducir elementos dinámicos que se añaden después de cargar la página
function translateDynamicElements(language) {
    // Asegurarse de que el idioma es válido
    if (!window.translations || !window.translations[language]) {
      console.error(`Traducciones para el idioma "${language}" no encontradas`)
      return
    }
  
    // Obtener todas las traducciones para el idioma seleccionado
    const translations = window.translations[language]
  
    // Traducir elementos con data-i18n que podrían haberse añadido dinámicamente
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n")
  
      if (translations[key]) {
        // Si es un input con placeholder
        if (element.hasAttribute("placeholder")) {
          element.setAttribute("placeholder", translations[key])
        }
        // Si es un elemento normal
        else {
          element.textContent = translations[key]
        }
      }
    })
  }
  
  // Función para traducir un texto específico
  function translateText(text, language) {
    if (!window.translations || !window.translations[language] || !window.translations[language][text]) {
      return text
    }
  
    return window.translations[language][text]
  }
  
  // Función para traducir elementos dentro de un contenedor específico
  function translateContainer(containerId, language) {
    const container = document.getElementById(containerId)
    if (!container) {
      console.error(`Contenedor con ID "${containerId}" no encontrado`)
      return
    }
  
    const elements = container.querySelectorAll("[data-i18n]")
    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n")
  
      if (window.translations[language][key]) {
        // Si es un input con placeholder
        if (element.hasAttribute("placeholder")) {
          element.setAttribute("placeholder", window.translations[language][key])
        }
        // Si es un elemento normal
        else {
          element.textContent = window.translations[language][key]
        }
      }
    })
  }
  
  // Función para añadir atributos data-i18n a elementos existentes
  function addTranslationAttributes(selector, textMap) {
    document.querySelectorAll(selector).forEach((element) => {
      const text = element.textContent.trim()
      if (textMap[text]) {
        element.setAttribute("data-i18n", text)
      }
    })
  }
  
  // Función para detectar el idioma del navegador
  function detectBrowserLanguage() {
    const language = navigator.language || navigator.userLanguage
  
    // Simplificar el código de idioma (por ejemplo, "es-ES" -> "es")
    const simplifiedLanguage = language.split("-")[0]
  
    // Verificar si el idioma es compatible con nuestro sistema
    if (window.translations[simplifiedLanguage]) {
      return simplifiedLanguage
    }
  
    // Si el idioma no es compatible, devolver español como predeterminado
    return "es"
  }
  
  // Exponer funciones globalmente
  window.translateDynamicElements = translateDynamicElements
  window.translateText = translateText
  window.translateContainer = translateContainer
  window.addTranslationAttributes = addTranslationAttributes
  window.detectBrowserLanguage = detectBrowserLanguage
  