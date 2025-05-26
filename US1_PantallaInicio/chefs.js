// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Verificar si la biblioteca de Supabase está disponible
    if (typeof supabase === "undefined") {
      // Si no está disponible, cargarla dinámicamente
      await cargarSupabase()
    }

    // Configuración de Supabase
    const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
    const SUPABASE_API_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"

    // Crear cliente de Supabase
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

    // Obtener el contenedor donde se mostrarán los chefs
    const chefsContainer = document.querySelector(".chefs-container")

    if (chefsContainer) {
      // Mostrar mensaje de carga
      chefsContainer.innerHTML = '<p class="text-center">Cargando chefs...</p>'

      // PASO 1: Obtener TODOS los usuarios para depuración
      const { data: todosUsuarios, error: errorTodos } = await supabaseClient
        .from("usuarios")
        .select("id, username, rol")

      console.log("TODOS LOS USUARIOS:", todosUsuarios)

      // Mostrar todos los roles únicos para depuración
      if (todosUsuarios && todosUsuarios.length > 0) {
        const roles = [...new Set(todosUsuarios.map((u) => u.rol))]
        console.log("ROLES ENCONTRADOS EN LA BASE DE DATOS:", roles)
      }

      // PASO 2: Intentar una consulta más flexible para encontrar chefs
      // Usamos ilike para hacer una búsqueda insensible a mayúsculas/minúsculas
      const { data: chefs, error } = await supabaseClient
        .from("usuarios")
        .select("id, username, rol")
        .ilike("rol", "%chef%")

      // Limpiar el contenedor antes de agregar nuevos chefs
      chefsContainer.innerHTML = ""

      if (error) {
        console.error("Error al cargar los chefs:", error.message)
        chefsContainer.innerHTML = `<p class="text-center">Error al cargar los chefs: ${error.message}</p>`
        return
      }

      console.log("CHEFS ENCONTRADOS (búsqueda flexible):", chefs)

      // Si no hay chefs, intentar una búsqueda exacta como último recurso
      if (!chefs || chefs.length === 0) {
        const { data: chefsExactos, error: errorExacto } = await supabaseClient
          .from("usuarios")
          .select("id, username, rol")
          .eq("rol", "chef")

        console.log("CHEFS ENCONTRADOS (búsqueda exacta):", chefsExactos)

        if (errorExacto) {
          console.error("Error en búsqueda exacta:", errorExacto.message)
        }

        if (!chefsExactos || chefsExactos.length === 0) {
          chefsContainer.innerHTML = `
            <p class="text-center">No se encontraron chefs en la base de datos.</p>
            <p class="text-center">Verifica que los usuarios tengan el rol "chef" correctamente asignado.</p>
          `

          // Crear un botón para mostrar todos los usuarios
          const mostrarTodosBtn = document.createElement("button")
          mostrarTodosBtn.textContent = "Mostrar todos los usuarios"
          mostrarTodosBtn.style.margin = "20px auto"
          mostrarTodosBtn.style.display = "block"
          mostrarTodosBtn.style.padding = "10px 20px"
          mostrarTodosBtn.style.backgroundColor = "#6b4423"
          mostrarTodosBtn.style.color = "white"
          mostrarTodosBtn.style.border = "none"
          mostrarTodosBtn.style.borderRadius = "5px"
          mostrarTodosBtn.style.cursor = "pointer"

          mostrarTodosBtn.onclick = async () => {
            // Mostrar todos los usuarios como chefs (para propósitos de depuración)
            mostrarChefs(todosUsuarios, chefsContainer)
          }

          chefsContainer.appendChild(mostrarTodosBtn)
          return
        }

        // Si encontramos chefs con la búsqueda exacta, usamos esos
        mostrarChefs(chefsExactos, chefsContainer)
      } else {
        // Si encontramos chefs con la búsqueda flexible, los mostramos
        mostrarChefs(chefs, chefsContainer)
      }
    } else {
      console.error("No se encontró el contenedor de chefs (.chefs-container)")
    }
  } catch (error) {
    console.error("Error inesperado:", error)
  }
})

// Función para mostrar los chefs en el contenedor
function mostrarChefs(chefs, container) {
  // Crear y agregar las tarjetas de chef al contenedor
  chefs.forEach((chef) => {
    // Crear el elemento HTML para el chef
    const chefCard = document.createElement("div")
    chefCard.className = "chef-card"

    chefCard.innerHTML = `
      <div class="chef-hover-effect">
        <a href="#" class="view-profile-btn">Ver Perfil</a>
      </div>
      <img src="./Imagenes/blank-profile-picture-973460_1280.webp" alt="Chef ${chef.username}">
      <div class="chef-details">
        <h2>Chef ${chef.username}</h2>
      </div>
    `

    // Agregar la tarjeta al contenedor
    container.appendChild(chefCard)
  })
}

// Función para cargar Supabase dinámicamente si no está disponible
function cargarSupabase() {
  return new Promise((resolve, reject) => {
    // Verificar si ya está cargado
    if (typeof supabase !== "undefined") {
      resolve()
      return
    }

    // Crear elemento script
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
    script.onload = () => {
      console.log("Supabase cargado correctamente")
      resolve()
    }
    script.onerror = () => {
      console.error("Error al cargar Supabase")
      reject(new Error("No se pudo cargar Supabase"))
    }

    // Añadir script al documento
    document.head.appendChild(script)
  })
}
