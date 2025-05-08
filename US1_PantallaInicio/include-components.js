// Script para incluir componentes comunes en todas las páginas
document.addEventListener("DOMContentLoaded", () => {
    // Function to include HTML content
    function includeHTML(elementId, htmlContent) {
      const element = document.getElementById(elementId)
      if (element) {
        element.innerHTML = htmlContent
        return true
      }
      return false
    }
  
    // Barra de navegación mejorada con diseño más moderno
    const navHTML = `
  <nav style="background-color: #f9f5f0; border-bottom: 1px solid #e0d5c9; padding: 0.8rem 2rem; display: flex; align-items: center; box-shadow: 0 2px 10px rgba(107, 68, 35, 0.05);">
      <a href="index.html" class="logo" style="width: 80px; height: 80px; margin-right: 2rem; display: flex; align-items: center; transition: transform 0.3s ease;">
          <img src="./Imagenes/logo-cocinando-juntos.png" alt="Logo Cocinando Juntos" style="width: 100%; height: auto; object-fit: contain;">
      </a>
      
      <!-- Buscador con botón - Estilo actualizado y mejorado -->
      <div class="search-container" style="position: relative; flex-grow: 1; max-width: 600px; margin: 0 auto;">
          <input type="text" id="search-input" placeholder="Cercar receptes..." data-i18n="Buscar recetas..." 
                 style="width: 100%; padding: 0.8rem 2.5rem 0.8rem 1.2rem; border: 1px solid #e0d5c9; border-radius: 24px; background-color: #fff; box-shadow: 0 2px 8px rgba(107, 68, 35, 0.08); font-size: 0.95rem; transition: all 0.3s ease;">
          <button id="search-button" type="button" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #6b4423; cursor: pointer; font-size: 1rem;">
              <i class="fas fa-search"></i>
          </button>
          <button id="search-close" type="button" style="display: none; position: absolute; right: 42px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #666; cursor: pointer;">
              <i class="fas fa-times"></i>
          </button>
          
          <!-- Contenedor para resultados de búsqueda -->
          <div id="search-results" class="search-results" style="display: none; position: absolute; top: calc(100% + 8px); left: 0; width: 100%; background: white; border: 1px solid #e0d5c9; border-radius: 12px; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); z-index: 100; max-height: 400px; overflow-y: auto;">
              <!-- Los resultados se cargarán dinámicamente aquí -->
          </div>
      </div>
  
      <div style="display: flex; align-items: center; margin-left: auto; gap: 15px;">
          <!-- 1. Icono de notificaciones -->
          <div class="notification-container" style="position: relative;">
              <a href="#" id="notification-button" style="text-decoration: none; display: flex; align-items: center; justify-content: center; width: 45px; height: 45px; border-radius: 50%; transition: background-color 0.3s ease; position: relative; background-color: rgba(107, 68, 35, 0.05);">
                  <i class="fas fa-bell" style="font-size: 1.5rem; color: #6b4423;"></i>
              </a>
              <div id="notification-dropdown" style="display: none; position: absolute; top: calc(100% + 8px); right: -10px; width: 320px; background: white; border: 1px solid #e0d5c9; border-radius: 12px; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); z-index: 100; padding: 0; overflow: hidden;">
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #e0d5c9; background-color: #f9f5f0;">
                      <h3 style="margin: 0; font-size: 1rem; color: #6b4423; font-weight: 600;" data-i18n="Notificaciones">Notificaciones</h3>
                      <button id="mark-all-read" style="background: none; border: none; color: #6b4423; cursor: pointer; font-size: 0.8rem; text-decoration: underline; padding: 5px;" data-i18n="Marcar todas como leídas">Marcar todas como leídas</button>
                  </div>
                  <div id="notification-list" style="max-height: 350px; overflow-y: auto; padding: 0;">
                      <div class="empty-notification" style="text-align: center; padding: 2rem 1rem; color: #666;" data-i18n="No tienes notificaciones">No tienes notificaciones</div>
                  </div>
              </div>
          </div>
  
          <!-- 2. Sección del user-info para mostrar usuario según el tipo -->
          <div id="user-info" class="user-info" style="display: none; align-items: center; gap: 12px; background-color: rgba(107, 68, 35, 0.05); padding: 6px 12px; border-radius: 24px; transition: all 0.3s ease;">
              <img src="./Imagenes/blank-profile-picture-973460_1280.webp" alt="User Icon" class="user-icon" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <a href="#" id="user-profile-link" style="text-decoration: none;">
                  <span id="user-name" style="color: #333; font-weight: 500; font-size: 0.95rem;">Nombre del usuario</span>
              </a>
              <a href="#" id="logout-btn" class="auth-buttons" data-i18n="Cerrar Sesión" style="color: #6b4423; text-decoration: none; font-size: 0.85rem; opacity: 0.8;">Cerrar Sesión</a>
          </div>
  
          <!-- 3. Botón de inicio de sesión (alternativa al user-info) -->
          <a href="../login.html" id="auth-button" class="auth-buttons" data-i18n="Iniciar Sesión" style="color: #6b4423; text-decoration: none; font-weight: 500; background-color: rgba(107, 68, 35, 0.08); padding: 8px 16px; border-radius: 20px; transition: all 0.3s ease;">Iniciar Sesión</a>
  
          <!-- 4. Menú hamburguesa -->
          <div class="menu-icon" id="menuToggle" style="font-size: 1.5rem; color: #6b4423; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background-color 0.3s ease;">☰</div>
      </div>
  </nav>
  
  <!-- El menú desplegable mejorado -->
  <div class="overlay-menu" id="overlayMenu" style="display: none; width: 100%; background-color: #f9f5f0; border-bottom: 1px solid #e0d5c9; z-index: 999; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div class="overlay-content" style="display: flex; justify-content: space-around; padding: 30px 40px; max-width: 1200px; margin: 0 auto; position: relative;">
          <div class="close-btn" id="closeMenu" style="position: absolute; top: 15px; right: 15px; font-size: 24px; cursor: pointer; color: #6b4423; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background-color 0.3s ease;">×</div>
          
          <div class="menu-section" style="flex: 1; padding: 0 20px;">
              <h3 data-i18n="Culturas Gastronómicas" style="color: #6b4423; margin-bottom: 20px; font-size: 1.1rem; font-weight: 600; border-bottom: 2px solid #e0d5c9; padding-bottom: 10px;">Culturas Gastronómicas</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin: 12px 0;"><a href="cultura-china.html" data-i18n="China" style="color: #666; text-decoration: none; font-size: 0.95rem; display: block; padding: 5px 0; transition: all 0.2s ease;">China</a></li>
                  <li style="margin: 12px 0;"><a href="cultura-española.html" data-i18n="España" style="color: #666; text-decoration: none; font-size: 0.95rem; display: block; padding: 5px 0; transition: all 0.2s ease;">España</a></li>
                  <li style="margin: 12px 0;"><a href="cultura-francesa.html" data-i18n="Francia" style="color: #666; text-decoration: none; font-size: 0.95rem; display: block; padding: 5px 0; transition: all 0.2s ease;">Francia</a></li>
                  <li style="margin: 12px 0;"><a href="cultura-italiana.html" data-i18n="Italia" style="color: #666; text-decoration: none; font-size: 0.95rem; display: block; padding: 5px 0; transition: all 0.2s ease;">Italia</a></li>
                  <li style="margin: 12px 0;"><a href="cultura-japonesa.html" data-i18n="Japón" style="color: #666; text-decoration: none; font-size: 0.95rem; display: block; padding: 5px 0; transition: all 0.2s ease;">Japón</a></li>
                  <li style="margin: 12px 0;"><a href="cultura-venezolana.html" data-i18n="Venezuela" style="color: #666; text-decoration: none; font-size: 0.95rem; display: block; padding: 5px 0; transition: all 0.2s ease;">Venezuela</a></li>
              </ul>
          </div>
          
          <div class="menu-section" style="flex: 1; padding: 0 20px;">
              <h3 data-i18n="Tipo de Plato" style="color: #6b4423; margin-bottom: 20px; font-size: 1.1rem; font-weight: 600; border-bottom: 2px solid #e0d5c9; padding-bottom: 10px;">Tipo de Plato</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin: 12px 0;"><a href="../US12_MenuNavegacion/desayuno.html" data-i18n="Desayuno" style="color: #666; text-decoration: none; font-size: 0.95rem; display: block; padding: 5px 0; transition: all 0.2s ease;">Desayuno</a></li>
                  <li style="margin: 12px 0;"><a href="../US12_MenuNavegacion/comidas.html" data-i18n="Comida" style="color: #666; text-decoration: none; font-size: 0.95rem; display: block; padding: 5px 0; transition: all 0.2s ease;">Comida</a></li>
                  <li style="margin: 12px 0;"><a href="../US12_MenuNavegacion/merienda.html" data-i18n="Merienda" style="color: #666; text-decoration: none; font-size: 0.95rem; display: block; padding: 5px 0; transition: all 0.2s ease;">Merienda</a></li>
                  <li style="margin: 12px 0;"><a href="../US12_MenuNavegacion/cena.html" data-i18n="Cena" style="color: #666; text-decoration: none; font-size: 0.95rem; display: block; padding: 5px 0; transition: all 0.2s ease;">Cena</a></li>
              </ul>
          </div>
          
          <div class="menu-section" style="flex: 1; padding: 0 20px;">
              <h3 data-i18n="Dificultad de la Receta" style="color: #6b4423; margin-bottom: 20px; font-size: 1.1rem; font-weight: 600; border-bottom: 2px solid #e0d5c9; padding-bottom: 10px;">Dificultad de la Receta</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin: 12px 0;"><a href="../US12_MenuNavegacion/dificultad-facil.html" data-i18n="Fácil" style="color: #666; text-decoration: none; font-size: 0.95rem; display: block; padding: 5px 0; transition: all 0.2s ease;">Fácil</a></li>
                  <li style="margin: 12px 0;"><a href="../US12_MenuNavegacion/dificultad-media.html" data-i18n="Media" style="color: #666; text-decoration: none; font-size: 0.95rem; display: block; padding: 5px 0; transition: all 0.2s ease;">Media</a></li>
                  <li style="margin: 12px 0;"><a href="../US12_MenuNavegacion/dificultad-dificil.html" data-i18n="Difícil" style="color: #666; text-decoration: none; font-size: 0.95rem; display: block; padding: 5px 0; transition: all 0.2s ease;">Difícil</a></li>
              </ul>
          </div>
      </div>
  </div>
  `
  
    const footerHTML = `
  <footer style="background: linear-gradient(to right, #8b5d33, #6b4423); color: white; padding: 2rem 0 0; margin-top: auto; box-shadow: 0 -4px 20px rgba(0,0,0,0.1); position: relative; width: 100%; min-height: fit-content;">
      <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
          <!-- Encabezado del footer con logo y descripción -->
          <div style="display: flex; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1.5rem;">
              <img src="./Imagenes/logo-cocinando-juntos.png" alt="Logo Cocinando Juntos" style="width: 80px; height: auto; filter: brightness(0) invert(1); opacity: 0.9;">
              <p style="margin-left: 1.5rem; color: rgba(255,255,255,0.8); font-size: 0.9rem; max-width: 600px; line-height: 1.5;">
                  Cocinando Juntos es una comunidad de amantes de la gastronomía donde podrás explorar sabores de diferentes culturas, compartir tus recetas favoritas y aprender nuevas técnicas culinarias.
              </p>
          </div>
          
          <!-- Secciones del footer -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; margin-bottom: 2rem;">
              <!-- Columna 1: Sobre Nosotros -->
              <div>
                  <h3 style="color: white; font-size: 1.1rem; margin-bottom: 1rem; position: relative; padding-bottom: 0.5rem; font-weight: 600;" data-i18n="Sobre Nosotros">Sobre Nosaltres</h3>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                      <li style="margin-bottom: 0.6rem;"><a href="./quienes-somos.html" data-i18n="Quiénes Somos" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; display: block; padding: 3px 0; transition: all 0.3s ease;">Qui Som</a></li>
                      <li style="margin-bottom: 0.6rem;"><a href="./contacto.html" data-i18n="Contacto" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; display: block; padding: 3px 0; transition: all 0.3s ease;">Contacte</a></li>
                  </ul>
              </div>
  
              <!-- Columna 2: Legal -->
              <div>
                  <h3 style="color: white; font-size: 1.1rem; margin-bottom: 1rem; position: relative; padding-bottom: 0.5rem; font-weight: 600;" data-i18n="Legal">Legal</h3>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                      <li style="margin-bottom: 0.6rem;"><a href="./politica_privacidad.html" data-i18n="Política de Privacidad" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; display: block; padding: 3px 0; transition: all 0.3s ease;">Política de Privacitat</a></li>
                      <li style="margin-bottom: 0.6rem;"><a href="./terminos_condiciones.html" data-i18n="Términos y Condiciones" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; display: block; padding: 3px 0; transition: all 0.3s ease;">Termes i Condicions</a></li>
                      <li style="margin-bottom: 0.6rem;"><a href="./politica_cookies.html" data-i18n="Política de Cookies" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; display: block; padding: 3px 0; transition: all 0.3s ease;">Política de Cookies</a></li>
                      <li style="margin-bottom: 0.6rem;"><a href="./aviso_legal.html" data-i18n="Aviso Legal" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; display: block; padding: 3px 0; transition: all 0.3s ease;">Avís Legal</a></li>
                  </ul>
              </div>
  
              <!-- Columna 3: Comunidad -->
              <div>
                  <h3 style="color: white; font-size: 1.1rem; margin-bottom: 1rem; position: relative; padding-bottom: 0.5rem; font-weight: 600;" data-i18n="Comunidad">Comunitat</h3>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                      <li style="margin-bottom: 0.6rem;"><a href="./../Platos.html" data-i18n="Recetas" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; display: block; padding: 3px 0; transition: all 0.3s ease;">Receptes</a></li>
                      <li style="margin-bottom: 0.6rem;"><a href="./chefs.html" data-i18n="Chefs" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; display: block; padding: 3px 0; transition: all 0.3s ease;">Xefs</a></li>
                  </ul>
              </div>
  
              <!-- Columna 4: Redes Sociales -->
              <div>
                  <h3 style="color: white; font-size: 1.1rem; margin-bottom: 1rem; position: relative; padding-bottom: 0.5rem; font-weight: 600;" data-i18n="Síguenos">Segueix-nos</h3>
                  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                      <a href="https://www.instagram.com/" aria-label="Instagram" style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">
                          <i class="fab fa-instagram" style="color: white; font-size: 1.2rem;"></i>
                      </a>
                      <a href="https://www.facebook.com/" aria-label="Facebook" style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">
                          <i class="fab fa-facebook-f" style="color: white; font-size: 1.2rem;"></i>
                      </a>
                      <a href="https://twitter.com/" aria-label="Twitter" style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">
                          <i class="fab fa-twitter" style="color: white; font-size: 1.2rem;"></i>
                      </a>
                      <a href="https://www.youtube.com/" aria-label="YouTube" style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">
                          <i class="fab fa-youtube" style="color: white; font-size: 1.2rem;"></i>
                      </a>
                      <a href="https://www.pinterest.com/" aria-label="Pinterest" style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">
                          <i class="fab fa-pinterest-p" style="color: white; font-size: 1.2rem;"></i>
                      </a>
                      <a href="https://www.tiktok.com/" aria-label="TikTok" style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">
                          <i class="fab fa-tiktok" style="color: white; font-size: 1.2rem;"></i>
                      </a>
                  </div>
              </div>
          </div>
      </div>
  
      <!-- Footer Bottom -->
      <div style="background-color: rgba(0, 0, 0, 0.2); padding: 1rem 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 2rem; flex-wrap: wrap; gap: 1rem;">
              <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">
                  © 2025 Cuinant Junts - Tots els drets reservats
              </div>
              
              <!-- Footer bottom right -->
              <div style="display: flex; align-items: center; gap: 20px;">
                  <div class="language-selector" style="display: flex; align-items: center; gap: 10px;">
                      <label for="language" style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Idioma:</label>
                      <select id="language" style="background-color: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); padding: 6px 10px; border-radius: 6px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s ease;">
                          <option value="es">Español</option>
                          <option value="en">English</option>
                          <option value="ca" selected>Català</option>
                      </select>
                  </div>
                  
                  <!-- Botón de scroll -->
                  <button type="button" id="scrollToTop" class="scroll-to-top" style="background: none; border: none; padding: 0; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: transform 0.3s ease;">
                    <img src="./Imagenes/animado.gif" alt="Volver arriba" class="scroll-gif" style="width: 35px; height: 35px; border-radius: 50%;">
                  </button>
              </div>
          </div>
      </div>
  </footer>
  `
  
    // Include the navigation
    includeHTML("nav-placeholder", navHTML);
    setupNavFunctionality();
  
    // Include the footer
    includeHTML("footer-placeholder", footerHTML);
    setupFooterFunctionality();
  
    // Añadir estilos para efectos hover
    const style = document.createElement("style")
    style.textContent = `
      /* Efectos hover para la barra de navegación */
      .logo:hover {
        transform: scale(1.05);
      }
      
      #search-input:focus {
        box-shadow: 0 2px 12px rgba(107, 68, 35, 0.15);
        border-color: #d4c3b5;
      }
      
      #notification-button:hover {
        background-color: rgba(107, 68, 35, 0.08);
      }
      
      #auth-button:hover {
        background-color: rgba(107, 68, 35, 0.15);
      }
      
      .menu-icon:hover {
        background-color: rgba(107, 68, 35, 0.08);
      }
      
      .close-btn:hover {
        background-color: rgba(107, 68, 35, 0.08);
      }
      
      /* Efectos hover para el menú desplegable */
      .menu-section a:hover {
        color: #6b4423;
        padding-left: 5px;
      }
      
      /* Efectos hover para el footer */
      footer a:hover {
        color: #fff !important;
      }
      
      footer .social-icons a:hover {
        background-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-3px);
      }
      
      #scrollToTop:hover {
        transform: scale(1.1);
      }
      
      footer button:hover {
        background-color: #fff;
      }
      
      #language:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
      
      .notification-item:hover {
        background-color: rgba(107, 68, 35, 0.08) !important;
      }
    `
    document.head.appendChild(style)
  })
  
  // Configurar funcionalidad de la navegación
  function setupNavFunctionality() {
    // Usuario y login
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const userInfo = document.getElementById("user-info")
    const authButton = document.getElementById("auth-button")
    const userProfileLink = document.getElementById("user-profile-link")
    const logoutBtn = document.getElementById("logout-btn")
  
    if (usuario) {
      userInfo.style.display = "flex"
      document.getElementById("user-name").textContent = usuario.username || "Usuario"
      authButton.style.display = "none"
  
      // Determinar tipo de usuario y enlace correcto
      if (usuario.username === "admin") {
        userProfileLink.href = "./../US10_PaginaAdmin/PaginaAdmin.html"
      } else {
        userProfileLink.href = "../US7_PaginaDeUsuario/usuario.html"
      }
  
      // Funcionalidad de cierre de sesión
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
  
    // Menú desplegable - Arreglado
    const menuToggle = document.getElementById("menuToggle")
    const overlayMenu = document.getElementById("overlayMenu")
    const closeMenu = document.getElementById("closeMenu")
  
    if (menuToggle && overlayMenu) {
      menuToggle.addEventListener("click", (e) => {
        e.preventDefault()
        overlayMenu.style.display = overlayMenu.style.display === "none" ? "block" : "none"
      })
  
      if (closeMenu) {
        closeMenu.addEventListener("click", () => {
          overlayMenu.style.display = "none"
        })
      }
  
      // Cerrar al hacer clic fuera del menú
      document.addEventListener("click", (e) => {
        if (overlayMenu.style.display === "block" && !overlayMenu.contains(e.target) && e.target !== menuToggle) {
          overlayMenu.style.display = "none"
        }
      })
    }
  
    // Configurar notificaciones
    setupNotifications()
  
    // Configurar buscador - Versión simplificada sin Supabase
    setupSearchFunctionality()
  }
  
  // Modificar la función setupNotifications para que coincida con la imagen de referencia
  function setupNotifications() {
    const notificationButton = document.getElementById("notification-button")
    const notificationDropdown = document.getElementById("notification-dropdown")
    const notificationBadge = document.getElementById("notification-badge")
    const notificationList = document.getElementById("notification-list")
    const markAllReadBtn = document.getElementById("mark-all-read")
  
    if (!notificationButton || !notificationDropdown || !notificationList) {
      return
    }
  
    // Cargar notificaciones del localStorage o crear un array vacío
    let notifications = JSON.parse(localStorage.getItem("notifications")) || []
  
    // Si no hay notificaciones en localStorage, crear algunas de ejemplo
    if (!notifications.length) {
      notifications = [
        {
          id: 1,
          title: "¡Bienvenido a Cocinando Juntos!",
          message: "Gracias por unirte a nuestra comunidad de amantes de la cocina.",
          read: false,
          date: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Nueva receta destacada",
          message: "Hemos añadido una nueva receta de Pollo Agridulce. ¡Pruébala!",
          read: false,
          date: new Date(Date.now() - 86400000).toISOString(), // 1 día atrás
        },
      ]
      localStorage.setItem("notifications", JSON.stringify(notifications))
    }
  
    // Actualizar el contador de notificaciones
    function updateNotificationCount() {
      const unreadCount = notifications.filter((n) => !n.read).length
      if (unreadCount > 0) {
        // Crear el badge si no existe
        if (!document.getElementById("notification-badge")) {
          const badge = document.createElement("span")
          badge.id = "notification-badge"
          badge.style.position = "absolute"
          badge.style.top = "-5px"
          badge.style.right = "-5px"
          badge.style.backgroundColor = "#e74c3c"
          badge.style.color = "white"
          badge.style.borderRadius = "50%"
          badge.style.width = "16px"
          badge.style.height = "16px"
          badge.style.fontSize = "10px"
          badge.style.display = "flex"
          badge.style.alignItems = "center"
          badge.style.justifyContent = "center"
          badge.textContent = unreadCount > 9 ? "9+" : unreadCount
          notificationButton.appendChild(badge)
        } else {
          document.getElementById("notification-badge").textContent = unreadCount > 9 ? "9+" : unreadCount
          document.getElementById("notification-badge").style.display = "flex"
        }
      } else if (document.getElementById("notification-badge")) {
        document.getElementById("notification-badge").style.display = "none"
      }
    }
  
    // Renderizar las notificaciones en el dropdown
    function renderNotifications() {
      if (notifications.length === 0) {
        notificationList.innerHTML = `
          <div class="empty-notification" style="text-align: center; padding: 2rem 1rem; color: #666;" data-i18n="No tienes notificaciones">
            No tienes notificaciones
          </div>
        `
        return
      }
  
      notificationList.innerHTML = ""
  
      // Ordenar notificaciones por fecha (más recientes primero)
      const sortedNotifications = [...notifications].sort((a, b) => new Date(b.date) - new Date(a.date))
  
      sortedNotifications.forEach((notification) => {
        const notificationItem = document.createElement("div")
        notificationItem.className = "notification-item"
        notificationItem.style.padding = "15px"
        notificationItem.style.borderBottom = "1px solid #e0d5c9"
        notificationItem.style.cursor = "pointer"
        notificationItem.style.backgroundColor = notification.read ? "transparent" : "rgba(107, 68, 35, 0.05)"
        notificationItem.style.transition = "background-color 0.2s ease"
  
        // Formatear fecha
        const notificationDate = new Date(notification.date)
        const formattedDate = notificationDate.toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
  
        notificationItem.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <h4 style="margin: 0 0 8px 0; font-size: 0.95rem; color: #6b4423; font-weight: 600;">${notification.title}</h4>
            <span style="font-size: 0.75rem; color: #999; margin-left: 10px;">${formattedDate}</span>
          </div>
          <p style="margin: 0; font-size: 0.85rem; color: #666; line-height: 1.4;">${notification.message}</p>
        `
  
        // Marcar como leída al hacer clic
        notificationItem.addEventListener("click", () => {
          if (!notification.read) {
            notification.read = true
            localStorage.setItem("notifications", JSON.stringify(notifications))
            notificationItem.style.backgroundColor = "transparent"
            updateNotificationCount()
          }
        })
  
        notificationList.appendChild(notificationItem)
      })
    }
  
    // Mostrar/ocultar el dropdown de notificaciones
    notificationButton.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      const isVisible = notificationDropdown.style.display === "block"
      notificationDropdown.style.display = isVisible ? "none" : "block"
  
      if (!isVisible) {
        renderNotifications()
      }
    })
  
    // Marcar todas como leídas
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener("click", () => {
        notifications.forEach((notification) => {
          notification.read = true
        })
        localStorage.setItem("notifications", JSON.stringify(notifications))
        renderNotifications()
        updateNotificationCount()
      })
    }
  
    // Cerrar el dropdown al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (
        notificationDropdown.style.display === "block" &&
        !notificationDropdown.contains(e.target) &&
        e.target !== notificationButton &&
        !notificationButton.contains(e.target)
      ) {
        notificationDropdown.style.display = "none"
      }
    })
  
    // Inicializar
    updateNotificationCount()
  }
  
  // Configurar funcionalidad del buscador - Versión simplificada sin Supabase
  function setupSearchFunctionality() {
    const searchInput = document.getElementById("search-input")
    const searchButton = document.getElementById("search-button")
    const searchClose = document.getElementById("search-close")
    const searchResults = document.getElementById("search-results")
  
    if (!searchInput || !searchButton || !searchResults) {
      console.error("Elementos del buscador no encontrados")
      return
    }
  
    // Actualizar el placeholder según el idioma
    const currentLanguage = localStorage.getItem("language") || "es"
    if (currentLanguage === "es") {
      searchInput.placeholder = "Buscar recetas..."
    } else if (currentLanguage === "en") {
      searchInput.placeholder = "Search recipes..."
    } else if (currentLanguage === "ca") {
      searchInput.placeholder = "Cercar receptes..."
    }
  
    // Datos de ejemplo para búsqueda local (sin Supabase)
    const recetasEjemplo = [
      {
        id: 1,
        titulo: "Pollo Agridulce",
        categoria: "China",
        dificultad: "Media",
        ingredientes: "pollo, piña, pimiento, salsa agridulce",
      },
      {
        id: 2,
        titulo: "Paella",
        categoria: "España",
        dificultad: "Difícil",
        ingredientes: "arroz, azafrán, mariscos, pollo",
      },
      {
        id: 3,
        titulo: "Crepas Dulces",
        categoria: "Francia",
        dificultad: "Fácil",
        ingredientes: "harina, huevos, leche, azúcar",
      },
      {
        id: 4,
        titulo: "Bizcocho Capuccino",
        categoria: "Italia",
        dificultad: "Media",
        ingredientes: "harina, huevos, café, chocolate",
      },
      {
        id: 5,
        titulo: "Arepa Venezolana",
        categoria: "Venezuela",
        dificultad: "Fácil",
        ingredientes: "harina de maíz, agua, sal",
      },
    ]
  
    // Función para realizar la búsqueda local
    function performSearch(query) {
      if (!query || query.trim() === "") {
        searchResults.style.display = "none"
        return
      }
  
      searchResults.innerHTML = '<div style="text-align: center; padding: 20px;">Buscando...</div>'
      searchResults.style.display = "block"
  
      try {
        // Filtrar recetas que coincidan con la búsqueda
        const queryLower = query.toLowerCase()
        const recetas = recetasEjemplo
          .filter(
            (receta) =>
              receta.titulo.toLowerCase().includes(queryLower) ||
              receta.categoria.toLowerCase().includes(queryLower) ||
              receta.ingredientes.toLowerCase().includes(queryLower),
          )
          .slice(0, 5) // Limitar a 5 resultados
  
        // Mostrar resultados
        if (recetas && recetas.length > 0) {
          const language = localStorage.getItem("language") || "es"
  
          // Encabezado de resultados
          searchResults.innerHTML = `
            <div style="padding: 12px 15px; border-bottom: 1px solid #e0d5c9; font-weight: 600; color: #6b4423; background-color: #f9f5f0;">
              ${getTranslation("Resultados para", language)} "${query}"
            </div>
          `
  
          // Crear elementos para cada receta
          recetas.forEach((receta) => {
            const resultItem = document.createElement("div")
            resultItem.className = "result-item"
            resultItem.style.display = "flex"
            resultItem.style.padding = "12px 15px"
            resultItem.style.borderBottom = "1px solid #e0d5c9"
            resultItem.style.cursor = "pointer"
            resultItem.style.transition = "background-color 0.2s"
  
            // Hover effect
            resultItem.addEventListener("mouseenter", () => {
              resultItem.style.backgroundColor = "#f9f5f0"
            })
            resultItem.addEventListener("mouseleave", () => {
              resultItem.style.backgroundColor = "transparent"
            })
  
            // Obtener imagen para la receta
            const imageSrc = getImagePath(receta.titulo)
  
            // Traducir categoría y dificultad
            const categoriaTraducida = getTranslation(receta.categoria, language) || receta.categoria
  
            // Crear indicador visual de dificultad
            const difficultyDots = getDifficultyDots(receta.dificultad)
  
            resultItem.innerHTML = `
              <img src="${imageSrc}" alt="${receta.titulo}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <div style="flex: 1;">
                <div style="font-weight: 600; color: #333; margin-bottom: 5px; font-size: 0.95rem;">${receta.titulo}</div>
                <div style="display: flex; gap: 10px; font-size: 0.8rem;">
                  <span style="color: #6b4423; background: #f9f5f0; padding: 3px 10px; border-radius: 12px;">${categoriaTraducida}</span>
                  <span style="color: #6b4423;">${getTranslation("Dificultad:", language)} ${difficultyDots}</span>
                </div>
              </div>
            `
  
            // Añadir evento de clic para navegar a la receta
            resultItem.addEventListener("click", () => {
              const recipeUrl = getRecipeUrl(receta)
              window.location.href = recipeUrl
            })
  
            searchResults.appendChild(resultItem)
          })
  
          // Añadir botón "Ver todas las recetas"
          const verTodoButton = document.createElement("div")
          verTodoButton.style.padding = "12px 15px"
          verTodoButton.style.textAlign = "center"
          verTodoButton.style.color = "#6b4423"
          verTodoButton.style.fontWeight = "600"
          verTodoButton.style.cursor = "pointer"
          verTodoButton.style.borderTop = "1px solid #e0d5c9"
          verTodoButton.style.backgroundColor = "#f9f5f0"
          verTodoButton.style.transition = "background-color 0.2s"
          verTodoButton.textContent = getTranslation("Ver todas las recetas", localStorage.getItem("language") || "es")
  
          verTodoButton.addEventListener("mouseenter", () => {
            verTodoButton.style.backgroundColor = "#f0e9e0"
          })
          verTodoButton.addEventListener("mouseleave", () => {
            verTodoButton.style.backgroundColor = "#f9f5f0"
          })
  
          verTodoButton.addEventListener("click", () => {
            window.location.href = `./busqueda.html?q=${encodeURIComponent(query)}`
          })
  
          searchResults.appendChild(verTodoButton)
        } else {
          // No hay resultados
          searchResults.innerHTML = `
            <div style="text-align: center; padding: 25px 20px; color: #666;">
              <i class="fas fa-search" style="font-size: 24px; margin-bottom: 15px; color: #d4c3b5;"></i>
              <p style="margin-bottom: 8px;">${getTranslation("No se encontraron resultados", localStorage.getItem("language") || "es")} "${query}"</p>
              <p style="font-size: 13px; margin-top: 5px; color: #999;">${getTranslation("Intenta con otra búsqueda", localStorage.getItem("language") || "es")}</p>
            </div>
          `
        }
      } catch (error) {
        console.error("Error en la búsqueda:", error)
        searchResults.innerHTML = `
          <div style="text-align: center; padding: 20px; color: #e74c3c;">
            Error inesperado. Inténtalo de nuevo.
          </div>
        `
      }
    }
  
    // Función para obtener traducciones
    function getTranslation(text, language) {
      const translations = {
        es: {
          "Resultados para": "Resultados para",
          "No se encontraron resultados": "No se encontraron resultados para",
          "Intenta con otra búsqueda": "Intenta con otra búsqueda",
          "Ver todas las recetas": "Ver todas las recetas",
          "Dificultad:": "Dificultad:",
          China: "China",
          España: "España",
          Francia: "Francia",
          Italia: "Italia",
          Venezuela: "Venezuela",
        },
        en: {
          "Resultados para": "Results for",
          "No se encontraron resultados": "No results found for",
          "Intenta con otra búsqueda": "Try another search",
          "Ver todas las recetas": "View all recipes",
          "Dificultad:": "Difficulty:",
          China: "China",
          España: "Spain",
          Francia: "France",
          Italia: "Italy",
          Venezuela: "Venezuela",
        },
        ca: {
          "Resultados para": "Resultats per a",
          "No se encontraron resultados": "No s'han trobat resultats per a",
          "Intenta con otra búsqueda": "Intenta amb una altra cerca",
          "Ver todas las recetas": "Veure totes les receptes",
          "Dificultad:": "Dificultat:",
          China: "Xina",
          España: "Espanya",
          Francia: "França",
          Italia: "Itàlia",
          Venezuela: "Veneçuela",
        },
      }
  
      if (translations[language] && translations[language][text]) {
        return translations[language][text]
      }
  
      return text
    }
  
    // Función para obtener la ruta de la imagen según el título
    function getImagePath(titulo) {
      // Mapeo de títulos a rutas de imágenes
      const imageMap = {
        "Pollo Agridulce": "./Imagenes/China/pollo-agridulce.jpg",
        "Sweet and Sour Chicken": "./Imagenes/China/pollo-agridulce.jpg",
        "Pollastre Agredolç": "./Imagenes/China/pollo-agridulce.jpg",
        Paella: "./Imagenes/España/paella.png",
        "Crepas Dulces": "./Imagenes/Francia/crepas-dulces.jpg",
        "Sweet Crepes": "./Imagenes/Francia/crepas-dulces.jpg",
        "Creps Dolços": "./Imagenes/Francia/crepas-dulces.jpg",
        "Bizcocho Capuccino": "./Imagenes/Italia/bizcocho-capuccino.jpg",
        "Cappuccino Cake": "./Imagenes/Italia/bizcocho-capuccino.jpg",
        "Pastís de Capuccino": "./Imagenes/Italia/bizcocho-capuccino.jpg",
        "Arepa Venezolana": "./Imagenes/Venezuela/arepa-venezolana.jpg",
      }
  
      // Buscar coincidencia exacta
      if (imageMap[titulo]) {
        return imageMap[titulo]
      }
  
      // Imagen por defecto según categoría
      if (titulo.toLowerCase().includes("china")) {
        return "./Imagenes/China/pollo-agridulce.jpg"
      } else if (titulo.toLowerCase().includes("españa") || titulo.toLowerCase().includes("paella")) {
        return "./Imagenes/España/paella.png"
      } else if (titulo.toLowerCase().includes("francia") || titulo.toLowerCase().includes("crepa")) {
        return "./Imagenes/Francia/crepas-dulces.jpg"
      } else if (titulo.toLowerCase().includes("italia") || titulo.toLowerCase().includes("bizcocho")) {
        return "./Imagenes/Italia/bizcocho-capuccino.jpg"
      } else if (titulo.toLowerCase().includes("venezuela") || titulo.toLowerCase().includes("arepa")) {
        return "./Imagenes/Venezuela/arepa-venezolana.jpg"
      }
  
      // Imagen por defecto
      return "./Imagenes/China/pollo-agridulce.jpg"
    }
  
    // Función para obtener la URL de la receta
    function getRecipeUrl(receta) {
      // Convertir el título a un formato de URL amigable
      const slug = receta.titulo
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "")
  
      // Mapeo de títulos específicos a URLs específicas
      const urlMap = {
        "pollo-agridulce": "./../US6_GuardarRecetas/pollo-agridulce.html",
        paella: "./../US6_GuardarRecetas/paella.html",
        "crepas-dulces": "./../US6_GuardarRecetas/crepas-dulces.html",
        "bizcocho-capuccino": "./../US6_GuardarRecetas/bizcocho-capuccino.html",
        "arepa-venezolana": "./../US6_GuardarRecetas/arepa-venezolana.html",
      }
  
      // Si existe una URL específica para este slug, usarla
      if (urlMap[slug]) {
        return urlMap[slug]
      }
  
      // URL genérica basada en el ID de la receta
      return `./../US6_GuardarRecetas/receta.html?id=${receta.id}`
    }
  
    // Función para convertir nivel de dificultad a puntos visuales
    function getDifficultyDots(dificultad) {
      let nivel = 0
  
      if (dificultad === "Fácil" || dificultad === "Easy" || dificultad === "Fàcil") {
        nivel = 1
      } else if (dificultad === "Media" || dificultad === "Medium" || dificultad === "Mitjana") {
        nivel = 2
      } else if (dificultad === "Difícil" || dificultad === "Hard" || dificultad === "Difícil") {
        nivel = 3
      }
  
      let dotsHTML = '<span style="display: inline-flex; gap: 2px;">'
  
      for (let i = 1; i <= 3; i++) {
        if (i <= nivel) {
          dotsHTML +=
            '<span style="width: 8px; height: 8px; background-color: #6b4423; border-radius: 50%; display: inline-block;"></span>'
        } else {
          dotsHTML +=
            '<span style="width: 8px; height: 8px; background-color: #d4c3b5; border-radius: 50%; display: inline-block;"></span>'
        }
      }
  
      dotsHTML += "</span>"
      return dotsHTML
    }
  
    // Eventos del buscador
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.trim()
      performSearch(query)
      if (query) {
        searchClose.style.display = "block"
      }
    })
  
    if (searchClose) {
      searchClose.addEventListener("click", () => {
        searchResults.style.display = "none"
        searchInput.value = ""
        searchClose.style.display = "none"
      })
    }
  
    // Buscar al presionar Enter
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim()
        performSearch(query)
        if (query) {
          searchClose.style.display = "block"
        }
      }
    })
  
    // Buscar mientras se escribe (con debounce)
    let debounceTimer
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim()
  
      // Mostrar/ocultar botón de cerrar
      if (query) {
        searchClose.style.display = "block"
      } else {
        searchClose.style.display = "none"
        searchResults.style.display = "none"
        return
      }
  
      // Debounce para no hacer demasiadas peticiones
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        performSearch(query)
      }, 300)
    })
  
    // Cerrar resultados al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-container") && !e.target.closest("#search-results")) {
        searchResults.style.display = "none"
      }
    })
  }
  
  // Configurar funcionalidad del footer
  function setupFooterFunctionality() {
    // Selector de idioma
    const languageSelector = document.getElementById("language")
    if (languageSelector) {
      // Establecer el idioma actual
      const currentLanguage = localStorage.getItem("language") || "es"
      languageSelector.value = currentLanguage
  
      languageSelector.addEventListener("change", function () {
        const selectedLanguage = this.value
        console.log("Cambiando idioma a:", selectedLanguage)
        localStorage.setItem("language", selectedLanguage)
  
        // Llamar a la función de cambio de idioma si existe
        if (typeof window.changeLanguage === "function") {
          window.changeLanguage(selectedLanguage)
        } else if (window.i18n && typeof window.i18n.changeLanguage === "function") {
          window.i18n.changeLanguage(selectedLanguage)
        } else if (window.i18n && typeof window.i18n.translatePage === "function") {
          window.i18n.translatePage(selectedLanguage)
        } else {
          // Recargar la página como fallback
          window.location.reload()
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
  