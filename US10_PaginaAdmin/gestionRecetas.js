// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

// Elementos del DOM
const modal = document.getElementById("recipe-modal")
const addRecipeBtn = document.getElementById("add-recipe-btn")
const closeBtn = document.querySelector(".close")
const recipeForm = document.getElementById("recipe-form")
const recipesTableBody = document.getElementById("recipes-table-body")

// Obtener usuario del localStorage
function getUsuario() {
  const usuario = localStorage.getItem("usuario")
  if (!usuario) {
    window.location.href = "../login.html"
    return null
  }
  return JSON.parse(usuario)
}

// Cargar recetas
async function cargarRecetas() {
  try {
    const { data: recetas, error } = await supabase.from("recetas").select("*").order("id", { ascending: false })

    if (error) throw error

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
      row.innerHTML = `
                <td>${receta.id}</td>
                <td>
                    <img src="${receta.imagen || "./../US1_PantallaInicio/Imagenes/placeholder.jpg"}" alt="${receta.titulo}" 
                    style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;">
                </td>
                <td>${receta.titulo || ""}</td>
                <td><span class="badge badge-primary">${receta.categoria || ""}</span></td>
                <td><span class="badge badge-${receta.dificultad === "Fácil" ? "success" : receta.dificultad === "Media" ? "warning" : "danger"}">${receta.dificultad || ""}</span></td>
                <td>${receta.tiempo || ""}</td>
                <td class="table-actions">
                    <button class="btn btn-info btn-sm edit-recipe" onclick="editarReceta(${receta.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-sm delete-recipe" onclick="eliminarReceta(${receta.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                    <button class="btn btn-success btn-sm generate-html" onclick="generarHTML(${receta.id})">
                        <i class="fas fa-file-code"></i> Generar HTML
                    </button>
                </td>
            `
      recipesTableBody.appendChild(row)
    })
  } catch (error) {
    console.error("Error al cargar recetas:", error)
    alert("Error al cargar las recetas: " + error.message)
  }
}

// Guardar receta
async function guardarReceta(formData, id = null) {
  try {
    const usuario = getUsuario()
    if (!usuario) return

    const recetaData = {
      titulo: formData.get("titulo"),
      // Eliminamos el campo descripción
      dificultad: formData.get("dificultad"),
      tiempo: formData.get("tiempo"),
      categoria: formData.get("categoria"),
      // Eliminamos el campo cultura para evitar el error
      ingredientes: formData.get("ingredientes"),
      pasos: formData.get("pasos"),
      usuario_id: usuario.id,
    }

    let response
    if (id) {
      console.log("Actualizando receta:", id, recetaData)
      response = await supabase.from("recetas").update(recetaData).eq("id", id)
    } else {
      console.log("Creando nueva receta:", recetaData)
      response = await supabase.from("recetas").insert([recetaData])
    }

    if (response.error) throw response.error

    // Obtener la receta recién creada o actualizada
    let receta
    if (id) {
      const { data, error } = await supabase.from("recetas").select("*").eq("id", id).single()
      if (error) throw error
      receta = data
    } else {
      // Si es una nueva receta, obtenemos la última insertada por este usuario
      const { data, error } = await supabase
        .from("recetas")
        .select("*")
        .eq("usuario_id", usuario.id)
        .order("id", { ascending: false })
        .limit(1)
        .single()
      if (error) throw error
      receta = data
    }

    modal.style.display = "none"
    await cargarRecetas()

    // Preguntar al usuario si desea generar el HTML ahora
    if (
      receta &&
      confirm(`Receta ${id ? "actualizada" : "añadida"} con éxito. ¿Deseas generar el archivo HTML ahora?`)
    ) {
      generarHTML(receta.id)
    } else {
      alert(`Receta ${id ? "actualizada" : "añadida"} con éxito. Puedes generar el HTML más tarde desde la tabla.`)
    }
  } catch (error) {
    console.error("Error al guardar receta:", error)
    alert("Error al guardar la receta: " + error.message)
  }
}

