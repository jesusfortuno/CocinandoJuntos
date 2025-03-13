import { supabase } from "./supabaseConfig.js"

document.addEventListener("DOMContentLoaded", () => {
  // Referencias a elementos del DOM
  const ratingStars = document.querySelectorAll(".rating span")
  const commentTextarea = document.getElementById("commentText")
  const submitButton = document.getElementById("submitComment")
  const commentsList = document.getElementById("commentsList")

  // Obtener el ID de la receta de la URL actual
  const recetaId = obtenerIdReceta()

  // Variable para almacenar la valoración seleccionada
  let valoracionSeleccionada = 0

  // Inicializar la funcionalidad
  inicializarEstrellas()
  cargarComentarios()

  // Evento para enviar comentario
  submitButton.addEventListener("click", enviarComentario)

  function inicializarEstrellas() {
    ratingStars.forEach((star, index) => {
      star.addEventListener("click", () => {
        valoracionSeleccionada = index + 1
        actualizarEstrellas()
      })

      star.addEventListener("mouseover", () => {
        for (let i = 0; i <= index; i++) {
          ratingStars[i].style.color = "#f39c12"
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

        const comentariosConUsuarios = comentarios.map((comentario) => ({
          ...comentario,
          username: usuariosMap.get(comentario.id_usuario) || "Usuario",
        }))

        mostrarComentarios(comentariosConUsuarios)
      } else {
        mostrarComentarios([])
      }
    } catch (error) {
      console.error("Error al cargar comentarios:", error)
      commentsList.innerHTML = "<p>Error al cargar los comentarios</p>"
    }
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

    if (valoracionSeleccionada === 0) {
      alert("Por favor, selecciona una valoración")
      return
    }

    submitButton.disabled = true
    submitButton.textContent = "Publicando..."

    try {
      const nuevoComentario = {
        id_receta: idReceta, // Usar el ID específico de la receta
        id_usuario: usuario.id,
        comentario: comentarioTexto,
        valoracion: valoracionSeleccionada,
        fecha_comentario: new Date().toISOString(),
      }

      console.log("Enviando comentario:", nuevoComentario)

      const { data, error } = await supabase.from("comentarios").insert([nuevoComentario])

      if (error) {
        console.error("Error detallado:", error)
        throw error
      }

      commentTextarea.value = ""
      valoracionSeleccionada = 0
      actualizarEstrellas()

      await cargarComentarios()

      alert("¡Comentario publicado con éxito!")
    } catch (error) {
      console.error("Error al publicar comentario:", error)
      alert("Error al publicar el comentario. Por favor, inténtalo de nuevo.")
    } finally {
      submitButton.disabled = false
      submitButton.textContent = "Publicar"
    }
  }

  // En la función mostrarComentarios, modificamos el HTML para añadir más espacio entre comentarios
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
      for (let i = 1; i <= 5; i++) {
        const estrellaClase = i <= comentario.valoracion ? "estrella-activa" : "estrella-inactiva"
        estrellasHTML += `<span class="${estrellaClase}">★</span>`
      }

      comentariosHTML += `
        <div class="comentario mb-6"> <!-- Añadido margin-bottom de 1.5rem (24px) -->
          <div class="comentario-header">
            <strong>${comentario.username}</strong>
            <span class="comentario-fecha">${fecha}</span>
          </div>
          <div class="comentario-valoracion my-2"> <!-- Añadido margin vertical -->
            ${estrellasHTML}
          </div>
          <p class="comentario-texto">${comentario.comentario}</p>
        </div>
      `
    })

    commentsList.innerHTML = comentariosHTML
  }
})

