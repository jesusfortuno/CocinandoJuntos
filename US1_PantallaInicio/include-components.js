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
  
    // Modificar la sección del logo para que se vea mejor
    const navHTML = `
  <nav style="background-color: #f9f5f0; border-bottom: 1px solid #e0d5c9; padding: 0.8rem 2rem; display: flex; align-items: center;">
      <a href="index.html" class="logo" style="width: 80px; height: 80px; margin-right: 2rem; display: flex; align-items: center;">
          <img src="./Imagenes/logo-cocinando-juntos.png" alt="Logo Cocinando Juntos" style="width: 100%; height: auto; object-fit: contain;">
      </a>
      
      <!-- Buscador con botón - Estilo actualizado para coincidir con la imagen de referencia -->
      <div class="search-container" style="position: relative; flex-grow: 1; max-width: 600px; margin: 0 auto;">
          <input type="text" id="search-input" placeholder="Cercar receptes..." data-i18n="Buscar recetas..." 
                 style="width: 100%; padding: 0.6rem 2.5rem 0.6rem 1rem; border: 1px solid #e0d5c9; border-radius: 20px; background-color: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
          <button id="search-button" type="button" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #6b4423; cursor: pointer;">
              <i class="fas fa-search"></i>
          </button>
          <button id="search-close" type="button" style="display: none; position: absolute; right: 40px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #666; cursor: pointer;">
              <i class="fas fa-times"></i>
          </button>
          
          <!-- Contenedor para resultados de búsqueda -->
          <div id="search-results" class="search-results" style="display: none; position: absolute; top: 100%; left: 0; width: 100%; background: white; border: 1px solid #e0d5c9; border-radius: 0 0 10px 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); z-index: 100; max-height: 400px; overflow-y: auto;">
              <!-- Los resultados se cargarán dinámicamente aquí -->
          </div>
      </div>
  
      <!-- Icono de notificaciones - Actualizado para coincidir con la imagen de referencia -->
      <div class="notification-container" style="position: relative; margin-left: auto; margin-right: 15px;">
          <a href="#" id="notification-button" style="text-decoration: none; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px;">
              <i class="fas fa-bell" style="font-size: 1.2rem; color: #6b4423;"></i>
          </a>
          <div id="notification-dropdown" style="display: none; position: absolute; top: 100%; right: 0; width: 300px; background: white; border: 1px solid #e0d5c9; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); z-index: 100; padding: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #e0d5c9; padding-bottom: 10px;">
                  <h3 style="margin: 0; font-size: 1rem; color: #6b4423;" data-i18n="Notificaciones">Notificaciones</h3>
                  <button id="mark-all-read" style="background: none; border: none; color: #6b4423; cursor: pointer; font-size: 0.8rem; text-decoration: underline;" data-i18n="Marcar todas como leídas">Marcar todas como leídas</button>
              </div>
              <div id="notification-list" style="max-height: 300px; overflow-y: auto;">
                  <div class="empty-notification" style="text-align: center; padding: 1rem; color: #666;" data-i18n="No tienes notificaciones">No tienes notificaciones</div>
              </div>
          </div>
      </div>
  
      <!-- Sección del user-info para mostrar usuario según el tipo -->
      <div id="user-info" class="user-info" style="display: none; align-items: center; gap: 10px;">
          <img src="./Imagenes/blank-profile-picture-973460_1280.webp" alt="User Icon" class="user-icon" style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover;">
          <a href="#" id="user-profile-link" style="text-decoration: none;">
              <span id="user-name" style="color: #333;">Nombre del usuario</span>
          </a>
          <a href="#" id="logout-btn" class="auth-buttons" data-i18n="Cerrar Sesión" style="color: #6b4423; text-decoration: none; margin-left: 10px;">Cerrar Sesión</a>
      </div>
  
      <a href="../login.html" id="auth-button" class="auth-buttons" data-i18n="Iniciar Sesión" style="color: #6b4423; text-decoration: none; margin-left: auto; font-weight: 500;">Iniciar Sesión</a>
  
      <div class="menu-icon" id="menuToggle" style="margin-left: 15px; font-size: 1.5rem; color: #6b4423; cursor: pointer;">☰</div>
  </nav>
  
  <!-- El menú desplegable debe estar aquí, fuera del nav -->
  <div class="overlay-menu" id="overlayMenu" style="display: none; width: 100%; background-color: #f9f5f0; border-bottom: 1px solid #e0d5c9; z-index: 999;">
      <div class="overlay-content" style="display: flex; justify-content: space-around; padding: 20px 40px; max-width: 1200px; margin: 0 auto; position: relative;">
          <div class="close-btn" id="closeMenu" style="position: absolute; top: 10px; right: 10px; font-size: 24px; cursor: pointer; color: #6b4423;">×</div>
          <div class="menu-section" style="flex: 1; padding: 0 15px;">
              <h3 data-i18n="Culturas Gastronómicas" style="color: #6b4423; margin-bottom: 15px; font-size: 1.1rem; font-weight: 600; border-bottom: 1px solid #e0d5c9; padding-bottom: 10px;">Culturas Gastronómicas</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin: 10px 0;"><a href="cultura-china.html" data-i18n="China" style="color: #666; text-decoration: none; font-size: 0.95rem;">China</a></li>
                  <li style="margin: 10px 0;"><a href="cultura-española.html" data-i18n="España" style="color: #666; text-decoration: none; font-size: 0.95rem;">España</a></li>
                  <li style="margin: 10px 0;"><a href="cultura-francesa.html" data-i18n="Francia" style="color: #666; text-decoration: none; font-size: 0.95rem;">Francia</a></li>
                  <li style="margin: 10px 0;"><a href="cultura-italiana.html" data-i18n="Italia" style="color: #666; text-decoration: none; font-size: 0.95rem;">Italia</a></li>
                  <li style="margin: 10px 0;"><a href="cultura-japonesa.html" data-i18n="Japón" style="color: #666; text-decoration: none; font-size: 0.95rem;">Japón</a></li>
                  <li style="margin: 10px 0;"><a href="cultura-venezolana.html" data-i18n="Venezuela" style="color: #666; text-decoration: none; font-size: 0.95rem;">Venezuela</a></li>
              </ul>
          </div>
          <div class="menu-section" style="flex: 1; padding: 0 15px;">
              <h3 data-i18n="Tipo de Plato" style="color: #6b4423; margin-bottom: 15px; font-size: 1.1rem; font-weight: 600; border-bottom: 1px solid #e0d5c9; padding-bottom: 10px;">Tipo de Plato</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin: 10px 0;"><a href="../US12_MenuNavegacion/desayuno.html" data-i18n="Desayuno" style="color: #666; text-decoration: none; font-size: 0.95rem;">Desayuno</a></li>
                  <li style="margin: 10px 0;"><a href="../US12_MenuNavegacion/comidas.html" data-i18n="Comida" style="color: #666; text-decoration: none; font-size: 0.95rem;">Comida</a></li>
                  <li style="margin: 10px 0;"><a href="../US12_MenuNavegacion/merienda.html" data-i18n="Merienda" style="color: #666; text-decoration: none; font-size: 0.95rem;">Merienda</a></li>
                  <li style="margin: 10px 0;"><a href="../US12_MenuNavegacion/cena.html" data-i18n="Cena" style="color: #666; text-decoration: none; font-size: 0.95rem;">Cena</a></li>
              </ul>
          </div>
          <div class="menu-section" style="flex: 1; padding: 0 15px;">
              <h3 data-i18n="Dificultad de la Receta" style="color: #6b4423; margin-bottom: 15px; font-size: 1.1rem; font-weight: 600; border-bottom: 1px solid #e0d5c9; padding-bottom: 10px;">Dificultad de la Receta</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin: 10px 0;"><a href="../US12_MenuNavegacion/dificultad-facil.html" data-i18n="Fácil" style="color: #666; text-decoration: none; font-size: 0.95rem;">Fácil</a></li>
                  <li style="margin: 10px 0;"><a href="../US12_MenuNavegacion/dificultad-media.html" data-i18n="Media" style="color: #666; text-decoration: none; font-size: 0.95rem;">Media</a></li>
                  <li style="margin: 10px 0;"><a href="../US12_MenuNavegacion/dificultad-dificil.html" data-i18n="Difícil" style="color: #666; text-decoration: none; font-size: 0.95rem;">Difícil</a></li>
              </ul>
          </div>
      </div>
  </div>
  `
  
    // Footer HTML content
    const footerHTML = `
  <footer style="background-color: #8b5d33; color: white; padding: 3rem 0 0; margin-top: auto;">
      <div style="display: flex; justify-content: space-between; max-width: 1200px; margin: 0 auto; padding: 0 2rem; flex-wrap: wrap;">
          <!-- Columna 1: Sobre Nosotros -->
          <div style="flex: 1; min-width: 150px; margin-bottom: 2rem;">
              <h3 style="color: white; font-size: 1.2rem; margin-bottom: 1.5rem; position: relative; padding-bottom: 0.5rem;" data-i18n="Sobre Nosotros">Sobre Nosotros</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 0.8rem;"><a href="./quienes-somos.html" data-i18n="Quiénes Somos" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">Quiénes Somos</a></li>
                  <li style="margin-bottom: 0.8rem;"><a href="./contacto.html" data-i18n="Contacto" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">Contacto</a></li>
              </ul>
          </div>
  
          <!-- Columna 2: Legal -->
          <div style="flex: 1; min-width: 150px; margin-bottom: 2rem;">
              <h3 style="color: white; font-size: 1.2rem; margin-bottom: 1.5rem; position: relative; padding-bottom: 0.5rem;" data-i18n="Legal">Legal</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 0.8rem;"><a href="./politica_privacidad.html" data-i18n="Política de Privacidad" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">Política de Privacidad</a></li>
                  <li style="margin-bottom: 0.8rem;"><a href="./terminos_condiciones.html" data-i18n="Términos y Condiciones" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">Términos y Condiciones</a></li>
                  <li style="margin-bottom: 0.8rem;"><a href="./politica_cookies.html" data-i18n="Política de Cookies" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">Política de Cookies</a></li>
                  <li style="margin-bottom: 0.8rem;"><a href="./aviso_legal.html" data-i18n="Aviso Legal" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">Aviso Legal</a></li>
              </ul>
          </div>
  
          <!-- Columna 3: Comunidad -->
          <div style="flex: 1; min-width: 150px; margin-bottom: 2rem;">
              <h3 style="color: white; font-size: 1.2rem; margin-bottom: 1.5rem; position: relative; padding-bottom: 0.5rem;" data-i18n="Comunidad">Comunidad</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 0.8rem;"><a href="./../Platos.html" data-i18n="Recetas" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">Recetas</a></li>
                  <li style="margin-bottom: 0.8rem;"><a href="./chefs.html" data-i18n="Chefs" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">Chefs</a></li>
              </ul>
          </div>
  
          <!-- Columna 4: Redes Sociales -->
          <div style="flex: 1; min-width: 150px; margin-bottom: 2rem;">
              <h3 style="color: white; font-size: 1.2rem; margin-bottom: 1.5rem; position: relative; padding-bottom: 0.5rem;" data-i18n="Síguenos">Síguenos</h3>
              <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                  <a href="https://www.instagram.com/" aria-label="Instagram" style="width: 36px; height: 36px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center;">
                      <i class="fab fa-instagram" style="color: white;"></i>
                  </a>
                  <a href="https://www.facebook.com/" aria-label="Facebook" style="width: 36px; height: 36px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center;">
                      <i class="fab fa-facebook-f" style="color: white;"></i>
                  </a>
                  <a href="https://twitter.com/" aria-label="Twitter" style="width: 36px; height: 36px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center;">
                      <i class="fab fa-twitter" style="color: white;"></i>
                  </a>
                  <a href="https://www.youtube.com/" aria-label="YouTube" style="width: 36px; height: 36px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center;">
                      <i class="fab fa-youtube" style="color: white;"></i>
                  </a>
                  <a href="https://www.pinterest.com/" aria-label="Pinterest" style="width: 36px; height: 36px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center;">
                      <i class="fab fa-pinterest-p" style="color: white;"></i>
                  </a>
                  <a href="https://www.tiktok.com/" aria-label="TikTok" style="width: 36px; height: 36px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center;">
                      <i class="fab fa-tiktok" style="color: white;"></i>
                  </a>
              </div>
          </div>
      </div>
  
      <!-- Footer Bottom -->
      <div style="background-color: rgba(0, 0, 0, 0.2); padding: 1.5rem 0; text-align: center; margin-top: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
              <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;" data-i18n="© 2025 Cocinando Juntos - Todos los derechos reservados">
                  © 2025 Cocinando Juntos - Todos los derechos reservados
              </div>
              <!-- Footer bottom right -->
              <div style="display: flex; align-items: center; gap: 15px;">
                  <div class="language-selector" style="display: flex; align-items: center; gap: 10px;">
                      <label for="language" data-i18n="Idioma:" style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Idioma:</label>
                      <select id="language" style="background-color: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.9rem;">
                          <option value="es">Español</option>
                          <option value="en">English</option>
                          <option value="ca">Català</option>
                      </select>
                  </div>
                  
                  <!-- Botón de scroll -->
                  <button type="button" id="scrollToTop" class="scroll-to-top" style="background: none; border: none; padding: 0; cursor: pointer; display: flex; justify-content: center; align-items: center;">
                    <img src="./Imagenes/animado.gif" alt="Volver arriba" class="scroll-gif" style="width: 40px; height: 40px; border-radius: 50%;">
                  </button>
              </div>
          </div>
      </div>
  </footer>
  `
  
    // Include the navigation
    if (includeHTML("nav-placeholder", navHTML)) {
      setupNavFunctionality()
    }
  
    // Include the footer
    if (includeHTML("footer-placeholder", footerHTML)) {
      setupFooterFunctionality()
    }
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
  
    // Menú desplegable
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
  
    // Configurar buscador
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
          <div class="empty-notification" style="text-align: center; padding: 1rem; color: #666;" data-i18n="No tienes notificaciones">
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
        notificationItem.style.padding = "10px"
        notificationItem.style.borderBottom = "1px solid #e0d5c9"
        notificationItem.style.cursor = "pointer"
        notificationItem.style.backgroundColor = notification.read ? "transparent" : "rgba(107, 68, 35, 0.05)"
  
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
            <h4 style="margin: 0 0 5px 0; font-size: 0.9rem; color: #6b4423;">${notification.title}</h4>
            <span style="font-size: 0.7rem; color: #999;">${formattedDate}</span>
          </div>
          <p style="margin: 0; font-size: 0.8rem; color: #666;">${notification.message}</p>
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
  
  // Configurar funcionalidad del buscador
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
  
    // Inicializar Supabase
    const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
    const SUPABASE_API_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
  
    let supabase
    try {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)
      console.log("Supabase inicializado correctamente")
    } catch (error) {
      console.error("Error al inicializar Supabase:", error)
    }
  
    // Función para realizar la búsqueda
    async function performSearch(query) {
      if (!query || query.trim() === "") {
        searchResults.style.display = "none"
        return
      }
  
      searchResults.innerHTML = '<div style="text-align: center; padding: 20px;">Buscando...</div>'
      searchResults.style.display = "block"
  
      try {
        // Realizar búsqueda en Supabase
        const { data: recetas, error } = await supabase
          .from("recetas")
          .select("*")
          .or(`titulo.ilike.%${query}%,categoria.ilike.%${query}%,ingredientes.ilike.%${query}%`)
          .limit(5)
  
        if (error) {
          console.error("Error en la búsqueda:", error)
          searchResults.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #e74c3c;">
              Error al buscar. Inténtalo de nuevo.
            </div>
          `
          return
        }
  
        // Mostrar resultados
        if (recetas && recetas.length > 0) {
          const language = localStorage.getItem("language") || "es"
  
          // Encabezado de resultados
          searchResults.innerHTML = `
            <div style="padding: 10px 15px; border-bottom: 1px solid #e0d5c9; font-weight: bold; color: #6b4423;">
              ${getTranslation("Resultados para", language)} "${query}"
            </div>
          `
  
          // Crear elementos para cada receta
          recetas.forEach((receta) => {
            const resultItem = document.createElement("div")
            resultItem.className = "result-item"
            resultItem.style.display = "flex"
            resultItem.style.padding = "10px 15px"
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
              <img src="${imageSrc}" alt="${receta.titulo}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; margin-right: 15px;">
              <div style="flex: 1;">
                <div style="font-weight: bold; color: #333; margin-bottom: 5px;">${receta.titulo}</div>
                <div style="display: flex; gap: 10px; font-size: 0.8rem;">
                  <span style="color: #6b4423; background: #f9f5f0; padding: 2px 8px; border-radius: 10px;">${categoriaTraducida}</span>
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
          verTodoButton.style.padding = "10px 15px"
          verTodoButton.style.textAlign = "center"
          verTodoButton.style.color = "#6b4423"
          verTodoButton.style.fontWeight = "bold"
          verTodoButton.style.cursor = "pointer"
          verTodoButton.style.borderTop = "1px solid #e0d5c9"
          verTodoButton.textContent = getTranslation("Ver todas las recetas", localStorage.getItem("language") || "es")
  
          verTodoButton.addEventListener("click", () => {
            window.location.href = `./busqueda.html?q=${encodeURIComponent(query)}`
          })
  
          searchResults.appendChild(verTodoButton)
        } else {
          // No hay resultados
          searchResults.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #666;">
              <i class="fas fa-search" style="font-size: 24px; margin-bottom: 10px; color: #d4c3b5;"></i>
              <p>${getTranslation("No se encontraron resultados", localStorage.getItem("language") || "es")} "${query}"</p>
              <p style="font-size: 13px; margin-top: 5px;">${getTranslation("Intenta con otra búsqueda", localStorage.getItem("language") || "es")}</p>
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
      if (window.i18n && window.i18n.translations && window.i18n.translations[language]) {
        return window.i18n.translations[language][text] || text
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
        "Galletas de Sésamo": "./Imagenes/China/galletas-de-sesamo.jpg",
        "Sesame Cookies": "./Imagenes/China/galletas-de-sesamo.jpg",
        "Galetes de Sèsam": "./Imagenes/China/galletas-de-sesamo.jpg",
        "Bollitos Chinos": "./Imagenes/China/bollitos-chinos.jpg",
        "Chinese Buns": "./Imagenes/China/bollitos-chinos.jpg",
        "Panets Xinesos": "./Imagenes/China/bollitos-chinos.jpg",
        "Fideos Salteados": "./Imagenes/China/fideos-salteados.jpg",
        "Stir-Fried Noodles": "./Imagenes/China/fideos-salteados.jpg",
        "Fideus Saltats": "./Imagenes/China/fideos-salteados.jpg",
        "Tortilla de Patatas": "./Imagenes/España/tortilla-patatas.jpeg",
        "Pan con Tomate": "./Imagenes/España/pan-con-tomate.jpg",
        "Sopa Wonton": "./Imagenes/China/fideos-salteados.jpg",
        "Wonton Soup": "./Imagenes/China/fideos-salteados.jpg",
      }
  
      // Buscar coincidencia exacta
      if (imageMap[titulo]) {
        return imageMap[titulo]
      }
  
      // Buscar coincidencia parcial
      for (const key in imageMap) {
        if (titulo.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(titulo.toLowerCase())) {
          return imageMap[key]
        }
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
        "sweet-and-sour-chicken": "./../US6_GuardarRecetas/pollo-agridulce.html",
        "pollastre-agredolc": "./../US6_GuardarRecetas/pollo-agridulce.html",
        paella: "./../US6_GuardarRecetas/paella.html",
        "crepas-dulces": "./../US6_GuardarRecetas/crepas-dulces.html",
        "sweet-crepes": "./../US6_GuardarRecetas/crepas-dulces.html",
        "creps-dolcos": "./../US6_GuardarRecetas/crepas-dulces.html",
        "bizcocho-capuccino": "./../US6_GuardarRecetas/bizcocho-capuccino.html",
        "cappuccino-cake": "./../US6_GuardarRecetas/bizcocho-capuccino.html",
        "pastis-de-capuccino": "./../US6_GuardarRecetas/bizcocho-capuccino.html",
        "arepa-venezolana": "./../US6_GuardarRecetas/arepa-venezolana.html",
        "galletas-de-sesamo": "./../US6_GuardarRecetas/galletas-de-sesamo.html",
        "sesame-cookies": "./../US6_GuardarRecetas/galletas-de-sesamo.html",
        "galetes-de-sesam": "./../US6_GuardarRecetas/galletas-de-sesamo.html",
        "tortilla-de-patatas": "./../US6_GuardarRecetas/tortilla-de-patatas.html",
        "pan-con-tomate": "./../US6_GuardarRecetas/pan-con-tomate.html",
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
  