// Este archivo debe ser incluido en todas las páginas para manejar la navegación común

document.addEventListener("DOMContentLoaded", () => {
  // Verificar si el usuario está autenticado
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const userInfo = document.getElementById("user-info")
  const userProfileLink = document.getElementById("user-profile-link")

  if (usuario) {
    // Usuario autenticado
    if (userInfo) {
      userInfo.style.display = "flex"

      // Actualizar nombre de usuario
      const userNameElement = document.getElementById("user-name")
      if (userNameElement) {
        userNameElement.textContent = usuario.username || "Usuario"
      }

      // Configurar enlace de perfil según el rol
      if (userProfileLink) {
        // Determinar la ruta base (para manejar diferentes niveles de carpetas)
        const basePath = getBasePath()

        if (usuario.rol === "chef") {
          userProfileLink.href = `${basePath}chef-page.html`
          console.log("Usuario chef detectado en navigation-handler, redirigiendo a chef-page.html")
        } else if (usuario.rol === "admin") {
          userProfileLink.href = `${basePath}US10_PaginaAdmin/PaginaAdmin.html`
        } else {
          userProfileLink.href = `${basePath}US7_PaginaDeUsuario/usuario.html`
        }
      }

      // Configurar botón de cerrar sesión
      const logoutBtn = document.getElementById("logout-btn")
      if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
          e.preventDefault()
          localStorage.removeItem("usuario")
          window.location.href = `${getBasePath()}US1_PantallaInicio/index.html`
        })
      }
    }
  } else {
    // Usuario no autenticado
    if (userInfo) {
      // Mostrar botones de inicio de sesión/registro en lugar del perfil
      userInfo.innerHTML = `
                  <a href="${getBasePath()}login.html" class="auth-buttons" data-i18n="Iniciar Sesión">Iniciar Sesión</a>
                  <a href="${getBasePath()}registro.html" class="auth-buttons" data-i18n="Registrarse">Registrarse</a>
              `
    }
  }

  // Función para determinar la ruta base según la ubicación actual
  function getBasePath() {
    const path = window.location.pathname

    if (path.includes("/US1_PantallaInicio/")) {
      return "../"
    } else if (
      path.includes("/US7_PaginaDeUsuario/") ||
      path.includes("/US10_PaginaAdmin/") ||
      path.includes("/US6_GuardarRecetas/") ||
      path.includes("/US12_MenuNavegacion/")
    ) {
      return "../"
    } else {
      return ""
    }
  }
})
