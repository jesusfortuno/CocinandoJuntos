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

    // Función para detectar la ruta correcta a las imágenes
    function obtenerRutaImagenes() {
      // Intentar diferentes rutas posibles
      const rutasPosibles = [
        "./Imagenes/", // Si el HTML está en la raíz
        "../Imagenes/", // Si el HTML está en US1_PantallaInicio
        "../../Imagenes/", // Si hay más niveles
        "./US1_PantallaInicio/../Imagenes/", // Ruta absoluta desde raíz
      ]

      // Por ahora usamos la ruta más común
      return "../Imagenes/"
    }

    // Mapeo de imágenes para cada chef
    const rutaImagenes = obtenerRutaImagenes()
    const chefImages = {
      chef: "../Imagenes/chef-professional.jpg",
      juanma: "../Imagenes/chef-juanma.jpeg",
      miguel: "../Imagenes/chef-miguel.jpeg",
      default: "../Imagenes/blank-profile-picture-973460_1280.webp",
    }

    console.log("Rutas de imágenes configuradas:", chefImages)

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
      // Verificar que se limpió correctamente
      console.log("Contenedor limpiado, HTML actual:", chefsContainer.innerHTML)

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
          // Si no hay chefs en la base de datos, mostrar chefs de ejemplo con las imágenes reales
          console.log("No se encontraron chefs en la base de datos, mostrando chefs de ejemplo")
          const chefsEjemplo = [
            { id: 1, username: "chef", rol: "chef" },
            { id: 2, username: "juanma", rol: "chef" },
            { id: 3, username: "miguel", rol: "chef" },
          ]

          mostrarChefs(chefsEjemplo, chefsContainer, chefImages)

          // Agregar mensaje informativo
          const mensaje = document.createElement("p")
          mensaje.textContent = "Mostrando chefs de ejemplo (no se encontraron en la base de datos)"
          mensaje.style.textAlign = "center"
          mensaje.style.color = "#666"
          mensaje.style.fontStyle = "italic"
          chefsContainer.appendChild(mensaje)
          return
        }

        // Si encontramos chefs con la búsqueda exacta, usamos esos
        mostrarChefs(chefsExactos, chefsContainer, chefImages)
      } else {
        // Si encontramos chefs con la búsqueda flexible, los mostramos
        mostrarChefs(chefs, chefsContainer, chefImages)
      }
    } else {
      console.error("No se encontró el contenedor de chefs (.chefs-container)")
      console.log("Elementos disponibles en la página:", document.querySelectorAll("*"))
    }
  } catch (error) {
    console.error("Error inesperado:", error)
  }
})

// Función para obtener la imagen correcta según el nombre del chef
function obtenerImagenChef(username, chefImages) {
  const nombreLower = username.toLowerCase()

  console.log(`Buscando imagen para chef: ${username}`)

  // Buscar coincidencias específicas
  if (nombreLower.includes("juanma")) {
    console.log("Usando imagen de Juanma")
    return chefImages.juanma
  } else if (nombreLower.includes("miguel")) {
    console.log("Usando imagen de Miguel")
    return chefImages.miguel
  } else if (nombreLower.includes("chef") || nombreLower === "chef") {
    console.log("Usando imagen del chef profesional")
    return chefImages.chef
  }

  console.log("Usando imagen por defecto")
  // Si no hay coincidencia, usar imagen por defecto
  return chefImages.default
}

// Función para mostrar los chefs en el contenedor
function mostrarChefs(chefs, container, chefImages) {
  console.log("Mostrando chefs:", chefs)

  // Verificar que el contenedor existe
  console.log("Container antes de limpiar:", container)
  console.log("HTML actual del container:", container.innerHTML)

  // Limpiar completamente el contenedor
  container.innerHTML = ""
  console.log("Container después de limpiar:", container.innerHTML)

  // Crear y agregar las tarjetas de chef al contenedor
  chefs.forEach((chef) => {
    // Obtener la imagen correcta para este chef
    const imagenChef = obtenerImagenChef(chef.username, chefImages)

    console.log(`Chef ${chef.username} usará la imagen: ${imagenChef}`)

    // Crear el elemento HTML para el chef
    const chefCard = document.createElement("div")
    chefCard.className = "chef-card"

    chefCard.innerHTML = `
      <div class="chef-hover-effect">
        <a href="#" class="view-profile-btn">Ver Perfil</a>
      </div>
      <img src="${imagenChef}" alt="Chef ${chef.username}" 
           onerror="this.src='../Imagenes/blank-profile-picture-973460_1280.webp'"
           style="width: 100%; height: 250px; object-fit: cover;">
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

    console.log("Cargando Supabase...")

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
