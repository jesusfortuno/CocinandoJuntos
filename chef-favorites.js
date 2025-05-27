// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

document.addEventListener("DOMContentLoaded", async () => {
  // Verificar autenticación
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  if (!usuario || usuario.rol !== "chef") {
    window.location.href = "US1_PantallaInicio/index.html"
    return
  }

  // Cargar datos iniciales
  await cargarEstadisticasFavoritos()
  await cargarFavoritos()

  // Configurar filtros
  document.getElementById("favorites-search").addEventListener("input", filtrarFavoritos)
  document.getElementById("culture-filter").addEventListener("change", filtrarFavoritos)
  document.getElementById("difficulty-filter").addEventListener("change", filtrarFavoritos)
  document.getElementById("sort-filter").addEventListener("change", cargarFavoritos)
})

// Función para cargar estadísticas de favoritos
async function cargarEstadisticasFavoritos() {
  const usuario = JSON.parse(localStorage.getItem("usuario"))

  try {
    // Obtener el ID del usuario
    const { data: userData, error: userError } = await supabase
      .from("usuarios")
      .select("id")
      .eq("username", usuario.username)
      .single()

    if (userError) throw userError

    // Obtener conteo total de favoritos
    const { count: totalCount, error: totalError } = await supabase
      .from("favoritos")
      .select("id", { count: "exact", head: true })
      .eq("usuario_id", userData.id)

    if (totalError) throw totalError

    // Obtener favoritos de este mes
    const inicioMes = new Date()
    inicioMes.setDate(1)
    inicioMes.setHours(0, 0, 0, 0)

    const { count: monthlyCount, error: monthlyError } = await supabase
      .from("favoritos")
      .select("id", { count: "exact", head: true })
      .eq("usuario_id", userData.id)
      .gte("fecha_favorito", inicioMes.toISOString())

    if (monthlyError) throw monthlyError

    // Obtener culturas únicas de favoritos
    const { data: favoritesData, error: favoritesError } = await supabase
      .from("favoritos")
      .select(`
                recetas:receta_id (Cultura)
            `)
      .eq("usuario_id", userData.id)

    if (favoritesError) throw favoritesError

    const culturas = new Set()
    favoritesData.forEach((fav) => {
      if (fav.recetas?.Cultura) {
        culturas.add(fav.recetas.Cultura)
      }
    })

    // Actualizar estadísticas
    document.getElementById("total-favorites").textContent = totalCount || 0
    document.getElementById("monthly-favorites").textContent = monthlyCount || 0
    document.getElementById("favorite-cultures").textContent = culturas.size || 0
  } catch (error) {
    console.error("Error al cargar estadísticas:", error)
  }
}

