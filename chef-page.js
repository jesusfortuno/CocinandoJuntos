// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

document.addEventListener("DOMContentLoaded", async () => {
  // Verificar si el usuario está autenticado y es chef
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  if (!usuario) {
    // Redirigir a la página de inicio si no hay usuario
    window.location.href = "US1_PantallaInicio/index.html"
    return
  }

  // Verificar si el usuario tiene el rol de chef
  if (usuario.rol !== "chef") {
    // Redirigir a la página de usuario normal si no es chef
    window.location.href = "US7_PaginaDeUsuario/usuario.html"
    return
  }

  // Cargar estadísticas del chef
  await cargarEstadisticas()

  // Cargar las recetas del chef
  await cargarRecetasDelChef()

  // Cargar comentarios
  await cargarComentarios()

  // Configurar formulario de nueva receta
  const recipeForm = document.getElementById("recipe-form")
  recipeForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    await guardarReceta()
  })

  // Configurar botón de vista previa
  const previewBtn = document.getElementById("preview-btn")
  previewBtn.addEventListener("click", mostrarVistaPrevia)

  // Configurar botón de publicar desde vista previa
  const confirmPublishBtn = document.getElementById("confirm-publish")
  confirmPublishBtn.addEventListener("click", async () => {
    await guardarReceta()
    cerrarModal("preview-modal")
  })

  // Configurar botón de volver a editar
  const backToEditBtn = document.getElementById("back-to-edit")
  backToEditBtn.addEventListener("click", () => {
    cerrarModal("preview-modal")
  })

  // Configurar formulario de edición de receta
  const editForm = document.getElementById("edit-recipe-form")
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    await actualizarReceta()
  })

  // Configurar botón de eliminar receta
  const deleteRecipeBtn = document.getElementById("delete-recipe-btn")
  deleteRecipeBtn.addEventListener("click", () => {
    const recipeId = document.getElementById("edit-id").value
    mostrarConfirmacionEliminar(recipeId)
  })

  // Configurar botones de confirmación de eliminación
  document.getElementById("confirm-delete").addEventListener("click", async () => {
    const recipeId = document.getElementById("edit-id").value
    await eliminarReceta(recipeId)
  })

  document.getElementById("cancel-delete").addEventListener("click", () => {
    cerrarModal("confirm-delete-modal")
  })

  // Configurar cierre de modales
  const closeButtons = document.querySelectorAll(".close-modal")
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal")
      cerrarModal(modal.id)
    })
  })

  // Cerrar modales al hacer clic fuera del contenido
  window.addEventListener("click", (e) => {
    const modals = document.querySelectorAll(".modal")
    modals.forEach((modal) => {
      if (e.target === modal) {
        cerrarModal(modal.id)
      }
    })
  })

  // Configurar búsqueda y filtrado de recetas
  const searchInput = document.getElementById("recipe-search")
  const filterSelect = document.getElementById("recipe-filter")

  searchInput.addEventListener("input", filtrarRecetas)
  filterSelect.addEventListener("change", filtrarRecetas)

  // Configurar filtrado de comentarios
  const commentsRecipeFilter = document.getElementById("comments-recipe-filter")
  const commentsStatusFilter = document.getElementById("comments-status-filter")

  commentsRecipeFilter.addEventListener("change", filtrarComentarios)
  commentsStatusFilter.addEventListener("change", filtrarComentarios)
})

