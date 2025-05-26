// Servicio para crear notificaciones cuando un usuario responde a un comentario
// Este archivo debe ser incluido en la página de recetas donde se pueden hacer comentarios

// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"

// Inicializar Supabase de manera segura
let supabase
try {
  if (window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)
    console.log("Supabase inicializado correctamente en notification-service")
  } else {
    console.warn("La biblioteca de Supabase no está disponible en notification-service")
  }
} catch (error) {
  console.error("Error al inicializar Supabase en notification-service:", error)
}

// Inicializar suscripción a notificaciones en tiempo real
function inicializarNotificacionesRealTime() {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
    if (!usuario || !usuario.id) {
      console.log("No hay usuario autenticado, no se inicializan notificaciones en tiempo real")
      return
    }

    console.log("Inicializando suscripción a notificaciones en tiempo real para el usuario:", usuario.id)

    // Verificar si ya existe una suscripción activa
    if (window.notificacionesSubscription) {
      console.log("Ya existe una suscripción activa, no se crea otra")
      return window.notificacionesSubscription
    }

    // Verificar que Supabase esté disponible
    if (!supabase) {
      console.error("Supabase no está inicializado, no se puede crear suscripción")
      return
    }

    // Suscribirse a cambios en la tabla de notificaciones para este usuario
    const channelName = `notificaciones_usuario_${usuario.id}`
    console.log("Creando canal:", channelName)

    const subscription = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notificaciones",
          filter: `id_usuario_destino=eq.${usuario.id}`,
        },
        (payload) => {
          console.log("¡Nueva notificación recibida en tiempo real!", payload)

          // Obtener la notificación recién creada
          const nuevaNotificacion = payload.new

          // Guardar en localStorage para persistencia
          guardarNotificacionLocal(nuevaNotificacion)

          // Mostrar notificación visual al usuario
          mostrarNotificacionVisual(nuevaNotificacion)

          // Animar el icono de la campana
          const bellIcon = document.querySelector("#notification-button i")
          if (bellIcon) {
            bellIcon.classList.add("fa-bell-animation")
            setTimeout(() => {
              bellIcon.classList.remove("fa-bell-animation")
            }, 2000)
          }

          // Actualizar el contador de notificaciones
          actualizarContadorNotificaciones()
        },
      )
      .subscribe((status) => {
        console.log("Estado de la suscripción a notificaciones:", status)
        if (status === "SUBSCRIBED") {
          console.log("✅ Suscripción a notificaciones en tiempo real ACTIVA")
        }
      })

    console.log("Suscripción a notificaciones en tiempo real inicializada correctamente")

    // Guardar la suscripción para poder limpiarla más tarde si es necesario
    window.notificacionesSubscription = subscription

    return subscription
  } catch (error) {
    console.error("Error al inicializar suscripción a notificaciones en tiempo real:", error)
  }
}

// Función para guardar una notificación en localStorage
function guardarNotificacionLocal(notificacion) {
  try {
    // Obtener notificaciones existentes
    const notificacionesExistentes = JSON.parse(localStorage.getItem("notificaciones_locales") || "[]")

    // Verificar si la notificación ya existe para evitar duplicados
    const existe = notificacionesExistentes.some((n) => n.id === notificacion.id)

    if (!existe) {
      // Agregar la nueva notificación
      notificacionesExistentes.push(notificacion)

      // Guardar en localStorage
      localStorage.setItem("notificaciones_locales", JSON.stringify(notificacionesExistentes))

      console.log("Notificación guardada en localStorage:", notificacion)
    }
  } catch (error) {
    console.error("Error al guardar notificación en localStorage:", error)
  }
}

// Función para mostrar una notificación visual al usuario
function mostrarNotificacionVisual(notificacion) {
  try {
    // Verificar si el navegador soporta notificaciones
    if (!("Notification" in window)) {
      console.log("Este navegador no soporta notificaciones de escritorio")
      return
    }

    // Verificar si ya tenemos permiso
    if (Notification.permission === "granted") {
      // Crear y mostrar la notificación
      crearNotificacionVisual(notificacion)
    }
    // Si no se ha pedido permiso aún
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          crearNotificacionVisual(notificacion)
        }
      })
    }

    // También mostrar una notificación en la interfaz
    mostrarNotificacionEnInterfaz(notificacion)
  } catch (error) {
    console.error("Error al mostrar notificación visual:", error)
  }
}

