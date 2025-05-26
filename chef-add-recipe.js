// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

document.addEventListener("DOMContentLoaded", () => {
  // Verificar autenticación
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}")
  if (!usuario || usuario.rol !== "chef") {
    console.log("Acceso no autorizado a la página de chef")
    alert("No tienes permisos para acceder a esta página")
    window.location.href = "US1_PantallaInicio/index.html"
    return
  }

  // Configurar formulario
  const recipeForm = document.getElementById("recipe-form")
  if (recipeForm) {
    recipeForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      await guardarReceta()
    })
  }

  // Configurar botón de vista previa
  const previewBtn = document.getElementById("preview-btn")
  if (previewBtn) {
    previewBtn.addEventListener("click", mostrarVistaPrevia)
  }

  // Configurar botón de publicar desde vista previa
  const confirmPublishBtn = document.getElementById("confirm-publish")
  if (confirmPublishBtn) {
    confirmPublishBtn.addEventListener("click", async () => {
      await guardarReceta()
      cerrarModal("preview-modal")
    })
  }

  // Configurar botón de volver a editar
  const backToEditBtn = document.getElementById("back-to-edit")
  if (backToEditBtn) {
    backToEditBtn.addEventListener("click", () => {
      cerrarModal("preview-modal")
    })
  }

  // Configurar cierre de modal
  const closeModalBtns = document.querySelectorAll(".close-modal")
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal")
      if (modal) {
        cerrarModal(modal.id)
      }
    })
  })

  // Cerrar modal al hacer clic fuera
  window.addEventListener("click", (e) => {
    const modals = document.querySelectorAll(".modal")
    modals.forEach((modal) => {
      if (e.target === modal) {
        cerrarModal(modal.id)
      }
    })
  })
})

// Función para guardar una nueva receta
async function guardarReceta() {
  try {
    // Verificar si hay un usuario en localStorage
    const usuarioJSON = localStorage.getItem("usuario")
    if (!usuarioJSON) {
      mostrarNotificacion("Debes iniciar sesión para realizar esta acción", "error")
      return
    }

    const usuario = JSON.parse(usuarioJSON)

    // Obtener el ID del usuario chef
    const { data: userData, error: userError } = await supabase
      .from("usuarios")
      .select("id")
      .eq("username", usuario.username)
      .single()

    if (userError) {
      console.error("Error al obtener ID de usuario:", userError)
      throw userError
    }

    // Obtener los valores del formulario
    const form = document.getElementById("recipe-form")
    const formData = new FormData(form)

    const titulo = formData.get("titulo")
    const categoria = formData.get("categoria")
    const dificultad = formData.get("dificultad")
    const tiempo = formData.get("tiempo")
    const descripcion = formData.get("descripcion")
    const ingredientes = formData.get("ingredientes")
    const pasos = formData.get("pasos")
    const cultura = formData.get("cultura")
    const imagenUrl = formData.get("imagen_url") || obtenerImagenPredeterminada(cultura)

    // Validar campos requeridos
    if (!titulo || !categoria || !dificultad || !tiempo || !descripcion || !ingredientes || !pasos || !cultura) {
      mostrarNotificacion("Por favor, completa todos los campos requeridos", "error")
      return
    }

    // Construir el objeto de datos - SOLO incluimos campos que existen en la tabla
    const recetaData = {
      titulo: titulo,
      categoria: categoria,
      dificultad: dificultad,
      tiempo: tiempo,
      descripcion: descripcion,
      ingredientes: ingredientes,
      pasos: pasos,
      Cultura: cultura,
      usuario_id: userData.id,
    }

    // Intentamos obtener la estructura de la tabla para ver qué columnas existen
    console.log("Intentando obtener la estructura de la tabla recetas...")
    const { data: tableInfo, error: tableError } = await supabase.from("recetas").select().limit(1)

    if (tableError) {
      console.error("Error al obtener estructura de tabla:", tableError)
    } else {
      console.log("Estructura de tabla recetas:", tableInfo)
    }

    console.log("Datos de la receta a guardar:", recetaData)

    // Insertar la receta en la base de datos
    const { data, error } = await supabase.from("recetas").insert([recetaData])

    if (error) {
      console.error("Error en la respuesta de Supabase:", error)
      throw error
    }

    console.log("Respuesta de Supabase:", data)

    // Mostrar notificación de éxito
    mostrarNotificacion("¡Receta publicada con éxito!")

    // Limpiar el formulario
    form.reset()

    // Redirigir al panel de chef después de 2 segundos
    setTimeout(() => {
      window.location.href = "chef-page.html"
    }, 2000)
  } catch (error) {
    console.error("Error al guardar receta:", error)
    mostrarNotificacion("Error al publicar la receta: " + (error.message || "Error desconocido"), "error")
  }
}

// Función para mostrar la vista previa
function mostrarVistaPrevia() {
  const form = document.getElementById("recipe-form")
  const formData = new FormData(form)
  const previewContainer = document.getElementById("recipe-preview")

  // Validar campos requeridos
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
      mostrarNotificacion("Por favor, completa todos los campos requeridos", "error")
      return
    }
  }

  // Preparar ingredientes y pasos
  const ingredientes = formData
    .get("ingredientes")
    .split("\n")
    .filter((item) => item.trim() !== "")
  const ingredientesList = ingredientes.map((item) => `<li>${item}</li>`).join("")

  const pasos = formData
    .get("pasos")
    .split("\n")
    .filter((item) => item.trim() !== "")
  const pasosList = pasos.map((item, index) => `<li>${item}</li>`).join("")

  const imagenUrl = formData.get("imagen_url") || obtenerImagenPredeterminada(formData.get("cultura"))

  // Construir vista previa
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
    
    <img src="${imagenUrl}" alt="${formData.get("titulo")}" class="preview-image">
    
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
  const previewModal = document.getElementById("preview-modal")
  if (previewModal) {
    previewModal.style.display = "block"
  }
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje, tipo = "success") {
  const notification = document.getElementById("notification")
  const notificationMessage = document.getElementById("notification-message")

  if (!notification || !notificationMessage) {
    alert(mensaje)
    return
  }

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

// Función para cerrar modal
function cerrarModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "none"
  }
}

// Función para obtener imagen predeterminada según la cultura
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