// Función para cargar estadísticas del chef
async function cargarEstadisticas() {
  const usuario = JSON.parse(localStorage.getItem("usuario"))

  try {
    // Obtener el ID del usuario chef
    const { data: userData, error: userError } = await supabase
      .from("usuarios")
      .select("id")
      .eq("username", usuario.username)
      .single()

    if (userError) throw userError

    // Obtener conteo de recetas
    const { count: recetasCount, error: recetasError } = await supabase
      .from("recetas")
      .select("id", { count: "exact", head: true })
      .eq("usuario_id", userData.id)

    if (recetasError) throw recetasError

    // Obtener conteo de comentarios en las recetas del chef
    const { data: recetasIds, error: recetasIdsError } = await supabase
      .from("recetas")
      .select("id")
      .eq("usuario_id", userData.id)

    if (recetasIdsError) throw recetasIdsError

    let comentariosCount = 0
    if (recetasIds.length > 0) {
      const recetasIdsArray = recetasIds.map((receta) => receta.id)
      const { count, error: comentariosError } = await supabase
        .from("comentarios")
        .select("id_comentario", { count: "exact", head: true })
        .in("id_receta", recetasIdsArray)

      if (comentariosError) throw comentariosError
      comentariosCount = count || 0
    }

    // Obtener conteo de favoritos
    const { count: favoritosCount, error: favoritosError } = await supabase
      .from("favoritos")
      .select("id", { count: "exact", head: true })
      .in(
        "receta_id",
        recetasIds.map((receta) => receta.id),
      )

    if (favoritosError) throw favoritosError

    // Actualizar los contadores en la interfaz
    document.getElementById("total-recetas").textContent = recetasCount || 0
    document.getElementById("total-comentarios").textContent = comentariosCount || 0
    document.getElementById("total-favoritos").textContent = favoritosCount || 0
  } catch (error) {
    console.error("Error al cargar estadísticas:", error)
  }
}

// Función para cargar las recetas del chef
async function cargarRecetasDelChef() {
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const recipesList = document.getElementById("recipes-list")

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
      .select("*")
      .eq("usuario_id", userData.id)

    if (recipesError) throw recipesError

    // Limpiar el contenedor de recetas
    recipesList.innerHTML = ""

    if (recipes.length === 0) {
      recipesList.innerHTML = `
        <div class="no-recipes">
          <p>Aún no has creado ninguna receta. ¡Comienza a compartir tus creaciones culinarias!</p>
        </div>
      `
      return
    }

    // Mostrar las recetas
    recipes.forEach((recipe) => {
      const recipeCard = document.createElement("div")
      recipeCard.className = "recipe-card"
      recipeCard.setAttribute("data-id", recipe.id)
      recipeCard.setAttribute("data-cultura", recipe.Cultura || "")

      // Usar una imagen predeterminada si no hay imagen
      const imagenUrl = recipe.imagen || obtenerImagenPredeterminada(recipe.Cultura)

      recipeCard.innerHTML = `
        <img src="${imagenUrl}" alt="${recipe.titulo}" class="recipe-image">
        <div class="recipe-content">
          <h3 class="recipe-title">${recipe.titulo}</h3>
          <div class="recipe-meta">
            <span>${recipe.dificultad}</span>
            <span>${recipe.tiempo}</span>
          </div>
          <p class="recipe-description">${recipe.descripcion}</p>
          <div class="recipe-actions">
            <button class="recipe-btn edit-btn" data-id="${recipe.id}">Editar</button>
            <a href="Platos.html?id=${recipe.id}" class="recipe-btn view-btn">Ver</a>
          </div>
        </div>
      `

      recipesList.appendChild(recipeCard)

      // Agregar evento al botón de editar
      recipeCard.querySelector(".edit-btn").addEventListener("click", () => {
        cargarRecetaParaEditar(recipe.id)
      })
    })

    // Actualizar el filtro de recetas en comentarios
    const commentsRecipeFilter = document.getElementById("comments-recipe-filter")
    commentsRecipeFilter.innerHTML = '<option value="all">Todas las recetas</option>'

    recipes.forEach((recipe) => {
      const option = document.createElement("option")
      option.value = recipe.id
      option.textContent = recipe.titulo
      commentsRecipeFilter.appendChild(option)
    })
  } catch (error) {
    console.error("Error al cargar las recetas:", error)
    recipesList.innerHTML = `
      <div class="error-message">
        <p>Ha ocurrido un error al cargar las recetas. Por favor, intenta de nuevo más tarde.</p>
      </div>
    `
  }
}

