// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

// Elementos del DOM
const modal = document.getElementById("user-modal")
const addUserBtn = document.getElementById("add-user-btn")
const closeBtn = document.querySelector(".close")
const userForm = document.getElementById("user-form")
const usersTableBody = document.getElementById("users-table-body")

// Obtener usuario del localStorage
function getUsuario() {
  const usuario = localStorage.getItem("usuario")
  if (!usuario) {
    window.location.href = "../login.html"
    return null
  }
  return JSON.parse(usuario)
}

// Cargar usuarios
async function cargarUsuarios() {
  try {
    const { data: usuarios, error } = await supabase.from("usuarios").select("*").order("id", { ascending: true })

    if (error) throw error

    usersTableBody.innerHTML = ""

    if (!usuarios || usuarios.length === 0) {
      usersTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">No hay usuarios disponibles</td>
                </tr>
            `
      return
    }

    usuarios.forEach((usuario) => {
      const row = document.createElement("tr")
      row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.username || ""}</td>
                <td>${usuario.email || ""}</td>
                <td><span class="role-badge role-${usuario.rol}">${usuario.rol}</span></td>
                <td class="action-buttons">
                    <button class="edit-btn" onclick="editarUsuario('${usuario.id}')">Editar</button>
                    <button class="delete-btn" onclick="eliminarUsuario('${usuario.id}')">Eliminar</button>
                </td>
            `
      usersTableBody.appendChild(row)
    })
  } catch (error) {
    console.error("Error al cargar usuarios:", error)
    alert("Error al cargar los usuarios: " + error.message)
  }
}

// Guardar usuario
async function guardarUsuario(formData, id = null) {
  try {
    const usuario = getUsuario()
    if (!usuario) return

    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      rol: formData.get("rol"),
    }

    // Solo incluir password si se proporciona uno nuevo
    const password = formData.get("password")
    if (password) {
      userData.password = password
    }

    let response
    if (id) {
      console.log("Actualizando usuario:", id, userData)
      response = await supabase.from("usuarios").update(userData).eq("id", id)
    } else {
      if (!password) {
        throw new Error("La contraseña es requerida para nuevos usuarios")
      }
      console.log("Creando nuevo usuario:", userData)
      response = await supabase.from("usuarios").insert([userData])
    }

    if (response.error) throw response.error

    modal.style.display = "none"
    await cargarUsuarios()
    alert(`Usuario ${id ? "actualizado" : "añadido"} con éxito`)
  } catch (error) {
    console.error("Error al guardar usuario:", error)
    alert("Error al guardar el usuario: " + error.message)
  }
}

// Editar usuario
async function editarUsuario(id) {
  try {
    const usuario = getUsuario()
    if (!usuario) return

    console.log("Cargando usuario para editar:", id)
    const { data: user, error } = await supabase.from("usuarios").select("*").eq("id", id).single()

    if (error) throw error
    if (!user) throw new Error("No se encontró el usuario")

    // Llenar el formulario
    document.getElementById("username").value = user.username || ""
    document.getElementById("email").value = user.email || ""
    document.getElementById("rol").value = user.rol || "user"
    document.getElementById("password").value = "" // Limpiar el campo de contraseña

    // Configurar el formulario
    document.getElementById("modal-title").textContent = "Editar Usuario"
    userForm.dataset.mode = "edit"
    userForm.dataset.userId = id

    modal.style.display = "block"
  } catch (error) {
    console.error("Error al cargar usuario para editar:", error)
    alert("Error al cargar el usuario: " + error.message)
  }
}

async function eliminarUsuario(id) {
  try {
    const usuario = getUsuario();
    if (!usuario) return;

    console.log("Rol del usuario:", usuario.rol); // Verifica el rol del usuario

    if (!confirm("¿Estás seguro de que quieres eliminar este usuario?")) return;

    console.log("Eliminando usuario:", id);
    const { error } = await supabase.from("usuarios").delete().eq("id", id);

    if (error) throw error;

    await cargarUsuarios();
    alert("Usuario eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    alert("Error al eliminar el usuario: " + error.message);
  }
}

// Event Listeners
userForm.onsubmit = async (e) => {
  e.preventDefault()
  const formData = new FormData(userForm)
  const mode = userForm.dataset.mode

  try {
    if (mode === "edit") {
      const userId = userForm.dataset.userId
      if (!userId) throw new Error("ID de usuario no válido")
      await guardarUsuario(formData, userId)
    } else {
      await guardarUsuario(formData)
    }
  } catch (error) {
    console.error("Error en el formulario:", error)
    alert("Error: " + error.message)
  }
}

addUserBtn.onclick = () => {
  userForm.reset()
  document.getElementById("modal-title").textContent = "Añadir Nuevo Usuario"
  userForm.dataset.mode = "add"
  delete userForm.dataset.userId
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
    cargarUsuarios()
  }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", inicializar)

