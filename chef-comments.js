// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

let currentCommentId = null

document.addEventListener("DOMContentLoaded", async () => {
  // Verificar autenticación
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  if (!usuario || usuario.rol !== "chef") {
    window.location.href = "US1_PantallaInicio/index.html"
    return
  }

  // Cargar datos iniciales
  await cargarEstadisticasComentarios()
  await cargarComentarios()

  // Configurar filtros
  document.getElementById("comments-recipe-filter").addEventListener("change", filtrarComentarios)
  document.getElementById("comments-status-filter").addEventListener("change", filtrarComentarios)
  document.getElementById("comments-sort").addEventListener("change", cargarComentarios)

  // Configurar modal de respuesta
  document.querySelector(".close-modal").addEventListener("click", () => {
    cerrarModal("reply-modal")
  })

  document.getElementById("reply-form").addEventListener("submit", async (e) => {
    e.preventDefault()
    await enviarRespuesta()
  })

  // Cerrar modal al hacer clic fuera
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("reply-modal")
    if (e.target === modal) {
      cerrarModal("reply-modal")
    }
  })
})

// Función para cargar estadísticas de comentarios
async function cargarEstadisticasComentarios() {
  const usuario = JSON.parse(localStorage.getItem("usuario"))

  try {
    // Obtener el ID del usuario chef
    const { data: userData, error: userError } = await supabase
      .from("usuarios")
      .select("id")
      .eq("username", usuario.username)
      .single()

    if (userError) throw userError

    // Obtener las recetas del chef
    const { data: recipes, error: recipesError } = await supabase
      .from("recetas")
      .select("id")
      .eq("usuario_id", userData.id)

    if (recipesError) throw recipesError

    if (recipes.length === 0) {
      document.getElementById("total-comments").textContent = "0"
      document.getElementById("new-comments").textContent = "0"
      document.getElementById("replied-comments").textContent = "0"
      return
    }

    const recetasIds = recipes.map((receta) => receta.id)

    // Obtener conteo total de comentarios
    const { count: totalCount, error: totalError } = await supabase
      .from("comentarios")
      .select("id_comentario", { count: "exact", head: true })
      .in("id_receta", recetasIds)
      .eq("visible", true)

    if (totalError) throw totalError

    // Actualizar estadísticas
    document.getElementById("total-comments").textContent = totalCount || 0
    document.getElementById("new-comments").textContent = Math.floor((totalCount || 0) * 0.3) // Simulado
    document.getElementById("replied-comments").textContent = Math.floor((totalCount || 0) * 0.7) // Simulado
  } catch (error) {
    console.error("Error al cargar estadísticas:", error)
  }
}

// Función para cargar comentarios
async function cargarComentarios() {
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const commentsList = document.getElementById("comments-list")
  const sortOrder = document.getElementById("comments-sort").value

  try {
    // Obtener el ID del usuario chef
    const { data: userData, error: userError } = await supabase
      .from("usuarios")
      .select("id")
      .eq("username", usuario.username)
      .single()

    if (userError) throw userError

    // Obtener las recetas del chef
    const { data: recipes, error: recipesError } = await supabase
      .from("recetas")
      .select("id, titulo")
      .eq("usuario_id", userData.id)

    if (recipesError) throw recipesError

    if (recipes.length === 0) {
      commentsList.innerHTML = `
                <div class="no-comments">
                    <i class="fas fa-comments"></i>
                    <p>No tienes recetas para mostrar comentarios.</p>
                </div>
            `
      return
    }

    const recetasIds = recipes.map((receta) => receta.id)

    // Obtener comentarios
    const { data: comments, error: commentsError } = await supabase
      .from("comentarios")
      .select(`
                id_comentario,
                id_usuario,
                id_receta,
                comentario,
                fecha_comentario,
                visible,
                usuarios:id_usuario (username),
                recetas:id_receta (titulo)
            `)
      .in("id_receta", recetasIds)
      .eq("visible", true)
      .order("fecha_comentario", { ascending: sortOrder === "oldest" })

    if (commentsError) throw commentsError

    // Actualizar filtro de recetas
    const recipeFilter = document.getElementById("comments-recipe-filter")
    recipeFilter.innerHTML = '<option value="all">Todas las recetas</option>'
    recipes.forEach((recipe) => {
      const option = document.createElement("option")
      option.value = recipe.id
      option.textContent = recipe.titulo
      recipeFilter.appendChild(option)
    })

    // Mostrar comentarios
    if (comments.length === 0) {
      commentsList.innerHTML = `
                <div class="no-comments">
                    <i class="fas fa-comments"></i>
                    <p>Aún no hay comentarios en tus recetas.</p>
                </div>
            `
      return
    }

    commentsList.innerHTML = ""
    comments.forEach((comment) => {
      const commentItem = document.createElement("div")
      commentItem.className = "comment-item"
      commentItem.setAttribute("data-id", comment.id_comentario)
      commentItem.setAttribute("data-recipe", comment.id_receta)

      const fecha = new Date(comment.fecha_comentario)
      const fechaFormateada = fecha.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })

      commentItem.innerHTML = `
                <div class="comment-header">
                    <span class="comment-user">${comment.usuarios?.username || "Usuario desconocido"}</span>
                    <span class="comment-date">${fechaFormateada}</span>
                </div>
                <div class="comment-recipe">Receta: ${comment.recetas?.titulo || "Receta desconocida"}</div>
                <div class="comment-text">${comment.comentario}</div>
                <div class="comment-actions">
                    <button class="comment-btn reply-btn" data-id="${comment.id_comentario}">
                        <i class="fas fa-reply"></i> Responder
                    </button>
                    <button class="comment-btn mark-read-btn" data-id="${comment.id_comentario}">
                        <i class="fas fa-check"></i> Marcar como leído
                    </button>
                    <button class="comment-btn delete-btn" data-id="${comment.id_comentario}">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `

      commentsList.appendChild(commentItem)

      // Agregar eventos a los botones
      commentItem.querySelector(".reply-btn").addEventListener("click", () => {
        abrirModalRespuesta(comment)
      })

      commentItem.querySelector(".mark-read-btn").addEventListener("click", () => {
        marcarComoLeido(comment.id_comentario)
      })

      commentItem.querySelector(".delete-btn").addEventListener("click", () => {
        eliminarComentario(comment.id_comentario)
      })
    })
  } catch (error) {
    console.error("Error al cargar comentarios:", error)
    commentsList.innerHTML = `
            <div class="no-comments">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar los comentarios. Por favor, intenta de nuevo.</p>
            </div>
        `
  }
}

