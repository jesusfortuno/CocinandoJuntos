// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

// Elementos del DOM
const recipesTableBody = document.getElementById("recipes-table-body")
const addRecipeBtn = document.getElementById("add-recipe-btn")
const modal = document.getElementById("recipe-modal")
const closeBtn = document.querySelector(".close")
const recipeForm = document.getElementById("recipe-form")
const cancelFormBtn = document.getElementById("cancel-form")
const showInstructionsBtn = document.getElementById("show-instructions-btn")
const instructionsModal = document.getElementById("instructions-modal")
const closeInstructionsBtn = document.getElementById("close-instructions")

// Cargar recetas
async function cargarRecetas() {
  try {
    const { data: recetas, error } = await supabase.from("recetas").select("*").order("id", { ascending: false })

    if (error) {
      console.error("Error al cargar recetas:", error)
      throw error
    }

    if (!recipesTableBody) {
      console.error("No se encontró el elemento recipesTableBody")
      return
    }

    recipesTableBody.innerHTML = ""

    if (!recetas || recetas.length === 0) {
      recipesTableBody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center">No hay recetas disponibles</td>
        </tr>
      `
      return
    }

    recetas.forEach((receta) => {
      const row = document.createElement("tr")

      // Determinar la clase de badge para la dificultad
      let dificultadClass = "badge-success"
      if (receta.dificultad === "Media") dificultadClass = "badge-warning"
      if (receta.dificultad === "Difícil") dificultadClass = "badge-danger"

      row.innerHTML = `
        <td>${receta.id}</td>
        <td>
          <img src="../US1_PantallaInicio/Imagenes/placeholder.jpg" 
               alt="${receta.titulo}" 
               style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;">
        </td>
        <td>${receta.titulo || ""}</td>
        <td><span class="badge badge-primary">${receta.categoria || ""}</span></td>
        <td><span class="badge ${dificultadClass}">${receta.dificultad || ""}</span></td>
        <td>${receta.tiempo || ""}</td>
        <td class="action-buttons">
          <button class="btn btn-info btn-sm edit-recipe" data-id="${receta.id}">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button class="btn btn-danger btn-sm delete-recipe" data-id="${receta.id}">
            <i class="fas fa-trash"></i> Eliminar
          </button>
          <button class="btn btn-success btn-sm generate-html" data-id="${receta.id}">
            <i class="fas fa-file-code"></i> Generar HTML
          </button>
        </td>
      `
      recipesTableBody.appendChild(row)
    })

    // Añadir event listeners a los botones
    document.querySelectorAll(".edit-recipe").forEach((btn) => {
      btn.addEventListener("click", function () {
        const recetaId = this.getAttribute("data-id")
        editarReceta(recetaId)
      })
    })

    document.querySelectorAll(".delete-recipe").forEach((btn) => {
      btn.addEventListener("click", function () {
        const recetaId = this.getAttribute("data-id")
        eliminarReceta(recetaId)
      })
    })

    document.querySelectorAll(".generate-html").forEach((btn) => {
      btn.addEventListener("click", function () {
        const recetaId = this.getAttribute("data-id")
        generarHTML(recetaId)
      })
    })
  } catch (error) {
    console.error("Error al cargar recetas:", error)
    if (recipesTableBody) {
      recipesTableBody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center">Error al cargar recetas: ${error.message}</td>
        </tr>
      `
    }
  }
}

