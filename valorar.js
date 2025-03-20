import { supabase } from "./supabaseConfig.js"

document.addEventListener("DOMContentLoaded", () => {
  // Referencias a elementos del DOM
  const ratingStars = document.querySelectorAll(".rating span")
  const commentTextarea = document.getElementById("commentText")
  const submitButton = document.getElementById("submitComment")
  const commentsList = document.getElementById("commentsList")
  const cancelReplyButton = document.getElementById("cancelReply")
  const replyingToDiv = document.getElementById("replyingTo")
  const ratingStarsDiv = document.getElementById("ratingStars")
  const recipeRatingElement = document.getElementById("recipeRating")
  const rateButton = document.getElementById("rateButton")

  // Obtener el ID de la receta de la URL actual
  const recetaId = obtenerIdReceta()

  // Variable para almacenar la valoración seleccionada
  let valoracionSeleccionada = 0

  // Variable para almacenar el ID del comentario al que se responde (si existe)
  let respondingToId = null

  // Inicializar la funcionalidad
  inicializarEstrellas()
  cargarComentarios()

  // Evento para enviar comentario
  submitButton.addEventListener("click", enviarComentario)

  // Evento para cancelar respuesta
  cancelReplyButton.addEventListener("click", cancelarRespuesta)

  if (rateButton) {
    rateButton.addEventListener("click", () => {
      // Desplazar hasta la sección de comentarios
      const commentsSection = document.getElementById("commentsSection")
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: "smooth" })

        // Opcional: dar foco al textarea para que el usuario pueda empezar a escribir
        setTimeout(() => {
          commentTextarea.focus()
        }, 500)
      }
    })
  }

  function inicializarEstrellas() {
    ratingStars.forEach((star, index) => {
      star.addEventListener("click", () => {
        // Solo permitir seleccionar estrellas si no estamos respondiendo a un comentario
        if (!respondingToId) {
          valoracionSeleccionada = index + 1
          actualizarEstrellas()
        }
      })

      star.addEventListener("mouseover", () => {
        // Solo mostrar hover si no estamos respondiendo a un comentario
        if (!respondingToId) {
          for (let i = 0; i <= index; i++) {
            ratingStars[i].style.color = "#f39c12"
          }
        }
      })

      star.addEventListener("mouseout", () => {
        actualizarEstrellas()
      })
    })
  }

  function actualizarEstrellas() {
    ratingStars.forEach((star, index) => {
      star.style.color = index < valoracionSeleccionada ? "#f39c12" : "#ccc"
    })
  }

  function obtenerIdReceta() {
    // Obtener el nombre del archivo actual
    const rutaActual = window.location.pathname

    // Mapeo de rutas a IDs
    const mapeoRecetas = {
      "/US6_GuardarRecetas/pollo-agridulce.html": 1,
      "/US6_GuardarRecetas/paella.html": 2,
      "/US6_GuardarRecetas/crepas-dulces.html": 3,
      "/US6_GuardarRecetas/bizcocho-capuccino.html": 4,
      "/US6_GuardarRecetas/arepa-venezolana.html": 5,
      "/US6_GuardarRecetas/galleta-de-sesamo.html": 6,
      "/US6_GuardarRecetas/bollitos-chinos.html": 7,
      "/US6_GuardarRecetas/fideos-salteados.html": 8,
      "/US6_GuardarRecetas/tortilla-de-patatas.html": 9,
    }

    // Encontrar el ID correspondiente a la ruta actual
    for (const [ruta, id] of Object.entries(mapeoRecetas)) {
      if (rutaActual.includes(ruta) || rutaActual.endsWith(ruta)) {
        return id
      }
    }

    console.error("No se pudo determinar el ID de la receta para la ruta:", rutaActual)
    return null
  }

  async function cargarComentarios() {
    const idReceta = obtenerIdReceta()
    if (!idReceta) {
      commentsList.innerHTML = "<p>Error: No se pudo identificar la receta</p>"
      return
    }

    try {
      // Primero obtenemos los comentarios de la receta específica
      const { data: comentarios, error: errorComentarios } = await supabase
        .from("comentarios")
        .select("*")
        .eq("id_receta", idReceta) // Usar el ID específico de la receta
        .order("fecha_comentario", { ascending: false })

      if (errorComentarios) throw errorComentarios

      // Si hay comentarios, obtenemos los usuarios correspondientes
      if (comentarios && comentarios.length > 0) {
        const userIds = [...new Set(comentarios.map((c) => c.id_usuario))]

        const { data: usuarios, error: errorUsuarios } = await supabase
          .from("usuarios")
          .select("id, username")
          .in("id", userIds)

        if (errorUsuarios) throw errorUsuarios

        const usuariosMap = new Map(usuarios?.map((u) => [u.id, u.username]) || [])

        // Organizar comentarios y respuestas
        const comentariosOrganizados = organizarComentariosYRespuestas(comentarios, usuariosMap)

        // Actualizar la valoración media de la receta
        actualizarValoracionMedia(comentarios)

        mostrarComentarios(comentariosOrganizados)
      } else {
        mostrarComentarios([])
      }
    } catch (error) {
      console.error("Error al cargar comentarios:", error)
      commentsList.innerHTML = "<p>Error al cargar los comentarios</p>"
    }
  }

  // Función para calcular y actualizar la valoración media
  function actualizarValoracionMedia(comentarios) {
    if (!recipeRatingElement) return

    // Filtrar solo comentarios con valoración (no respuestas)
    const comentariosConValoracion = comentarios.filter((c) => c.valoracion !== null && c.valoracion > 0)

    if (comentariosConValoracion.length === 0) {
      recipeRatingElement.textContent = "Sin valoraciones"
      return
    }

    // Calcular la media
    const sumaValoraciones = comentariosConValoracion.reduce((sum, c) => sum + c.valoracion, 0)
    const mediaValoracion = sumaValoraciones / comentariosConValoracion.length

    // Mostrar la media con 1 decimal y el número de valoraciones
    recipeRatingElement.textContent = `${mediaValoracion.toFixed(1)}/5 (${comentariosConValoracion.length})`
  }

  // Función para organizar comentarios y sus respuestas
  function organizarComentariosYRespuestas(comentarios, usuariosMap) {
    // Separar comentarios principales y respuestas
    const comentariosPrincipales = comentarios.filter((c) => !c.comentario_padre_id)
    const respuestas = comentarios.filter((c) => c.comentario_padre_id)

    // Añadir username a cada comentario
    const comentariosConUsuarios = comentariosPrincipales.map((comentario) => {
      const comentarioConUsuario = {
        ...comentario,
        username: usuariosMap.get(comentario.id_usuario) || "Usuario",
        respuestas: [],
      }

      // Añadir respuestas a este comentario
      respuestas.forEach((respuesta) => {
        if (respuesta.comentario_padre_id === comentario.id_comentario) {
          comentarioConUsuario.respuestas.push({
            ...respuesta,
            username: usuariosMap.get(respuesta.id_usuario) || "Usuario",
          })
        }
      })

      // Ordenar respuestas por fecha (más antiguas primero)
      comentarioConUsuario.respuestas.sort((a, b) => new Date(a.fecha_comentario) - new Date(b.fecha_comentario))

      return comentarioConUsuario
    })

    return comentariosConUsuarios
  }

  async function enviarComentario() {
    const idReceta = obtenerIdReceta()
    if (!idReceta) {
      alert("Error: No se pudo identificar la receta")
      return
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"))
    if (!usuario) {
      alert("Debes iniciar sesión para comentar")
      window.location.href = "../login.html"
      return
    }

    const comentarioTexto = commentTextarea.value.trim()

    if (comentarioTexto === "") {
      alert("Por favor, escribe un comentario")
      return
    }

    // Solo requerir valoración si es un comentario principal (no una respuesta)
    if (!respondingToId && valoracionSeleccionada === 0) {
      alert("Por favor, selecciona una valoración")
      return
    }

    submitButton.disabled = true
    submitButton.textContent = respondingToId ? "Enviando respuesta..." : "Publicando..."

    try {
      const nuevoComentario = {
        id_receta: idReceta,
        id_usuario: usuario.id,
        comentario: comentarioTexto,
        valoracion: respondingToId ? null : valoracionSeleccionada, // Valoración solo para comentarios principales
        fecha_comentario: new Date().toISOString(),
        comentario_padre_id: respondingToId, // null si es comentario principal
      }

      console.log("Enviando comentario:", nuevoComentario)

      const { data, error } = await supabase.from("comentarios").insert([nuevoComentario])

      if (error) {
        console.error("Error detallado:", error)
        throw error
      }

      // Limpiar el formulario
      commentTextarea.value = ""
      valoracionSeleccionada = 0
      actualizarEstrellas()

      // Si estábamos respondiendo, volver al modo de comentario normal
      if (respondingToId) {
        cancelarRespuesta()
      }

      await cargarComentarios()

      alert(respondingToId ? "¡Respuesta publicada con éxito!" : "¡Comentario publicado con éxito!")
    } catch (error) {
      console.error("Error al publicar comentario:", error)
      alert("Error al publicar. Por favor, inténtalo de nuevo.")
    } finally {
      submitButton.disabled = false
      submitButton.textContent = respondingToId ? "Responder" : "Publicar"
    }
  }

  // Función para mostrar comentarios y sus respuestas
  function mostrarComentarios(comentarios) {
    if (!comentarios || comentarios.length === 0) {
      commentsList.innerHTML = "<p>Sin comentarios o comentarios no disponibles</p>"
      return
    }

    let comentariosHTML = ""

    comentarios.forEach((comentario) => {
      const fecha = new Date(comentario.fecha_comentario).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      let estrellasHTML = ""
      if (comentario.valoracion) {
        for (let i = 1; i <= 5; i++) {
          const estrellaClase = i <= comentario.valoracion ? "estrella-activa" : "estrella-inactiva"
          estrellasHTML += `<span class="${estrellaClase}">★</span>`
        }
      }

      comentariosHTML += `
        <div class="comentario mb-6" data-id="${comentario.id_comentario}">
          <div class="comentario-header">
            <strong>${comentario.username}</strong>
            <span class="comentario-fecha">${fecha}</span>
          </div>
          ${estrellasHTML ? `<div class="comentario-valoracion my-2">${estrellasHTML}</div>` : ""}
          <p class="comentario-texto">${comentario.comentario}</p>
          <div class="comentario-acciones">
            <button class="responder-btn" data-id="${comentario.id_comentario}" data-username="${comentario.username}">Responder</button>
          </div>`

      // Añadir respuestas si existen
      if (comentario.respuestas && comentario.respuestas.length > 0) {
        comentariosHTML += `<div class="respuestas-container">`

        comentario.respuestas.forEach((respuesta) => {
          const fechaRespuesta = new Date(respuesta.fecha_comentario).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })

          comentariosHTML += `
            <div class="respuesta">
              <div class="respuesta-header">
                <strong>${respuesta.username}</strong>
                <span class="respuesta-fecha">${fechaRespuesta}</span>
              </div>
              <p class="respuesta-texto">${respuesta.comentario}</p>
              <div class="respuesta-acciones">
                <button class="responder-btn" data-id="${comentario.id_comentario}" data-username="${respuesta.username}">Responder</button>
              </div>
            </div>`
        })

        comentariosHTML += `</div>`
      }

      comentariosHTML += `</div>`
    })

    commentsList.innerHTML = comentariosHTML

    // Añadir eventos a los botones de responder
    document.querySelectorAll(".responder-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const comentarioId = this.getAttribute("data-id")
        const username = this.getAttribute("data-username")
        iniciarRespuesta(comentarioId, username)
      })
    })
  }

  // Función para iniciar una respuesta a un comentario
  function iniciarRespuesta(comentarioId, username) {
    respondingToId = comentarioId

    // Cambiar el texto del botón
    submitButton.textContent = "Responder"

    // Mostrar el botón de cancelar
    cancelReplyButton.style.display = "inline-block"

    // Ocultar las estrellas ya que no se necesitan para respuestas
    ratingStarsDiv.style.display = "none"

    // Cambiar el placeholder del textarea
    commentTextarea.placeholder = "Escribe tu respuesta aquí..."

    // Mostrar a qué comentario se está respondiendo
    replyingToDiv.style.display = "block"
    replyingToDiv.textContent = `Respondiendo a ${username}`

    // Hacer scroll al área de comentario
    commentTextarea.scrollIntoView({ behavior: "smooth" })
    commentTextarea.focus()
  }

  // Función para cancelar una respuesta
  function cancelarRespuesta() {
    respondingToId = null

    // Restaurar el texto del botón
    submitButton.textContent = "Publicar"

    // Ocultar el botón de cancelar
    cancelReplyButton.style.display = "none"

    // Mostrar las estrellas nuevamente
    ratingStarsDiv.style.display = "block"

    // Restaurar el placeholder del textarea
    commentTextarea.placeholder = "Escribe tu comentario aquí..."

    // Ocultar el indicador de respuesta
    replyingToDiv.style.display = "none"
    replyingToDiv.textContent = ""
  }
})