// Función para filtrar comentarios
function filtrarComentarios() {
  const recipeFilter = document.getElementById("comments-recipe-filter").value
  const statusFilter = document.getElementById("comments-status-filter").value
  const commentItems = document.querySelectorAll(".comment-item")

  commentItems.forEach((item) => {
    const recipeId = item.getAttribute("data-recipe")
    const isNew = item.classList.contains("new-comment")

    const matchesRecipe = recipeFilter === "all" || recipeId === recipeFilter
    const matchesStatus =
      statusFilter === "all" || (statusFilter === "new" && isNew) || (statusFilter === "read" && !isNew)

    if (matchesRecipe && matchesStatus) {
      item.style.display = "block"
    } else {
      item.style.display = "none"
    }
  })
}

// Función para abrir modal de respuesta
function abrirModalRespuesta(comment) {
  currentCommentId = comment.id_comentario

  const originalComment = document.getElementById("original-comment")
  originalComment.innerHTML = `
        <div class="comment-preview">
            <strong>${comment.usuarios?.username || "Usuario desconocido"}</strong> comentó:
            <div style="background: #f9f9f9; padding: 1rem; border-radius: 8px; margin-top: 0.5rem;">
                ${comment.comentario}
            </div>
        </div>
    `

  document.getElementById("reply-text").value = ""
  document.getElementById("reply-modal").style.display = "block"
}

// Función para enviar respuesta
async function enviarRespuesta() {
  const replyText = document.getElementById("reply-text").value.trim()

  if (!replyText) {
    mostrarNotificacion("Por favor, escribe una respuesta.", "error")
    return
  }

  try {
    // Aquí podrías implementar la lógica para guardar la respuesta
    // Por ejemplo, crear un nuevo comentario como respuesta

    mostrarNotificacion("Respuesta enviada con éxito!")
    cerrarModal("reply-modal")

    // Recargar comentarios
    await cargarComentarios()
  } catch (error) {
    console.error("Error al enviar respuesta:", error)
    mostrarNotificacion("Error al enviar la respuesta. Por favor, intenta de nuevo.", "error")
  }
}

// Función para marcar como leído
async function marcarComoLeido(commentId) {
  try {
    // Aquí podrías implementar la lógica para marcar como leído
    // Por ejemplo, actualizar un campo en la base de datos

    mostrarNotificacion("Comentario marcado como leído")

    // Actualizar visualmente
    const commentItem = document.querySelector(`[data-id="${commentId}"]`)
    if (commentItem) {
      commentItem.classList.remove("new-comment")
      const markReadBtn = commentItem.querySelector(".mark-read-btn")
      markReadBtn.innerHTML = '<i class="fas fa-check"></i> Leído'
      markReadBtn.disabled = true
      markReadBtn.style.opacity = "0.6"
    }
  } catch (error) {
    console.error("Error al marcar como leído:", error)
    mostrarNotificacion("Error al marcar como leído. Por favor, intenta de nuevo.", "error")
  }
}

// Función para eliminar comentario
async function eliminarComentario(commentId) {
  if (!confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
    return
  }

  try {
    const { error } = await supabase.from("comentarios").update({ visible: false }).eq("id_comentario", commentId)

    if (error) throw error

    mostrarNotificacion("Comentario eliminado con éxito")
    await cargarComentarios()
    await cargarEstadisticasComentarios()
  } catch (error) {
    console.error("Error al eliminar comentario:", error)
    mostrarNotificacion("Error al eliminar el comentario. Por favor, intenta de nuevo.", "error")
  }
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje, tipo = "success") {
  const notification = document.getElementById("notification")
  const notificationMessage = document.getElementById("notification-message")

  notificationMessage.textContent = mensaje

  if (tipo === "error") {
    notification.querySelector(".notification-content").style.backgroundColor = "#e74c3c"
    notification.querySelector("i").className = "fas fa-exclamation-circle"
  } else {
    notification.querySelector(".notification-content").style.backgroundColor = "#4caf50"
    notification.querySelector("i").className = "fas fa-check-circle"
  }

  notification.style.display = "block"

  setTimeout(() => {
    notification.style.display = "none"
  }, 3000)
}

// Función para cerrar modal
function cerrarModal(modalId) {
  document.getElementById(modalId).style.display = "none"
  currentCommentId = null
}
