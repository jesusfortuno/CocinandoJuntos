// Centro de Notificaciones para Cocinando Juntos
document.addEventListener("DOMContentLoaded", () => {
  console.log("Inicializando sistema de notificaciones...")

  // Configuración de Supabase
  const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
  const SUPABASE_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"

  // Inicializar Supabase
  let supabase
  try {
    if (window.supabase) {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)
      console.log("Supabase inicializado correctamente para notificaciones")
    } else {
      console.error("La biblioteca de Supabase no está cargada para notificaciones")
    }
  } catch (error) {
    console.error("Error al inicializar Supabase para notificaciones:", error)
  }

  // Referencias a elementos del DOM
  const navElement = document.querySelector("nav")

  // Verificar si el usuario está logueado
  let usuario
  try {
    usuario = JSON.parse(localStorage.getItem("usuario") || "null")
    console.log("Usuario cargado para notificaciones:", usuario ? usuario.username : "No hay usuario")
  } catch (error) {
    console.error("Error al cargar usuario para notificaciones:", error)
    usuario = null
  }

  // Solo mostrar notificaciones si el usuario está logueado
  if (usuario && usuario.id) {
    // Crear e insertar el icono de notificaciones en la barra de navegación
    insertarIconoNotificaciones()

    // Sincronizar notificaciones con Supabase al iniciar
    if (
      window.sincronizarNotificacionesConSupabase &&
      typeof window.sincronizarNotificacionesConSupabase === "function"
    ) {
      window.sincronizarNotificacionesConSupabase().then(() => {
        // Cargar notificaciones después de sincronizar
        cargarNotificaciones()
      })
    } else {
      // Si no está disponible la función de sincronización, cargar directamente
      cargarNotificaciones()
    }

    // Configurar actualización periódica de notificaciones (cada 60 segundos)
    setInterval(() => {
      // Sincronizar con Supabase antes de cargar
      if (
        window.sincronizarNotificacionesConSupabase &&
        typeof window.sincronizarNotificacionesConSupabase === "function"
      ) {
        window.sincronizarNotificacionesConSupabase().then(() => {
          cargarNotificaciones()
        })
      } else {
        cargarNotificaciones()
      }
    }, 60000)

    // Inicializar suscripción a notificaciones en tiempo real
    if (window.inicializarNotificacionesRealTime && typeof window.inicializarNotificacionesRealTime === "function") {
      window.inicializarNotificacionesRealTime()
    }
  }

  // Función para insertar el icono de notificaciones en la barra de navegación
  function insertarIconoNotificaciones() {
    try {
      console.log("Verificando icono de notificaciones existente...")

      // Buscar el botón de notificaciones existente (el rodeado de azul)
      let existingButton
      try {
        existingButton = document.querySelector("a#notification-button, .notification-bell, .fa-bell").closest("a, div")
      } catch (e) {
        console.warn("No se encontró el botón de notificaciones usando el selector principal")
      }

      // Si no se encontró, intentar con otros selectores
      if (!existingButton) {
        try {
          existingButton =
            document.querySelector(".notification-bell") ||
            document.querySelector("a:has(.fa-bell)") ||
            document.querySelector("div:has(.fa-bell)")
        } catch (e) {
          console.warn("No se encontró el botón de notificaciones usando selectores alternativos")
        }
      }

      if (existingButton) {
        console.log("Se encontró el botón de notificaciones existente, usando ese")

        // Asegurarse de que tenga un ID
        if (!existingButton.id) {
          existingButton.id = "notification-button"
        }

        // Verificar si tiene el badge
        if (!existingButton.querySelector(".notification-badge")) {
          // Añadir el badge si no existe
          const badge = document.createElement("span")
          badge.className = "notification-badge"
          badge.id = "notification-count"
          badge.style.display = "none"
          badge.textContent = "0"
          existingButton.appendChild(badge)
        }

        // Crear el panel desplegable de notificaciones si no existe
        let notificationPanel = document.getElementById("notification-panel")
        if (!notificationPanel) {
          notificationPanel = document.createElement("div")
          notificationPanel.className = "notification-panel"
          notificationPanel.id = "notification-panel"

          // Verificar si window.i18n está disponible
          let notificacionesText = "Notificaciones"
          let marcarTodasText = "Marcar todas como leídas"
          let noTienesText = "No tienes notificaciones"

          if (window.i18n && window.i18n.translations) {
            const currentLanguage = window.i18n.getCurrentLanguage ? window.i18n.getCurrentLanguage() : "es"
            if (window.i18n.translations[currentLanguage]) {
              notificacionesText = window.i18n.translations[currentLanguage]["Notificaciones"] || notificacionesText
              marcarTodasText = window.i18n.translations[currentLanguage]["Marcar todas como leídas"] || marcarTodasText
              noTienesText = window.i18n.translations[currentLanguage]["No tienes notificaciones"] || noTienesText
            }
          }

          notificationPanel.innerHTML = `
        <div class="notification-header">
          <h3 data-i18n="Notificaciones">${notificacionesText}</h3>
          <button id="mark-all-read" class="mark-all-read-btn" data-i18n="Marcar todas como leídas">
            ${marcarTodasText}
          </button>
        </div>
        <div class="notification-list" id="notification-list">
          <div class="notification-empty" data-i18n="No tienes notificaciones">
            ${noTienesText}
          </div>
        </div>
      `

          // Añadir el panel al DOM, justo después del botón
          const parentElement = existingButton.parentElement
          parentElement.insertBefore(notificationPanel, existingButton.nextSibling)
        }

        // Añadir evento de clic si no lo tiene
        if (!existingButton._hasClickEvent) {
          existingButton.addEventListener("click", (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (typeof toggleNotificationPanel === "function") {
              toggleNotificationPanel()
            } else if (typeof window.toggleNotificationPanel === "function") {
              window.toggleNotificationPanel()
            } else {
              console.error("La función toggleNotificationPanel no está definida")
              // Implementación de respaldo
              const panel = document.getElementById("notification-panel")
              if (panel) {
                panel.classList.toggle("active")
                if (panel.classList.contains("active")) {
                  cargarNotificaciones()
                }
              }
            }
          })
          existingButton._hasClickEvent = true
        }

        // Añadir evento para marcar todas como leídas
        const markAllReadBtn = document.getElementById("mark-all-read")
        if (markAllReadBtn && !markAllReadBtn._hasClickEvent) {
          markAllReadBtn.addEventListener("click", (e) => {
            e.preventDefault()
            e.stopPropagation()
            console.log("Botón 'Marcar todas como leídas' clickeado")
            marcarTodasComoLeidas(e)
          })
          markAllReadBtn._hasClickEvent = true
          console.log("✅ Evento de clic añadido al botón 'Marcar todas como leídas'")
        }

        // Cerrar el panel al hacer clic fuera de él
        if (!window._hasDocumentClickEvent) {
          document.addEventListener("click", (e) => {
            const panel = document.getElementById("notification-panel")
            if (panel && !panel.contains(e.target) && !existingButton.contains(e.target)) {
              panel.classList.remove("active")
            }
          })
          window._hasDocumentClickEvent = true
        }

        // Eliminar el otro icono de notificaciones (el rodeado de rojo) si existe
        const redundantNotificationContainer = document.querySelector(
          ".notification-container:not(:has(#notification-button))",
        )
        if (redundantNotificationContainer) {
          console.log("Eliminando icono de notificaciones redundante")
          redundantNotificationContainer.remove()
        }

        return true
      }

      // Si no se encuentra el botón existente, mostrar un mensaje de error
      console.error("No se encontró el botón de notificaciones existente (el rodeado de azul)")
      return false
    } catch (error) {
      console.error("Error al configurar el icono de notificaciones:", error)
      return false
    }
  }

  // Función para alternar la visibilidad del panel de notificaciones
  function toggleNotificationPanel() {
    try {
      console.log("Alternando visibilidad del panel de notificaciones")
      const panel = document.getElementById("notification-panel")
      if (!panel) {
        console.error("No se encontró el panel de notificaciones")
        return
      }

      panel.classList.toggle("active")

      // Si el panel se abre, actualizar notificaciones
      if (panel.classList.contains("active")) {
        // Sincronizar con Supabase antes de cargar
        if (
          window.sincronizarNotificacionesConSupabase &&
          typeof window.sincronizarNotificacionesConSupabase === "function"
        ) {
          window.sincronizarNotificacionesConSupabase().then(() => {
            cargarNotificaciones()
          })
        } else {
          cargarNotificaciones()
        }
      }
    } catch (error) {
      console.error("Error al alternar panel de notificaciones:", error)
    }
  }

  // Hacer que la función sea accesible globalmente
  window.toggleNotificationPanel = toggleNotificationPanel

  // Función para cargar notificaciones desde localStorage
  async function cargarNotificaciones() {
    try {
      console.log("Cargando notificaciones...")
      const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
      if (!usuario || !usuario.id) {
        console.log("No hay usuario autenticado, no se cargan notificaciones")
        return
      }

      // Primero intentar obtener notificaciones de Supabase
      let notificaciones = []

      try {
        if (supabase) {
          // Obtener notificaciones de Supabase
          const { data, error } = await supabase
            .from("notificaciones")
            .select("*")
            .eq("id_usuario_destino", usuario.id)
            .order("fecha", { ascending: false })

          if (error) {
            throw error
          }

          if (data && data.length > 0) {
            console.log(`Se encontraron ${data.length} notificaciones en Supabase`)
            notificaciones = data

            // Actualizar el localStorage con las notificaciones de Supabase
            localStorage.setItem("notificaciones_locales", JSON.stringify(data))
          } else {
            console.log("No se encontraron notificaciones en Supabase")
          }
        }
      } catch (supabaseError) {
        console.error("Error al obtener notificaciones de Supabase:", supabaseError)
        // Si hay error con Supabase, usar las notificaciones del localStorage
        notificaciones = obtenerNotificacionesLocales()
      }

      // Si no se obtuvieron notificaciones de Supabase, usar las del localStorage
      if (notificaciones.length === 0) {
        notificaciones = obtenerNotificacionesLocales()
      }

      console.log(`Se encontraron ${notificaciones.length} notificaciones para el usuario`)

      // Actualizar la interfaz con las notificaciones
      actualizarInterfazNotificaciones(notificaciones)

      // Actualizar el contador de notificaciones
      if (window.actualizarContadorNotificaciones && typeof window.actualizarContadorNotificaciones === "function") {
        window.actualizarContadorNotificaciones()
      }
    } catch (error) {
      console.error("Error al cargar notificaciones:", error)
    }
  }

  // Hacer que la función sea accesible globalmente
  window.cargarNotificaciones = cargarNotificaciones

  // Función para obtener notificaciones del localStorage
  function obtenerNotificacionesLocales() {
    try {
      // Obtener todas las notificaciones del localStorage
      const todasNotificaciones = JSON.parse(localStorage.getItem("notificaciones_locales") || "[]")

      // Filtrar solo las notificaciones para el usuario actual
      const notificacionesUsuario = todasNotificaciones.filter((n) => n.id_usuario_destino === usuario.id)

      // Ordenar por fecha (más recientes primero)
      notificacionesUsuario.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

      return notificacionesUsuario
    } catch (error) {
      console.error("Error al obtener notificaciones locales:", error)
      return []
    }
  }

  // Función para actualizar la interfaz con las notificaciones
  function actualizarInterfazNotificaciones(notificaciones) {
    try {
      console.log("Actualizando interfaz de notificaciones")
      const notificationList = document.getElementById("notification-list")
      const notificationCount = document.getElementById("notification-count")

      if (!notificationList) {
        console.warn("No se encontró el elemento notification-list en el DOM")
        // Intentar insertar el icono de notificaciones si no existe
        if (!document.querySelector(".notification-container")) {
          console.log("Intentando insertar el icono de notificaciones...")
          insertarIconoNotificaciones()
          // Intentar de nuevo después de insertar el icono
          setTimeout(() => actualizarInterfazNotificaciones(notificaciones), 500)
        }
        return
      }

      if (!notificationCount) {
        console.warn("No se encontró el elemento notification-count en el DOM")
      }

      // Obtener el idioma actual
      let currentLanguage = "es"
      if (window.i18n && window.i18n.getCurrentLanguage) {
        currentLanguage = window.i18n.getCurrentLanguage()
      }

      // Contar notificaciones no leídas
      const noLeidas = notificaciones.filter((n) => !n.leida).length
      console.log(`Notificaciones no leídas: ${noLeidas}`)

      // Actualizar contador
      if (notificationCount) {
        notificationCount.textContent = noLeidas
        notificationCount.style.display = noLeidas > 0 ? "flex" : "none"
      }

      // Si no hay notificaciones, mostrar mensaje traducido
      if (!notificaciones || notificaciones.length === 0) {
        let emptyMessage = "No tienes notificaciones"
        if (window.i18n && window.i18n.translations && window.i18n.translations[currentLanguage]) {
          emptyMessage = window.i18n.translations[currentLanguage]["No tienes notificaciones"] || emptyMessage
        }

        notificationList.innerHTML = `
      <div class="notification-empty" data-i18n="No tienes notificaciones">
        ${emptyMessage}
      </div>
    `
        return
      }

      // Generar HTML para las notificaciones
      let notificacionesHTML = ""

      notificaciones.forEach((notificacion) => {
        try {
          // Solo mostrar notificaciones no leídas
          if (!notificacion.leida) {
            const fecha = new Date(notificacion.fecha).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })

            const claseLeida = notificacion.leida ? "notification-read" : "notification-unread"
            const titulo = notificacion.titulo_receta || "Notificación"
            const mensaje = notificacion.mensaje || ""

            notificacionesHTML += `
          <div class="notification-item ${claseLeida}" data-id="${notificacion.id}">
            <div class="notification-content">
              <h4 class="notification-title">${titulo}</h4>
              <p class="notification-message">${mensaje}</p>
              <span class="notification-date">${fecha}</span>
            </div>
            <button class="notification-mark-read" title="Marcar como leída">
              <i class="fas ${notificacion.leida ? "fa-check-circle" : "fa-circle"}"></i>
            </button>
          </div>
        `
          }
        } catch (error) {
          console.error("Error al procesar notificación individual:", error, notificacion)
        }
      })

      // Si no hay notificaciones no leídas después de filtrar
      if (notificacionesHTML === "") {
        let emptyMessage = "No tienes notificaciones"
        if (window.i18n && window.i18n.translations && window.i18n.translations[currentLanguage]) {
          emptyMessage = window.i18n.translations[currentLanguage]["No tienes notificaciones"] || emptyMessage
        }

        notificationList.innerHTML = `
      <div class="notification-empty" data-i18n="No tienes notificaciones">
        ${emptyMessage}
      </div>
    `
        return
      }

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

      console.log("Interfaz de notificaciones actualizada correctamente")
    } catch (error) {
      console.error("Error al actualizar interfaz de notificaciones:", error)
    }
  }

  // Función para marcar una notificación como leída
  async function marcarComoLeida(notificationId) {
    try {
      console.log("Marcando notificación como leída:", notificationId)

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

      // Actualizar el estado en Supabase
      if (window.actualizarEstadoLeidoEnSupabase && typeof window.actualizarEstadoLeidoEnSupabase === "function") {
        await window.actualizarEstadoLeidoEnSupabase(notificationId, true)
      } else {
        // Implementación de respaldo
        try {
          if (supabase) {
            const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
            if (usuario && usuario.id) {
              await supabase
                .from("notificaciones")
                .update({ leida: true })
                .eq("id", notificationId)
                .eq("id_usuario_destino", usuario.id)
            }
          }
        } catch (error) {
          console.error("Error al actualizar estado en Supabase:", error)
        }
      }

      // Eliminar la notificación de la interfaz
      const item = document.querySelector(`.notification-item[data-id="${notificationId}"]`)
      if (item) {
        // Aplicar animación de desvanecimiento
        item.style.transition =
          "opacity 0.5s ease-out, height 0.5s ease-out, padding 0.5s ease-out, margin 0.5s ease-out"
        item.style.opacity = "0"
        item.style.height = "0"
        item.style.padding = "0"
        item.style.margin = "0"
        item.style.overflow = "hidden"

        // Eliminar el elemento después de la animación
        setTimeout(() => {
          item.remove()

          // Verificar si no quedan notificaciones
          const notificationList = document.getElementById("notification-list")
          if (notificationList && notificationList.children.length === 0) {
            let emptyMessage = "No tienes notificaciones"
            if (window.i18n && window.i18n.translations) {
              const currentLanguage = window.i18n.getCurrentLanguage ? window.i18n.getCurrentLanguage() : "es"
              if (window.i18n.translations[currentLanguage]) {
                emptyMessage = window.i18n.translations[currentLanguage]["No tienes notificaciones"] || emptyMessage
              }
            }
            notificationList.innerHTML = `
              <div class="notification-empty" data-i18n="No tienes notificaciones">
                ${emptyMessage}
              </div>
            `
          }
        }, 500)
      }

      // Actualizar contador
      actualizarContadorNotificaciones()
      console.log("Notificación marcada como leída correctamente")
    } catch (error) {
      console.error("Error al marcar notificación como leída:", error)
    }
  }

  // Función para marcar todas las notificaciones como leídas
  async function marcarTodasComoLeidas(e) {
    try {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      console.log("Marcando todas las notificaciones como leídas")

      // Obtener el usuario actual
      const usuarioActual = JSON.parse(localStorage.getItem("usuario") || "null")
      if (!usuarioActual || !usuarioActual.id) {
        console.log("No hay usuario autenticado, no se pueden marcar notificaciones")
        return
      }

      // Obtener todas las notificaciones
      const todasNotificaciones = JSON.parse(localStorage.getItem("notificaciones_locales") || "[]")

      // Actualizar todas las notificaciones del usuario actual
      const notificacionesActualizadas = todasNotificaciones.map((notif) => {
        if (notif.id_usuario_destino === usuarioActual.id) {
          return { ...notif, leida: true }
        }
        return notif
      })

      // Guardar las notificaciones actualizadas
      localStorage.setItem("notificaciones_locales", JSON.stringify(notificacionesActualizadas))

      // Actualizar el estado en Supabase
      if (window.marcarTodasComoLeidasEnSupabase && typeof window.marcarTodasComoLeidasEnSupabase === "function") {
        await window.marcarTodasComoLeidasEnSupabase()
      } else {
        // Implementación de respaldo
        try {
          if (supabase) {
            await supabase
              .from("notificaciones")
              .update({ leida: true })
              .eq("id_usuario_destino", usuarioActual.id)
              .eq("leida", false)
          }
        } catch (error) {
          console.error("Error al actualizar estado en Supabase:", error)
        }
      }

      // Animar y eliminar todas las notificaciones de la interfaz
      const items = document.querySelectorAll(".notification-item")
      if (items.length > 0) {
        items.forEach((item, index) => {
          // Aplicar animación de desvanecimiento
          item.style.transition =
            "opacity 0.3s ease-out, height 0.3s ease-out, padding 0.3s ease-out, margin 0.3s ease-out"
          item.style.opacity = "0"
          item.style.height = "0"
          item.style.padding = "0"
          item.style.margin = "0"
          item.style.overflow = "hidden"

          // Eliminar después de la animación
          setTimeout(() => {
            item.remove()

            // Si era el último elemento, mostrar mensaje de "No hay notificaciones"
            if (index === items.length - 1) {
              const notificationList = document.getElementById("notification-list")
              if (notificationList) {
                let emptyMessage = "No tienes notificaciones"
                if (window.i18n && window.i18n.translations) {
                  const currentLanguage = window.i18n.getCurrentLanguage ? window.i18n.getCurrentLanguage() : "es"
                  if (window.i18n.translations[currentLanguage]) {
                    emptyMessage = window.i18n.translations[currentLanguage]["No tienes notificaciones"] || emptyMessage
                  }
                }

                notificationList.innerHTML = `
                  <div class="notification-empty" data-i18n="No tienes notificaciones">
                    ${emptyMessage}
                  </div>
                `
              }
            }
          }, 300)
        })
      }

      // Actualizar contador
      const notificationCount = document.getElementById("notification-count")
      if (notificationCount) {
        notificationCount.textContent = "0"
        notificationCount.style.display = "none"
      }

      console.log("Todas las notificaciones marcadas como leídas correctamente")
    } catch (error) {
      console.error("Error al marcar todas las notificaciones como leídas:", error)
    }
  }

  // Hacer que la función sea accesible globalmente
  window.marcarTodasComoLeidas = marcarTodasComoLeidas

  // Función para actualizar el contador de notificaciones
  function actualizarContadorNotificaciones() {
    try {
      const notificationCount = document.getElementById("notification-count")
      if (!notificationCount) {
        console.error("No se encontró el contador de notificaciones")
        return
      }

      // Obtener notificaciones del localStorage
      const notificaciones = JSON.parse(localStorage.getItem("notificaciones_locales") || "[]")

      // Filtrar por usuario actual y no leídas
      const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
      if (!usuario || !usuario.id) return

      const noLeidas = notificaciones.filter((n) => n.id_usuario_destino === usuario.id && !n.leida).length

      console.log(`Actualizando contador de notificaciones: ${noLeidas} no leídas`)

      notificationCount.textContent = noLeidas
      notificationCount.style.display = noLeidas > 0 ? "flex" : "none"
    } catch (error) {
      console.error("Error al actualizar contador de notificaciones:", error)
    }
  }

  // Función para obtener la URL de una receta según su ID
  function obtenerUrlReceta(recetaId) {
    try {
      // Mapeo de IDs a URLs (ajustar según la estructura de tu sitio)
      const mapeoRecetas = {
        1: "/US6_GuardarRecetas/pollo-agridulce.html",
        2: "/US6_GuardarRecetas/paella.html",
        3: "/US6_GuardarRecetas/crepas-dulces.html",
        4: "/US6_GuardarRecetas/bizcocho-capuccino.html",
        5: "/US6_GuardarRecetas/arepa-venezolana.html",
        6: "/US6_GuardarRecetas/galletas-de-sesamo.html",
        7: "/US6_GuardarRecetas/bollitos-chinos.html",
        8: "/US6_GuardarRecetas/fideos-salteados.html",
        9: "/US6_GuardarRecetas/tortilla-de-patatas.html",
      }

      return mapeoRecetas[recetaId] || null
    } catch (error) {
      console.error("Error al obtener URL de receta:", error)
      return null
    }
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
        if (!supabase) {
          console.error("Supabase no está inicializado para obtener comentario padre")
          return true
        }

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

        // Crear notificación en Supabase
        const { data: notificacionData, error: errorNotificacion } = await supabase
          .from("notificaciones")
          .insert([
            {
              id_usuario_destino: comentarioPadre.id_usuario,
              id_usuario_origen: usuarioActual.id,
              mensaje: mensaje,
              titulo_receta: recetaTitulo,
              id_receta: recetaId,
              id_comentario: comentarioPadreId,
              fecha: new Date().toISOString(),
              leida: false,
            },
          ])
          .select()

        if (errorNotificacion) {
          console.error("Error al crear notificación en Supabase:", errorNotificacion)

          // Si falla Supabase, crear notificación local
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
        } else {
          console.log("Notificación creada exitosamente en Supabase:", notificacionData)

          // Actualizar localStorage con la notificación de Supabase
          if (notificacionData && notificacionData.length > 0) {
            const nuevaNotificacion = notificacionData[0]

            // Obtener notificaciones existentes
            const notificacionesExistentes = JSON.parse(localStorage.getItem("notificaciones_locales") || "[]")

            // Agregar la nueva notificación
            notificacionesExistentes.push(nuevaNotificacion)

            // Guardar en localStorage
            localStorage.setItem("notificaciones_locales", JSON.stringify(notificacionesExistentes))
          }
        }

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

    // Verificar funciones de sincronización
    if (typeof window.sincronizarNotificacionesConSupabase === "function") {
      console.log("✅ La función sincronizarNotificacionesConSupabase está disponible")
    } else {
      console.error("❌ La función sincronizarNotificacionesConSupabase NO está disponible")
    }

    // Verificar Supabase
    if (supabase) {
      console.log("✅ Supabase está inicializado correctamente")
    } else {
      console.error("❌ Supabase NO está inicializado")
    }
  }

  // Ejecutar verificación automáticamente
  setTimeout(verificarServicioNotificaciones, 2000) // Esperar 2 segundos para que todo se cargue

  // Añadir una función para actualizar las traducciones de las notificaciones
  function actualizarIdiomaNotificaciones(language) {
    try {
      console.log("Actualizando idioma de notificaciones a:", language)

      if (!window.i18n || !window.i18n.translations || !window.i18n.translations[language]) {
        console.warn("No se encontraron traducciones para el idioma:", language)
        return
      }

      // Actualizar el título de las notificaciones
      const notificationTitle = document.querySelector(".notification-header h3")
      if (notificationTitle) {
        notificationTitle.textContent = window.i18n.translations[language]["Notificaciones"] || "Notificaciones"
      }

      // Actualizar el botón de marcar todas como leídas
      const markAllReadBtn = document.getElementById("mark-all-read")
      if (markAllReadBtn) {
        markAllReadBtn.textContent =
          window.i18n.translations[language]["Marcar todas como leídas"] || "Marcar todas como leídas"
      }

      // Actualizar el mensaje de no notificaciones si está presente
      const emptyMessage = document.querySelector(".notification-empty")
      if (emptyMessage) {
        emptyMessage.textContent =
          window.i18n.translations[language]["No tienes notificaciones"] || "No tienes notificaciones"
      }

      console.log("Idioma de notificaciones actualizado correctamente")
    } catch (error) {
      console.error("Error al actualizar idioma de notificaciones:", error)
    }
  }

  // Escuchar el evento de cambio de idioma
  document.addEventListener("languageChanged", (e) => {
    actualizarIdiomaNotificaciones(e.detail.language)
  })

  // Hacer que la función insertarIconoNotificaciones sea accesible globalmente
  window.insertarIconoNotificaciones = insertarIconoNotificaciones
})

