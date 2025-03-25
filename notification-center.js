// Centro de Notificaciones para Cocinando Juntos
document.addEventListener("DOMContentLoaded", () => {
  // Configuración de Supabase
  const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
  const SUPABASE_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"

  // Inicializar Supabase
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

  // Referencias a elementos del DOM
  const navElement = document.querySelector("nav")
  const userInfo = document.getElementById("user-info")

  // Verificar si el usuario está logueado
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null")

  // Solo mostrar notificaciones si el usuario está logueado
  if (usuario && usuario.id) {
    // Crear e insertar el icono de notificaciones en la barra de navegación
    insertarIconoNotificaciones()

    // Cargar notificaciones iniciales
    cargarNotificaciones()

    // Configurar actualización periódica de notificaciones (cada 60 segundos)
    setInterval(cargarNotificaciones, 60000)
  }

  // Función para insertar el icono de notificaciones en la barra de navegación
  function insertarIconoNotificaciones() {
    // Crear el contenedor de notificaciones
    const notificationContainer = document.createElement("div")
    notificationContainer.className = "notification-container"

    // Crear el icono de campana
    const bellIcon = document.createElement("div")
    bellIcon.className = "notification-bell"
    bellIcon.innerHTML = `
        <i class="fas fa-bell"></i>
        <span class="notification-badge" id="notification-count">0</span>
      `

    // Crear el panel desplegable de notificaciones
    const notificationPanel = document.createElement("div")
    notificationPanel.className = "notification-panel"
    notificationPanel.id = "notification-panel"
    notificationPanel.innerHTML = `
        <div class="notification-header">
          <h3>Notificaciones</h3>
          <button id="mark-all-read" class="mark-all-read-btn">Marcar todas como leídas</button>
        </div>
        <div class="notification-list" id="notification-list">
          <div class="notification-empty">No tienes notificaciones</div>
        </div>
      `

    // Añadir elementos al contenedor
    notificationContainer.appendChild(bellIcon)
    notificationContainer.appendChild(notificationPanel)

    // Insertar el contenedor en la barra de navegación a la izquierda del nombre de usuario
    if (userInfo) {
      // Insertar antes del primer elemento hijo de userInfo (que sería la imagen de perfil)
      userInfo.insertBefore(notificationContainer, userInfo.firstChild)
    } else {
      // Si no hay userInfo, insertar antes del botón de autenticación
      const authButton = document.getElementById("auth-button")
      if (authButton) {
        navElement.insertBefore(notificationContainer, authButton)
      } else {
        // Si no hay authButton, añadir al final de la barra de navegación
        navElement.appendChild(notificationContainer)
      }
    }

    // Añadir evento de clic para mostrar/ocultar el panel
    bellIcon.addEventListener("click", toggleNotificationPanel)

    // Añadir evento para marcar todas como leídas
    document.getElementById("mark-all-read").addEventListener("click", marcarTodasComoLeidas)

    // Cerrar el panel al hacer clic fuera de él
    document.addEventListener("click", (e) => {
      const panel = document.getElementById("notification-panel")
      const bell = document.querySelector(".notification-bell")

      if (panel && bell && !panel.contains(e.target) && !bell.contains(e.target)) {
        panel.classList.remove("active")
      }
    })
  }

  // Función para alternar la visibilidad del panel de notificaciones
  function toggleNotificationPanel() {
    const panel = document.getElementById("notification-panel")
    panel.classList.toggle("active")

    // Si el panel se abre, actualizar notificaciones
    if (panel.classList.contains("active")) {
      cargarNotificaciones()
    }
  }

  // Función para cargar notificaciones desde localStorage
  async function cargarNotificaciones() {
    if (!usuario || !usuario.id) return

    // Obtener notificaciones del localStorage
    const notificaciones = obtenerNotificacionesLocales()

    // Actualizar la interfaz con las notificaciones
    actualizarInterfazNotificaciones(notificaciones)
  }

  // Función para obtener notificaciones del localStorage
  function obtenerNotificacionesLocales() {
    // Obtener todas las notificaciones del localStorage
    const todasNotificaciones = JSON.parse(localStorage.getItem("notificaciones_locales") || "[]")

    // Filtrar solo las notificaciones para el usuario actual
    const notificacionesUsuario = todasNotificaciones.filter((n) => n.id_usuario_destino === usuario.id)

    // Ordenar por fecha (más recientes primero)
    notificacionesUsuario.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

    return notificacionesUsuario
  }

  // Función para actualizar la interfaz con las notificaciones
  function actualizarInterfazNotificaciones(notificaciones) {
    const notificationList = document.getElementById("notification-list")
    const notificationCount = document.getElementById("notification-count")

    // Contar notificaciones no leídas
    const noLeidas = notificaciones.filter((n) => !n.leida).length

    // Actualizar contador
    notificationCount.textContent = noLeidas
    notificationCount.style.display = noLeidas > 0 ? "flex" : "none"

    // Si no hay notificaciones, mostrar mensaje
    if (!notificaciones || notificaciones.length === 0) {
      notificationList.innerHTML = `<div class="notification-empty">No tienes notificaciones</div>`
      return
    }

    // Generar HTML para las notificaciones
    let notificacionesHTML = ""

    notificaciones.forEach((notificacion) => {
      const fecha = new Date(notificacion.fecha).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })

      const claseLeida = notificacion.leida ? "notification-read" : "notification-unread"

      notificacionesHTML += `
          <div class="notification-item ${claseLeida}" data-id="${notificacion.id}">
            <div class="notification-content">
              <h4 class="notification-title">${notificacion.titulo_receta}</h4>
              <p class="notification-message">${notificacion.mensaje}</p>
              <span class="notification-date">${fecha}</span>
            </div>
            <button class="notification-mark-read" title="Marcar como leída">
              <i class="fas ${notificacion.leida ? "fa-check-circle" : "fa-circle"}"></i>
            </button>
          </div>
        `
    })

    notificationList.innerHTML = notificacionesHTML

    // Añadir eventos a los botones de marcar como leída
    document.querySelectorAll(".notification-mark-read").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        const notificationId = btn.closest(".notification-item").dataset.id
        marcarComoLeida(notificationId)
      })
    })

    // Añadir eventos para hacer clic en una notificación
    document.querySelectorAll(".notification-item").forEach((item) => {
      item.addEventListener("click", () => {
        const notificationId = item.dataset.id
        const notificacion = notificaciones.find((n) => n.id == notificationId)

        if (notificacion) {
          // Marcar como leída
          marcarComoLeida(notificationId)

          // Redirigir a la página de la receta
          if (notificacion.id_receta) {
            const recetaUrl = obtenerUrlReceta(notificacion.id_receta)
            if (recetaUrl) {
              window.location.href = recetaUrl
            }
          }
        }
      })
    })
  }

  // Función para marcar una notificación como leída
  function marcarComoLeida(notificationId) {
    try {
      // Obtener todas las notificaciones
      const todasNotificaciones = JSON.parse(localStorage.getItem("notificaciones_locales") || "[]")

      // Actualizar la notificación específica
      const notificacionesActualizadas = todasNotificaciones.map((notif) => {
        if (notif.id == notificationId) {
          return { ...notif, leida: true }
        }
        return notif
      })

      // Guardar las notificaciones actualizadas
      localStorage.setItem("notificaciones_locales", JSON.stringify(notificacionesActualizadas))

      // Actualizar la interfaz
      const item = document.querySelector(`.notification-item[data-id="${notificationId}"]`)
      if (item) {
        item.classList.remove("notification-unread")
        item.classList.add("notification-read")

        const icon = item.querySelector(".notification-mark-read i")
        if (icon) {
          icon.classList.remove("fa-circle")
          icon.classList.add("fa-check-circle")
        }
      }

      // Actualizar contador
      actualizarContadorNotificaciones()
    } catch (error) {
      console.error("Error al marcar notificación como leída:", error)
    }
  }

  // Función para marcar todas las notificaciones como leídas
  function marcarTodasComoLeidas() {
    if (!usuario || !usuario.id) return

    try {
      // Obtener todas las notificaciones
      const todasNotificaciones = JSON.parse(localStorage.getItem("notificaciones_locales") || "[]")

      // Actualizar todas las notificaciones del usuario actual
      const notificacionesActualizadas = todasNotificaciones.map((notif) => {
        if (notif.id_usuario_destino === usuario.id) {
          return { ...notif, leida: true }
        }
        return notif
      })

      // Guardar las notificaciones actualizadas
      localStorage.setItem("notificaciones_locales", JSON.stringify(notificacionesActualizadas))

      // Actualizar la interfaz
      document.querySelectorAll(".notification-item").forEach((item) => {
        item.classList.remove("notification-unread")
        item.classList.add("notification-read")

        const icon = item.querySelector(".notification-mark-read i")
        if (icon) {
          icon.classList.remove("fa-circle")
          icon.classList.add("fa-check-circle")
        }
      })

      // Actualizar contador
      const notificationCount = document.getElementById("notification-count")
      notificationCount.textContent = "0"
      notificationCount.style.display = "none"
    } catch (error) {
      console.error("Error al marcar todas las notificaciones como leídas:", error)
    }
  }

  // Función para actualizar el contador de notificaciones
  function actualizarContadorNotificaciones() {
    const notificationCount = document.getElementById("notification-count")
    const noLeidas = document.querySelectorAll(".notification-item.notification-unread").length

    notificationCount.textContent = noLeidas
    notificationCount.style.display = noLeidas > 0 ? "flex" : "none"
  }

  // Función para obtener la URL de una receta según su ID
  function obtenerUrlReceta(recetaId) {
    // Mapeo de IDs a URLs (ajustar según la estructura de tu sitio)
    const mapeoRecetas = {
      1: "/US6_GuardarRecetas/pollo-agridulce.html",
      2: "/US6_GuardarRecetas/paella.html",
      3: "/US6_GuardarRecetas/crepas-dulces.html",
      4: "/US6_GuardarRecetas/bizcocho-capuccino.html",
      5: "/US6_GuardarRecetas/arepa-venezolana.html",
      6: "/US6_GuardarRecetas/galleta-de-sesamo.html",
      7: "/US6_GuardarRecetas/bollitos-chinos.html",
      8: "/US6_GuardarRecetas/fideos-salteados.html",
      9: "/US6_GuardarRecetas/tortilla-de-patatas.html",
    }

    return mapeoRecetas[recetaId] || null
  }

  // ===== SERVICIO DE NOTIFICACIONES =====
  // Función para crear una notificación cuando un usuario responde a un comentario
  async function crearNotificacionRespuesta(comentarioPadreId, respuestaTexto, recetaId, recetaTitulo) {
    try {
      console.log("Creando notificación local para respuesta:", {
        comentarioPadreId,
        respuestaTexto,
        recetaId,
        recetaTitulo,
      })

      // Obtener el usuario actual
      const usuarioActual = JSON.parse(localStorage.getItem("usuario"))
      if (!usuarioActual || !usuarioActual.id) {
        console.error("Usuario no autenticado")
        return true // Devolver true para no bloquear la respuesta
      }

      // Obtener información del comentario padre
      try {
        const { data: comentarioPadre, error: errorComentario } = await supabase
          .from("comentarios")
          .select("id_usuario, comentario")
          .eq("id_comentario", comentarioPadreId)
          .single()

        if (errorComentario) {
          console.error("Error al obtener comentario padre:", errorComentario)
          return true // Devolver true para no bloquear la respuesta
        }

        if (!comentarioPadre) {
          console.error("No se encontró el comentario padre con ID:", comentarioPadreId)
          return true // Devolver true para no bloquear la respuesta
        }

        // No crear notificación si el usuario responde a su propio comentario
        if (comentarioPadre.id_usuario === usuarioActual.id) {
          console.log("El usuario está respondiendo a su propio comentario, no se crea notificación")
          return true // Devolver true para no bloquear la respuesta
        }

        // Crear mensaje para la notificación
        const mensaje = `${usuarioActual.username} ha respondido a tu comentario: "${respuestaTexto.substring(0, 50)}${respuestaTexto.length > 50 ? "..." : ""}"`

        // Crear notificación local
        const nuevaNotificacion = {
          id: Date.now().toString(), // Usar timestamp como ID único
          id_usuario_destino: comentarioPadre.id_usuario,
          id_usuario_origen: usuarioActual.id,
          mensaje: mensaje,
          titulo_receta: recetaTitulo,
          id_receta: recetaId,
          id_comentario: comentarioPadreId,
          fecha: new Date().toISOString(),
          leida: false,
        }

        // Obtener notificaciones existentes o inicializar array vacío
        const notificacionesExistentes = JSON.parse(localStorage.getItem("notificaciones_locales") || "[]")

        // Agregar la nueva notificación
        notificacionesExistentes.push(nuevaNotificacion)

        // Guardar en localStorage
        localStorage.setItem("notificaciones_locales", JSON.stringify(notificacionesExistentes))

        console.log("Notificación local creada exitosamente:", nuevaNotificacion)
        return true
      } catch (error) {
        console.error("Error al obtener comentario padre:", error)
        return true // Devolver true para no bloquear la respuesta
      }
    } catch (error) {
      console.error("Error general al crear notificación de respuesta:", error)
      return true // Devolver true para no bloquear la respuesta
    }
  }

  // Exportar la función para usarla en otros archivos
  window.crearNotificacionRespuesta = crearNotificacionRespuesta

  // ===== HERRAMIENTA DE DEPURACIÓN =====
  // Función para verificar si el servicio de notificaciones está correctamente cargado
  function verificarServicioNotificaciones() {
    console.log("Verificando servicio de notificaciones...")

    // Verificar si la función crearNotificacionRespuesta está disponible
    if (typeof window.crearNotificacionRespuesta === "function") {
      console.log("✅ La función crearNotificacionRespuesta está disponible")
    } else {
      console.error("❌ La función crearNotificacionRespuesta NO está disponible")
    }

    // Verificar si el usuario está autenticado
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
    if (usuario && usuario.id) {
      console.log("✅ Usuario autenticado:", usuario.username)
    } else {
      console.error("❌ No hay usuario autenticado")
    }

    // Verificar notificaciones locales
    const notificacionesLocales = JSON.parse(localStorage.getItem("notificaciones_locales") || "[]")
    console.log(`✅ Hay ${notificacionesLocales.length} notificaciones locales almacenadas.`)
  }

  // Ejecutar verificación automáticamente
  setTimeout(verificarServicioNotificaciones, 2000) // Esperar 2 segundos para que todo se cargue
})

