// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

// Elementos del DOM
const commentsTableBody = document.getElementById("comments-table-body")
const deleteAllBtn = document.getElementById("delete-all-btn")
const selectAllCheckbox = document.getElementById("select-all")
const commentModal = document.getElementById("comment-modal")
const closeDetailsBtn = document.getElementById("close-details")
const toggleVisibilityBtn = document.getElementById("toggle-visibility-btn")
const deleteCommentBtn = document.getElementById("delete-comment-btn")

// Variables globales
let currentCommentId = null

// Cargar comentarios
async function cargarComentarios() {
  try {
    console.log("Cargando comentarios...")

    // Obtener comentarios con información de usuario y receta
    const { data: comentarios, error } = await supabase
      .from("comentarios")
      .select(`
                *,
                usuarios:id_usuario (username, email),
                recetas:id_receta (titulo)
            `)
      .order("fecha_comentario", { ascending: false })

    if (error) {
      console.error("Error al cargar comentarios:", error)
      throw error
    }

    console.log("Comentarios cargados:", comentarios)

    if (!commentsTableBody) {
      console.error("No se encontró el elemento commentsTableBody")
      return
    }

    commentsTableBody.innerHTML = ""

    if (!comentarios || comentarios.length === 0) {
      commentsTableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center">No hay comentarios disponibles</td>
                </tr>
            `
      return
    }

    comentarios.forEach((comentario) => {
      const row = document.createElement("tr")

      // Formatear fecha
      const fecha = comentario.fecha_comentario ? new Date(comentario.fecha_comentario).toLocaleDateString() : ""

      // Determinar estado
      const estadoClass = comentario.visible ? "status-approved" : "status-pending"
      const estadoText = comentario.visible ? "Aprobado" : "Pendiente"

      // Obtener nombre de usuario y título de receta
      const nombreUsuario = comentario.usuarios ? comentario.usuarios.username : "Usuario"
      const tituloReceta = comentario.recetas ? comentario.recetas.titulo : "Receta"

      // Limitar el texto del comentario para la vista previa
      const comentarioTexto = comentario.comentario || ""
      const comentarioCorto = comentarioTexto.length > 50 ? comentarioTexto.substring(0, 50) + "..." : comentarioTexto

      row.innerHTML = `
                <td><input type="checkbox" class="comment-checkbox" data-id="${comentario.id_comentario}"></td>
                <td>${comentario.id_comentario}</td>
                <td>
                    <div class="user-info-cell">
                        <img src="../US1_PantallaInicio/Imagenes/blank-profile-picture-973460_1280.webp" 
                             alt="User" 
                             class="user-avatar">
                        <span>${nombreUsuario}</span>
                    </div>
                </td>
                <td>${tituloReceta}</td>
                <td>
                    <div class="comment-text" id="comment-preview-${comentario.id_comentario}">
                        ${comentarioTexto}
                    </div>
                </td>
                <td>${fecha}</td>
                <td><span class="status-badge ${estadoClass}">${estadoText}</span></td>
                <td class="action-buttons">
                    <button class="btn btn-danger btn-sm delete-comment" onclick="eliminarComentario(${comentario.id_comentario})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </td>
            `
      commentsTableBody.appendChild(row)
    })
  } catch (error) {
    console.error("Error al cargar comentarios:", error)
    if (commentsTableBody) {
      commentsTableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center">Error al cargar comentarios: ${error.message}</td>
                </tr>
            `
    }
  }
}

// Ver detalle del comentario
async function verComentario(id) {
  try {
    console.log("Viendo comentario:", id)
    currentCommentId = id

    const { data: comentario, error } = await supabase
      .from("comentarios")
      .select(`
                *,
                usuarios:id_usuario (username, email),
                recetas:id_receta (titulo)
            `)
      .eq("id_comentario", id)
      .single()

    if (error) {
      console.error("Error al obtener comentario:", error)
      throw error
    }

    if (!comentario) {
      console.error("No se encontró el comentario")
      throw new Error("No se encontró el comentario")
    }

    console.log("Comentario obtenido:", comentario)

    // Verificar que el modal existe
    if (!commentModal) {
      console.error("No se encontró el modal para mostrar el comentario")
      alert("No se encontró el modal para mostrar el comentario")
      return
    }

    // Obtener nombre de usuario y título de receta
    const nombreUsuario = comentario.usuarios ? comentario.usuarios.username : "Usuario"
    const tituloReceta = comentario.recetas ? comentario.recetas.titulo : "Receta"

    // Formatear fecha
    const fecha = comentario.fecha_comentario ? new Date(comentario.fecha_comentario).toLocaleDateString() : ""

    // Llenar el modal con los datos del comentario
    document.getElementById("comment-user").textContent = nombreUsuario
    document.getElementById("comment-recipe").textContent = tituloReceta
    document.getElementById("comment-text").textContent = comentario.comentario || ""
    document.getElementById("comment-date").textContent = fecha
    document.getElementById("comment-status").textContent = comentario.visible ? "Aprobado" : "Pendiente"

    // Actualizar el texto del botón de visibilidad
    if (toggleVisibilityBtn) {
      if (comentario.visible) {
        toggleVisibilityBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar Comentario'
      } else {
        toggleVisibilityBtn.innerHTML = '<i class="fas fa-eye"></i> Mostrar Comentario'
      }
    }

    // Mostrar el modal
    commentModal.style.display = "block"
  } catch (error) {
    console.error("Error al ver comentario:", error)
    alert("Error al cargar el comentario: " + error.message)
  }
}