// Crear notificación visual del navegador
function crearNotificacionVisual(notificacion) {
  try {
    const notification = new Notification("Cocinando Juntos", {
      body: notificacion.mensaje,
      icon: "/Imagenes/logos/logo-cocinando-juntos.png",
    })

    notification.onclick = function () {
      window.focus()
      // Si hay un ID de receta, redirigir a esa página
      if (notificacion.id_receta) {
        const recetaUrl = obtenerUrlReceta(notificacion.id_receta)
        if (recetaUrl) {
          window.location.href = recetaUrl
        }
      }
      this.close()
    }
  } catch (error) {
    console.error("Error al crear notificación visual:", error)
  }
}

// Modificar la función mostrarNotificacionEnInterfaz para evitar errores
function mostrarNotificacionEnInterfaz(notificacion) {
  try {
    // Animar el icono de la campana (el rodeado de azul)
    const bellIcon = document.querySelector("#notification-button .fa-bell, #notification-button i, .fa-bell")
    if (bellIcon) {
      // Añadir clase para animación
      bellIcon.classList.add("notification-new")

      // Cambiar temporalmente el color a rojo
      bellIcon.style.color = "#ff4b4b"

      // Quitar la clase después de la animación
      setTimeout(() => {
        bellIcon.classList.remove("notification-new")
        bellIcon.style.color = ""
      }, 2000)
    }

    // Actualizar el contador de notificaciones
    if (typeof actualizarContadorNotificaciones === "function") {
      actualizarContadorNotificaciones()
    } else if (
      window.actualizarContadorNotificaciones &&
      typeof window.actualizarContadorNotificaciones === "function"
    ) {
      window.actualizarContadorNotificaciones()
    }

    // Actualizar la interfaz si el panel está abierto
    const panel = document.getElementById("notification-panel")
    if (panel && panel.classList.contains("active")) {
      if (typeof window.cargarNotificaciones === "function") {
        window.cargarNotificaciones()
      }
    }
  } catch (error) {
    console.error("Error al mostrar notificación en la interfaz:", error)
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

// Función para actualizar la interfaz de notificaciones
function actualizarInterfazNotificaciones() {
  // Verificar si la función existe en el centro de notificaciones
  if (window.cargarNotificaciones && typeof window.cargarNotificaciones === "function") {
    window.cargarNotificaciones()
  }
}

// Función para crear una notificación cuando un usuario responde a un comentario
async function crearNotificacionRespuesta(comentarioPadreId, respuestaTexto, recetaId, recetaTitulo) {
  try {
    console.log("Creando notificación para respuesta:", {
      comentarioPadreId,
      respuestaTexto,
      recetaId,
      recetaTitulo,
    })

    // Obtener el usuario actual
    const usuarioActual = JSON.parse(localStorage.getItem("usuario"))
    if (!usuarioActual || !usuarioActual.id) {
      console.error("Usuario no autenticado")
      return
    }

    console.log("Usuario actual:", usuarioActual)

    // Verificar que Supabase esté disponible
    if (!supabase) {
      console.error("Supabase no está inicializado, no se puede crear notificación")
      return
    }

    // Obtener información del comentario padre
    const { data: comentarioPadre, error: errorComentario } = await supabase
      .from("comentarios")
      .select("id_usuario, comentario")
      .eq("id_comentario", comentarioPadreId)
      .single()

    console.log("Comentario padre:", comentarioPadre)
    console.log("Error al obtener comentario padre:", errorComentario)

    if (errorComentario || !comentarioPadre) {
      console.error("Error al obtener comentario padre:", errorComentario)
      return
    }

    // No crear notificación si el usuario responde a su propio comentario
    if (comentarioPadre.id_usuario === usuarioActual.id) {
      console.log("El usuario está respondiendo a su propio comentario, no se crea notificación")
      return
    }

    // Crear mensaje para la notificación
    const mensaje = `${usuarioActual.username} ha respondido a tu comentario: "${respuestaTexto.substring(0, 50)}${respuestaTexto.length > 50 ? "..." : ""}"`

    console.log("Creando notificación con mensaje:", mensaje)

    // Crear la notificación
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

    console.log("Resultado de crear notificación:", notificacionData)
    console.log("Error al crear notificación:", errorNotificacion)

    if (errorNotificacion) {
      console.error("Error al crear notificación:", errorNotificacion)
    } else {
      console.log("Notificación creada exitosamente")
    }
  } catch (error) {
    console.error("Error al crear notificación de respuesta:", error)
  }
}

// Función para actualizar el estado de leído en Supabase
async function actualizarEstadoLeidoEnSupabase(notificationId, leida = true) {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
    if (!usuario || !usuario.id) {
      console.log("No hay usuario autenticado, no se puede actualizar el estado en Supabase")
      return false
    }

    // Verificar que Supabase esté disponible
    if (!supabase) {
      console.error("Supabase no está inicializado, no se puede actualizar estado")
      return false
    }

    console.log(`Actualizando estado de notificación ${notificationId} a leída=${leida} en Supabase`)

    const { data, error } = await supabase
      .from("notificaciones")
      .update({ leida: leida })
      .eq("id", notificationId)
      .eq("id_usuario_destino", usuario.id)

    if (error) {
      console.error("Error al actualizar estado de notificación en Supabase:", error)
      return false
    }

    console.log("Estado de notificación actualizado correctamente en Supabase")
    // Sincronizar inmediatamente después de actualizar
    if (
      window.sincronizarNotificacionesConSupabase &&
      typeof window.sincronizarNotificacionesConSupabase === "function"
    ) {
      setTimeout(() => {
        window.sincronizarNotificacionesConSupabase()
      }, 500)
    }
    return true
  } catch (error) {
    console.error("Error al actualizar estado de notificación en Supabase:", error)
    return false
  }
}

// Función para marcar todas las notificaciones como leídas en Supabase
async function marcarTodasComoLeidasEnSupabase() {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
    if (!usuario || !usuario.id) {
      console.log("No hay usuario autenticado, no se pueden marcar notificaciones en Supabase")
      return false
    }

    // Verificar que Supabase esté disponible
    if (!supabase) {
      console.error("Supabase no está inicializado, no se pueden marcar todas como leídas")
      return false
    }

    console.log("Marcando todas las notificaciones como leídas en Supabase")

    const { data, error } = await supabase
      .from("notificaciones")
      .update({ leida: true })
      .eq("id_usuario_destino", usuario.id)
      .eq("leida", false)

    if (error) {
      console.error("Error al marcar todas las notificaciones como leídas en Supabase:", error)
      return false
    }

    console.log("Todas las notificaciones marcadas como leídas correctamente en Supabase")
    // Sincronizar inmediatamente después de actualizar
    if (
      window.sincronizarNotificacionesConSupabase &&
      typeof window.sincronizarNotificacionesConSupabase === "function"
    ) {
      setTimeout(() => {
        window.sincronizarNotificacionesConSupabase()
      }, 500)
    }
    return true
  } catch (error) {
    console.error("Error al marcar todas las notificaciones como leídas en Supabase:", error)
    return false
  }
}

