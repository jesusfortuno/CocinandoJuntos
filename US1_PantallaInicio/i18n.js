// Sistema de internacionalización para Cocinando Juntos
// Soporte para Español, Catalán e Inglés

// Verificar si ya existe el objeto de traducciones
if (!window.i18n) {
  // Diccionario de traducciones
  const translations = {
    // Español (idioma por defecto)
    es: {
      // Navegación
      "Buscar recetas...": "Buscar recetas...",
      "Iniciar Sesión": "Iniciar Sesión",
      "Cerrar Sesión": "Cerrar Sesión",
      "Resultados para": "Resultados para",
      "No se encontraron resultados": "No se encontraron resultados",
      "Intenta con otra búsqueda": "Intenta con otra búsqueda",
      Comida: "Comida",
      Desayuno: "Desayuno",
      "Dificultad:": "Dificultad:",
      "Ver todas las recetas": "Ver todas las recetas",
      "Log Out": "Cerrar Sesión",

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
      "Galletas de Sésamo": "Galletas de Sésamo",
      "Bollitos Chinos": "Bollitos Chinos",
      "Fideos Salteados": "Fideos Salteados",
      "Sopa Wonton": "Sopa Wonton",
      "Ensalada Fresca": "Ensalada Fresca",
      "Tacos Mexicanos": "Tacos Mexicanos",
      "Smoothie de Frutas": "Smoothie de Frutas",
      "Pasta al Pesto": "Pasta al Pesto",
      "Batido Energético": "Batido Energético",
      Paella: "Paella",
      "Tortilla de Patatas": "Tortilla de Patatas",
      "Bizcocho Capuccino": "Bizcocho Capuccino",
      "Churros con Chocolate": "Churros con Chocolate",
      "Crepas Dulces": "Crepas Dulces",
      "Sesame Cookies": "Galletas de Sésamo",
      "Sweet Crepes": "Crepas Dulces",
      "Spanish Omelette": "Tortilla Española",
      "Cappuccino Cake": "Bizcocho Capuccino",
      "Quiche Lorraine": "Quiche Lorraine",
      "Sweet and Sour Chicken": "Pollo Agridulce",
      "Chinese Buns": "Bollitos Chinos",
      "Stir-Fried Noodles": "Fideos Salteados",
      "Wonton Soup": "Sopa Wonton",

      // Descripciones de recetas
      "description-1":
        "Delicioso plato de pollo agridulce con un toque especial. Una combinación perfecta de sabores dulces y ácidos que te transportará a la auténtica cocina china.",
      "description-2":
        "Crujientes galletas con semillas de sésamo, una deliciosa receta tradicional china. Perfectas para acompañar el té o como snack en cualquier momento del día.",
      "description-3":
        "Suaves y esponjosos bollitos al vapor, rellenos de deliciosas mezclas. Un desayuno tradicional de la cocina china que te encantará.",
      "description-4":
        "Fideos salteados con verduras crujientes y una salsa especial. Un plato rápido y sabroso que te transportará a las calles de China.",
      "description-5":
        "Reconfortante sopa con wontons caseros rellenos de carne y camarones. Un plato tradicional chino perfecto para días fríos.",
      "description-6":
        "Deliciosa ensalada con ingredientes frescos y un aderezo especial. Perfecta para una comida ligera y saludable.",
      "description-7":
        "Auténticos tacos mexicanos con tortillas caseras y rellenos tradicionales. Una explosión de sabores que te transportará a México.",
      "description-8":
        "Refrescante bebida llena de vitaminas y sabores naturales. Ideal para empezar el día con energía.",
      "description-9":
        "Deliciosa pasta italiana con salsa pesto casera y queso parmesano. Un clásico de la cocina italiana que nunca falla.",
      "description-10":
        "Batido nutritivo perfecto para empezar el día con energía o recuperarte después de hacer ejercicio.",
      "description-11":
        "Tradicional plato español con arroz, azafrán y una variedad de mariscos. El sabor de España en un solo plato.",
      "description-12":
        "Clásica tortilla española con patatas y cebolla. Un plato versátil que se puede disfrutar caliente o frío.",

      // Categorías y dificultades
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
      Snack: "Merienda",
      Breakfast: "Desayuno",
      Lunch: "Comida",
      Dinner: "Cena",
      Soup: "Sopa",
      Salad: "Ensalada",
      Drink: "Bebida",
      Easy: "Fácil",
      Medium: "Media",
      Hard: "Difícil",

      // Otros elementos
      "Leer más": "Leer más",
      "Read more": "Leer más",
      "Explorar Recetas": "Explorar Recetas",
      "Todos los derechos reservados": "Todos los derechos reservados",

      // Mantener el resto de traducciones existentes...
    },

    // Catalán
    ca: {
      // Navegación
      "Buscar recetas...": "Cercar receptes...",
      "Iniciar Sesión": "Iniciar Sessió",
      "Cerrar Sesión": "Tancar Sessió",
      "Resultados para": "Resultats per a",
      "No se encontraron resultados": "No s'han trobat resultats",
      "Intenta con otra búsqueda": "Intenta amb una altra cerca",
      Comida: "Dinar",
      Desayuno: "Esmorzar",
      "Dificultad:": "Dificultat:",
      "Ver todas las recetas": "Veure totes les receptes",
      "Log Out": "Tancar Sessió",

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
      "Galletas de Sésamo": "Galetes de Sèsam",
      "Bollitos Chinos": "Panets Xinesos",
      "Fideos Salteados": "Fideus Saltats",
      "Sopa Wonton": "Sopa Wonton",
      "Ensalada Fresca": "Amanida Fresca",
      "Tacos Mexicanos": "Tacos Mexicans",
      "Smoothie de Frutas": "Smoothie de Fruites",
      "Pasta al Pesto": "Pasta al Pesto",
      "Batido Energético": "Batut Energètic",
      Paella: "Paella",
      "Tortilla de Patatas": "Truita de Patates",
      "Bizcocho Capuccino": "Bescuit Capuccino",
      "Churros con Chocolate": "Xurros amb Xocolata",
      "Crepas Dulces": "Creps Dolços",
      "Sesame Cookies": "Galetes de Sèsam",
      "Sweet Crepes": "Creps Dolços",
      "Spanish Omelette": "Truita Espanyola",
      "Cappuccino Cake": "Bescuit Capuccino",
      "Quiche Lorraine": "Quiche Lorraine",
      "Sweet and Sour Chicken": "Pollastre Agredolç",
      "Chinese Buns": "Panets Xinesos",
      "Stir-Fried Noodles": "Fideus Saltats",
      "Wonton Soup": "Sopa Wonton",

      // Descripciones de recetas
      "description-1":
        "Deliciós plat de pollastre agredolç amb un toc especial. Una combinació perfecta de sabors dolços i àcids que et transportarà a l'autèntica cuina xinesa.",
      "description-2":
        "Cruixents galetes amb llavors de sèsam, una deliciosa recepta tradicional xinesa. Perfectes per acompanyar el te o com a snack en qualsevol moment del dia.",
      "description-3":
        "Suaus i esponjosos panets al vapor, farcits de delicioses barreges. Un esmorzar tradicional de la cuina xinesa que t'encantarà.",
      "description-4":
        "Fideus saltats amb verdures cruixents i una salsa especial. Un plat ràpid i saborós que et transportarà als carrers de la Xina.",
      "description-5":
        "Reconfortant sopa amb wontons casolans farcits de carn i gambes. Un plat tradicional xinès perfecte per a dies freds.",
      "description-6":
        "Deliciosa amanida amb ingredients frescos i un amaniment especial. Perfecta per a un àpat lleuger i saludable.",
      "description-7":
        "Autèntics tacos mexicans amb tortilles casolanes i farcits tradicionals. Una explosió de sabors que et transportarà a Mèxic.",
      "description-8": "Beguda refrescant plena de vitamines i sabors naturals. Ideal per començar el dia amb energia.",
      "description-9":
        "Deliciosa pasta italiana amb salsa pesto casolana i formatge parmesà. Un clàssic de la cuina italiana que mai falla.",
      "description-10":
        "Batut nutritiu perfecte per començar el dia amb energia o recuperar-te després de fer exercici.",
      "description-11":
        "Tradicional plat espanyol amb arròs, safrà i una varietat de marisc. El sabor d'Espanya en un sol plat.",
      "description-12":
        "Clàssica truita espanyola amb patates i ceba. Un plat versàtil que es pot gaudir calent o fred.",

      // Categorías y dificultades
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
      Snack: "Berenar",
      Breakfast: "Esmorzar",
      Lunch: "Dinar",
      Dinner: "Sopar",
      Soup: "Sopa",
      Salad: "Amanida",
      Drink: "Beguda",
      Easy: "Fàcil",
      Medium: "Mitjana",
      Hard: "Difícil",

      // Otros elementos
      "Leer más": "Llegir més",
      "Read more": "Llegir més",
      "Explorar Recetas": "Explorar Receptes",
      "Todos los derechos reservados": "Tots els drets reservats",

      // Mantener el resto de traducciones existentes...
    },

    // Inglés
    en: {
      // Navegación
      "Buscar recetas...": "Search recipes...",
      "Iniciar Sesión": "Log In",
      "Cerrar Sesión": "Log Out",
      "Resultados para": "Results for",
      "No se encontraron resultados": "No results found",
      "Intenta con otra búsqueda": "Try another search",
      Comida: "Lunch",
      Desayuno: "Breakfast",
      "Dificultad:": "Difficulty:",
      "Ver todas las recetas": "View all recipes",
      "Log Out": "Log Out",

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
      "Galletas de Sésamo": "Sesame Cookies",
      "Bollitos Chinos": "Chinese Buns",
      "Fideos Salteados": "Stir-Fried Noodles",
      "Sopa Wonton": "Wonton Soup",
      "Ensalada Fresca": "Fresh Salad",
      "Tacos Mexicanos": "Mexican Tacos",
      "Smoothie de Frutas": "Fruit Smoothie",
      "Pasta al Pesto": "Pesto Pasta",
      "Batido Energético": "Energy Shake",
      Paella: "Paella",
      "Tortilla de Patatas": "Spanish Omelette",
      "Bizcocho Capuccino": "Cappuccino Cake",
      "Churros con Chocolate": "Churros with Chocolate",
      "Crepas Dulces": "Sweet Crepes",
      "Sesame Cookies": "Sesame Cookies",
      "Sweet Crepes": "Sweet Crepes",
      "Spanish Omelette": "Spanish Omelette",
      "Cappuccino Cake": "Cappuccino Cake",
      "Quiche Lorraine": "Quiche Lorraine",
      "Sweet and Sour Chicken": "Sweet and Sour Chicken",
      "Chinese Buns": "Chinese Buns",
      "Stir-Fried Noodles": "Stir-Fried Noodles",
      "Wonton Soup": "Wonton Soup",

      // Descripciones de recetas
      "description-1":
        "Delicious sweet and sour chicken with a special touch. A perfect combination of sweet and sour flavors that will transport you to authentic Chinese cuisine.",
      "description-2":
        "Crunchy cookies with sesame seeds, a delicious traditional Chinese recipe. Perfect to accompany tea or as a snack at any time of the day.",
      "description-3":
        "Soft and fluffy steamed buns, filled with delicious mixtures. A traditional Chinese breakfast that you'll love.",
      "description-4":
        "Stir-fried noodles with crunchy vegetables and a special sauce. A quick and tasty dish that will transport you to the streets of China.",
      "description-5":
        "Comforting soup with homemade wontons filled with meat and shrimp. A traditional Chinese dish perfect for cold days.",
      "description-6":
        "Delicious salad with fresh ingredients and a special dressing. Perfect for a light and healthy meal.",
      "description-7":
        "Authentic Mexican tacos with homemade tortillas and traditional fillings. An explosion of flavors that will transport you to Mexico.",
      "description-8": "Refreshing drink full of vitamins and natural flavors. Ideal to start the day with energy.",
      "description-9":
        "Delicious Italian pasta with homemade pesto sauce and parmesan cheese. A classic of Italian cuisine that never fails.",
      "description-10": "Nutritious shake perfect to start the day with energy or recover after exercise.",
      "description-11":
        "Traditional Spanish dish with rice, saffron and a variety of seafood. The taste of Spain in a single dish.",
      "description-12":
        "Classic Spanish omelette with potatoes and onion. A versatile dish that can be enjoyed hot or cold.",

      // Categorías y dificultades
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
      Snack: "Snack",
      Breakfast: "Breakfast",
      Lunch: "Lunch",
      Dinner: "Dinner",
      Soup: "Soup",
      Salad: "Salad",
      Drink: "Drink",
      Easy: "Easy",
      Medium: "Medium",
      Hard: "Hard",

      // Otros elementos
      "Leer más": "Read more",
      "Read more": "Read more",
      "Explorar Recetas": "Explore Recipes",
      "Todos los derechos reservados": "All rights reserved",

      // Mantener el resto de traducciones existentes...
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
      "button",
      "label",
      "span:not(.copyright)", // Excluir el copyright
      "option",
      ".recipe-meta span",
    ]

    // Excluir específicamente los enlaces del footer y otros enlaces de navegación
    const excludeSelectors = [".footer-links a", ".social-icons a", ".auth-buttons", ".culture-card", "nav a"].join(",")

    // Seleccionar todos los elementos de texto excepto los excluidos
    const textElements = document.querySelectorAll(textSelectors.join(", "))

    // Para cada elemento, añadir el atributo data-i18n con el texto original
    textElements.forEach((element) => {
      // Verificar que el elemento no está dentro de las secciones excluidas
      if (!element.closest(excludeSelectors) && !element.hasAttribute("data-i18n") && element.textContent.trim()) {
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

    // Añadir soporte específico para los enlaces del footer
    document.querySelectorAll(".footer-links a, .footer-links h3").forEach((element) => {
      const text = element.textContent.trim()
      if (translations.es[text] || translations.ca[text] || translations.en[text]) {
        element.setAttribute("data-i18n", text)
      }
    })
  }

  // Función para asegurar que las imágenes se carguen correctamente
  function ensureImagesLoaded() {
    // Forzar la recarga de imágenes en las tarjetas de cultura
    document.querySelectorAll(".culture-card img").forEach((img) => {
      const src = img.getAttribute("src")
      if (src) {
        // Forzar recarga añadiendo un parámetro de tiempo
        img.setAttribute("src", src + "?t=" + new Date().getTime())
      }
    })
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

    // Asegurar que las imágenes se carguen correctamente
    ensureImagesLoaded()

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

  // Exportar las funciones para usarlas en otros archivos
  window.i18n = {
    init: initI18n,
    changeLanguage: changeLanguage,
    getCurrentLanguage: getCurrentLanguage,
    translations: translations,
  }

  // Inicializar cuando el DOM esté cargado
  document.addEventListener("DOMContentLoaded", initI18n)
}

