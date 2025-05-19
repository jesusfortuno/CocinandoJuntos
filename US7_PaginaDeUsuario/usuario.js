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

          // Intentar eliminar con una consulta más simple
          const { error } = await supabase
            .from("favoritos")
            .delete()
            .eq("receta_id", recetaId)
            .eq("usuario_id", usuario.id)

          if (error) {
            console.error("Error al eliminar de favoritos:", error)
            throw error
          }

          // Eliminar visualmente de la página
          const recetaElemento = document.querySelector(`.recipe[data-receta-id="${recetaId}"]`)
          if (recetaElemento) {
            recetaElemento.remove()
          }

          console.log("Receta eliminada correctamente")
          alert("Receta eliminada de favoritos")
          return true
        } catch (error) {
          console.error("Error inesperado:", error)
          alert("Error al eliminar la receta de favoritos: " + error.message)
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
        // Si la valoración es nula o 0, no mostrar estrellas
        if (!valoracion) {
          return ""
        }

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

        // Generar estrellas solo si hay valoración
        const estrellas = generarEstrellas(c.valoracion)
        const valoracionHTML = c.valoracion
          ? `<div class="valoracion">
            <span class="estrellas">${estrellas}</span>
            <span class="valor">${c.valoracion}/5</span>
          </div>`
          : ""

        const comentarioElement = document.createElement("div")
        comentarioElement.classList.add("comentario-item")
        comentarioElement.setAttribute("data-comentario-id", c.id_comentario)

        comentarioElement.innerHTML = `
          <div class="comentario-header">
            <span class="nombre-receta" onclick="irAReceta(${c.id_receta}, '${nombreReceta}')">${nombreReceta}</span>
            ${valoracionHTML}
          </div>
          <p class="comentario-texto">${c.comentario || "Sin comentario"}</p>
          <p class="comentario-fecha">${fechaFormateada}</p>
          <div class="comentario-actions">
            <button onclick="eliminarComentario(${c.id_comentario})" class="delete-comment-btn">
              Eliminar
            </button>
          </div>
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
    const changePasswordBtns = document.querySelectorAll(".primary-btn, .cambiar-contrasena-btn")
    changePasswordBtns.forEach((btn) => {
      if (btn.textContent.includes("Cambiar Contraseña") || btn.classList.contains("cambiar-contrasena-btn")) {
        btn.addEventListener("click", () => {
          // Cerrar el modal de edición de perfil si está abierto
          if (profileModal) {
            profileModal.style.display = "none"
          }

          // Abrir el modal de cambio de contraseña
          passwordModal.style.display = "flex"
        })
      }
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

  // Mover la función eliminarComentario al scope global
  window.eliminarComentario = async (idComentario) => {
    try {
      const confirmacion = confirm("¿Estás seguro de que deseas eliminar este comentario?")
      if (!confirmacion) return

      const { error } = await supabase.from("comentarios").delete().eq("id_comentario", idComentario)

      if (error) {
        throw error
      }

      // Eliminar el comentario del DOM
      const comentarioElement = document.querySelector(`[data-comentario-id="${idComentario}"]`)
      if (comentarioElement) {
        comentarioElement.remove()
      }

      alert("Comentario eliminado con éxito")
    } catch (error) {
      console.error("Error al eliminar el comentario:", error)
      alert("Error al eliminar el comentario")
    }
  }

  // Función para ir a la receta al hacer clic en el comentario
  window.irAReceta = (recetaId, titulo) => {
    const recetaUrl = `../US6_GuardarRecetas/${titulo.toLowerCase().replace(/\s+/g, "-")}.html?id=${recetaId}`
    window.location.href = recetaUrl
  }

  // Referencias a los nuevos elementos
  const editProfileBtn = document.getElementById("edit-profile-btn")
  const profileModal = document.getElementById("profile-modal")
  const editProfileForm = document.getElementById("edit-profile-form")
  const profileUpload = document.getElementById("profile-upload")

  // Función para cerrar el modal de edición de perfil
  window.closeProfileModal = () => {
    profileModal.style.display = "none"
  }

  if (usuario) {
    // Mostrar el nombre de usuario en el nuevo campo
    document.getElementById("display-username").textContent = usuario.username || "Usuario"

    // Event listener para el botón de editar perfil
    editProfileBtn.addEventListener("click", () => {
      // Cerrar el modal de contraseña si está abierto
      passwordModal.style.display = "none"

      // Abrir el modal de edición de perfil
      document.getElementById("edit-username").value = usuario.username || ""
      profileModal.style.display = "flex"
    })

    // Event listener para el formulario de edición de perfil
    editProfileForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const newUsername = document.getElementById("edit-username").value

      try {
        // Actualizar el nombre de usuario en la base de datos
        const { data, error } = await supabase
          .from("usuarios")
          .update({ username: newUsername })
          .eq("id", usuario.id)
          .select()

        if (error) throw error

        // Actualizar el usuario en localStorage
        usuario.username = newUsername
        localStorage.setItem("usuario", JSON.stringify(usuario))

        // Actualizar la interfaz
        document.getElementById("user-name").textContent = newUsername
        document.getElementById("profile-user-name").textContent = newUsername
        document.getElementById("display-username").textContent = newUsername

        alert("¡Perfil actualizado con éxito!")
        closeProfileModal()
      } catch (error) {
        console.error("Error al actualizar el perfil:", error)
        alert("Error al actualizar el perfil: " + error.message)
      }
    })

    // Event listener para la subida de fotos de perfil
    profileUpload.addEventListener("change", async (e) => {
      const file = e.target.files[0]
      if (!file) return

      try {
        // Crear un nombre único para el archivo
        const fileExt = file.name.split(".").pop()
        const fileName = `${usuario.id}-${Date.now()}.${fileExt}`
        const filePath = `avatars/${fileName}`

        // Subir el archivo a Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file)

        if (uploadError) throw uploadError

        // Obtener la URL pública del archivo
        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(filePath)

        // Actualizar la URL del avatar en la base de datos
        const { data, error } = await supabase
          .from("usuarios")
          .update({ avatar_url: publicUrl })
          .eq("id", usuario.id)
          .select()

        if (error) throw error

        // Actualizar el usuario en localStorage
        usuario.avatar_url = publicUrl
        localStorage.setItem("usuario", JSON.stringify(usuario))

        // Actualizar las imágenes en la interfaz
        document.getElementById("profile-image").src = publicUrl
        document.querySelector(".user-icon").src = publicUrl

        alert("¡Foto de perfil actualizada con éxito!")
      } catch (error) {
        console.error("Error al subir la foto de perfil:", error)
        alert("Error al subir la foto de perfil: " + error.message)
      }
    })
  }

  // Código para cargar la foto de perfil si existe
  if (usuario && usuario.avatar_url) {
    document.getElementById("profile-image").src = usuario.avatar_url
    document.querySelector(".user-icon").src = usuario.avatar_url
  }
})