// Generar HTML para una receta
async function generarHTML(id) {
  try {
    const usuario = getUsuario()
    if (!usuario) return

    // Obtener la receta de la base de datos
    const { data: receta, error } = await supabase.from("recetas").select("*").eq("id", id).single()

    if (error) throw error
    if (!receta) throw new Error("No se encontró la receta")

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
    alert("Error al generar HTML: " + error.message)
  }
}

// Editar receta
async function editarReceta(id) {
  try {
    const usuario = getUsuario()
    if (!usuario) return

    console.log("Cargando receta para editar:", id)
    const { data: receta, error } = await supabase.from("recetas").select("*").eq("id", id).single()

    if (error) throw error
    if (!receta) throw new Error("No se encontró la receta")

    // Llenar el formulario
    document.getElementById("titulo").value = receta.titulo || ""
    // Eliminamos la asignación al campo descripción
    document.getElementById("dificultad").value = receta.dificultad || ""
    document.getElementById("tiempo").value = receta.tiempo || ""
    document.getElementById("categoria").value = receta.categoria || ""
    document.getElementById("ingredientes").value = receta.ingredientes || ""
    document.getElementById("pasos").value = receta.pasos || ""

    // Verificar si el elemento cultura existe antes de intentar asignarle un valor
    const culturaElement = document.getElementById("cultura")
    if (culturaElement) {
      culturaElement.value = receta.cultura || ""
    }

    // Configurar el formulario
    document.getElementById("modal-title").textContent = "Editar Receta"
    recipeForm.dataset.mode = "edit"
    recipeForm.dataset.recetaId = id

    modal.style.display = "block"
  } catch (error) {
    console.error("Error al cargar receta para editar:", error)
    alert("Error al cargar la receta: " + error.message)
  }
}

// Eliminar receta
async function eliminarReceta(id) {
  try {
    const usuario = getUsuario()
    if (!usuario) return

    if (!confirm("¿Estás seguro de que quieres eliminar esta receta?")) return

    console.log("Eliminando receta:", id)
    const { error } = await supabase.from("recetas").delete().eq("id", id)

    if (error) throw error

    await cargarRecetas()
    alert("Receta eliminada con éxito")
  } catch (error) {
    console.error("Error al eliminar receta:", error)
    alert("Error al eliminar la receta: " + error.message)
  }
}

// Event Listeners
recipeForm.onsubmit = async (e) => {
  e.preventDefault()
  const formData = new FormData(recipeForm)
  const mode = recipeForm.dataset.mode

  try {
    if (mode === "edit") {
      const recetaId = Number.parseInt(recipeForm.dataset.recetaId)
      if (!recetaId) throw new Error("ID de receta no válido")
      await guardarReceta(formData, recetaId)
    } else {
      await guardarReceta(formData)
    }
  } catch (error) {
    console.error("Error en el formulario:", error)
    alert("Error: " + error.message)
  }
}

addRecipeBtn.onclick = () => {
  recipeForm.reset()
  document.getElementById("modal-title").textContent = "Añadir Nueva Receta"
  recipeForm.dataset.mode = "add"
  delete recipeForm.dataset.recetaId
  modal.style.display = "block"
}

closeBtn.onclick = () => {
  modal.style.display = "none"
}

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

// Inicializar la aplicación
function inicializar() {
  const usuario = getUsuario()
  if (usuario) {
    document.getElementById("user-info").style.display = "flex"
    document.getElementById("user-name").textContent = usuario.username || usuario.email || "Usuario"
    document.getElementById("sidebar-admin-name").textContent = usuario.username || usuario.email || "Usuario"

    // Cargar el script del generador de recetas
    if (!window.generadorRecetas) {
      const script = document.createElement("script")
      script.src = "generadorRecetas.js"
      script.onload = () => {
        console.log("Script de generador de recetas cargado correctamente")
        cargarRecetas()
      }
      script.onerror = (error) => {
        console.error("Error al cargar el script de generador de recetas:", error)
        cargarRecetas()
      }
      document.body.appendChild(script)
    } else {
      cargarRecetas()
    }
  }
}

// Exportar funciones para uso global
window.editarReceta = editarReceta
window.eliminarReceta = eliminarReceta
window.generarHTML = generarHTML

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", inicializar)

