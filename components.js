// Componentes reutilizables para Cocinando Juntos
class Components {
    // Método para renderizar el navegador completo (con buscador)
    static renderNavbar(containerId = 'navbar-container') {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Contenedor con ID '${containerId}' no encontrado.`);
        return;
      }
  
      container.innerHTML = `
        <nav>
          <a href="index.html" class="logo">
              <img src="./Imagenes/logo-cocinando-juntos.png" alt="Logo Cocinando Juntos">
          </a>
          <!-- Buscador con botón -->
          <div class="search-container">
              <input type="text" id="search-input" placeholder="Buscar recetas...">
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
  
          <!-- Modificar la sección del user-info para mostrar solo un usuario según el tipo -->
          <div id="user-info" class="user-info" style="display: none;">
              <img src="./Imagenes/blank-profile-picture-973460_1280.webp" alt="User Icon" class="user-icon">
              <a href="#" id="user-profile-link">
                  <span id="user-name">Nombre del usuario</span>
              </a>
              <a href="#" id="logout-btn" class="auth-buttons">Cerrar Sesión</a>
          </div>
  
          <a href="../login.html" id="auth-button" class="auth-buttons">Iniciar Sesión</a>
  
          <div class="menu-icon" id="menuToggle">☰</div>
        </nav>
  
        <!-- El menú desplegable debe estar aquí, fuera del nav -->
        <div class="overlay-menu" id="overlayMenu">
          <div class="overlay-content">
              <div class="close-btn" id="closeMenu">×</div>
              <div class="menu-section">
                  <h3>Culturas Gastronómicas</h3>
                  <ul>
                      <li><a href="cultura-china.html">China</a></li>
                      <li><a href="cultura-española.html">Española</a></li>
                      <li><a href="cultura-francesa.html">Francesa</a></li>
                      <li><a href="cultura-italiana.html">Italiana</a></li>
                      <li><a href="cultura-japonesa.html">Japonesa</a></li>
                      <li><a href="cultura-venezolana.html">Venezolana</a></li>
                  </ul>
              </div>
              <div class="menu-section">
                  <h3>Tipo de Plato</h3>
                  <ul>
                      <li><a href="../US12_MenuNavegacion/desayuno.html">Desayuno</a></li>
                      <li><a href="../US12_MenuNavegacion/comidas.html">Comida</a></li>
                      <li><a href="../US12_MenuNavegacion/merienda.html">Merienda</a></li>
                      <li><a href="../US12_MenuNavegacion/cena.html">Cena</a></li>
                  </ul>
              </div>
              <div class="menu-section">
                  <h3>Dificultad de la Receta</h3>
                  <ul>
                      <li><a href="../US12_MenuNavegacion/dificultad-facil.html">Fácil</a></li>
                      <li><a href="../US12_MenuNavegacion/dificultad-media.html">Media</a></li>
                      <li><a href="../US12_MenuNavegacion/dificultad-dificil.html">Difícil</a></li>
                  </ul>
              </div>
          </div>
        </div>
      `;
  
      // Inicializar la funcionalidad del menú después de renderizar
      this.initNavbarFunctionality();
    }
  
    // Método para renderizar el navegador secundario (sin buscador)
    static renderSimpleNavbar(containerId = 'navbar-container') {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Contenedor con ID '${containerId}' no encontrado.`);
        return;
      }
  
      container.innerHTML = `
        <nav>
          <a href="index.html" class="logo">
              <img src="./Imagenes/logo-cocinando-juntos.png" alt="Logo Cocinando Juntos">
          </a>
  
          <!-- Modificar la sección del user-info para mostrar solo un usuario según el tipo -->
          <div id="user-info" class="user-info" style="display: none;">
              <img src="./Imagenes/blank-profile-picture-973460_1280.webp" alt="User Icon" class="user-icon">
              <a href="#" id="user-profile-link">
                  <span id="user-name">Nombre del usuario</span>
              </a>
              <a href="#" id="logout-btn" class="auth-buttons">Cerrar Sesión</a>
          </div>
  
          <a href="../login.html" id="auth-button" class="auth-buttons">Iniciar Sesión</a>
  
          <div class="menu-icon" id="menuToggle">☰</div>
        </nav>
  
        <!-- El menú desplegable debe estar aquí, fuera del nav -->
        <div class="overlay-menu" id="overlayMenu">
          <div class="overlay-content">
              <div class="close-btn" id="closeMenu">×</div>
              <div class="menu-section">
                  <h3>Culturas Gastronómicas</h3>
                  <ul>
                      <li><a href="cultura-china.html">China</a></li>
                      <li><a href="cultura-española.html">Española</a></li>
                      <li><a href="cultura-francesa.html">Francesa</a></li>
                      <li><a href="cultura-italiana.html">Italiana</a></li>
                      <li><a href="cultura-japonesa.html">Japonesa</a></li>
                      <li><a href="cultura-venezolana.html">Venezolana</a></li>
                  </ul>
              </div>
              <div class="menu-section">
                  <h3>Tipo de Plato</h3>
                  <ul>
                      <li><a href="../US12_MenuNavegacion/desayuno.html">Desayuno</a></li>
                      <li><a href="../US12_MenuNavegacion/comidas.html">Comida</a></li>
                      <li><a href="../US12_MenuNavegacion/merienda.html">Merienda</a></li>
                      <li><a href="../US12_MenuNavegacion/cena.html">Cena</a></li>
                  </ul>
              </div>
              <div class="menu-section">
                  <h3>Dificultad de la Receta</h3>
                  <ul>
                      <li><a href="../US12_MenuNavegacion/dificultad-facil.html">Fácil</a></li>
                      <li><a href="../US12_MenuNavegacion/dificultad-media.html">Media</a></li>
                      <li><a href="../US12_MenuNavegacion/dificultad-dificil.html">Difícil</a></li>
                  </ul>
              </div>
          </div>
        </div>
      `;
  
      // Inicializar la funcionalidad del menú después de renderizar
      this.initNavbarFunctionality();
    }
  
    // Método para renderizar el footer
    static renderFooter(containerId = 'footer-container') {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Contenedor con ID '${containerId}' no encontrado.`);
        return;
      }
  
      container.innerHTML = `
        <footer>
          <div class="footer-container">
              <!-- Columna 1: Sobre Nosotros -->
              <div class="footer-links">
                  <h3>Sobre Nosotros</h3>
                  <ul>
                      <li><a href="./quienes-somos.html">Quiénes Somos</a></li>
                      <li><a href="./contacto.html">Contacto</a></li>
                  </ul>
              </div>
  
              <!-- Columna 2: Legal -->
              <div class="footer-links">
                  <h3>Legal</h3>
                  <ul>
                      <li><a href="./politica_privacidad.html">Política de Privacidad</a></li>
                      <li><a href="./terminos_condiciones.html">Términos y Condiciones</a></li>
                      <li><a href="./politica_cookies.html">Política de Cookies</a></li>
                      <li><a href="./aviso_legal.html">Aviso Legal</a></li>
                  </ul>
              </div>
  
              <!-- Columna 3: Comunidad -->
              <div class="footer-links">
                  <h3>Comunidad</h3>
                  <ul>
                      <li><a href="./../Platos.html">Recetas</a></li>
                      <li><a href="./chefs.html">Chefs</a></li>
                  </ul>
              </div>
  
              <!-- Columna 4: Redes Sociales -->
              <div class="footer-social">
                  <h3>Síguenos</h3>
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
                  <div class="copyright">
                      © 2025 Cocinando Juntos - Todos los derechos reservados
                  </div>
                  <!-- Dentro del footer-bottom-right -->
                  <div class="footer-bottom-right">
                      <div class="language-selector">
                          <label for="language">Idioma:</label>
                          <select id="language">
                              <option value="es">Español</option>
                              <option value="en">English</option>
                              <option value="mi">Miguel</option>
                          </select>
                      </div>
                      <!-- Botón de scroll -->
                      <div class="scroll-to-top" id="scrollToTop">
                        <img src="./Imagenes/animado.gif" alt="Volver arriba" class="scroll-gif">
                      </div>
                  </div>
              </div>
          </div>
        </footer>
      `;
  
      // Inicializar la funcionalidad del footer después de renderizar
      this.initFooterFunctionality();
    }
  
    // Inicializar la funcionalidad del navbar
    static initNavbarFunctionality() {
      // Menú desplegable
      const menuToggle = document.getElementById('menuToggle');
      const overlayMenu = document.getElementById('overlayMenu');
      const closeMenu = document.getElementById('closeMenu');
      
      if (menuToggle && overlayMenu) {
        menuToggle.addEventListener('click', function (e) {
          e.preventDefault();
          overlayMenu.classList.toggle('active');
          console.log('Menú toggle clicked, overlay active:', overlayMenu.classList.contains('active'));
        });
        
        if (closeMenu) {
          closeMenu.addEventListener('click', function () {
            overlayMenu.classList.remove('active');
            console.log('Menú cerrado');
          });
        }
        
        // Cerrar al hacer clic fuera del menú
        overlayMenu.addEventListener('click', function (e) {
          if (e.target === this) {
            this.classList.remove('active');
            console.log('Cerrado por clic fuera');
          }
        });
      }
  
      // Gestión de usuario
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const userInfo = document.getElementById("user-info");
      const authButton = document.getElementById("auth-button");
      const userProfileLink = document.getElementById("user-profile-link");
  
      if (usuario) {
        // Mostrar la información del usuario
        userInfo.style.display = "flex";
        document.getElementById("user-name").textContent = usuario.username || "Usuario";
        authButton.style.display = "none";
  
        // Determinar el tipo de usuario y establecer el enlace correcto
        if (usuario.username === "admin") {
          // Si es admin, enlazar a la página de administrador
          userProfileLink.href = "./../US10_PaginaAdmin/PaginaAdmin.html";
        } else {
          // Si es usuario normal, enlazar a la página de perfil
          userProfileLink.href = "../US7_PaginaDeUsuario/usuario.html";
        }
  
        // Agregar funcionalidad de cerrar sesión
        document.getElementById("logout-btn").addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("usuario");
          window.location.reload();
        });
      } else {
        // Si no hay usuario, mostrar el botón de login
        userInfo.style.display = "none";
        authButton.style.display = "block";
      }
    }
  
    // Inicializar la funcionalidad del footer
    static initFooterFunctionality() {
      // Script específico para el botón de scroll
      const scrollToTopBtn = document.getElementById('scrollToTop');
      
      if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function(e) {
          e.preventDefault();
          console.log('Botón de scroll clickeado');
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }
    }
  
    // Método para inicializar todos los componentes
    static init() {
      document.addEventListener('DOMContentLoaded', () => {
        // Renderizar componentes si existen los contenedores
        if (document.getElementById('navbar-container')) {
          this.renderNavbar();
        }
        
        if (document.getElementById('simple-navbar-container')) {
          this.renderSimpleNavbar('simple-navbar-container');
        }
        
        if (document.getElementById('footer-container')) {
          this.renderFooter();
        }
      });
    }
  }
  
  // Inicializar componentes automáticamente
  Components.init();
  
  // Exportar la clase para uso en otros archivos si es necesario
  export default Components;