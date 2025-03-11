import { supabase } from "./supabaseClient"

async function fetchComentariosValoraciones(userId) {
  try {
    console.log("Buscando comentarios y valoraciones para usuario:", userId)

    // Verificar si el contenedor existe
    const comentariosContainer = document.getElementById("comentarios-valoraciones-container")
    if (!comentariosContainer) {
      console.error("No se encontró el contenedor de comentarios y valoraciones")
      return
    }

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
                recetas:id_receta (
                    id, 
                    titulo
                )
            `)
      .eq("id_usuario", userId)
      .order("fecha_comentario", { ascending: false })

    if (error) {
      console.error("Error en la consulta de comentarios:", error)
      comentariosContainer.innerHTML = "<p>Error al cargar los comentarios y valoraciones</p>"
      return
    }

    // Verificar si hay comentarios
    if (!comentarios || comentarios.length === 0) {
      comentariosContainer.innerHTML = "<p>No has realizado comentarios ni valoraciones</p>"
      return
    }

    // Limpiar el contenedor antes de añadir nuevos comentarios
    comentariosContainer.innerHTML = ""

    // Función para generar estrellas según la valoración
    function generarEstrellas(valoracion) {
      return Array(5)
        .fill("☆")
        .map((star, index) => (index < valoracion ? "★" : "☆"))
        .join("")
    }

    // Función para formatear la fecha
    function formatearFecha(fechaStr) {
      try {
        const fecha = new Date(fechaStr)
        return fecha.toLocaleString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      } catch (error) {
        console.error("Error al formatear la fecha:", error)
        return fechaStr // Devolver la fecha original si hay error
      }
    }

    // Generar HTML para cada comentario
    comentarios.forEach((c) => {
      try {
        const nombreReceta = c.recetas ? c.recetas.titulo : `Receta ID: ${c.id_receta}`
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
      } catch (error) {
        console.error("Error al procesar comentario:", error, c)
      }
    })
  } catch (error) {
    console.error("Error al cargar comentarios y valoraciones:", error)
    const comentariosContainer = document.getElementById("comentarios-valoraciones-container")
    if (comentariosContainer) {
      comentariosContainer.innerHTML = "<p>Error al cargar comentarios y valoraciones</p>"
    }
  }
}

// Asegurarse de que el DOM está cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  if (usuario) {
    // Cargar comentarios y valoraciones
    fetchComentariosValoraciones(usuario.id)
  }
})