// Cambiar visibilidad del comentario
async function cambiarVisibilidadComentario() {
  try {
    if (!currentCommentId) {
      console.error("No hay comentario seleccionado")
      return
    }

    console.log("Cambiando visibilidad del comentario:", currentCommentId)

    // Obtener el estado actual del comentario
    const { data: comentario, error: errorConsulta } = await supabase
      .from("comentarios")
      .select("visible")
      .eq("id_comentario", currentCommentId)
      .single()

    if (errorConsulta) {
      console.error("Error al obtener estado del comentario:", errorConsulta)
      throw errorConsulta
    }

    // Cambiar la visibilidad
    const nuevoEstado = !comentario.visible
    console.log("Nuevo estado:", nuevoEstado)

    const { error } = await supabase
      .from("comentarios")
      .update({ visible: nuevoEstado })
      .eq("id_comentario", currentCommentId)

    if (error) {
      console.error("Error al cambiar visibilidad:", error)
      throw error
    }

    // Cerrar modal
    if (commentModal) {
      commentModal.style.display = "none"
    }

    // Recargar comentarios
    await cargarComentarios()

    alert(`Comentario ${nuevoEstado ? "mostrado" : "ocultado"} con éxito`)
  } catch (error) {
    console.error("Error al cambiar visibilidad:", error)
    alert("Error al cambiar la visibilidad del comentario: " + error.message)
  }
}

// Eliminar comentario
async function eliminarComentario(id) {
  try {
    if (!confirm("¿Estás seguro de que quieres eliminar este comentario?")) return

    console.log("Eliminando comentario:", id)

    const { error } = await supabase.from("comentarios").delete().eq("id_comentario", id)

    if (error) {
      console.error("Error al eliminar comentario:", error)
      throw error
    }

    // Cerrar modal si está abierto
    if (commentModal && commentModal.style.display === "block") {
      commentModal.style.display = "none"
    }

    await cargarComentarios()
    alert("Comentario eliminado con éxito")
  } catch (error) {
    console.error("Error al eliminar comentario:", error)
    alert("Error al eliminar el comentario: " + error.message)
  }
}

// Eliminar todos los comentarios seleccionados
async function eliminarSeleccionados() {
  try {
    const checkboxes = document.querySelectorAll(".comment-checkbox:checked")
    if (checkboxes.length === 0) {
      alert("No hay comentarios seleccionados")
      return
    }

    if (!confirm(`¿Estás seguro de que deseas eliminar ${checkboxes.length} comentarios?`)) return

    console.log("Eliminando comentarios seleccionados")

    const ids = Array.from(checkboxes).map((cb) => cb.getAttribute("data-id"))
    console.log("IDs a eliminar:", ids)

    const { error } = await supabase.from("comentarios").delete().in("id_comentario", ids)

    if (error) {
      console.error("Error al eliminar comentarios:", error)
      throw error
    }

    await cargarComentarios()
    alert("Comentarios eliminados con éxito")
  } catch (error) {
    console.error("Error al eliminar comentarios:", error)
    alert("Error al eliminar los comentarios: " + error.message)
  }
}

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
  console.log("Inicializando gestión de comentarios...")

  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const sidebarAdminName = document.getElementById("sidebar-admin-name")

  if (usuario && sidebarAdminName) {
    sidebarAdminName.textContent = usuario.username || usuario.email || "Administrador"
  }

  // Cargar comentarios
  cargarComentarios()

  // Configurar eventos para acciones por lotes
  if (deleteAllBtn) {
    deleteAllBtn.addEventListener("click", eliminarSeleccionados)
  }

  // Seleccionar todos los comentarios
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", function () {
      const checkboxes = document.querySelectorAll(".comment-checkbox")
      checkboxes.forEach((checkbox) => {
        checkbox.checked = this.checked
      })
    })
  }

  // Configurar eventos para el modal
  if (closeDetailsBtn) {
    closeDetailsBtn.addEventListener("click", () => {
      if (commentModal) {
        commentModal.style.display = "none"
      }
    })
  }

  // Cerrar modal al hacer clic fuera de él
  window.addEventListener("click", (event) => {
    if (event.target === commentModal) {
      commentModal.style.display = "none"
    }
  })

  // Configurar botón de cambiar visibilidad
  if (toggleVisibilityBtn) {
    toggleVisibilityBtn.addEventListener("click", cambiarVisibilidadComentario)
  }

  // Configurar botón de eliminar comentario
  if (deleteCommentBtn) {
    deleteCommentBtn.addEventListener("click", () => {
      if (currentCommentId) {
        eliminarComentario(currentCommentId)
      }
    })
  }

  console.log("Gestión de comentarios inicializada")
})

// Exportar funciones para uso global
window.verComentario = verComentario
window.eliminarComentario = eliminarComentario