// Función para cargar favoritos
async function cargarFavoritos() {
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const favoritesList = document.getElementById("favorites-list")
  const sortOrder = document.getElementById("sort-filter").value

  try {
    // Obtener el ID del usuario
    const { data: userData, error: userError } = await supabase
      .from("usuarios")
      .select("id")
      .eq("username", usuario.username)
      .single()

    if (userError) throw userError

    // Obtener favoritos con información de las recetas
    let query = supabase
      .from("favoritos")
      .select(`
                id,
                fecha_favorito,
                recetas:receta_id (
                    id,
                    titulo,
                    descripcion,
                    dificultad,
                    tiempo,
                    categoria,
                    Cultura,
                    imagen,
                    usuarios:usuario_id (username)
                )
            `)
      .eq("usuario_id", userData.id)

    // Aplicar ordenamiento
    switch (sortOrder) {
      case "oldest":
        query = query.order("fecha_favorito", { ascending: true })
        break
      case "title":
        query = query.order("recetas(titulo)", { ascending: true })
        break
      default: // newest
        query = query.order("fecha_favorito", { ascending: false })
    }

    const { data: favorites, error: favoritesError } = await query

    if (favoritesError) throw favoritesError

    // Limpiar contenedor
    favoritesList.innerHTML = ""

    if (favorites.length === 0) {
      favoritesList.innerHTML = `
                <div class="no-favorites">
                    <i class="fas fa-heart-broken"></i>
                    <p>Aún no tienes recetas favoritas.</p>
                    <p><a href="US1_PantallaInicio/index.html" style="color: #6b4423;">Explora recetas</a> y marca las que más te gusten.</p>
                </div>
            `
      return
    }

    // Mostrar favoritos
    favorites.forEach((favorite) => {
      if (!favorite.recetas) return

      const recipe = favorite.recetas
      const favoriteCard = document.createElement("div")
      favoriteCard.className = "favorite-card"
      favoriteCard.setAttribute("data-culture", recipe.Cultura || "")
      favoriteCard.setAttribute("data-difficulty", recipe.dificultad || "")
      favoriteCard.setAttribute("data-title", recipe.titulo?.toLowerCase() || "")

      const imagenUrl = recipe.imagen || obtenerImagenPredeterminada(recipe.Cultura)
      const fechaFavorito = new Date(favorite.fecha_favorito).toLocaleDateString("es-ES")

      favoriteCard.innerHTML = `
                <img src="${imagenUrl}" alt="${recipe.titulo}" class="favorite-image">
                <div class="favorite-content">
                    <h3 class="favorite-title">${recipe.titulo}</h3>
                    <div class="favorite-meta">
                        <span><i class="fas fa-user"></i> ${recipe.usuarios?.username || "Chef desconocido"}</span>
                        <span><i class="fas fa-chart-line"></i> ${recipe.dificultad}</span>
                        <span><i class="far fa-clock"></i> ${recipe.tiempo}</span>
                    </div>
                    <div class="favorite-meta">
                        <span><i class="fas fa-utensils"></i> ${recipe.categoria}</span>
                        <span><i class="fas fa-globe-americas"></i> ${recipe.Cultura}</span>
                    </div>
                    <p class="favorite-description">${recipe.descripcion}</p>
                    <div class="favorite-date">Añadido a favoritos: ${fechaFavorito}</div>
                    <div class="favorite-actions">
                        <a href="Platos.html?id=${recipe.id}" class="favorite-btn view-btn">
                            <i class="fas fa-eye"></i> Ver Receta
                        </a>
                        <button class="favorite-btn remove-btn" data-id="${favorite.id}">
                            <i class="fas fa-heart-broken"></i> Quitar
                        </button>
                    </div>
                </div>
            `

      favoritesList.appendChild(favoriteCard)

      // Agregar evento al botón de quitar
      favoriteCard.querySelector(".remove-btn").addEventListener("click", () => {
        quitarDeFavoritos(favorite.id)
      })
    })
  } catch (error) {
    console.error("Error al cargar favoritos:", error)
    favoritesList.innerHTML = `
            <div class="no-favorites">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar los favoritos. Por favor, intenta de nuevo.</p>
            </div>
        `
  }
}

// Función para filtrar favoritos
function filtrarFavoritos() {
  const searchTerm = document.getElementById("favorites-search").value.toLowerCase()
  const cultureFilter = document.getElementById("culture-filter").value
  const difficultyFilter = document.getElementById("difficulty-filter").value
  const favoriteCards = document.querySelectorAll(".favorite-card")

  favoriteCards.forEach((card) => {
    const title = card.getAttribute("data-title") || ""
    const culture = card.getAttribute("data-culture") || ""
    const difficulty = card.getAttribute("data-difficulty") || ""

    const matchesSearch = title.includes(searchTerm)
    const matchesCulture = cultureFilter === "all" || culture === cultureFilter
    const matchesDifficulty = difficultyFilter === "all" || difficulty === difficultyFilter

    if (matchesSearch && matchesCulture && matchesDifficulty) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// Función para quitar de favoritos
async function quitarDeFavoritos(favoriteId) {
  if (!confirm("¿Estás seguro de que deseas quitar esta receta de tus favoritos?")) {
    return
  }

  try {
    const { error } = await supabase.from("favoritos").delete().eq("id", favoriteId)

    if (error) throw error

    mostrarNotificacion("Receta quitada de favoritos")
    await cargarFavoritos()
    await cargarEstadisticasFavoritos()
  } catch (error) {
    console.error("Error al quitar de favoritos:", error)
    mostrarNotificacion("Error al quitar de favoritos. Por favor, intenta de nuevo.", "error")
  }
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje, tipo = "success") {
  const notification = document.getElementById("notification")
  const notificationMessage = document.getElementById("notification-message")

  notificationMessage.textContent = mensaje

  if (tipo === "error") {
    notification.querySelector(".notification-content").style.backgroundColor = "#e74c3c"
    notification.querySelector("i").className = "fas fa-exclamation-circle"
  } else {
    notification.querySelector(".notification-content").style.backgroundColor = "#4caf50"
    notification.querySelector("i").className = "fas fa-check-circle"
  }

  notification.style.display = "block"

  setTimeout(() => {
    notification.style.display = "none"
  }, 3000)
}

// Función para obtener imagen predeterminada
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
