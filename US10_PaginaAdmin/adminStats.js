// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)

// Función para obtener estadísticas
async function obtenerEstadisticas() {
  try {
    // Obtener total de recetas
    const { data: recetas, error: errorRecetas } = await supabase.from("recetas").select("*")

    if (errorRecetas) {
      console.error("Error al obtener recetas:", errorRecetas)
      throw errorRecetas
    }

    console.log("Recetas encontradas:", recetas)

    // Obtener total de usuarios
    const { count: totalUsuarios, error: errorUsuarios } = await supabase
      .from("usuarios")
      .select("*", { count: "exact", head: true })

    if (errorUsuarios) {
      console.error("Error al obtener usuarios:", errorUsuarios)
      throw errorUsuarios
    }

    // Obtener total de comentarios
    const { count: totalComentarios, error: errorComentarios } = await supabase
      .from("comentarios")
      .select("*", { count: "exact", head: true })

    if (errorComentarios) {
      console.error("Error al obtener comentarios:", errorComentarios)
      throw errorComentarios
    }

    // Actualizar los elementos en el DOM
    const totalRecetasElement = document.getElementById("total-recetas")
    const totalUsuariosElement = document.getElementById("total-usuarios")
    const totalComentariosElement = document.getElementById("total-comentarios")

    if (totalRecetasElement) totalRecetasElement.textContent = recetas ? recetas.length : 0
    if (totalUsuariosElement) totalUsuariosElement.textContent = totalUsuarios || 0
    if (totalComentariosElement) totalComentariosElement.textContent = totalComentarios || 0
  } catch (error) {
    console.error("Error al obtener estadísticas:", error)
    const totalRecetasElement = document.getElementById("total-recetas")
    const totalUsuariosElement = document.getElementById("total-usuarios")
    const totalComentariosElement = document.getElementById("total-comentarios")

    if (totalRecetasElement) totalRecetasElement.textContent = "0"
    if (totalUsuariosElement) totalUsuariosElement.textContent = "0"
    if (totalComentariosElement) totalComentariosElement.textContent = "0"
  }
}

// Cargar estadísticas cuando el documento esté listo
document.addEventListener("DOMContentLoaded", () => {
  obtenerEstadisticas()
})