// Guardar receta
async function guardarReceta(event) {
  event.preventDefault()

  try {
    // Verificar si hay un usuario en localStorage
    const usuarioJSON = localStorage.getItem("usuario")
    if (!usuarioJSON) {
      alert("Debes iniciar sesión para realizar esta acción")
      return
    }

    const usuario = JSON.parse(usuarioJSON)

    // Obtener los valores del formulario
    const titulo = document.getElementById("titulo").value
    const categoria = document.getElementById("categoria").value
    const dificultad = document.getElementById("dificultad").value
    const tiempo = document.getElementById("tiempo").value
    const descripcion = document.getElementById("descripcion").value
    const ingredientes = document.getElementById("ingredientes").value
    const pasos = document.getElementById("pasos").value
    const recetaId = document.getElementById("receta-id").value

    // Obtener el valor de cultura si existe el elemento
    let cultura = null
    const culturaElement = document.getElementById("cultura")
    if (culturaElement) {
      cultura = culturaElement.value || null
    }

    // Construir el objeto de datos básicos (sin campos problemáticos)
    const recetaData = {
      titulo: titulo,
      categoria: categoria,
      dificultad: dificultad,
      tiempo: tiempo,
      descripcion: descripcion,
      ingredientes: ingredientes,
      pasos: pasos,
    }

    // Añadir usuario_id solo si existe
    if (usuario && usuario.id) {
      recetaData.usuario_id = usuario.id
    }

    // Añadir cultura solo si tiene un valor
    if (cultura) {
      recetaData.Cultura = cultura
    }

    console.log("Datos de la receta a guardar:", recetaData)

    let response
    if (recetaId) {
      console.log("Actualizando receta ID:", recetaId)
      response = await supabase.from("recetas").update(recetaData).eq("id", recetaId)
    } else {
      console.log("Creando nueva receta")
      response = await supabase.from("recetas").insert([recetaData])
    }

    if (response.error) {
      console.error("Error en la respuesta de Supabase:", response.error)
      throw response.error
    }

    console.log("Respuesta de Supabase:", response)

    modal.style.display = "none"
    await cargarRecetas()
    alert(`Receta ${recetaId ? "actualizada" : "añadida"} con éxito`)

    // Obtener la receta recién creada o actualizada para generar HTML
    const nuevoRecetaId = recetaId || (response.data && response.data[0] ? response.data[0].id : null)

    if (nuevoRecetaId && confirm(`¿Deseas generar el archivo HTML para esta receta ahora?`)) {
      generarHTML(nuevoRecetaId)
    }
  } catch (error) {
    console.error("Error al guardar receta:", error)
    alert("Error al guardar la receta: " + (error.message || "Error desconocido"))
  }
}

// Editar receta
async function editarReceta(id) {
  try {
    console.log("Cargando receta para editar, ID:", id)

    const { data: receta, error } = await supabase.from("recetas").select("*").eq("id", id).single()

    if (error) {
      console.error("Error al obtener receta:", error)
      throw error
    }

    if (!receta) {
      console.error("No se encontró la receta con ID:", id)
      throw new Error("No se encontró la receta")
    }

    console.log("Receta cargada:", receta)

    // Llenar el formulario con valores predeterminados si algún campo es null
    document.getElementById("titulo").value = receta.titulo || ""
    document.getElementById("categoria").value = receta.categoria || "Comida"
    document.getElementById("dificultad").value = receta.dificultad || "Fácil"
    document.getElementById("tiempo").value = receta.tiempo || ""
    document.getElementById("descripcion").value = receta.descripcion || ""
    document.getElementById("ingredientes").value = receta.ingredientes || ""
    document.getElementById("pasos").value = receta.pasos || ""
    document.getElementById("receta-id").value = receta.id

    // Verificar si el elemento cultura existe antes de intentar asignarle un valor
    const culturaElement = document.getElementById("cultura")
    if (culturaElement) {
      culturaElement.value = receta.Cultura || ""
    }

    // Configurar el formulario
    document.getElementById("modal-title").textContent = "Editar Receta"
    modal.style.display = "block"
  } catch (error) {
    console.error("Error al cargar receta para editar:", error)
    alert("Error al cargar la receta: " + (error.message || "Error desconocido"))
  }
}

// Eliminar receta
async function eliminarReceta(id) {
  try {
    if (!confirm("¿Estás seguro de que quieres eliminar esta receta?")) return

    console.log("Eliminando receta ID:", id)

    const { error } = await supabase.from("recetas").delete().eq("id", id)

    if (error) {
      console.error("Error al eliminar receta:", error)
      throw error
    }

    await cargarRecetas()
    alert("Receta eliminada con éxito")
  } catch (error) {
    console.error("Error al eliminar receta:", error)
    alert("Error al eliminar la receta: " + (error.message || "Error desconocido"))
  }
}

