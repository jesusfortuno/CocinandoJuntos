// Servicio para crear notificaciones cuando un usuario responde a un comentario
// Este archivo debe ser incluido en la página de recetas donde se pueden hacer comentarios

// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

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

// Exportar la función para usarla en otros archivos
window.crearNotificacionRespuesta = crearNotificacionRespuesta

