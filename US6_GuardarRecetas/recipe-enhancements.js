document.addEventListener("DOMContentLoaded", () => {
    // Configuración de Supabase
    const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
    const SUPABASE_API_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)
  
    // 1. Valoración media (junto al título)
    async function cargarValoracionMedia() {
      try {
        const recetaId = obtenerIdReceta()
        if (!recetaId) return
  
        // Obtener todas las valoraciones para esta receta
        const { data: comentarios, error } = await supabase
          .from("comentarios")
          .select("valoracion")
          .eq("id_receta", recetaId)
  
        if (error) throw error
  
        if (comentarios && comentarios.length > 0) {
          // Calcular la valoración media
          const totalValoraciones = comentarios.reduce((sum, comentario) => sum + comentario.valoracion, 0)
          const valoracionMedia = totalValoraciones / comentarios.length
          const numValoraciones = comentarios.length
  
          // Actualizar el elemento HTML
          const ratingElement = document.getElementById("recipeRating")
          if (ratingElement) {
            ratingElement.textContent = `${valoracionMedia.toFixed(1)}/5 (${numValoraciones})`
          }
        } else {
          // No hay valoraciones
          const ratingElement = document.getElementById("recipeRating")
          if (ratingElement) {
            ratingElement.textContent = "0/5 (0)"
          }
        }
      } catch (error) {
        console.error("Error al cargar la valoración media:", error)
      }
    }
  
    // 2. Carrusel de imágenes (miniaturas)
    function inicializarCarrusel() {
      const thumbnails = document.querySelectorAll(".thumbnail")
      const mainImage = document.querySelector(".recipe-photo img")
  
      if (!thumbnails.length || !mainImage) return
  
      // Guardar la imagen original para poder restaurarla
      const originalImageSrc = mainImage.src
  
      // Añadir eventos a las miniaturas
      thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", function () {
          // Actualizar la imagen principal
          const thumbnailImg = this.querySelector("img")
          if (thumbnailImg) {
            mainImage.src = thumbnailImg.src
          }
  
          // Actualizar la clase activa
          thumbnails.forEach((t) => t.classList.remove("active"))
          this.classList.add("active")
        })
      })
    }
  
    // 3. Video de la receta (YouTube)
    function inicializarVideo() {
      // No necesitamos manejar errores para iframes de YouTube
      // YouTube se encarga de mostrar sus propios mensajes de error
      console.log("Video de YouTube cargado correctamente")
    }
  
    // Función auxiliar para obtener el ID de la receta
    function obtenerIdReceta() {
      // Obtener el nombre del archivo actual
      const rutaActual = window.location.pathname
  
      // Mapeo de rutas a IDs
      const mapeoRecetas = {
        "/US6_GuardarRecetas/pollo-agridulce.html": 1,
        "/US6_GuardarRecetas/paella.html": 2,
        "/US6_GuardarRecetas/crepas-dulces.html": 3,
        "/US6_GuardarRecetas/bizcocho-capuccino.html": 4,
        "/US6_GuardarRecetas/arepa-venezolana.html": 5,
        "/US6_GuardarRecetas/galleta-de-sesamo.html": 6,
        "/US6_GuardarRecetas/bollitos-chinos.html": 7,
        "/US6_GuardarRecetas/fideos-salteados.html": 8,
        "/US6_GuardarRecetas/tortilla-de-patatas.html": 9,
      }
  
      // Encontrar el ID correspondiente a la ruta actual
      for (const [ruta, id] of Object.entries(mapeoRecetas)) {
        if (rutaActual.includes(ruta) || rutaActual.endsWith(ruta)) {
          return id
        }
      }
  
      console.error("No se pudo determinar el ID de la receta para la ruta:", rutaActual)
      return null
    }
  
    // Inicializar todas las funcionalidades
    cargarValoracionMedia()
    inicializarCarrusel()
    inicializarVideo()
  })  