// Función para cargar comentarios
async function cargarComentarios() {
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const commentsList = document.getElementById("comments-list")

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
          <p>No tienes recetas para mostrar comentarios.</p>
        </div>
      `
      return
    }

    const recetasIds = recipes.map((receta) => receta.id)

    // Obtener comentarios de las recetas del chef
    const { data: comments, error: commentsError } = await supabase
      .from("comentarios")
      .select(
        `
        id_comentario,
        id_usuario,
        id_receta,
        comentario,
        fecha_comentario,
        visible,
        usuarios:id_usuario (username),
        recetas:id_receta (titulo)
      `,
      )
      .in("id_receta", recetasIds)
      .order("fecha_comentario", { ascending: false })

    if (commentsError) throw commentsError

    // Limpiar el contenedor de comentarios
    commentsList.innerHTML = ""

    if (comments.length === 0) {
      commentsList.innerHTML = `
        <div class="no-comments">
          <p>Aún no hay comentarios en tus recetas.</p>
        </div>
      `
      return
    }

    // Mostrar los comentarios
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
          <button class="comment-btn reply-btn" data-id="${comment.id_comentario}">Responder</button>
          <button class="comment-btn delete-btn" data-id="${comment.id_comentario}">Eliminar</button>
        </div>
      `

      commentsList.appendChild(commentItem)

      // Agregar eventos a los botones
      commentItem.querySelector(".reply-btn").addEventListener("click", () => {
        responderComentario(comment.id_comentario)
      })

      commentItem.querySelector(".delete-btn").addEventListener("click", () => {
        eliminarComentario(comment.id_comentario)
      })
    })
  } catch (error) {
    console.error("Error al cargar los comentarios:", error)
    commentsList.innerHTML = `
      <div class="error-message">
        <p>Ha ocurrido un error al cargar los comentarios. Por favor, intenta de nuevo más tarde.</p>
      </div>
    `
  }
}

