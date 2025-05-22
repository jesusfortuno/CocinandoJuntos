// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

// Elementos del DOM
const usersTableBody = document.getElementById("users-table-body")
const addUserBtn = document.getElementById("add-user-btn")
const modal = document.getElementById("user-modal")
const closeBtn = document.querySelector(".close")
const userForm = document.getElementById("user-form")
const cancelFormBtn = document.getElementById("cancel-form")

// Cargar usuarios
async function cargarUsuarios() {
  try {
    console.log("Cargando usuarios...")
    const { data: usuarios, error } = await supabase.from("usuarios").select("*").order("id", { ascending: true })

    if (error) {
      console.error("Error al cargar usuarios:", error)
      throw error
    }

    if (!usersTableBody) {
      console.error("No se encontró el elemento usersTableBody")
      return
    }

    usersTableBody.innerHTML = ""

    if (!usuarios || usuarios.length === 0) {
      usersTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">No hay usuarios disponibles</td>
        </tr>
      `
      return
    }

    console.log("Usuarios cargados:", usuarios)

    usuarios.forEach((usuario) => {
      const row = document.createElement("tr")

      // Determinar la clase de badge para el rol
      let rolClass = "role-user"
      let rolText = "Usuario"

      if (usuario.rol === "admin") {
        rolClass = "role-admin"
        rolText = "Administrador"
      } else if (usuario.rol === "chef") {
        rolClass = "role-chef"
        rolText = "Chef"
      }

      row.innerHTML = `
        <td>${usuario.id}</td>
        <td>
          <div class="user-info-cell">
            <img src="../US1_PantallaInicio/Imagenes/blank-profile-picture-973460_1280.webp" 
                 alt="${usuario.username}" 
                 class="user-avatar">
            <span>${usuario.username || ""}</span>
          </div>
        </td>
        <td>${usuario.email || ""}</td>
        <td><span class="role-badge ${rolClass}">${rolText}</span></td>
        <td><span class="status-badge status-active">Activo</span></td>
        <td>
          <div class="action-buttons">
            <button class="btn btn-info btn-sm edit-user" data-id="${usuario.id}">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button class="btn btn-danger btn-sm delete-user" data-id="${usuario.id}">
              <i class="fas fa-trash"></i> Eliminar
            </button>
          </div>
        </td>
      `
      usersTableBody.appendChild(row)
    })

    // Añadir event listeners a los botones
    document.querySelectorAll(".edit-user").forEach((btn) => {
      btn.addEventListener("click", function () {
        const userId = this.getAttribute("data-id")
        editarUsuario(userId)
      })
    })

    document.querySelectorAll(".delete-user").forEach((btn) => {
      btn.addEventListener("click", function () {
        const userId = this.getAttribute("data-id")
        eliminarUsuario(userId)
      })
    })
  } catch (error) {
    console.error("Error al cargar usuarios:", error)
    if (usersTableBody) {
      usersTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">Error al cargar usuarios: ${error.message}</td>
        </tr>
      `
    }
  }
}

// Guardar usuario
async function guardarUsuario(event) {
  event.preventDefault()

  try {
    // Verificar si hay un usuario en localStorage
    const usuarioJSON = localStorage.getItem("usuario")
    if (!usuarioJSON) {
      alert("Debes iniciar sesión para realizar esta acción")
      return
    }

    const currentUser = JSON.parse(usuarioJSON)

    // Obtener los valores del formulario
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const rol = document.getElementById("rol").value
    const userId = document.getElementById("user-id").value

    // Construir el objeto de datos básicos
    const userData = {
      username: username,
      email: email,
      rol: rol,
    }

    // Añadir password solo si se proporciona uno nuevo
    if (password) {
      userData.password = password
    }

    console.log("Datos del usuario a guardar:", userData)

    let response
    if (userId) {
      console.log("Actualizando usuario ID:", userId)
      response = await supabase.from("usuarios").update(userData).eq("id", userId)
    } else {
      // Para nuevos usuarios, la contraseña es obligatoria
      if (!password) {
        alert("La contraseña es obligatoria para nuevos usuarios")
        return
      }
      console.log("Creando nuevo usuario")
      response = await supabase.from("usuarios").insert([userData])
    }

    if (response.error) {
      console.error("Error en la respuesta de Supabase:", response.error)
      throw response.error
    }

    console.log("Respuesta de Supabase:", response)

    modal.style.display = "none"
    await cargarUsuarios()
    alert(`Usuario ${userId ? "actualizado" : "añadido"} con éxito`)
  } catch (error) {
    console.error("Error al guardar usuario:", error)
    alert("Error al guardar el usuario: " + (error.message || "Error desconocido"))
  }
}

