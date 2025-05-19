document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado en index.js")

  // Configuración del slider de recetas
  const track = document.querySelector(".recipe-track")
  const prevButton = document.querySelector(".prev-button")
  const nextButton = document.querySelector(".next-button")

  if (!track) {
    console.error("No se encontró el elemento .recipe-track")
    return
  }

  const cards = track.querySelectorAll(".recipe-card")
  const cardCount = cards.length
  const cardsToShow = 5 // Mostrar 5 tarjetas a la vez
  let currentIndex = 0
  let autoSlideInterval
  let isAnimating = false // Bandera para evitar clics rápidos

  // Verificar si los elementos existen
  if (!prevButton || !nextButton || cardCount === 0) {
    console.error("Error: Elementos del slider no encontrados o no hay tarjetas.")
    return
  }

  console.log("Slider inicializado con", cardCount, "tarjetas")

  // Función para actualizar la posición del slider
  function updateSliderPosition() {
    const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)
    if (currentIndex > maxIndex) currentIndex = maxIndex

    // Obtener el idioma actual
    const currentLanguage = localStorage.getItem("language") || "es"

    // Usar un enfoque basado en display en lugar de transform para mayor estabilidad
    cards.forEach((card, index) => {
      // Determinar si la tarjeta debería ser visible
      const startIndex = currentIndex * cardsToShow
      const endIndex = startIndex + cardsToShow
      const isVisible = index >= startIndex && index < endIndex

      // Aplicar display directamente en lugar de transform
      card.style.display = isVisible ? "block" : "none"

      // Traducir TODAS las tarjetas, no solo las visibles
      const elementsToTranslate = card.querySelectorAll("[data-i18n]")
      elementsToTranslate.forEach((element) => {
        const key = element.getAttribute("data-i18n")
        if (
          window.i18n &&
          window.i18n.translations[currentLanguage] &&
          window.i18n.translations[currentLanguage][key]
        ) {
          element.textContent = window.i18n.translations[currentLanguage][key]
        }
      })
    })

    // Actualizar estado de los botones de navegación
    prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
    prevButton.style.cursor = currentIndex === 0 ? "default" : "pointer"
    nextButton.style.opacity = currentIndex >= maxIndex ? "0.5" : "1"
    nextButton.style.cursor = currentIndex >= maxIndex ? "default" : "pointer"

    // Permitir nuevos clics después de un tiempo
    setTimeout(() => {
      isAnimating = false
    }, 300)
  }

  function startAutoSlide() {
    // Limpiar cualquier intervalo existente para evitar múltiples intervalos
    clearInterval(autoSlideInterval)

    autoSlideInterval = setInterval(() => {
      // No hacer nada si hay una animación en curso
      if (isAnimating) return

      isAnimating = true
      const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)

      // Avanzar al siguiente grupo o volver al principio
      currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0
      updateSliderPosition()
    }, 25000) // Mantener el intervalo de 25 segundos
  }

  prevButton.addEventListener("click", () => {
    // Evitar clics durante la animación
    if (isAnimating) return
    isAnimating = true

    // Detener el autoplay para evitar conflictos
    clearInterval(autoSlideInterval)

    if (currentIndex > 0) {
      currentIndex--
      updateSliderPosition()
    } else {
      isAnimating = false // Permitir nuevos clics si no hay cambio
    }

    // Reiniciar el autoplay
    startAutoSlide()
  })

  nextButton.addEventListener("click", () => {
    // Evitar clics durante la animación
    if (isAnimating) return
    isAnimating = true

    // Detener el autoplay para evitar conflictos
    clearInterval(autoSlideInterval)

    const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)
    if (currentIndex < maxIndex) {
      currentIndex++
      updateSliderPosition()
    } else {
      isAnimating = false // Permitir nuevos clics si no hay cambio
    }

    // Reiniciar el autoplay
    startAutoSlide()
  })

  // Inicializar slider
  updateSliderPosition()
  startAutoSlide()

  // Event listener para resize
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      // No reiniciar a 0 para evitar saltos bruscos
      // Verificar si el índice actual es válido con el nuevo tamaño
      const maxIndex = Math.max(0, Math.ceil(cardCount / cardsToShow) - 1)
      if (currentIndex > maxIndex) currentIndex = maxIndex
      updateSliderPosition()
    }, 250)
  })

  // Event listeners para las tarjetas de recetas
  cards.forEach((card) => {
    // Crear overlay para el hover si no existe
    if (!card.querySelector(".recipe-overlay")) {
      const overlay = document.createElement("div")
      overlay.className = "recipe-overlay"

      // Obtener información de la receta
      const titleElement = card.querySelector("h3")
      const title = titleElement ? titleElement.textContent || "Receta" : "Receta"
      const descriptionElement = card.querySelector(".description p")
      const description = descriptionElement
        ? descriptionElement.textContent
        : "Deliciosa receta tradicional con ingredientes frescos y sabores únicos."

      // Crear contenido del overlay
      const titleDataI18n =
        titleElement && titleElement.hasAttribute("data-i18n") ? titleElement.getAttribute("data-i18n") : ""

      const descriptionDataI18n =
        descriptionElement && descriptionElement.hasAttribute("data-i18n")
          ? descriptionElement.getAttribute("data-i18n")
          : ""

      overlay.innerHTML = `
        &lt;h3 class="title" ${titleDataI18n ? `data-i18n="${titleDataI18n}"` : ""}&gt;${title}&lt;/h3&gt;
        &lt;p ${descriptionDataI18n ? `data-i18n="${descriptionDataI18n}"` : ""}&gt;${description}&lt;/p&gt;
        &lt;a href="#" class="read-more" data-i18n="Leer más"&gt;Leer más&lt;/a&gt;
      `

      // Añadir overlay a la tarjeta
      card.appendChild(overlay)
    }

    // Eventos de mouse
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
  })

  // Scroll suave para los enlaces de anclaje
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      if (targetId === "#") return
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Funcionalidad para el botón de scroll hacia arriba
  const scrollToTopButton = document.querySelector(".scroll-to-top")
  if (scrollToTopButton) {
    console.log("Botón de scroll encontrado:", scrollToTopButton)

    scrollToTopButton.addEventListener("click", () => {
      console.log("Botón de scroll clickeado")

      // Scroll suave hacia arriba
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  } else {
    console.error("Botón de scroll no encontrado")
  }

  // Añadir funcionalidad para el menú desplegable
  const menuToggle = document.getElementById("menuToggle")
  const overlayMenu = document.getElementById("overlayMenu")
  const closeMenu = document.getElementById("closeMenu")

  if (menuToggle && overlayMenu) {
    // Asegurarse de que el menú esté inicialmente oculto
    overlayMenu.classList.remove("active")

    menuToggle.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation() // Evitar que el clic se propague

      // Alternar la clase active
      overlayMenu.classList.toggle("active")
      console.log("Menú toggle clicked, overlay active:", overlayMenu.classList.contains("active"))
    })

    if (closeMenu) {
      closeMenu.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation() // Evitar que el clic se propague
        overlayMenu.classList.remove("active")
        console.log("Menú cerrado")
      })
    }

    // Cerrar al hacer clic fuera del menú
    document.addEventListener("click", (e) => {
      if (overlayMenu.classList.contains("active") && !overlayMenu.contains(e.target) && e.target !== menuToggle) {
        overlayMenu.classList.remove("active")
        console.log("Cerrado por clic fuera")
      }
    })
  } else {
    console.error("Elementos del menú no encontrados:", {
      menuToggle: menuToggle ? "encontrado" : "no encontrado",
      overlayMenu: overlayMenu ? "encontrado" : "no encontrado",
    })
  }

  // Asegurar que el footer se muestre correctamente
  function adjustFooterPosition() {
    const footer = document.querySelector("footer")
    const body = document.body
    const html = document.documentElement

    // Obtener la altura del documento
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    )

    // Si la altura del documento es menor que la ventana, ajustar el footer
    if (height <= window.innerHeight) {
      footer.style.position = "absolute"
      footer.style.bottom = "0"
      footer.style.width = "100%"
    } else {
      footer.style.position = "relative"
      footer.style.bottom = "auto"
    }
  }

  // Ejecutar al cargar y al cambiar el tamaño de la ventana
  adjustFooterPosition()
  window.addEventListener("resize", adjustFooterPosition)

  // Aplicar traducciones iniciales si el sistema i18n está disponible
  if (window.i18n && typeof window.i18n.translatePage === "function") {
    const currentLanguage = localStorage.getItem("language") || "es"
    window.i18n.translatePage(currentLanguage)
  }

  // Buscar la sección donde se maneja el clic en el nombre de usuario o donde se configura el enlace del perfil
  // Probablemente está en una función que se ejecuta cuando el documento está cargado
  // Añadir una condición para verificar el rol del usuario

  // Buscar algo como:
  // document.getElementById("user-profile-link").href = "US7_PaginaDeUsuario/usuario.html";

  // Y reemplazarlo con:
  const usuarioActual = JSON.parse(localStorage.getItem("usuario"))
  const userProfileLink = document.getElementById("user-profile-link")
  if (userProfileLink) {
    if (usuarioActual && usuarioActual.rol === "chef") {
      userProfileLink.href = "chef-page.html"
    } else {
      userProfileLink.href = "US7_PaginaDeUsuario/usuario.html"
    }
  }
})