// Función para sincronizar notificaciones locales con Supabase
async function sincronizarNotificacionesConSupabase() {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
    if (!usuario || !usuario.id) {
      console.log("No hay usuario autenticado, no se pueden sincronizar notificaciones")
      return false
    }

    // Verificar que Supabase esté disponible
    if (!supabase) {
      console.error("Supabase no está inicializado, no se pueden sincronizar notificaciones")
      return false
    }

    console.log("Sincronizando notificaciones con Supabase...")

    // Obtener notificaciones de Supabase
    const { data: notificacionesSupabase, error } = await supabase
      .from("notificaciones")
      .select("*")
      .eq("id_usuario_destino", usuario.id)
      .order("fecha", { ascending: false })

    if (error) {
      console.error("Error al obtener notificaciones de Supabase:", error)
      return false
    }

    // Si hay notificaciones en Supabase, reemplazar completamente las locales
    if (notificacionesSupabase && notificacionesSupabase.length >= 0) {
      // Filtrar solo las notificaciones del usuario actual
      const notificacionesOtrosUsuarios = JSON.parse(localStorage.getItem("notificaciones_locales") || "[]").filter(
        (n) => n.id_usuario_destino !== usuario.id,
      )

      // Combinar las notificaciones de otros usuarios con las del usuario actual de Supabase
      const todasLasNotificaciones = [...notificacionesOtrosUsuarios, ...notificacionesSupabase]

      // Guardar en localStorage
      localStorage.setItem("notificaciones_locales", JSON.stringify(todasLasNotificaciones))

      console.log(`Sincronizadas ${notificacionesSupabase.length} notificaciones desde Supabase`)
    }

    // Actualizar el contador después de sincronizar
    if (window.actualizarContadorNotificaciones && typeof window.actualizarContadorNotificaciones === "function") {
      window.actualizarContadorNotificaciones()
    }

    console.log("Notificaciones sincronizadas correctamente con Supabase")
    return true
  } catch (error) {
    console.error("Error al sincronizar notificaciones con Supabase:", error)
    return false
  }
}