// Función para filtrar recetas
function filtrarRecetas() {
  const searchTerm = document.getElementById("recipe-search").value.toLowerCase()
  const filterValue = document.getElementById("recipe-filter").value
  const recipeCards = document.querySelectorAll(".recipe-card")

  recipeCards.forEach((card) => {
    const title = card.querySelector(".recipe-title").textContent.toLowerCase()
    const description = card.querySelector(".recipe-description").textContent.toLowerCase()
    const cultura = card.getAttribute("data-cultura")

    const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm)
    const matchesFilter = filterValue === "all" || cultura === filterValue

    if (matchesSearch && matchesFilter) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
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

// Función para guardar una nueva receta
async function guardarReceta() {
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const form = document.getElementById("recipe-form")
  const formData = new FormData(form)

  try {
    // Obtener el ID del usuario chef
    const { data: userData, error: userError } = await supabase
      .from("usuarios")
      .select("id")
      .eq("username", usuario.username)
      .single()

    if (userError) throw userError

    // Preparar los datos de la receta
    const recipeData = {
      titulo: formData.get("titulo"),
      descripcion: formData.get("descripcion"),
      dificultad: formData.get("dificultad"),
      tiempo: formData.get("tiempo"),
      categoria: formData.get("categoria"),
      ingredientes: formData.get("ingredientes"),
      pasos: formData.get("pasos"),
      usuario_id: userData.id,
      Cultura: formData.get("cultura"),
      imagen: formData.get("imagen") || obtenerImagenPredeterminada(formData.get("cultura")),
    }

    // Insertar la receta en la base de datos
    const { data, error } = await supabase.from("recetas").insert([recipeData]).select()

    if (error) throw error

    // Mostrar notificación de éxito
    mostrarNotificacion("¡Receta publicada con éxito!")

    // Limpiar el formulario
    form.reset()

    // Recargar las recetas y estadísticas
    await cargarRecetasDelChef()
    await cargarEstadisticas()

    // Cambiar a la pestaña de mis recetas
    document.querySelector('[data-tab="mis-recetas"]').click()
  } catch (error) {
    console.error("Error al guardar la receta:", error)
    mostrarNotificacion("Error al publicar la receta. Por favor, intenta de nuevo.", "error")
  }
}

// Función para cargar una receta para editar
async function cargarRecetaParaEditar(recipeId) {
  try {
    // Obtener los datos de la receta
    const { data: recipe, error } = await supabase.from("recetas").select("*").eq("id", recipeId).single()

    if (error) throw error

    // Llenar el formulario de edición
    document.getElementById("edit-id").value = recipe.id
    document.getElementById("edit-titulo").value = recipe.titulo
    document.getElementById("edit-descripcion").value = recipe.descripcion
    document.getElementById("edit-dificultad").value = recipe.dificultad
    document.getElementById("edit-tiempo").value = recipe.tiempo
    document.getElementById("edit-categoria").value = recipe.categoria
    document.getElementById("edit-cultura").value = recipe.Cultura
    document.getElementById("edit-ingredientes").value = recipe.ingredientes
    document.getElementById("edit-pasos").value = recipe.pasos
    document.getElementById("edit-imagen").value = recipe.imagen || ""

    // Mostrar el modal de edición
    document.getElementById("edit-modal").style.display = "block"
  } catch (error) {
    console.error("Error al cargar la receta para editar:", error)
    mostrarNotificacion("Error al cargar la receta. Por favor, intenta de nuevo.", "error")
  }
}

// Función para actualizar una receta
async function actualizarReceta() {
  const form = document.getElementById("edit-recipe-form")
  const formData = new FormData(form)
  const recipeId = formData.get("id")

  try {
    // Preparar los datos de la receta
    const recipeData = {
      titulo: formData.get("titulo"),
      descripcion: formData.get("descripcion"),
      dificultad: formData.get("dificultad"),
      tiempo: formData.get("tiempo"),
      categoria: formData.get("categoria"),
      ingredientes: formData.get("ingredientes"),
      pasos: formData.get("pasos"),
      Cultura: formData.get("cultura"),
    }

    // Actualizar la imagen solo si se proporciona una nueva
    if (formData.get("imagen")) {
      recipeData.imagen = formData.get("imagen")
    }

    // Actualizar la receta en la base de datos
    const { error } = await supabase.from("recetas").update(recipeData).eq("id", recipeId)

    if (error) throw error

    // Mostrar notificación de éxito
    mostrarNotificacion("¡Receta actualizada con éxito!")

    // Cerrar el modal
    cerrarModal("edit-modal")

    // Recargar las recetas
    await cargarRecetasDelChef()
  } catch (error) {
    console.error("Error al actualizar la receta:", error)
    mostrarNotificacion("Error al actualizar la receta. Por favor, intenta de nuevo.", "error")
  }
}

// Función para eliminar una receta
async function eliminarReceta(recipeId) {
  try {
    // Eliminar la receta de la base de datos
    const { error } = await supabase.from("recetas").delete().eq("id", recipeId)

    if (error) throw error

    // Mostrar notificación de éxito
    mostrarNotificacion("Receta eliminada con éxito")

    // Cerrar los modales
    cerrarModal("confirm-delete-modal")
    cerrarModal("edit-modal")

    // Recargar las recetas y estadísticas
    await cargarRecetasDelChef()
    await cargarEstadisticas()
    await cargarComentarios()
  } catch (error) {
    console.error("Error al eliminar la receta:", error)
    mostrarNotificacion("Error al eliminar la receta. Por favor, intenta de nuevo.", "error")
  }
}

// Función para responder a un comentario
function responderComentario(commentId) {
  // Aquí implementarías la lógica para responder a un comentario
  // Por ejemplo, abrir un modal con un formulario de respuesta
  alert(`Funcionalidad para responder al comentario ${commentId} en desarrollo`)
}

// Función para eliminar un comentario
async function eliminarComentario(commentId) {
  try {
    // Actualizar el comentario para marcarlo como no visible
    const { error } = await supabase.from("comentarios").update({ visible: false }).eq("id_comentario", commentId)

    if (error) throw error

    // Mostrar notificación de éxito
    mostrarNotificacion("Comentario eliminado con éxito")

    // Recargar los comentarios
    await cargarComentarios()
  } catch (error) {
    console.error("Error al eliminar el comentario:", error)
    mostrarNotificacion("Error al eliminar el comentario. Por favor, intenta de nuevo.", "error")
  }
}

// Función para mostrar la vista previa de una receta
function mostrarVistaPrevia() {
  const form = document.getElementById("recipe-form")
  const formData = new FormData(form)
  const previewContainer = document.getElementById("recipe-preview")

  // Validar que los campos requeridos estén completos
  const requiredFields = [
    "titulo",
    "descripcion",
    "dificultad",
    "tiempo",
    "categoria",
    "cultura",
    "ingredientes",
    "pasos",
  ]
  for (const field of requiredFields) {
    if (!formData.get(field)) {
      mostrarNotificacion("Por favor, completa todos los campos requeridos.", "error")
      return
    }
  }

  // Preparar los ingredientes como lista
  const ingredientes = formData
    .get("ingredientes")
    .split("\n")
    .filter((item) => item.trim() !== "")
  const ingredientesList = ingredientes.map((item) => `<li>${item}</li>`).join("")

  // Preparar los pasos como lista numerada
  const pasos = formData
    .get("pasos")
    .split("\n")
    .filter((item) => item.trim() !== "")
  const pasosList = pasos.map((item) => `<li>${item}</li>`).join("")

  // Usar imagen predeterminada si no se proporciona una
  const imagenUrl = formData.get("imagen") || obtenerImagenPredeterminada(formData.get("cultura"))

  // Construir la vista previa
  previewContainer.innerHTML = `
    <div class="preview-header">
      <h1 class="preview-title">${formData.get("titulo")}</h1>
      <div class="preview-meta">
        <span><i class="fas fa-utensils"></i> ${formData.get("categoria")}</span>
        <span><i class="fas fa-globe-americas"></i> ${formData.get("cultura")}</span>
        <span><i class="fas fa-chart-line"></i> ${formData.get("dificultad")}</span>
        <span><i class="far fa-clock"></i> ${formData.get("tiempo")}</span>
      </div>
    </div>
    
    <img src="${imagenUrl}" alt="${formData.get("titulo")}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;">
    
    <div class="preview-description">
      ${formData.get("descripcion")}
    </div>
    
    <div class="preview-section">
      <h3>Ingredientes</h3>
      <ul class="preview-ingredients">
        ${ingredientesList}
      </ul>
    </div>
    
    <div class="preview-section">
      <h3>Preparación</h3>
      <ol class="preview-steps">
        ${pasosList}
      </ol>
    </div>
  `

  // Mostrar el modal de vista previa
  document.getElementById("preview-modal").style.display = "block"
}

// Función para mostrar confirmación de eliminación
function mostrarConfirmacionEliminar(recipeId) {
  document.getElementById("confirm-delete-modal").style.display = "block"
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje, tipo = "success") {
  const notification = document.getElementById("notification")
  const notificationMessage = document.getElementById("notification-message")

  notificationMessage.textContent = mensaje

  // Cambiar el estilo según el tipo de notificación
  if (tipo === "error") {
    notification.querySelector(".notification-content").style.backgroundColor = "#e74c3c"
    notification.querySelector("i").className = "fas fa-exclamation-circle"
  } else {
    notification.querySelector(".notification-content").style.backgroundColor = "#4caf50"
    notification.querySelector("i").className = "fas fa-check-circle"
  }

  // Mostrar la notificación
  notification.style.display = "block"

  // Ocultar la notificación después de 3 segundos
  setTimeout(() => {
    notification.style.display = "none"
  }, 3000)
}

// Función para cerrar un modal
function cerrarModal(modalId) {
  document.getElementById(modalId).style.display = "none"
}

// Función para obtener una imagen predeterminada según la cultura
function obtenerImagenPredeterminada(cultura) {
  const imagenesPredeterminadas = {
    China: "US1_PantallaInicio/Imagenes/China/pollo-agridulce.jpg",
    España: "US1_PantallaInicio/Imagenes/España/tortilla-patatas.jpeg",
    Francia: "US1_PantallaInicio/Imagenes/Francia/coq-au-vin.jpg",
    Italia: "US1_PantallaInicio/Imagenes/Italia/pizza-margarita.jpg",
    Japón: "US1_PantallaInicio/Imagenes/Japon/sushi.jpeg",
    Venezuela: "US1_PantallaInicio/Imagenes/Venezuela/arepa-venezolana.jpg",
  }

  return imagenesPredeterminadas[cultura] || "US1_PantallaInicio/Imagenes/default-recipe.jpg"
}
