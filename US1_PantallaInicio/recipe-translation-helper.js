// This script adds data-i18n attributes to all recipe pages
document.addEventListener("DOMContentLoaded", () => {
    // Add data-i18n attributes to recipe title
    const recipeTitle = document.querySelector(".recipe-title h1")
    if (recipeTitle) {
      const titleText = recipeTitle.childNodes[0].textContent.trim()
      recipeTitle.childNodes[0].textContent = titleText + " " // Add space for the rating span
      recipeTitle.setAttribute("data-i18n", titleText)
    }
  
    // Add data-i18n attributes to recipe tags
    document.querySelectorAll(".recipe-tags .tag").forEach((tag) => {
      const tagText = tag.textContent
      const parts = tagText.split(": ")
  
      if (parts.length === 2) {
        const label = parts[0]
        const value = parts[1]
  
        // Create new elements with data-i18n attributes
        const labelSpan = document.createElement("span")
        labelSpan.setAttribute("data-i18n", label + ":")
        labelSpan.textContent = label + ": "
  
        const valueSpan = document.createElement("span")
        valueSpan.setAttribute("data-i18n", value)
        valueSpan.textContent = value
  
        // Replace the content
        tag.textContent = ""
        tag.appendChild(labelSpan)
        tag.appendChild(valueSpan)
      }
    })
  
    // Add data-i18n attributes to favorite button
    const favoriteBtn = document.querySelector(".favorite-btn")
    if (favoriteBtn && !favoriteBtn.classList.contains("favorito-activo")) {
      favoriteBtn.setAttribute("data-i18n", "❤️ Añadir a Favoritos")
    } else if (favoriteBtn && favoriteBtn.classList.contains("favorito-activo")) {
      favoriteBtn.setAttribute("data-i18n", " En Favoritos")
    }
  
    // Add data-i18n attributes to rate button
    const rateBtn = document.querySelector(".rate-btn")
    if (rateBtn) {
      rateBtn.setAttribute("data-i18n", "⭐ Valorar")
    }
  
    // Add data-i18n attributes to section headings
    const ingredientsHeading = document.querySelector(".recipe-ingredients h2")
    if (ingredientsHeading) {
      ingredientsHeading.setAttribute("data-i18n", "Ingredientes")
    }
  
    const stepsHeading = document.querySelector(".recipe-steps h2")
    if (stepsHeading) {
      stepsHeading.setAttribute("data-i18n", "Pasos para la Receta")
    }
  
    // Add data-i18n attributes to comments section
    const commentsHeading = document.querySelector("#commentsSection h3")
    if (commentsHeading) {
      commentsHeading.setAttribute("data-i18n", "Deja tu comentario")
    }
  
    const commentTextarea = document.querySelector("#commentText")
    if (commentTextarea) {
      commentTextarea.setAttribute("data-i18n", "Escribe tu comentario aquí...")
      commentTextarea.setAttribute("placeholder", "Escribe tu comentario aquí...")
    }
  
    const submitCommentBtn = document.querySelector("#submitComment")
    if (submitCommentBtn) {
      submitCommentBtn.setAttribute("data-i18n", "Publicar")
    }
  
    const cancelReplyBtn = document.querySelector("#cancelReply")
    if (cancelReplyBtn) {
      cancelReplyBtn.setAttribute("data-i18n", "Cancelar")
    }
  
    const loadingComments = document.querySelector("#commentsList p")
    if (loadingComments && loadingComments.textContent === "Cargando comentarios...") {
      loadingComments.setAttribute("data-i18n", "Cargando comentarios...")
    }
  
    // Add data-i18n attributes to breadcrumb items
    const breadcrumbItems = document.querySelectorAll(".breadcrumb a, .breadcrumb")
    breadcrumbItems.forEach((item) => {
      const text = item.textContent.trim()
      if (text === "Inicio") {
        item.setAttribute("data-i18n", "Inicio")
      } else if (text.includes("Cultura")) {
        item.setAttribute("data-i18n", text)
      } else if (!text.includes(">")) {
        // This is likely the recipe name
        item.setAttribute("data-i18n", text)
      }
    })
  
    // Force update with current language
    setTimeout(() => {
      const currentLang = localStorage.getItem("selectedLanguage") || "es"
      if (typeof updateDynamicElements === "function") {
        updateDynamicElements(currentLang)
      }
    }, 100)
  })
  