// Generar HTML para una receta
async function generarHTML(id) {
  try {
    // Obtener la receta de la base de datos
    const { data: receta, error } = await supabase.from("recetas").select("*").eq("id", id).single()

    if (error) {
      console.error("Error al obtener receta para HTML:", error)
      throw error
    }

    if (!receta) {
      console.error("No se encontró la receta con ID:", id)
      throw new Error("No se encontró la receta")
    }

    // Verificar si existe la función generadorRecetas
    if (!window.generadorRecetas) {
      console.error("No se encontró el generador de recetas")
      alert("El generador de HTML no está disponible. Asegúrate de que el archivo generadorRecetas.js esté cargado.")
      return
    }

    // Generar nombre de archivo a partir del título
    const nombreArchivo = window.generadorRecetas.generarNombreArchivo(receta.titulo)

    // Generar el contenido HTML
    const contenidoHTML = window.generadorRecetas.generarHTMLReceta(receta)

    // Descargar el archivo HTML
    const resultado = window.generadorRecetas.descargarArchivoHTML(nombreArchivo, contenidoHTML)

    if (resultado) {
      alert(`Archivo HTML generado correctamente. Por favor, guárdalo en la carpeta US6_GuardarRecetas.`)
    } else {
      alert("Error al generar el archivo HTML")
    }
  } catch (error) {
    console.error("Error al generar HTML:", error)
    alert("Error al generar HTML: " + (error.message || "Error desconocido"))
  }
}

// Limpiar formulario
function limpiarFormulario() {
  if (!recipeForm) {
    console.error("No se encontró el formulario de recetas")
    return
  }

  recipeForm.reset()

  const recetaIdElement = document.getElementById("receta-id")
  if (recetaIdElement) {
    recetaIdElement.value = ""
  }

  const modalTitleElement = document.getElementById("modal-title")
  if (modalTitleElement) {
    modalTitleElement.textContent = "Añadir Nueva Receta"
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  console.log("Documento cargado, inicializando...")

  // Cargar recetas
  cargarRecetas()

  // Configurar usuario
  const usuarioJSON = localStorage.getItem("usuario")
  if (usuarioJSON) {
    const usuario = JSON.parse(usuarioJSON)
    const sidebarAdminName = document.getElementById("sidebar-admin-name")
    if (sidebarAdminName) {
      sidebarAdminName.textContent = usuario.username || usuario.email || "Administrador"
    }
  } else {
    console.warn("No se encontró usuario en localStorage")
  }

  // Evento para añadir receta
  if (addRecipeBtn) {
    addRecipeBtn.addEventListener("click", () => {
      limpiarFormulario()
      modal.style.display = "block"
    })
  } else {
    console.error("No se encontró el botón de añadir receta")
  }

  // Evento para cerrar modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none"
    })
  } else {
    console.error("No se encontró el botón de cerrar modal")
  }

  // Evento para cancelar formulario
  if (cancelFormBtn) {
    cancelFormBtn.addEventListener("click", () => {
      modal.style.display = "none"
    })
  } else {
    console.error("No se encontró el botón de cancelar formulario")
  }

  // Evento para guardar receta
  if (recipeForm) {
    recipeForm.addEventListener("submit", guardarReceta)
  } else {
    console.error("No se encontró el formulario de recetas")
  }

  // Evento para mostrar instrucciones
  if (showInstructionsBtn && instructionsModal) {
    showInstructionsBtn.addEventListener("click", () => {
      instructionsModal.style.display = "block"
    })
  }

  // Evento para cerrar instrucciones
  if (closeInstructionsBtn && instructionsModal) {
    closeInstructionsBtn.addEventListener("click", () => {
      instructionsModal.style.display = "none"
    })
  }

  // Cerrar modales al hacer clic fuera
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
    }
    if (event.target === instructionsModal) {
      instructionsModal.style.display = "none"
    }
  })

  console.log("Inicialización completada")
})