// Añadir un evento de carga para asegurarse de que las notificaciones se inicializan
// incluso si el script de notificaciones se carga después
window.addEventListener("load", () => {
  // Esperar un poco para asegurarse de que todos los scripts se han cargado
  setTimeout(() => {
    console.log("Verificando sistema de notificaciones después de carga completa...")

    // Verificar si el usuario está logueado
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
    if (usuario && usuario.id) {
      // Verificar si el botón de notificaciones existe
      const notificationButton = document.getElementById("notification-button")
      if (notificationButton) {
        // Añadir evento de clic si no lo tiene
        if (!notificationButton._hasClickEvent) {
          notificationButton.addEventListener("click", (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (typeof toggleNotificationPanel === "function") {
              toggleNotificationPanel()
            } else if (typeof window.toggleNotificationPanel === "function") {
              window.toggleNotificationPanel()
            } else {
              console.error("La función toggleNotificationPanel no está definida")
              // Implementación de respaldo
              const panel = document.getElementById("notification-panel")
              if (panel) {
                panel.classList.toggle("active")
                if (panel.classList.contains("active")) {
                  if (typeof cargarNotificaciones === "function") {
                    cargarNotificaciones()
                  } else if (typeof window.cargarNotificaciones === "function") {
                    window.cargarNotificaciones()
                  }
                }
              }
            }
          })
          notificationButton._hasClickEvent = true
        }

        // Verificar si tiene el badge
        if (!notificationButton.querySelector(".notification-badge")) {
          // Añadir el badge si no existe
          const badge = document.createElement("span")
          badge.className = "notification-badge"
          badge.id = "notification-count"
          badge.style.display = "none"
          badge.textContent = "0"
          notificationButton.appendChild(badge)
        }
      }

      // Sincronizar notificaciones con Supabase al cargar la página
      if (typeof window.sincronizarNotificacionesConSupabase === "function") {
        window.sincronizarNotificacionesConSupabase().then(() => {
          // Cargar notificaciones después de sincronizar
          if (typeof cargarNotificaciones === "function") {
            cargarNotificaciones()
          } else if (typeof window.cargarNotificaciones === "function") {
            window.cargarNotificaciones()
          }
        })
      } else {
        // Si no está disponible la función de sincronización, cargar directamente
        if (typeof cargarNotificaciones === "function") {
          cargarNotificaciones()
        } else if (typeof window.cargarNotificaciones === "function") {
          window.cargarNotificaciones()
        }
      }

      // Inicializar suscripción a notificaciones en tiempo real
      if (typeof window.inicializarNotificacionesRealTime === "function") {
        window.inicializarNotificacionesRealTime()
      }
    }
  }, 3000)
})