// Modificar la función actualizarContadorNotificaciones para solo contar notificaciones no leídas
function actualizarContadorNotificaciones() {
  try {
    // Obtener todas las notificaciones
    const notificaciones = JSON.parse(localStorage.getItem("notificaciones_locales") || "[]")

    // Filtrar por usuario actual
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
    if (!usuario || !usuario.id) return

    const notificacionesUsuario = notificaciones.filter((n) => n.id_usuario_destino === usuario.id)

    // Contar no leídas
    const noLeidas = notificacionesUsuario.filter((n) => !n.leida).length

    // Actualizar el badge
    const badge = document.querySelector("#notification-count, .notification-badge")
    if (badge) {
      badge.textContent = noLeidas
      badge.style.display = noLeidas > 0 ? "flex" : "none"
    }
  } catch (error) {
    console.error("Error al actualizar contador de notificaciones:", error)
  }
}

// Asegurarse de que la inicialización se realice después de que el DOM esté completamente cargado
// y después de que se hayan cargado todos los scripts necesarios
window.addEventListener("load", () => {
  // Esperar un poco para asegurarse de que todos los scripts se han cargado
  setTimeout(() => {
    console.log("Inicializando servicio de notificaciones en tiempo real (evento load)...")

    // Sincronizar notificaciones con Supabase al cargar la página
    sincronizarNotificacionesConSupabase().then(() => {
      // Inicializar notificaciones en tiempo real después de sincronizar
      inicializarNotificacionesRealTime()

      // Actualizar contador de notificaciones
      actualizarContadorNotificaciones()
    })

    // Exportar funciones globales
    window.actualizarContadorNotificaciones = actualizarContadorNotificaciones
    window.actualizarEstadoLeidoEnSupabase = actualizarEstadoLeidoEnSupabase
    window.marcarTodasComoLeidasEnSupabase = marcarTodasComoLeidasEnSupabase
    window.sincronizarNotificacionesConSupabase = sincronizarNotificacionesConSupabase
  }, 2000)
})

// Exportar funciones globales
window.crearNotificacionRespuesta = crearNotificacionRespuesta
window.inicializarNotificacionesRealTime = inicializarNotificacionesRealTime
window.actualizarContadorNotificaciones = actualizarContadorNotificaciones
window.actualizarEstadoLeidoEnSupabase = actualizarEstadoLeidoEnSupabase
window.marcarTodasComoLeidasEnSupabase = marcarTodasComoLeidasEnSupabase
window.sincronizarNotificacionesConSupabase = sincronizarNotificacionesConSupabase
