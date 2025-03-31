// Configuración de Supabase
window.RECIPE_CONFIG = window.RECIPE_CONFIG || {
    SUPABASE_URL: "https://uonkcjrokwtgvimjxawm.supabase.co",
    SUPABASE_API_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU",
  }
  
  // Función para mezclar aleatoriamente un array
  function shuffleArray(array) {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }
  
  // Función para obtener la ruta de la imagen según la receta
  function getImagePath(receta) {
    // Mapeo de títulos específicos a imágenes
    const titleImages = {
      "Pollo Agridulce": "./Imagenes/China/pollo-agridulce.jpg",
      "Sweet and Sour Chicken": "./Imagenes/China/pollo-agridulce.jpg",
      "Pollastre Agredolç": "./Imagenes/China/pollo-agridulce.jpg",
      "Galletas de Sésamo": "./Imagenes/China/galletas-de-sesamo.jpg",
      "Sesame Cookies": "./Imagenes/China/galletas-de-sesamo.jpg",
      "Galetes de Sèsam": "./Imagenes/China/galletas-de-sesamo.jpg",
      "Bollitos Chinos": "./Imagenes/China/bollitos-chinos.jpg",
      "Chinese Buns": "./Imagenes/China/bollitos-chinos.jpg",
      "Panets Xinesos": "./Imagenes/China/bollitos-chinos.jpg",
      "Fideos Salteados": "./Imagenes/China/fideos-salteados.jpg",
      "Stir-Fried Noodles": "./Imagenes/China/fideos-salteados.jpg",
      "Fideus Saltats": "./Imagenes/China/fideos-salteados.jpg",
      "Sopa Wonton": "./Imagenes/China/sopa-wonton.jpg",
      "Wonton Soup": "./Imagenes/China/sopa-wonton.jpg",
      "Sopa de Wonton": "./Imagenes/China/sopa-wonton.jpg",
      Paella: "./Imagenes/España/paella.png",
      "Bizcocho Capuccino": "./Imagenes/España/bizcocho.jpg",
      "Cappuccino Cake": "./Imagenes/España/bizcocho.jpg",
      "Churros con Chocolate": "./Imagenes/España/churros.jpg",
      "Crepas Dulces": "./Imagenes/Francia/crepas-dulces.jpg",
      "Sweet Crepes": "./Imagenes/Francia/crepas-dulces.jpg",
      "Tortilla Española": "./Imagenes/España/tortilla-patatas.jpeg",
      "Spanish Omelette": "./Imagenes/España/tortilla-patatas.jpeg",
      "Quiche Lorraine": "./Imagenes/Francia/quiche-lorraine.jpg",
      "Bolitas Chinas": "./Imagenes/China/bollitos-chinos.jpg",
      "Coq au Vin": "./Imagenes/Francia/coq-au-vin.jpg",
    }
  
    // Mapeo de categorías a imágenes
    const categoryImages = {
      Desayuno: "./Imagenes/China/bollitos-chinos.jpg",
      Breakfast: "./Imagenes/China/bollitos-chinos.jpg",
      Comida: "./Imagenes/China/pollo-agridulce.jpg",
      Lunch: "./Imagenes/China/pollo-agridulce.jpg",
      Merienda: "./Imagenes/China/galletas-de-sesamo.jpg",
      Snack: "./Imagenes/China/galletas-de-sesamo.jpg",
      Cena: "./Imagenes/China/fideos-salteados.jpg",
      Dinner: "./Imagenes/China/fideos-salteados.jpg",
      Sopa: "./Imagenes/China/sopa-wonton.jpg",
      Soup: "./Imagenes/China/sopa-wonton.jpg",
    }
  
    // Primero intentar encontrar una imagen por título exacto
    if (titleImages[receta.titulo]) {
      return titleImages[receta.titulo]
    }
  
    // Luego intentar por categoría
    if (categoryImages[receta.categoria]) {
      return categoryImages[receta.categoria]
    }
  
    // Imagen por defecto
    return "./Imagenes/default-recipe.jpg"
  }
  
  // Función para traducir la descripción de la receta
  function getTranslatedDescription(receta, language) {
    // Si hay una descripción en la receta, usarla
    if (receta.descripcion) {
      // Intentar traducir la descripción si existe una traducción
      const descKey = `description-${receta.id}`
      if (window.i18n?.translations[language]?.[descKey]) {
        return window.i18n.translations[language][descKey]
      }
  
      // Si no hay traducción específica, devolver la descripción original
      return receta.descripcion
    }
  
    // Si no hay descripción, usar un texto predeterminado según el idioma
    if (language === "es") {
      return "Deliciosa receta tradicional con ingredientes frescos y sabores únicos."
    } else if (language === "ca") {
      return "Deliciosa recepta tradicional amb ingredients frescos i sabors únics."
    } else {
      return "Delicious traditional recipe with fresh ingredients and unique flavors."
    }
  }
  
  // Función para añadir estilos CSS para las tarjetas de recetas
  function addRecipeCardStyles() {
    // Verificar si los estilos ya existen
    if (document.getElementById("recipe-card-styles")) {
      return
    }
  
    // Crear elemento de estilo
    const styleElement = document.createElement("style")
    styleElement.id = "recipe-card-styles"
  
    // Definir los estilos CSS
    styleElement.textContent = `
      .recipe-slider {
        width: 100%;
        margin: 20px auto;
        position: relative;
        padding: 0 60px;
      }
      
      .recipe-track {
        display: flex;
        gap: 20px;
        padding: 10px 0;
      }
      
      .recipe-card {
        position: relative;
        width: 280px;
        height: 380px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        background-color: white;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
        margin: 0 auto;
      }
      
      .recipe-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      
      .recipe-image {
        height: 220px;
        overflow: hidden;
      }
      
      .recipe-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      .recipe-card:hover .recipe-image img {
        transform: scale(1.05);
      }
      
      .recipe-content {
        padding: 15px;
        height: 160px;
        display: flex;
        flex-direction: column;
      }
      
      .recipe-content h3 {
        margin: 0 0 15px;
        font-size: 20px;
        color: #333;
        font-weight: 600;
        text-align: center;
      }
      
      .recipe-meta {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin-top: auto;
      }
      
      .recipe-meta span {
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 14px;
        background-color: #f5f5f5;
        color: #666;
      }
      
      .recipe-meta .difficulty {
        background-color: #f8f1e9;
        color: #6b4423;
      }
      
      .recipe-meta .time {
        background-color: #e3f2fd;
        color: #0d47a1;
      }
      
      .recipe-meta .category {
        background-color: #e8f5e9;
        color: #1b5e20;
      }
      
      .recipe-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%);
      }
      
      .recipe-overlay.active {
        opacity: 1;
        pointer-events: auto;
      }
      
      .overlay-content {
        position: relative;
        z-index: 2;
        padding: 25px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      
      .recipe-overlay .title {
        margin: 0 0 15px;
        font-size: 24px;
        font-weight: 700;
        color: white;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      }
      
      .recipe-overlay p {
        margin: 0 0 20px;
        font-size: 16px;
        line-height: 1.6;
        color: white;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        max-width: 90%;
      }
      
      .recipe-overlay .read-more {
        display: inline-block;
        padding: 8px 20px;
        background-color: #6b4423;
        color: white;
        text-decoration: none;
        font-weight: 600;
        font-size: 14px;
        border-radius: 25px;
        transition: background-color 0.3s ease;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }
      
      .recipe-overlay .read-more:hover {
        background-color: #8b5d33;
      }
      
      .slider-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        background-color: #f8a100;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        color: white;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        z-index: 10;
        transition: background-color 0.3s ease;
      }
      
      .slider-nav:hover {
        background-color: #f57c00;
      }
      
      .prev-button {
        left: 10px;
      }
      
      .next-button {
        right: 10px;
      }
  
      /* Estilos para el footer */
      footer {
        background: linear-gradient(135deg, #8b5d33 0%, #6b4423 100%);
        color: white;
        padding: 3rem 0 0;
        position: relative;
        width: 100%;
        margin-top: auto;
        min-height: fit-content;
        height: auto;
        overflow: visible;
        box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
      }
      
      footer::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(to right, #f8f1e9, #d4c3b5, #f8f1e9);
      }
      
      .footer-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
      }
      
      .footer-links {
        flex: 1;
        min-width: auto;
        margin: 0;
      }
      
      .footer-links h3 {
        margin-bottom: 1.5rem;
        font-size: 1.3rem;
        position: relative;
        padding-bottom: 0.8rem;
        color: #f8f1e9;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      
      .footer-links h3::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 40px;
        height: 2px;
        background-color: #f8f1e9;
      }
      
      .footer-links ul {
        list-style: none;
        padding: 0;
      }
      
      .footer-links ul li {
        margin: 0.8rem 0;
        transition: transform 0.3s ease;
      }
      
      .footer-links ul li:hover {
        transform: translateX(5px);
      }
      
      .footer-links ul li a {
        color: #f8f1e9;
        text-decoration: none;
        font-size: 0.95rem;
        transition: color 0.3s ease;
        display: block;
        opacity: 0.9;
      }
      
      .footer-links ul li a:hover {
        color: #ffffff;
        opacity: 1;
      }
      
      .footer-social {
        flex: 1;
        min-width: auto;
        margin: 0;
      }
      
      .footer-social h3 {
        margin-bottom: 1.5rem;
        font-size: 1.3rem;
        position: relative;
        padding-bottom: 0.8rem;
        color: #f8f1e9;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      
      .footer-social h3::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 40px;
        height: 2px;
        background-color: #f8f1e9;
      }
      
      .social-icons {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      
      .social-icons a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      
      .social-icons a:hover {
        background-color: #fff;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      
      .social-icons a img {
        width: 20px;
        height: 20px;
        filter: brightness(0) invert(1);
        transition: filter 0.3s ease;
      }
      
      .social-icons a:hover img {
        filter: brightness(0);
      }
      
      /* Nuevo estilo para el footer bottom */
      .footer-bottom {
        width: 100%;
        padding: 1.5rem 0;
        margin-top: 2rem;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
      }
      
      /* Contenedor para el copyright, selector de idioma y botón de scroll */
      .footer-bottom-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
      }
      
      .copyright {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.8);
      }
      
      /* Nuevo contenedor para el selector de idioma y el botón de scroll */
      .footer-bottom-right {
        display: flex;
        align-items: center;
        gap: 1.5rem;
      }
      
      .language-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .language-selector label {
        margin-right: 0.5rem;
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
      }
      
      .language-selector select {
        padding: 0.5rem 1rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .language-selector select:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
      
      .language-selector select option {
        background-color: #6b4423;
        color: #fff;
      }
      
      /* Ajustar el botón de scroll - Eliminar el fondo marrón */
      .scroll-to-top {
        position: fixed !important;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: transparent !important;
        border: none;
        cursor: pointer;
        z-index: 9999;
        display: none;
        transition: opacity 0.3s ease;
        padding: 0;
      }
      
      .scroll-to-top .scroll-gif {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }
      
      /* Responsive Footer */
      @media screen and (max-width: 992px) {
        .footer-container {
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
      
        .footer-bottom-content {
          flex-direction: column;
          gap: 1rem;
        }
      
        .footer-bottom-right {
          width: 100%;
          justify-content: center;
        }
      }
      
      @media screen and (max-width: 576px) {
        .footer-container {
          grid-template-columns: 1fr;
          gap: 2rem;
          padding: 0 1rem;
        }
      
        .footer-links,
        .footer-social {
          text-align: center;
        }
      
        .footer-links h3::after,
        .footer-social h3::after {
          left: 50%;
          transform: translateX(-50%);
        }
      
        .social-icons {
          justify-content: center;
        }
      
        .footer-bottom-right {
          flex-direction: column;
          gap: 1rem;
        }
      }
    `
  
    // Añadir los estilos al head del documento
    document.head.appendChild(styleElement)
  }
  
  // Función para crear una tarjeta de receta
  function createRecipeCard(receta, language) {
    const card = document.createElement("div")
    card.className = "recipe-card"
    card.setAttribute("data-recipe-id", receta.id)
    card.setAttribute("data-culture", receta.categoria || "Internacional")
    card.setAttribute("data-time", receta.tiempo || "30")
    card.setAttribute("data-difficulty", receta.dificultad || "Media")
  
    // Obtener traducciones según el idioma actual
    let titulo = receta.titulo
    let dificultad = receta.dificultad || "Media"
    let categoria = receta.categoria || "Plato principal"
    const tiempo = receta.tiempo || "30"
    const descripcion = getTranslatedDescription(receta, language)
    let leerMas = "Read more"
  
    // Traducir título
    if (window.i18n?.translations[language]?.[titulo]) {
      titulo = window.i18n.translations[language][titulo]
    }
  
    // Traducir dificultad
    if (window.i18n?.translations[language]?.[dificultad]) {
      dificultad = window.i18n.translations[language][dificultad]
    }
  
    // Traducir categoría
    if (window.i18n?.translations[language]?.[categoria]) {
      categoria = window.i18n.translations[language][categoria]
    }
  
    // Traducir "Read more"
    if (window.i18n?.translations[language]?.["Read more"]) {
      leerMas = window.i18n.translations[language]["Read more"]
    } else if (language === "es") {
      leerMas = "Leer más"
    } else if (language === "ca") {
      leerMas = "Llegir més"
    }
  
    // Obtener la ruta de la imagen
    const imagePath = receta.imagen_url || getImagePath(receta)
  
    // Crear el HTML de la tarjeta con el overlay para el hover
    card.innerHTML = `
      <div class="recipe-image">
        <img src="${imagePath}" alt="${titulo}" onerror="this.src='./Imagenes/default-recipe.jpg'">
      </div>
      <div class="recipe-content">
        <h3 data-i18n="${receta.titulo}">${titulo}</h3>
        <div class="recipe-meta">
          <span class="difficulty" data-i18n="${receta.dificultad}">${dificultad}</span>
          <span class="time">${tiempo} min</span>
          <span class="category" data-i18n="${receta.categoria}">${categoria}</span>
        </div>
      </div>
      <div class="recipe-overlay">
        <div class="overlay-content">
          <h3 class="title" data-i18n="${receta.titulo}">${titulo}</h3>
          <p data-i18n="description-${receta.id}">${descripcion}</p>
          <a href="#" class="read-more" data-i18n="Read more">${leerMas}</a>
        </div>
      </div>
    `
  
    // Añadir eventos de mouse para el overlay
    card.addEventListener("mouseenter", () => {
      const overlay = card.querySelector(".recipe-overlay")
      if (overlay) {
        overlay.classList.add("active")
      }
    })
  
    card.addEventListener("mouseleave", () => {
      const overlay = card.querySelector(".recipe-overlay")
      if (overlay) {
        overlay.classList.remove("active")
      }
    })
  
    // Añadir evento de clic para redirigir a la página de la receta
    card.addEventListener("click", (e) => {
      // No redirigir si se hizo clic en el enlace "Leer más"
      if (e.target.classList.contains("read-more")) {
        e.preventDefault()
        return
      }
      window.location.href = `/US6_GuardarRecetas/receta.html?id=${receta.id}`
    })
  
    return card
  }
  
  // Función para actualizar las traducciones de las recetas
  function updateRecipeTranslations(language) {
    const cards = document.querySelectorAll(".recipe-card")
  
    cards.forEach((card) => {
      // Obtener elementos a traducir
      const title = card.querySelector("h3")
      const overlayTitle = card.querySelector(".recipe-overlay .title")
      const difficulty = card.querySelector(".difficulty")
      const category = card.querySelector(".category")
      const description = card.querySelector(".recipe-overlay p")
      const readMore = card.querySelector(".read-more")
  
      // Traducir título
      if (title && title.hasAttribute("data-i18n")) {
        const titleKey = title.getAttribute("data-i18n")
        if (window.i18n?.translations[language]?.[titleKey]) {
          title.textContent = window.i18n.translations[language][titleKey]
          if (overlayTitle) {
            overlayTitle.textContent = window.i18n.translations[language][titleKey]
          }
        }
      }
  
      // Traducir dificultad
      if (difficulty && difficulty.hasAttribute("data-i18n")) {
        const difficultyKey = difficulty.getAttribute("data-i18n")
        if (window.i18n?.translations[language]?.[difficultyKey]) {
          difficulty.textContent = window.i18n.translations[language][difficultyKey]
        }
      }
  
      // Traducir categoría
      if (category && category.hasAttribute("data-i18n")) {
        const categoryKey = category.getAttribute("data-i18n")
        if (window.i18n?.translations[language]?.[categoryKey]) {
          category.textContent = window.i18n.translations[language][categoryKey]
        }
      }
  
      // Traducir descripción
      if (description && description.hasAttribute("data-i18n")) {
        const descKey = description.getAttribute("data-i18n")
        if (window.i18n?.translations[language]?.[descKey]) {
          description.textContent = window.i18n.translations[language][descKey]
        }
      }
  
      // Traducir "Read more"
      if (readMore) {
        if (language === "es") {
          readMore.textContent = "Leer más"
        } else if (language === "ca") {
          readMore.textContent = "Llegir més"
        } else {
          readMore.textContent = "Read more"
        }
      }
    })
  }
  
  // Función principal para cargar recetas aleatorias
  async function loadRandomRecipes() {
    try {
      // Obtener el contenedor de recetas
      const recipeTrack = document.querySelector(".recipe-track")
      if (!recipeTrack) {
        console.error("No se encontró el contenedor de recetas")
        return
      }
  
      // Mostrar mensaje de carga
      recipeTrack.innerHTML = `
        <div class="loading-indicator">
          <p>Cargando recetas...</p>
        </div>
      `
  
      // Inicializar Supabase
      const supabase = window.supabase.createClient(
        window.RECIPE_CONFIG.SUPABASE_URL,
        window.RECIPE_CONFIG.SUPABASE_API_KEY,
      )
  
      // Obtener todas las recetas de la base de datos
      const { data: recetas, error } = await supabase.from("recetas").select("*")
  
      if (error) {
        throw new Error(`Error al obtener recetas: ${error.message}`)
      }
  
      if (!recetas || recetas.length === 0) {
        throw new Error("No se encontraron recetas en la base de datos")
      }
  
      // Mezclar las recetas aleatoriamente y tomar las primeras 10
      const recetasAleatorias = shuffleArray(recetas).slice(0, 10)
  
      // Limpiar el contenedor de recetas
      recipeTrack.innerHTML = ""
  
      // Obtener el idioma actual
      const currentLanguage = localStorage.getItem("language") || "es"
  
      // Añadir las recetas al contenedor
      recetasAleatorias.forEach((receta) => {
        const recipeCard = createRecipeCard(receta, currentLanguage)
        recipeTrack.appendChild(recipeCard)
      })
  
      // Inicializar el slider
      initializeRecipeSlider()
  
      // Añadir estilos CSS para el overlay
      addRecipeCardStyles()
  
      console.log(`✅ Se han cargado ${recetasAleatorias.length} recetas aleatorias`)
    } catch (error) {
      console.error("Error al cargar las recetas:", error)
      const recipeTrack = document.querySelector(".recipe-track")
      if (recipeTrack) {
        recipeTrack.innerHTML = `
          <div class="error-message">
            <p>Error al cargar las recetas. Por favor, intenta recargar la página.</p>
          </div>
        `
      }
    }
  }
  
  // Función para inicializar el slider
  function initializeRecipeSlider() {
    const track = document.querySelector(".recipe-track")
    const prevButton = document.querySelector(".prev-button")
    const nextButton = document.querySelector(".next-button")
  
    if (!track || !prevButton || !nextButton) {
      console.error("Error: No se encontraron los elementos del slider")
      return
    }
  
    const cards = track.querySelectorAll(".recipe-card")
    const cardCount = cards.length
  
    if (cardCount === 0) {
      console.error("Error: No hay tarjetas de recetas")
      return
    }
  
    // Variables para controlar el estado del slider
    let currentIndex = 0
    let isSliding = false
  
    // Función para determinar cuántas tarjetas mostrar según el ancho de la ventana
    function getCardsToShow() {
      if (window.innerWidth >= 1400) return 5
      if (window.innerWidth >= 1100) return 4
      if (window.innerWidth >= 850) return 3
      if (window.innerWidth >= 600) return 2
      return 1
    }
  
    let cardsToShow = getCardsToShow()
  
    // Función para actualizar la posición del slider
    function updateRecipeSliderPosition() {
      // Asegurar que el índice actual sea válido
      const maxIndex = Math.max(0, cardCount - cardsToShow)
      if (currentIndex > maxIndex) currentIndex = maxIndex
  
      // Mostrar/ocultar tarjetas según el índice actual
      cards.forEach((card, index) => {
        const isVisible = index >= currentIndex && index < currentIndex + cardsToShow
        card.style.display = isVisible ? "block" : "none"
      })
  
      // Actualizar estado de los botones
      prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
      prevButton.style.cursor = currentIndex === 0 ? "default" : "pointer"
      nextButton.style.opacity = currentIndex >= maxIndex ? "0.5" : "1"
      nextButton.style.cursor = currentIndex >= maxIndex ? "default" : "pointer"
  
      // Permitir nuevos clics después de un tiempo
      setTimeout(() => {
        isSliding = false
      }, 300)
    }
  
    // Event listeners para los botones
    prevButton.addEventListener("click", () => {
      if (isSliding) return
      isSliding = true
  
      if (currentIndex > 0) {
        currentIndex--
        updateRecipeSliderPosition()
      } else {
        isSliding = false
      }
    })
  
    nextButton.addEventListener("click", () => {
      if (isSliding) return
      isSliding = true
  
      const maxIndex = Math.max(0, cardCount - cardsToShow)
      if (currentIndex < maxIndex) {
        currentIndex++
        updateRecipeSliderPosition()
      } else {
        isSliding = false
      }
    })
  
    // Actualizar cuando cambie el tamaño de la ventana
    window.addEventListener("resize", () => {
      const newCardsToShow = getCardsToShow()
      if (cardsToShow !== newCardsToShow) {
        cardsToShow = newCardsToShow
        updateRecipeSliderPosition()
      }
    })
  
    // Inicializar el slider
    updateRecipeSliderPosition()
  
    // Exponer la función para que pueda ser llamada desde otros scripts
    window.updateRecipeSliderPosition = updateRecipeSliderPosition
  }
  
  // Exponer funciones para uso global
  window.loadRandomRecipes = loadRandomRecipes
  window.updateRecipeTranslations = updateRecipeTranslations
  window.initializeRecipeSlider = initializeRecipeSlider
  
  // Cargar recetas aleatorias cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", () => {
    // Asegurarse de que Supabase esté cargado antes de intentar cargar las recetas
    if (window.supabase) {
      loadRandomRecipes()
    } else {
      // Si Supabase no está cargado, esperar un poco y volver a intentar
      console.log("Esperando a que Supabase se cargue...")
      setTimeout(loadRandomRecipes, 1000)
    }
  })
  
  // Escuchar cambios de idioma
  document.addEventListener("languageChanged", (e) => {
    if (typeof window.updateRecipeTranslations === "function") {
      window.updateRecipeTranslations(e.detail.language)
    }
  })
  
  