// Añadir un evento de carga adicional para asegurarse de que el botón tenga el evento
window.addEventListener("load", () => {
  setTimeout(() => {
    // Buscar el botón directamente por su ID o clase
    const markAllReadBtn = document.getElementById("mark-all-read") || document.querySelector(".mark-all-read-btn")

    if (markAllReadBtn) {
      if (!markAllReadBtn._hasClickEvent) {
        markAllReadBtn.addEventListener("click", (e) => {
          e.preventDefault()
          e.stopPropagation()
          console.log("Botón 'Marcar todas como leídas' clickeado (evento adicional)")

          if (typeof marcarTodasComoLeidas === "function") {
            marcarTodasComoLeidas(e)
          } else if (typeof window.marcarTodasComoLeidas === "function") {
            window.marcarTodasComoLeidas(e)
          } else {
            console.error("La función marcarTodasComoLeidas no está definida")

            // Implementación de respaldo
            try {
              // Obtener el usuario actual
              const usuarioActual = JSON.parse(localStorage.getItem("usuario") || "null")
              if (!usuarioActual || !usuarioActual.id) return

              // Obtener todas las notificaciones
              const todasNotificaciones = JSON.parse(localStorage.getItem("notificaciones_locales") || "[]")

              // Actualizar todas las notificaciones del usuario actual
              const notificacionesActualizadas = todasNotificaciones.map((notif) => {
                if (notif.id_usuario_destino === usuarioActual.id) {
                  return { ...notif, leida: true }
                }
                return notif
              })

              // Guardar las notificaciones actualizadas
              localStorage.setItem("notificaciones_locales", JSON.stringify(notificacionesActualizadas))

              // Actualizar la interfaz
              const items = document.querySelectorAll(".notification-item")
              items.forEach((item) => item.remove())

              // Mostrar mensaje de no notificaciones
              const notificationList = document.getElementById("notification-list")
              if (notificationList) {
                notificationList.innerHTML = `
                  <div class="notification-empty">
                    No tienes notificaciones
                  </div>
                `
              }

              // Actualizar contador
              const badge = document.getElementById("notification-count")
              if (badge) {
                badge.textContent = "0"
                badge.style.display = "none"
              }

              // Intentar actualizar en Supabase si está disponible
              const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
              const SUPABASE_API_KEY =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"

              if (window.supabase) {
                const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)
                supabase
                  .from("notificaciones")
                  .update({ leida: true })
                  .eq("id_usuario_destino", usuarioActual.id)
                  .eq("leida", false)
                  .then(() => {
                    console.log("Notificaciones actualizadas en Supabase (respaldo)")
                  })
                  .catch((error) => {
                    console.error("Error al actualizar notificaciones en Supabase (respaldo):", error)
                  })
              }
            } catch (error) {
              console.error("Error en la implementación de respaldo:", error)
            }
          }
        })
        markAllReadBtn._hasClickEvent = true
        console.log("✅ Evento de clic añadido al botón 'Marcar todas como leídas' (carga adicional)")
      }
    } else {
      console.warn("⚠️ No se encontró el botón 'Marcar todas como leídas' en la carga adicional")

      // Buscar el botón en el DOM actual
      const allButtons = document.querySelectorAll("button")
      const possibleButtons = Array.from(allButtons).filter(
        (btn) =>
          btn.textContent.includes("Marcar todas como leídas") ||
          btn.getAttribute("data-i18n") === "Marcar todas como leídas",
      )

      if (possibleButtons.length > 0) {
        console.log("Se encontraron posibles botones:", possibleButtons.length)
        possibleButtons.forEach((btn, index) => {
          console.log(`Añadiendo evento al botón alternativo ${index + 1}`)
          btn.addEventListener("click", (e) => {
            e.preventDefault()
            e.stopPropagation()
            console.log(`Botón alternativo ${index + 1} clickeado`)

            if (typeof window.marcarTodasComoLeidas === "function") {
              window.marcarTodasComoLeidas(e)
            }
          })
        })
      }
    }

    // Verificar si hay un enlace con el texto "Marcar todas como leídas"
    const markAllReadLink = Array.from(document.querySelectorAll("a")).find(
      (a) => a.textContent.trim() === "Marcar todas como leídas",
    )

    if (markAllReadLink) {
      console.log("Se encontró un enlace 'Marcar todas como leídas'")
      markAllReadLink.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("Enlace 'Marcar todas como leídas' clickeado")

        if (typeof window.marcarTodasComoLeidas === "function") {
          window.marcarTodasComoLeidas(e)
        }
      })
    }
  }, 3000)
})

