// Language switcher functionality
let selectedLanguage = localStorage.getItem("selectedLanguage") || "es"

function updateLanguageDisplay() {
  const languageSelector = document.getElementById("language-selector")
  if (languageSelector) {
    languageSelector.value = selectedLanguage
  }

  // Update all translatable elements
  updateDynamicElements(selectedLanguage)
}

function changeLanguage(language) {
  selectedLanguage = language
  localStorage.setItem("selectedLanguage", language)
  updateLanguageDisplay()
}

// Initialize language display when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("language-selector")
  if (languageSelector) {
    languageSelector.addEventListener("change", function () {
      changeLanguage(this.value)
    })
  }

  updateLanguageDisplay()
})

function updateDynamicElements(language) {
  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n")
    if (
      window.i18n &&
      window.i18n.translations &&
      window.i18n.translations[language] &&
      window.i18n.translations[language][key]
    ) {
      // If it's an input with placeholder
      if (element.hasAttribute("placeholder")) {
        element.setAttribute("placeholder", window.i18n.translations[language][key])
      } else if (element.tagName === "BUTTON") {
        // For buttons, we need to handle the text content
        element.textContent = window.i18n.translations[language][key]
      } else {
        // For other elements, update the text content
        element.textContent = window.i18n.translations[language][key]
      }
    }
  })

  // Update page titles
  const pageTitle = document.querySelector("title")
  if (pageTitle) {
    const currentTitle = pageTitle.textContent

    // Map of page titles
    const titleMap = {
      es: {
        "Home - Cocinando Juntos": "Home - Cocinando Juntos",
        "Chefs - Cocinando Juntos": "Chefs - Cocinando Juntos",
        "Contacto - Cocinando Juntos": "Contacto - Cocinando Juntos",
        "Quiénes Somos - Cocinando Juntos": "Quiénes Somos - Cocinando Juntos",
        "Política de Cookies - Cocinando Juntos": "Política de Cookies - Cocinando Juntos",
        "Política de Privacidad - Cocinando Juntos": "Política de Privacidad - Cocinando Juntos",
        "Términos y Condiciones - Cocinando Juntos": "Términos y Condiciones - Cocinando Juntos",
        "Aviso Legal - Cocinando Juntos": "Aviso Legal - Cocinando Juntos",
        "Cultura China - Cocinando Juntos": "Cultura China - Cocinando Juntos",
        "Cultura Española - Cocinando Juntos": "Cultura Española - Cocinando Juntos",
        "Cultura Francesa - Cocinando Juntos": "Cultura Francesa - Cocinando Juntos",
        "Cultura Italiana - Cocinando Juntos": "Cultura Italiana - Cocinando Juntos",
        "Cultura Japonesa - Cocinando Juntos": "Cultura Japonesa - Cocinando Juntos",
        "Cultura Venezolana - Cocinando Juntos": "Cultura Venezolana - Cocinando Juntos",
        "Arepa Venezolana - Cocinando Juntos": "Arepa Venezolana - Cocinando Juntos",
        "Bizcocho Capuccino - Cocinando Juntos": "Bizcocho Capuccino - Cocinando Juntos",
        "Bollitos Chinos - Cocinando Juntos": "Bollitos Chinos - Cocinando Juntos",
        "Churros con Chocolate - Cocinando Juntos": "Churros con Chocolate - Cocinando Juntos",
        "Crepas Dulces - Cocinando Juntos": "Crepas Dulces - Cocinando Juntos",
        "Cannoli - Cocinando Juntos": "Cannoli - Cocinando Juntos",
        "Coq au Vin - Cocinando Juntos": "Coq au Vin - Cocinando Juntos",
        "Galletas de Sésamo - Cocinando Juntos": "Galletas de Sésamo - Cocinando Juntos",
        "Fideos Salteados - Cocinando Juntos": "Fideos Salteados - Cocinando Juntos",
        "Lasaña - Cocinando Juntos": "Lasaña - Cocinando Juntos",
      },
      en: {
        "Home - Cocinando Juntos": "Home - Cooking Together",
        "Chefs - Cocinando Juntos": "Chefs - Cooking Together",
        "Contacto - Cocinando Juntos": "Contact - Cooking Together",
        "Quiénes Somos - Cocinando Juntos": "About Us - Cooking Together",
        "Política de Cookies - Cocinando Juntos": "Cookie Policy - Cooking Together",
        "Política de Privacidad - Cocinando Juntos": "Privacy Policy - Cooking Together",
        "Términos y Condiciones - Cocinando Juntos": "Terms and Conditions - Cooking Together",
        "Aviso Legal - Cocinando Juntos": "Legal Notice - Cooking Together",
        "Cultura China - Cocinando Juntos": "Chinese Culture - Cooking Together",
        "Cultura Española - Cocinando Juntos": "Spanish Culture - Cooking Together",
        "Cultura Francesa - Cocinando Juntos": "French Culture - Cooking Together",
        "Cultura Italiana - Cocinando Juntos": "Italian Culture - Cooking Together",
        "Cultura Japonesa - Cocinando Juntos": "Japanese Culture - Cooking Together",
        "Cultura Venezolana - Cocinando Juntos": "Venezuelan Culture - Cooking Together",
        "Arepa Venezolana - Cocinando Juntos": "Venezuelan Arepa - Cooking Together",
        "Bizcocho Capuccino - Cocinando Juntos": "Cappuccino Cake - Cooking Together",
        "Bollitos Chinos - Cocinando Juntos": "Chinese Buns - Cooking Together",
        "Churros con Chocolate - Cocinando Juntos": "Churros with Chocolate - Cooking Together",
        "Crepas Dulces - Cocinando Juntos": "Sweet Crepes - Cooking Together",
        "Cannoli - Cocinando Juntos": "Cannoli - Cooking Together",
        "Coq au Vin - Cocinando Juntos": "Coq au Vin - Cooking Together",
        "Galletas de Sésamo - Cocinando Juntos": "Sesame Cookies - Cooking Together",
        "Fideos Salteados - Cocinando Juntos": "Stir-Fried Noodles - Cooking Together",
        "Lasaña - Cocinando Juntos": "Lasagna - Cooking Together",
      },
      ca: {
        "Home - Cocinando Juntos": "Inici - Cuinant Junts",
        "Chefs - Cocinando Juntos": "Xefs - Cuinant Junts",
        "Contacto - Cocinando Juntos": "Contacte - Cuinant Junts",
        "Quiénes Somos - Cocinando Juntos": "Qui Som - Cuinant Junts",
        "Política de Cookies - Cocinando Juntos": "Política de Cookies - Cuinant Junts",
        "Política de Privacidad - Cocinando Juntos": "Política de Privacitat - Cuinant Junts",
        "Términos y Condiciones - Cocinando Juntos": "Termes i Condicions - Cuinant Junts",
        "Aviso Legal - Cocinando Juntos": "Avís Legal - Cuinant Junts",
        "Cultura China - Cocinando Juntos": "Cultura Xinesa - Cuinant Junts",
        "Cultura Española - Cocinando Juntos": "Cultura Espanyola - Cuinant Junts",
        "Cultura Francesa - Cocinando Juntos": "Cultura Francesa - Cuinant Junts",
        "Cultura Italiana - Cocinando Juntos": "Cultura Italiana - Cuinant Junts",
        "Cultura Japonesa - Cocinando Juntos": "Cultura Japonesa - Cuinant Junts",
        "Cultura Venezolana - Cocinando Juntos": "Cultura Veneçolana - Cuinant Junts",
        "Arepa Venezolana - Cocinando Juntos": "Arepa Veneçolana - Cuinant Junts",
        "Bizcocho Capuccino - Cocinando Juntos": "Pastís de Capuccino - Cuinant Junts",
        "Bollitos Chinos - Cocinando Juntos": "Panets Xinesos - Cuinant Junts",
        "Churros con Chocolate - Cocinando Juntos": "Xurros amb Xocolata - Cuinant Junts",
        "Crepas Dulces - Cocinando Juntos": "Creps Dolços - Cuinant Junts",
        "Cannoli - Cocinando Juntos": "Cannoli - Cuinant Junts",
        "Coq au Vin - Cocinando Juntos": "Coq au Vin - Cuinant Junts",
        "Galletas de Sésamo - Cocinando Juntos": "Galetes de Sèsam - Cuinant Junts",
        "Fideos Salteados - Cocinando Juntos": "Fideus Saltats - Cuinant Junts",
        "Lasaña - Cocinando Juntos": "Lasanya - Cuinant Junts",
      },
    }

    // Find and update the title
    for (const [originalTitle, translatedTitle] of Object.entries(titleMap[language] || {})) {
      if (currentTitle.includes(originalTitle)) {
        pageTitle.textContent = translatedTitle
        break
      }
    }
  }

  // Update recipe page specific elements
  const recipeTitle = document.querySelector(".recipe-title h1")
  if (recipeTitle) {
    const titleText = recipeTitle.childNodes[0].textContent.trim()
    if (window.i18n.translations[language] && window.i18n.translations[language][titleText]) {
      recipeTitle.childNodes[0].textContent = window.i18n.translations[language][titleText] + " "
    }
  }

  // Update recipe tags
  document.querySelectorAll(".recipe-tags .tag").forEach((tag) => {
    const tagText = tag.textContent
    const parts = tagText.split(": ")

    if (parts.length === 2) {
      const label = parts[0]
      const value = parts[1]

      const translatedLabel =
        window.i18n.translations[language] && window.i18n.translations[language][label + ":"]
          ? window.i18n.translations[language][label + ":"]
          : label

      const translatedValue =
        window.i18n.translations[language] && window.i18n.translations[language][value]
          ? window.i18n.translations[language][value]
          : value

      tag.textContent = translatedLabel + " " + translatedValue
    }
  })

  // Update favorite button
  const favoriteBtn = document.querySelector(".favorite-btn")
  if (favoriteBtn && !favoriteBtn.classList.contains("favorito-activo")) {
    const btnText = "❤️ Añadir a Favoritos"
    if (window.i18n.translations[language] && window.i18n.translations[language][btnText]) {
      favoriteBtn.textContent = window.i18n.translations[language][btnText]
    }
  } else if (favoriteBtn && favoriteBtn.classList.contains("favorito-activo")) {
    const btnText = " En Favoritos"
    if (window.i18n.translations[language] && window.i18n.translations[language][btnText]) {
      favoriteBtn.textContent = window.i18n.translations[language][btnText]
    }
  }

  // Update rate button
  const rateBtn = document.querySelector(".rate-btn")
  if (rateBtn) {
    const btnText = "⭐ Valorar"
    if (window.i18n.translations[language] && window.i18n.translations[language][btnText]) {
      rateBtn.textContent = window.i18n.translations[language][btnText]
    }
  }

  // Update section headings
  const ingredientsHeading = document.querySelector(".recipe-ingredients h2")
  if (ingredientsHeading) {
    const headingText = "Ingredientes"
    if (window.i18n.translations[language] && window.i18n.translations[language][headingText]) {
      ingredientsHeading.textContent = window.i18n.translations[language][headingText]
    }
  }

  const stepsHeading = document.querySelector(".recipe-steps h2")
  if (stepsHeading) {
    const headingText = "Pasos para la Receta"
    if (window.i18n.translations[language] && window.i18n.translations[language][headingText]) {
      stepsHeading.textContent = window.i18n.translations[language][headingText]
    }
  }

  // Update comments section
  const commentsHeading = document.querySelector("#commentsSection h3")
  if (commentsHeading) {
    const headingText = "Deja tu comentario"
    if (window.i18n.translations[language] && window.i18n.translations[language][headingText]) {
      commentsHeading.textContent = window.i18n.translations[language][headingText]
    }
  }

  const commentTextarea = document.querySelector("#commentText")
  if (commentTextarea) {
    const placeholderText = "Escribe tu comentario aquí..."
    if (window.i18n.translations[language] && window.i18n.translations[language][placeholderText]) {
      commentTextarea.setAttribute("placeholder", window.i18n.translations[language][placeholderText])
    }
  }

  const submitCommentBtn = document.querySelector("#submitComment")
  if (submitCommentBtn) {
    const btnText = "Publicar"
    if (window.i18n.translations[language] && window.i18n.translations[language][btnText]) {
      submitCommentBtn.textContent = window.i18n.translations[language][btnText]
    }
  }

  const cancelReplyBtn = document.querySelector("#cancelReply")
  if (cancelReplyBtn) {
    const btnText = "Cancelar"
    if (window.i18n.translations[language] && window.i18n.translations[language][btnText]) {
      cancelReplyBtn.textContent = window.i18n.translations[language][btnText]
    }
  }

  const loadingComments = document.querySelector("#commentsList p")
  if (loadingComments && loadingComments.textContent === "Cargando comentarios...") {
    const loadingText = "Cargando comentarios..."
    if (window.i18n.translations[language] && window.i18n.translations[language][loadingText]) {
      loadingComments.textContent = window.i18n.translations[language][loadingText]
    }
  }

  // Update breadcrumbs
  const breadcrumbs = document.querySelectorAll(".breadcrumb a, .breadcrumb span")
  if (breadcrumbs.length > 0) {
    breadcrumbs.forEach((item) => {
      const text = item.textContent.trim()
      if (text === "Inicio") {
        if (language === "en") item.textContent = "Home"
        if (language === "ca") item.textContent = "Inici"
      } else if (text === "Cultura China") {
        if (language === "en") item.textContent = "Chinese Culture"
        if (language === "ca") item.textContent = "Cultura Xinesa"
      } else if (text === "Cultura Española") {
        if (language === "en") item.textContent = "Spanish Culture"
        if (language === "ca") item.textContent = "Cultura Espanyola"
      } else if (text === "Cultura Francesa") {
        if (language === "en") item.textContent = "French Culture"
        if (language === "ca") item.textContent = "Cultura Francesa"
      } else if (text === "Cultura Italiana") {
        if (language === "en") item.textContent = "Italian Culture"
        if (language === "ca") item.textContent = "Cultura Italiana"
      } else if (text === "Cultura Japonesa") {
        if (language === "en") item.textContent = "Japanese Culture"
        if (language === "ca") item.textContent = "Cultura Japonesa"
      } else if (text === "Cultura Venezolana") {
        if (language === "en") item.textContent = "Venezuelan Culture"
        if (language === "ca") item.textContent = "Cultura Veneçolana"
      } else if (text === "Arepa Venezolana") {
        if (language === "en") item.textContent = "Venezuelan Arepa"
        if (language === "ca") item.textContent = "Arepa Veneçolana"
      } else if (text === "Bizcocho Capuccino") {
        if (language === "en") item.textContent = "Cappuccino Cake"
        if (language === "ca") item.textContent = "Pastís de Capuccino"
      } else if (text === "Bollitos Chinos") {
        if (language === "en") item.textContent = "Chinese Buns"
        if (language === "ca") item.textContent = "Panets Xinesos"
      } else if (text === "Churros con Chocolate") {
        if (language === "en") item.textContent = "Churros with Chocolate"
        if (language === "ca") item.textContent = "Xurros amb Xocolata"
      } else if (text === "Crepas Dulces") {
        if (language === "en") item.textContent = "Sweet Crepes"
        if (language === "ca") item.textContent = "Creps Dolços"
      } else if (text === "Cannoli") {
        if (language === "en") item.textContent = "Cannoli"
        if (language === "ca") item.textContent = "Cannoli"
      } else if (text === "Coq au Vin") {
        if (language === "en") item.textContent = "Coq au Vin"
        if (language === "ca") item.textContent = "Coq au Vin"
      } else if (text === "Galletas de Sésamo") {
        if (language === "en") item.textContent = "Sesame Cookies"
        if (language === "ca") item.textContent = "Galetes de Sèsam"
      } else if (text === "Fideos Salteados") {
        if (language === "en") item.textContent = "Stir-Fried Noodles"
        if (language === "ca") item.textContent = "Fideus Saltats"
      } else if (text === "Lasaña") {
        if (language === "en") item.textContent = "Lasagna"
        if (language === "ca") item.textContent = "Lasanya"
      }
    })
  }

  // Update form placeholders
  const formInputs = document.querySelectorAll("input[placeholder], textarea[placeholder]")
  if (formInputs.length > 0) {
    const placeholderTranslations = {
      es: {
        "Tu nombre": "Tu nombre",
        "Tu correo electrónico": "Tu correo electrónico",
        "Asunto de tu consulta": "Asunto de tu consulta",
        "Escribe tu consulta aquí...": "Escribe tu consulta aquí...",
        "Escribe tu comentario aquí...": "Escribe tu comentario aquí...",
      },
      en: {
        "Tu nombre": "Your name",
        "Tu correo electrónico": "Your email",
        "Asunto de tu consulta": "Subject of your inquiry",
        "Escribe tu consulta aquí...": "Write your inquiry here...",
        "Escribe tu comentario aquí...": "Write your comment here...",
      },
      ca: {
        "Tu nombre": "El teu nom",
        "Tu correo electrónico": "El teu correu electrònic",
        "Asunto de tu consulta": "Assumpte de la teva consulta",
        "Escribe tu consulta aquí...": "Escriu la teva consulta aquí...",
        "Escribe tu comentario aquí...": "Escriu el teu comentari aquí...",
      },
    }

    formInputs.forEach((input) => {
      const placeholder = input.getAttribute("placeholder")
      if (placeholder && placeholderTranslations[language] && placeholderTranslations[language][placeholder]) {
        input.setAttribute("placeholder", placeholderTranslations[language][placeholder])
      }
    })
  }

  // Update the footer text
  const footerText = document.querySelector(".footer-text")
  if (footerText) {
    const text =
      "Cocinando Juntos es una comunidad de amantes de la gastronomía donde podrás explorar sabores de diferentes culturas, compartir tus recetas favoritas y aprender nuevas técnicas culinarias."

    if (language === "en") {
      footerText.textContent =
        "Cooking Together is a community of food lovers where you can explore flavors from different cultures, share your favorite recipes, and learn new culinary techniques."
    } else if (language === "ca") {
      footerText.textContent =
        "Cuinant Junts és una comunitat d'amants de la gastronomia on podràs explorar sabors de diferents cultures, compartir les teves receptes favorites i aprendre noves tècniques culinàries."
    } else {
      footerText.textContent = text
    }
  }

  // Update copyright text
  const copyright = document.querySelector(".copyright")
  if (copyright) {
    const text = "© 2025 Cocinando Juntos - Todos los derechos reservados"

    if (language === "en") {
      copyright.textContent = "© 2025 Cooking Together - All rights reserved"
    } else if (language === "ca") {
      copyright.textContent = "© 2025 Cuinant Junts - Tots els drets reservats"
    } else {
      copyright.textContent = text
    }
  }
}
