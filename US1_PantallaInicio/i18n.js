// Sistema de internacionalización para Cocinando Juntos
// Soporte para Español, Catalán e Inglés

// Diccionario de traducciones
const translations = {
    // Español (idioma por defecto)
    es: {
      // Navegación
      "Buscar recetas...": "Buscar recetas...",
      "Iniciar Sesión": "Iniciar Sesión",
      "Cerrar Sesión": "Cerrar Sesión",
  
      // Hero section
      "Cocinando Juntos": "Cocinando Juntos",
      "Descubre, comparte y disfruta de recetas de todo el mundo. Una comunidad para amantes de la gastronomía donde podrás explorar sabores de diferentes culturas.":
        "Descubre, comparte y disfruta de recetas de todo el mundo. Una comunidad para amantes de la gastronomía donde podrás explorar sabores de diferentes culturas.",
      "Explorar Recetas": "Explorar Recetas",
      "Unirse Ahora": "Unirse Ahora",
  
      // Secciones principales
      "Platos por Cultura": "Platos por Cultura",
      China: "China",
      España: "España",
      Francia: "Francia",
      Italia: "Italia",
      Japón: "Japón",
      Venezuela: "Venezuela",
  
      // Recetas
      "Pollo Agridulce": "Pollo Agridulce",
      "Delicioso plato de pollo agridulce con un toque especial. Una combinación perfecta de sabores dulces y ácidos que te transportará a la auténtica cocina china.":
        "Delicioso plato de pollo agridulce con un toque especial. Una combinación perfecta de sabores dulces y ácidos que te transportará a la auténtica cocina china.",
      "Galletas de Sésamo": "Galletas de Sésamo",
      "Crujientes galletas con semillas de sésamo, una deliciosa receta tradicional china. Perfectas para acompañar el té o como snack en cualquier momento del día.":
        "Crujientes galletas con semillas de sésamo, una deliciosa receta tradicional china. Perfectas para acompañar el té o como snack en cualquier momento del día.",
      "Bollitos Chinos": "Bollitos Chinos",
      "Suaves y esponjosos bollitos al vapor, rellenos de deliciosas mezclas. Un desayuno tradicional de la cocina china que te encantará.":
        "Suaves y esponjosos bollitos al vapor, rellenos de deliciosas mezclas. Un desayuno tradicional de la cocina china que te encantará.",
      "Fideos Salteados": "Fideos Salteados",
      "Fideos salteados con verduras crujientes y una salsa especial. Un plato rápido y sabroso que te transportará a las calles de China.":
        "Fideos salteados con verduras crujientes y una salsa especial. Un plato rápido y sabroso que te transportará a las calles de China.",
      "Sopa Wonton": "Sopa Wonton",
      "Reconfortante sopa con wontons caseros rellenos de carne y camarones. Un plato tradicional chino perfecto para días fríos.":
        "Reconfortante sopa con wontons caseros rellenos de carne y camarones. Un plato tradicional chino perfecto para días fríos.",
      "Leer más": "Leer más",
  
      // Categorías
      Media: "Media",
      Fácil: "Fácil",
      Difícil: "Difícil",
      Comida: "Comida",
      Merienda: "Merienda",
      Desayuno: "Desayuno",
      Cena: "Cena",
      Sopa: "Sopa",
      Ensalada: "Ensalada",
      Bebida: "Bebida",
  
      // Menú de navegación
      "Culturas Gastronómicas": "Culturas Gastronómicas",
      "Tipo de Plato": "Tipo de Plato",
      "Dificultad de la Receta": "Dificultad de la Receta",
  
      // Footer
      "Sobre Nosotros": "Sobre Nosotros",
      "Quiénes Somos": "Quiénes Somos",
      Contacto: "Contacto",
      Legal: "Legal",
      "Política de Privacidad": "Política de Privacidad",
      "Términos y Condiciones": "Términos y Condiciones",
      "Política de Cookies": "Política de Cookies",
      "Aviso Legal": "Aviso Legal",
      Comunidad: "Comunidad",
      Recetas: "Recetas",
      Chefs: "Chefs",
      Síguenos: "Síguenos",
      "Idioma:": "Idioma:",
      "Todos los derechos reservados": "Todos los derechos reservados",
    },
  
    // Catalán
    ca: {
      // Navegación
      "Buscar recetas...": "Cercar receptes...",
      "Iniciar Sesión": "Iniciar Sessió",
      "Cerrar Sesión": "Tancar Sessió",
  
      // Hero section
      "Cocinando Juntos": "Cuinant Junts",
      "Descubre, comparte y disfruta de recetas de todo el mundo. Una comunidad para amantes de la gastronomía donde podrás explorar sabores de diferentes culturas.":
        "Descobreix, comparteix i gaudeix de receptes de tot el món. Una comunitat per a amants de la gastronomia on podràs explorar sabors de diferents cultures.",
      "Explorar Recetas": "Explorar Receptes",
      "Unirse Ahora": "Unir-se Ara",
  
      // Secciones principales
      "Platos por Cultura": "Plats per Cultura",
      China: "Xina",
      España: "Espanya",
      Francia: "França",
      Italia: "Itàlia",
      Japón: "Japó",
      Venezuela: "Veneçuela",
  
      // Recetas
      "Pollo Agridulce": "Pollastre Agredolç",
      "Delicioso plato de pollo agridulce con un toque especial. Una combinación perfecta de sabores dulces y ácidos que te transportará a la auténtica cocina china.":
        "Deliciós plat de pollastre agredolç amb un toc especial. Una combinació perfecta de sabors dolços i àcids que et transportarà a l'autèntica cuina xinesa.",
      "Galletas de Sésamo": "Galetes de Sèsam",
      "Crujientes galletas con semillas de sésamo, una deliciosa receta tradicional china. Perfectas para acompañar el té o como snack en cualquier momento del día.":
        "Cruixents galetes amb llavors de sèsam, una deliciosa recepta tradicional xinesa. Perfectes per acompanyar el te o com a snack en qualsevol moment del dia.",
      "Bollitos Chinos": "Panets Xinesos",
      "Suaves y esponjosos bollitos al vapor, rellenos de deliciosas mezclas. Un desayuno tradicional de la cocina china que te encantará.":
        "Suaus i esponjosos panets al vapor, farcits de delicioses barreges. Un esmorzar tradicional de la cuina xinesa que t'encantarà.",
      "Fideos Salteados": "Fideus Saltats",
      "Fideos salteados con verduras crujientes y una salsa especial. Un plato rápido y sabroso que te transportará a las calles de China.":
        "Fideus saltats amb verdures cruixents i una salsa especial. Un plat ràpid i saborós que et transportarà als carrers de la Xina.",
      "Sopa Wonton": "Sopa Wonton",
      "Reconfortante sopa con wontons caseros rellenos de carne y camarones. Un plato tradicional chino perfecto para días fríos.":
        "Reconfortant sopa amb wontons casolans farcits de carn i gambes. Un plat tradicional xinès perfecte per a dies freds.",
      "Leer más": "Llegir més",
  
      // Categorías
      Media: "Mitjana",
      Fácil: "Fàcil",
      Difícil: "Difícil",
      Comida: "Dinar",
      Merienda: "Berenar",
      Desayuno: "Esmorzar",
      Cena: "Sopar",
      Sopa: "Sopa",
      Ensalada: "Amanida",
      Bebida: "Beguda",
  
      // Menú de navegación
      "Culturas Gastronómicas": "Cultures Gastronòmiques",
      "Tipo de Plato": "Tipus de Plat",
      "Dificultad de la Receta": "Dificultat de la Recepta",
  
      // Footer
      "Sobre Nosotros": "Sobre Nosaltres",
      "Quiénes Somos": "Qui Som",
      Contacto: "Contacte",
      Legal: "Legal",
      "Política de Privacidad": "Política de Privacitat",
      "Términos y Condiciones": "Termes i Condicions",
      "Política de Cookies": "Política de Cookies",
      "Aviso Legal": "Avís Legal",
      Comunidad: "Comunitat",
      Recetas: "Receptes",
      Chefs: "Xefs",
      Síguenos: "Segueix-nos",
      "Idioma:": "Idioma:",
      "Todos los derechos reservados": "Tots els drets reservats",
    },
  
    // Inglés
    en: {
      // Navegación
      "Buscar recetas...": "Search recipes...",
      "Iniciar Sesión": "Log In",
      "Cerrar Sesión": "Log Out",
  
      // Hero section
      "Cocinando Juntos": "Cooking Together",
      "Descubre, comparte y disfruta de recetas de todo el mundo. Una comunidad para amantes de la gastronomía donde podrás explorar sabores de diferentes culturas.":
        "Discover, share and enjoy recipes from around the world. A community for food lovers where you can explore flavors from different cultures.",
      "Explorar Recetas": "Explore Recipes",
      "Unirse Ahora": "Join Now",
  
      // Secciones principales
      "Platos por Cultura": "Dishes by Culture",
      China: "China",
      España: "Spain",
      Francia: "France",
      Italia: "Italy",
      Japón: "Japan",
      Venezuela: "Venezuela",
  
      // Recetas
      "Pollo Agridulce": "Sweet and Sour Chicken",
      "Delicioso plato de pollo agridulce con un toque especial. Una combinación perfecta de sabores dulces y ácidos que te transportará a la auténtica cocina china.":
        "Delicious sweet and sour chicken dish with a special touch. A perfect combination of sweet and sour flavors that will transport you to authentic Chinese cuisine.",
      "Galletas de Sésamo": "Sesame Cookies",
      "Crujientes galletas con semillas de sésamo, una deliciosa receta tradicional china. Perfectas para acompañar el té o como snack en cualquier momento del día.":
        "Crunchy cookies with sesame seeds, a delicious traditional Chinese recipe. Perfect to accompany tea or as a snack at any time of the day.",
      "Bollitos Chinos": "Chinese Buns",
      "Suaves y esponjosos bollitos al vapor, rellenos de deliciosas mezclas. Un desayuno tradicional de la cocina china que te encantará.":
        "Soft and fluffy steamed buns, filled with delicious mixtures. A traditional Chinese breakfast that you'll love.",
      "Fideos Salteados": "Stir-Fried Noodles",
      "Fideos salteados con verduras crujientes y una salsa especial. Un plato rápido y sabroso que te transportará a las calles de China.":
        "Stir-fried noodles with crunchy vegetables and a special sauce. A quick and tasty dish that will transport you to the streets of China.",
      "Sopa Wonton": "Wonton Soup",
      "Reconfortante sopa con wontons caseros rellenos de carne y camarones. Un plato tradicional chino perfecto para días fríos.":
        "Comforting soup with homemade wontons filled with meat and shrimp. A traditional Chinese dish perfect for cold days.",
      "Leer más": "Read more",
  
      // Categorías
      Media: "Medium",
      Fácil: "Easy",
      Difícil: "Hard",
      Comida: "Lunch",
      Merienda: "Snack",
      Desayuno: "Breakfast",
      Cena: "Dinner",
      Sopa: "Soup",
      Ensalada: "Salad",
      Bebida: "Drink",
  
      // Menú de navegación
      "Culturas Gastronómicas": "Gastronomic Cultures",
      "Tipo de Plato": "Dish Type",
      "Dificultad de la Receta": "Recipe Difficulty",
  
      // Footer
      "Sobre Nosotros": "About Us",
      "Quiénes Somos": "Who We Are",
      Contacto: "Contact",
      Legal: "Legal",
      "Política de Privacidad": "Privacy Policy",
      "Términos y Condiciones": "Terms and Conditions",
      "Política de Cookies": "Cookie Policy",
      "Aviso Legal": "Legal Notice",
      Comunidad: "Community",
      Recetas: "Recipes",
      Chefs: "Chefs",
      Síguenos: "Follow Us",
      "Idioma:": "Language:",
      "Todos los derechos reservados": "All rights reserved",
    },
  }
  
  // Función para obtener el idioma actual del navegador o del almacenamiento local
  function getCurrentLanguage() {
    // Primero intentamos obtener el idioma del localStorage
    const savedLanguage = localStorage.getItem("language")
  
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage
    }
  
    // Si no hay idioma guardado, usamos el idioma del navegador
    const browserLang = navigator.language.split("-")[0]
  
    // Verificamos si el idioma del navegador está soportado
    if (translations[browserLang]) {
      return browserLang
    }
  
    // Por defecto, usamos español
    return "es"
  }
  
  // Función para cambiar el idioma de la página
  function changeLanguage(lang) {
    // Verificar si el idioma está soportado
    if (!translations[lang]) {
      console.error(`El idioma ${lang} no está soportado.`)
      return
    }
  
    // Guardar la preferencia de idioma
    localStorage.setItem("language", lang)
  
    // Obtener todas las traducciones para el idioma seleccionado
    const texts = translations[lang]
  
    // Traducir todos los elementos de texto en la página
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n")
      if (texts[key]) {
        // Si el elemento es un input con placeholder
        if (element.placeholder !== undefined) {
          element.placeholder = texts[key]
        }
        // Para otros elementos, actualizar el contenido
        else {
          element.textContent = texts[key]
        }
      }
    })
  
    // Actualizar el selector de idioma
    const languageSelector = document.getElementById("language")
    if (languageSelector) {
      languageSelector.value = lang
    }
  
    // Disparar un evento personalizado para notificar que el idioma ha cambiado
    document.dispatchEvent(new CustomEvent("languageChanged", { detail: { language: lang } }))
  }
  
  // Función para inicializar el sistema de internacionalización
  function initI18n() {
    // Añadir atributos data-i18n a todos los elementos de texto
    prepareElementsForTranslation()
  
    // Obtener el idioma actual
    const currentLang = getCurrentLanguage()
  
    // Aplicar las traducciones iniciales
    changeLanguage(currentLang)
  
    // Configurar el evento de cambio de idioma en el selector
    const languageSelector = document.getElementById("language")
    if (languageSelector) {
      languageSelector.addEventListener("change", function () {
        changeLanguage(this.value)
      })
    }
  }
  
  // Función para preparar los elementos para la traducción
  function prepareElementsForTranslation() {
    // Lista de selectores para elementos que contienen texto a traducir
    const textSelectors = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "button",
      "label",
      "span",
      "li",
      "option",
      ".recipe-meta span",
    ]
  
    // Seleccionar todos los elementos de texto
    const textElements = document.querySelectorAll(textSelectors.join(", "))
  
    // Para cada elemento, añadir el atributo data-i18n con el texto original
    textElements.forEach((element) => {
      // Ignorar elementos que ya tienen el atributo o están vacíos
      if (!element.hasAttribute("data-i18n") && element.textContent.trim()) {
        const text = element.textContent.trim()
  
        // Verificar si el texto existe en las traducciones
        if (translations.es[text]) {
          element.setAttribute("data-i18n", text)
        }
      }
    })
  
    // Manejar los placeholders de los inputs
    document.querySelectorAll("input[placeholder]").forEach((input) => {
      const placeholder = input.placeholder
      if (translations.es[placeholder]) {
        input.setAttribute("data-i18n", placeholder)
      }
    })
  }
  
  // Exportar las funciones para usarlas en otros archivos
  window.i18n = {
    init: initI18n,
    changeLanguage: changeLanguage,
    getCurrentLanguage: getCurrentLanguage,
    translations: translations,
  }
  
  // Inicializar cuando el DOM esté cargado
  document.addEventListener("DOMContentLoaded", initI18n)
  
  