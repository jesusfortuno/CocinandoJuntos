document.addEventListener("DOMContentLoaded", () => {
  // Configuración de Supabase
  const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
  const SUPABASE_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const userInfo = document.getElementById("user-info")
  const changePasswordBtn = document.querySelector(".profile-info .primary-btn")
  const passwordModal = document.getElementById("password-modal")
  async function fetchSavedRecipes(userId) {
    try {
      console.log("Buscando recetas para usuario:", userId)

      // Consulta para obtener las recetas favoritas del usuario
      const { data: savedRecipes, error } = await supabase
        .from("favoritos")
        .select(`
                  id,
                  receta_id,
                  fecha_guardado,
                  recetas (
                      id, 
                      titulo
                  )
              `)
        .eq("usuario_id", userId)

      if (error) {
        console.error("Error en la consulta:", error)
        throw error
      }

      console.log("Recetas guardadas:", savedRecipes)

      const recipesContainer = document.getElementById("saved-recipes-container")
      recipesContainer.innerHTML = "" // Limpiar contenedor

      // Verificar si hay recetas guardadas
      if (!savedRecipes || savedRecipes.length === 0) {
        recipesContainer.innerHTML = "<p>No tienes recetas guardadas</p>"
        return
      }

      // Función para obtener una imagen según el título de la receta
      function obtenerImagenParaReceta(titulo) {
        const mapaImagenes = {
          Pollo: "../US1_PantallaInicio/Imagenes/China/pollo-agridulce.jpg",
          Bolitas: "../US1_PantallaInicio/Imagenes/China/bollitos-chinos.jpg",
          Galletas: "../US1_PantallaInicio/Imagenes/China/galletas-de-sesamo.jpg",
          Fideos: "../US1_PantallaInicio/Imagenes/China/fideos-salteados.jpg",
          Tortilla: "../US1_PantallaInicio/Imagenes/España/tortilla-patatas.jpeg",
          Churros: "../US1_PantallaInicio/Imagenes/España/churros-chocolate.jpg",
          Paella: "../US1_PantallaInicio/Imagenes/España/paella.png",
          Pan: "../US1_PantallaInicio/Imagenes/España/pan-tomate.jpg",
          Coq: "../US1_PantallaInicio/Imagenes/Francia/coq-au-vin.jpg",
          Crepas: "../US1_PantallaInicio/Imagenes/Francia/crepas-dulces.jpg",
          Quiche: "../US1_PantallaInicio/Imagenes/Francia/quiche-lorraine.pn.webp",
          Tostada: "../US1_PantallaInicio/Imagenes/Francia/tostada-francesa.jpg",
          Capuccino: "../US1_PantallaInicio/Imagenes/Italia/bizcocho-capuccino.jpg",
          Cannoli: "../US1_PantallaInicio/Imagenes/Italia/cannoli.png",
          Lasaña: "../US1_PantallaInicio/Imagenes/Italia/lasaña.jpg",
          Margarita: "../US1_PantallaInicio/Imagenes/Italia/pizza-margarita.jpg",
          Dorayaki: "../US1_PantallaInicio/Imagenes/Japon/dorayaki.jpg",
          Ramen: "../US1_PantallaInicio/Imagenes/Japon/ramen.jpg",
          Sushi: "../US1_PantallaInicio/Imagenes/Japon/sushi.jpeg",
          Tamagoyaki: "../US1_PantallaInicio/Imagenes/Japon/tamagoyaki.jpg",
          "Arepa Venezolana": "../US1_PantallaInicio/Imagenes/Venezuela/arepa-venezolana.jpg",
          Cachapa: "../US1_PantallaInicio/Imagenes/Venezuela/cachapa-venezolana.jpg",
          Criollo: "../US1_PantallaInicio/Imagenes/Venezuela/criollo-venezolano.jpg",
          Golfeados: "../US1_PantallaInicio/Imagenes/Venezuela/Golfeados-venezolanos.png",
          default: "../imagenes/receta-default.jpg",
        }

        // Buscar una imagen que coincida parcialmente con el título
        for (const [palabra, imagen] of Object.entries(mapaImagenes)) {
          if (titulo.toLowerCase().includes(palabra.toLowerCase())) {
            return imagen
          }
        }

        // Si no se encuentra, devolver imagen por defecto
        return mapaImagenes["default"]
      }

      // Función para eliminar de favoritos
      window.eliminarDeFavoritos = async (recetaId) => {
        try {
          const usuarioGuardado = localStorage.getItem("usuario")

          if (!usuarioGuardado) {
            alert("Debes iniciar sesión para eliminar recetas de favoritos")
            return false
          }

          const usuario = JSON.parse(usuarioGuardado)

          // Primero autenticamos al usuario con Supabase
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: usuario.email,
            password: usuario.password, // Necesitarás almacenar la contraseña en localStorage también
          })

          if (authError) {
            console.error("Error de autenticación:", authError)
            alert("Error de autenticación")
            return false
          }

          console.log("Eliminando favorito:", { usuario_id: usuario.id, receta_id: recetaId })

          // Eliminar de la base de datos
          const { data, error } = await supabase
            .from("favoritos")
            .delete()
            .eq("usuario_id", usuario.id)
            .eq("receta_id", Number.parseInt(recetaId))

          if (error) {
            console.error("Error al eliminar de favoritos:", error)
            alert("No se pudo eliminar la receta de favoritos")
            return false
          }

          // Eliminar visualmente de la página
          const recetaElemento = document.querySelector(`.recipe[data-receta-id="${recetaId}"]`)
          if (recetaElemento) {
            recetaElemento.remove()
          }

          alert("Receta eliminada de favoritos")
          return true
        } catch (error) {
          console.error("Error inesperado:", error)
          alert("Error al eliminar la receta de favoritos")
          return false
        }
      }
      // Modificar la generación de recetas para añadir botón de eliminar
      savedRecipes.forEach((favorite) => {
        if (favorite.recetas) {
          const recipe = favorite.recetas
          const recipeElement = document.createElement("div")
          recipeElement.classList.add("recipe")
          recipeElement.setAttribute("data-receta-id", recipe.id)

          // Generar imagen para la receta
          const imagenReceta = obtenerImagenParaReceta(recipe.titulo)

          recipeElement.innerHTML = `
                      <img src="${imagenReceta}" alt="${recipe.titulo}">
                      <h4>${recipe.titulo}</h4>
                      <div class="recipe-actions">
                          <a href="../US6_GuardarRecetas/${recipe.titulo.toLowerCase().replace(/\s+/g, "-")}.html?id=${recipe.id}" 
                             class="recipe-btn view-btn">Ver Receta</a>
                          <button 
                              onclick="eliminarDeFavoritos(${recipe.id})"
                              class="recipe-btn delete-btn">Eliminar</button>
                      </div>
                  `
          recipesContainer.appendChild(recipeElement)
        }
      })
    } catch (error) {
      console.error("Error al cargar recetas guardadas:", error)
      const recipesContainer = document.getElementById("saved-recipes-container")
      recipesContainer.innerHTML = "<p>Error al cargar recetas</p>"
    }
  }
  // Añadir esta función después de fetchSavedRecipes
  // Modificar la función fetchComentariosValoraciones para usar la estructura correcta de la base de datos
  async function fetchComentariosValoraciones(userId) {
    try {
      console.log("Buscando comentarios y valoraciones para usuario:", userId)

      // Consulta para obtener los comentarios y valoraciones del usuario
      const { data: comentarios, error } = await supabase
        .from("comentarios")
        .select(`
              id_comentario,
              id_usuario,
              id_receta,
              valoracion,
              comentario,
              fecha_comentario,
              recetas!inner (
                  id,
                  titulo
              )
          `)
        .eq("id_usuario", userId)
        .order("fecha_comentario", { ascending: false })

      if (error) {
        console.error("Error en la consulta de comentarios:", error)
        throw error
      }

      console.log("Comentarios y valoraciones:", comentarios)

      const comentariosContainer = document.getElementById("comentarios-valoraciones-container")
      comentariosContainer.innerHTML = "" // Limpiar contenedor

      // Verificar si hay comentarios
      if (!comentarios || comentarios.length === 0) {
        comentariosContainer.innerHTML = "<p>No has realizado comentarios ni valoraciones</p>"
        return
      }

      // Función para generar estrellas según la valoración
      function generarEstrellas(valoracion) {
        let estrellas = ""
        for (let i = 1; i <= 5; i++) {
          estrellas += i <= valoracion ? "★" : "☆"
        }
        return estrellas
      }

      // Función para formatear la fecha
      function formatearFecha(fechaStr) {
        const fecha = new Date(fechaStr)
        return fecha.toLocaleString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      }

      // Generar HTML para cada comentario
      comentarios.forEach((c) => {
        const nombreReceta = c.recetas?.titulo || `Receta ${c.id_receta}`
        const fechaFormateada = formatearFecha(c.fecha_comentario)
        const estrellas = generarEstrellas(c.valoracion)

        const comentarioElement = document.createElement("div")
        comentarioElement.classList.add("comentario-item")

        comentarioElement.innerHTML = `
              <div class="comentario-header">
                  <span class="nombre-receta">${nombreReceta}</span>
                  <div class="valoracion">
                      <span class="estrellas">${estrellas}</span>
                      <span class="valor">${c.valoracion}/5</span>
                  </div>
              </div>
              <p class="comentario-texto">${c.comentario || "Sin comentario"}</p>
              <p class="comentario-fecha">${fechaFormateada}</p>
          `

        comentariosContainer.appendChild(comentarioElement)
      })

      // Después de cargar los comentarios, inicializar el indicador de scroll
      console.log("Inicializando indicador de scroll después de cargar comentarios")
      setTimeout(initializeScrollIndicator, 300)
    } catch (error) {
      console.error("Error al cargar comentarios y valoraciones:", error)
      const comentariosContainer = document.getElementById("comentarios-valoraciones-container")
      comentariosContainer.innerHTML = "<p>Error al cargar comentarios y valoraciones</p>"
    }
  }

  // Añadir después de la función fetchComentariosValoraciones
  // Actualizar la función initializeScrollIndicator
  function initializeScrollIndicator() {
    const container = document.getElementById("comentarios-valoraciones-container")
    const indicator = document.querySelector(".scroll-indicator")

    if (!container || !indicator) {
      console.error("No se encontró el contenedor o el indicador")
      return
    }

    // Función simplificada para actualizar el indicador
    function updateScrollIndicator() {
      console.log("Altura del contenedor:", container.clientHeight)
      console.log("Altura del contenido:", container.scrollHeight)
      console.log("Posición del scroll:", container.scrollTop)

      // Si hay suficiente contenido para hacer scroll
      if (container.scrollHeight > container.clientHeight) {
        // Si no estamos en el fondo, mostrar el indicador
        if (container.scrollTop < container.scrollHeight - container.clientHeight - 10) {
          indicator.classList.add("visible")
        } else {
          indicator.classList.remove("visible")
        }
      } else {
        // No hay suficiente contenido para hacer scroll
        indicator.classList.remove("visible")
      }
    }

    // Asegurarse de que el contenedor tenga overflow-y: auto
    container.style.overflowY = "auto"

    // Actualizar el indicador cuando se carguen los comentarios
    const observer = new MutationObserver(() => {
      console.log("Contenido del contenedor cambiado")
      setTimeout(updateScrollIndicator, 200)
    })
    observer.observe(container, { childList: true, subtree: true })

    // Actualizar el indicador cuando se haga scroll
    container.addEventListener("scroll", updateScrollIndicator)

    // Actualizar el indicador inicialmente después de un retraso
    setTimeout(updateScrollIndicator, 500)

    // Hacer scroll suave al hacer clic en el indicador
    indicator.addEventListener("click", () => {
      container.scrollBy({
        top: 100, // Scroll más pequeño para mejor control
        behavior: "smooth",
      })
    })
  }

  // Modificar la parte donde se cargan los datos del usuario para incluir la carga de comentarios
  if (usuario) {
    // Mostrar información del usuario
    userInfo.style.display = "flex"
    document.getElementById("user-name").textContent = usuario.username || "Usuario"
    document.getElementById("profile-user-name").textContent = usuario.username || "Usuario"
    document.getElementById("user-email").textContent = usuario.email || "No disponible"

    // Cargar recetas guardadas
    fetchSavedRecipes(usuario.id)

    // Añadir esta línea para cargar los comentarios
    fetchComentariosValoraciones(usuario.id)

    // Event listener para el botón de cambiar contraseña
    changePasswordBtn.addEventListener("click", () => {
      passwordModal.style.display = "flex"
    })

    // Event listener para cerrar el modal
    window.closeModal = () => {
      passwordModal.style.display = "none"
    }

    // Event listener para el formulario de cambio de contraseña
    document.getElementById("change-password-form").addEventListener("submit", async (e) => {
      e.preventDefault()

      const currentPassword = document.getElementById("current-password").value
      const newPassword = document.getElementById("new-password").value
      const confirmPassword = document.getElementById("confirm-password").value

      if (newPassword !== confirmPassword) {
        alert("Las contraseñas nuevas no coinciden")
        return
      }

      try {
        // Actualizamos la contraseña directamente
        const { data, error } = await supabase
          .from("usuarios")
          .update({ password: newPassword })
          .eq("email", usuario.email)
          .select()

        if (error) throw error

        console.log("Contraseña actualizada:", data)
        alert("¡Contraseña actualizada con éxito!")
        closeModal()
        document.getElementById("change-password-form").reset()
      } catch (error) {
        console.error("Error en la actualización:", error)
        alert("Error al actualizar la contraseña: " + error.message)
      }
    })

    // Event listener para cerrar sesión
    document.getElementById("logout-btn").addEventListener("click", (e) => {
      e.preventDefault()
      localStorage.removeItem("usuario")
      window.location.reload()
    })
  }

  // Función para mostrar/ocultar contraseña
  window.togglePassword = (inputId) => {
    const input = document.getElementById(inputId)
    input.type = input.type === "password" ? "text" : "password"
  }

  function closeModal() {
    passwordModal.style.display = "none"
  }
})

