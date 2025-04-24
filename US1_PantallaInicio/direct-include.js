// Alternativa a include-components.js que inserta el contenido directamente
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado, insertando componentes directamente...")
  
    // Contenido de la navegación
    const navContent = `
      <!-- MENU NAVEGACIÓN -->
      <nav>
          <a href="index.html" class="logo">
              <img src="./Imagenes/logo-cocinando-juntos.png" alt="Logo Cocinando Juntos">
          </a>
          <!-- Buscador con botón -->
          <div class="search-container">
              <input type="text" id="search-input" placeholder="Buscar recetas..." data-i18n="Buscar recetas...">
              <button id="search-button" type="button">
                  <i class="fas fa-search"></i>
              </button>
              <button id="search-close" type="button">
                  <i class="fas fa-times"></i>
              </button>
              
              <!-- Contenedor para resultados de búsqueda -->
              <div id="search-results" class="search-results">
                  <!-- Los resultados se cargarán dinámicamente aquí -->
              </div>
          </div>
  
          <!-- Sección del user-info para mostrar usuario según el tipo -->
          <div id="user-info" class="user-info" style="display: none;">
              <img src="./Imagenes/blank-profile-picture-973460_1280.webp" alt="User Icon" class="user-icon">
              <a href="#" id="user-profile-link">
                  <span id="user-name">Nombre del usuario</span>
              </a>
              <a href="#" id="logout-btn" class="auth-buttons" data-i18n="Cerrar Sesión">Cerrar Sesión</a>
          </div>
  
          <a href="../login.html" id="auth-button" class="auth-buttons" data-i18n="Iniciar Sesión">Iniciar Sesión</a>
  
          <div class="menu-icon" id="menuToggle">☰</div>
      </nav>
  
      <!-- El menú desplegable debe estar aquí, fuera del nav -->
      <div class="overlay-menu" id="overlayMenu">
          <div class="overlay-content">
              <div class="close-btn" id="closeMenu">×</div>
              <div class="menu-section">
                  <h3 data-i18n="Culturas Gastronómicas">Culturas Gastronómicas</h3>
                  <ul>
                      <li><a href="cultura-china.html" data-i18n="China">China</a></li>
                      <li><a href="cultura-española.html" data-i18n="España">España</a></li>
                      <li><a href="cultura-francesa.html" data-i18n="Francia">Francia</a></li>
                      <li><a href="cultura-italiana.html" data-i18n="Italia">Italia</a></li>
                      <li><a href="cultura-japonesa.html" data-i18n="Japón">Japón</a></li>
                      <li><a href="cultura-venezolana.html" data-i18n="Venezuela">Venezuela</a></li>
                  </ul>
              </div>
              <div class="menu-section">
                  <h3 data-i18n="Tipo de Plato">Tipo de Plato</h3>
                  <ul>
                      <li><a href="../US12_MenuNavegacion/desayuno.html" data-i18n="Desayuno">Desayuno</a></li>
                      <li><a href="../US12_MenuNavegacion/comidas.html" data-i18n="Comida">Comida</a></li>
                      <li><a href="../US12_MenuNavegacion/merienda.html" data-i18n="Merienda">Merienda</a></li>
                      <li><a href="../US12_MenuNavegacion/cena.html" data-i18n="Cena">Cena</a></li>
                  </ul>
              </div>
              <div class="menu-section">
                  <h3 data-i18n="Dificultad de la Receta">Dificultad de la Receta</h3>
                  <ul>
                      <li><a href="../US12_MenuNavegacion/dificultad-facil.html" data-i18n="Fácil">Fácil</a></li>
                      <li><a href="../US12_MenuNavegacion/dificultad-media.html" data-i18n="Media">Media</a></li>
                      <li><a href="../US12_MenuNavegacion/dificultad-dificil.html" data-i18n="Difícil">Difícil</a></li>
                  </ul>
              </div>
          </div>
      </div>
      `
  
    // Contenido del footer
    const footerContent = `
      <footer>
          <div class="footer-container">
              <!-- Columna 1: Sobre Nosotros -->
              <div class="footer-links">
                  <h3 data-i18n="Sobre Nosotros">Sobre Nosotros</h3>
                  <ul>
                      <li><a href="./quienes-somos.html" data-i18n="Quiénes Somos">Quiénes Somos</a></li>
                      <li><a href="./contacto.html" data-i18n="Contacto">Contacto</a></li>
                  </ul>
              </div>
  
              <!-- Columna 2: Legal -->
              <div class="footer-links">
                  <h3 data-i18n="Legal">Legal</h3>
                  <ul>
                      <li><a href="./politica_privacidad.html" data-i18n="Política de Privacidad">Política de Privacidad</a></li>
                      <li><a href="./terminos_condiciones.html" data-i18n="Términos y Condiciones">Términos y Condiciones</a></li>
                      <li><a href="./politica_cookies.html" data-i18n="Política de Cookies">Política de Cookies</a></li>
                      <li><a href="./aviso_legal.html" data-i18n="Aviso Legal">Aviso Legal</a></li>
                  </ul>
              </div>
  
              <!-- Columna 3: Comunidad -->
              <div class="footer-links">
                  <h3 data-i18n="Comunidad">Comunidad</h3>
                  <ul>
                      <li><a href="./../Platos.html" data-i18n="Recetas">Recetas</a></li>
                      <li><a href="./chefs.html" data-i18n="Chefs">Chefs</a></li>
                  </ul>
              </div>
  
              <!-- Columna 4: Redes Sociales -->
              <div class="footer-social">
                  <h3 data-i18n="Síguenos">Síguenos</h3>
                  <div class="social-icons">
                      <a href="https://www.instagram.com/" aria-label="Instagram">
                          <img src="./Imagenes/logos/pngtree-instagram-icon-instagram-logo-png-image_3584853.png" alt="Instagram">
                      </a>
                      <a href="https://www.facebook.com/" aria-label="Facebook">
                          <img src="./Imagenes/logos/2023_Facebook_icon.svg.png" alt="Facebook">
                      </a>
                      <a href="https://x.com/" aria-label="Twitter">
                          <img src="./Imagenes/logos/Logo_of_Twitter.svg.png" alt="Twitter">
                      </a>
                      <a href="https://www.youtube.com/" aria-label="YouTube">
                          <img src="./Imagenes/logos/youtube.png" alt="YouTube">
                      </a>
                      <a href="https://es.pinterest.com/" aria-label="Pinterest">
                          <img src="./Imagenes/logos/51LdjRWonGL.png" alt="Pinterest">
                      </a>
                      <a href="https://www.tiktok.com/es/" aria-label="TikTok">
                          <img src="./Imagenes/logos/tiktok-6338432_1280.webp" alt="TikTok">
                      </a>
                  </div>
              </div>
          </div>
  
          <!-- Footer Bottom -->
          <div class="footer-bottom">
              <div class="footer-bottom-content">
                  <div class="copyright" data-i18n="© 2025 Cocinando Juntos - Todos los derechos reservados">
                      © 2025 Cocinando Juntos - Todos los derechos reservados
                  </div>
                  <!-- Footer bottom right -->
                  <div class="footer-bottom-right">
                      <div class="language-selector">
                          <label for="language" data-i18n="Idioma:">Idioma:</label>
                          <select id="language">
                              <option value="es">Español</option>
                              <option value="en">English</option>
                              <option value="ca">Català</option>
                          </select>
                      </div>
                      
                      <!-- Botón de scroll -->
                      <button type="button" id="scrollToTop" class="scroll-to-top" style="background: none; border: none; padding: 0; cursor: pointer;">
                        <img src="./Imagenes/animado.gif" alt="Volver arriba" class="scroll-gif">
                      </button>
                  </div>
              </div>
          </div>
      </footer>
      `
  
    // Insertar contenido
    const navPlaceholder = document.getElementById("nav-placeholder")
    const footerPlaceholder = document.getElementById("footer-placeholder")
  
    if (navPlaceholder) {
      console.log("Insertando navegación...")
      navPlaceholder.innerHTML = navContent
    } else {
      console.error("No se encontró el elemento nav-placeholder")
    }
  
    if (footerPlaceholder) {
      console.log("Insertando footer...")
      footerPlaceholder.innerHTML = footerContent
    } else {
      console.error("No se encontró el elemento footer-placeholder")
    }
  
    // Configurar funcionalidades después de insertar el contenido
    setupNavFunctionality()
    setupFooterFunctionality()
  })
  
  // Configurar funcionalidad de la navegación
  function setupNavFunctionality() {
    console.log("Configurando funcionalidad de navegación...")
    // Usuario y login
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const userInfo = document.getElementById("user-info")
    const authButton = document.getElementById("auth-button")
    const userProfileLink = document.getElementById("user-profile-link")
  
    if (userInfo && authButton) {
      if (usuario) {
        userInfo.style.display = "flex"
        const userNameElement = document.getElementById("user-name")
        if (userNameElement) {
          userNameElement.textContent = usuario.username || "Usuario"
        }
        authButton.style.display = "none"
  
        // Determinar tipo de usuario y enlace correcto
        if (userProfileLink) {
          if (usuario.username === "admin") {
            userProfileLink.href = "./../US10_PaginaAdmin/PaginaAdmin.html"
          } else {
            userProfileLink.href = "../US7_PaginaDeUsuario/usuario.html"
          }
        }
  
        // Funcionalidad de cierre de sesión
        const logoutBtn = document.getElementById("logout-btn")
        if (logoutBtn) {
          logoutBtn.addEventListener("click", (e) => {
            e.preventDefault()
            localStorage.removeItem("usuario")
            window.location.reload()
          })
        }
      } else {
        userInfo.style.display = "none"
        authButton.style.display = "block"
      }
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
  
    if (searchButton && searchInput && searchResults) {
      searchButton.addEventListener("click", () => {
        // Aquí iría la lógica de búsqueda
        const query = searchInput.value.trim()
        if (query) {
          // Implementar búsqueda
          console.log("Buscando:", query)
          searchResults.style.display = "block"
        }
      })
  
      if (searchClose) {
        searchClose.addEventListener("click", () => {
          searchResults.style.display = "none"
          searchInput.value = ""
        })
      }
    }
  }
  
  // Configurar funcionalidad del footer
  function setupFooterFunctionality() {
    console.log("Configurando funcionalidad del footer...")
    // Selector de idioma
    const languageSelector = document.getElementById("language")
    if (languageSelector) {
      languageSelector.addEventListener("change", function () {
        const selectedLanguage = this.value
        console.log("Cambiando idioma a:", selectedLanguage)
        // Aquí iría la lógica para cambiar el idioma
        if (typeof window.changeLanguage === "function") {
          window.changeLanguage(selectedLanguage)
        }
      })
    }
  
    // Botón de scroll
    const scrollBtn = document.getElementById("scrollToTop")
    if (scrollBtn) {
      scrollBtn.addEventListener("click", (e) => {
        e.preventDefault()
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  }
  