// Editar usuario
async function editarUsuario(id) {
  try {
    console.log("Cargando usuario para editar, ID:", id)

    const { data: user, error } = await supabase.from("usuarios").select("*").eq("id", id).single()

    if (error) {
      console.error("Error al obtener usuario:", error)
      throw error
    }

    if (!user) {
      console.error("No se encontró el usuario con ID:", id)
      throw new Error("No se encontró el usuario")
    }

    console.log("Usuario cargado:", user)

    // Llenar el formulario con valores predeterminados si algún campo es null
    document.getElementById("username").value = user.username || ""
    document.getElementById("email").value = user.email || ""
    document.getElementById("password").value = "" // Limpiar el campo de contraseña
    document.getElementById("rol").value = user.rol || "user"
    document.getElementById("user-id").value = user.id

    // Configurar el formulario
    document.getElementById("modal-title").textContent = "Editar Usuario"
    modal.style.display = "block"
  } catch (error) {
    console.error("Error al cargar usuario para editar:", error)
    alert("Error al cargar el usuario: " + (error.message || "Error desconocido"))
  }
}

// Eliminar usuario
async function eliminarUsuario(id) {
  try {
    // Verificar si hay un usuario en localStorage
    const usuarioJSON = localStorage.getItem("usuario")
    if (!usuarioJSON) {
      alert("Debes iniciar sesión para realizar esta acción")
      return
    }

    const currentUser = JSON.parse(usuarioJSON)

    // Evitar que un usuario se elimine a sí mismo
    if (currentUser.id === id) {
      alert("No puedes eliminar tu propio usuario")
      return
    }

    if (!confirm("¿Estás seguro de que quieres eliminar este usuario?")) return

    console.log("Eliminando usuario ID:", id)

    const { error } = await supabase.from("usuarios").delete().eq("id", id)

    if (error) {
      console.error("Error al eliminar usuario:", error)
      throw error
    }

    await cargarUsuarios()
    alert("Usuario eliminado con éxito")
  } catch (error) {
    console.error("Error al eliminar usuario:", error)
    alert("Error al eliminar el usuario: " + (error.message || "Error desconocido"))
  }
}

// Limpiar formulario
function limpiarFormulario() {
  if (!userForm) {
    console.error("No se encontró el formulario de usuarios")
    return
  }

  userForm.reset()

  const userIdElement = document.getElementById("user-id")
  if (userIdElement) {
    userIdElement.value = ""
  }

  const modalTitleElement = document.getElementById("modal-title")
  if (modalTitleElement) {
    modalTitleElement.textContent = "Añadir Nuevo Usuario"
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  console.log("Documento cargado, inicializando gestión de usuarios...")

  // Cargar usuarios
  cargarUsuarios()

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

  // Evento para añadir usuario
  if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
      limpiarFormulario()
      modal.style.display = "block"
    })
  } else {
    console.error("No se encontró el botón de añadir usuario")
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

  // Evento para guardar usuario
  if (userForm) {
    userForm.addEventListener("submit", guardarUsuario)
  } else {
    console.error("No se encontró el formulario de usuarios")
  }

  // Cerrar modal al hacer clic fuera
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  })

  console.log("Inicialización de gestión de usuarios completada")
})