// Añadir un observador de mutaciones para detectar cuando se añade el botón al DOM
window.addEventListener("load", () => {
  setTimeout(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          // Buscar el botón entre los nodos añadidos
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              // Elemento
              const markAllReadBtn =
                node.id === "mark-all-read" ? node : node.querySelector("#mark-all-read, .mark-all-read-btn")

              if (markAllReadBtn && !markAllReadBtn._hasClickEvent) {
                console.log("Botón 'Marcar todas como leídas' detectado por el observador")
                markAllReadBtn.addEventListener("click", (e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log("Botón 'Marcar todas como leídas' clickeado (observador)")

                  if (typeof window.marcarTodasComoLeidas === "function") {
                    window.marcarTodasComoLeidas(e)
                  }
                })
                markAllReadBtn._hasClickEvent = true
              }
            }
          })
        }
      })
    })

    // Observar todo el documento
    observer.observe(document.body, { childList: true, subtree: true })

    // Detener el observador después de 10 segundos para no consumir recursos
    setTimeout(() => observer.disconnect(), 10000)
  }, 2000)
})

// Verificar periódicamente si hay nuevas notificaciones en Supabase
setInterval(() => {
  // Solo ejecutar si el usuario está autenticado
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
  if (!usuario || !usuario.id) return

  // Sincronizar con Supabase si la función está disponible
  if (typeof window.sincronizarNotificacionesConSupabase === "function") {
    window.sincronizarNotificacionesConSupabase().then(() => {
      // Actualizar contador después de sincronizar
      if (typeof window.actualizarContadorNotificaciones === "function") {
        window.actualizarContadorNotificaciones()
      }

      // Actualizar panel si está abierto
      const panel = document.getElementById("notification-panel")
      if (panel && panel.classList.contains("active")) {
        if (typeof window.cargarNotificaciones === "function") {
          window.cargarNotificaciones()
        }
      }
    })
  }
}, 300000) // Verificar cada 5 minutos
