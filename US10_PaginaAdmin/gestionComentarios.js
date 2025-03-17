// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

// Elementos del DOM
const commentsTableBody = document.getElementById("comments-table-body");

// Obtener usuario del localStorage
function getUsuario() {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
        window.location.href = "../login.html";
        return null;
    }
    return JSON.parse(usuario);
}

// Cargar comentarios
async function cargarComentarios() {
    try {
        const { data: comentarios, error } = await supabase.from("comentarios").select("*").order("fecha_comentario", { ascending: false });

        if (error) throw error;

        commentsTableBody.innerHTML = "";

        if (!comentarios || comentarios.length === 0) {
            commentsTableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">No hay comentarios disponibles</td>
                </tr>
            `;
            return;
        }

        comentarios.forEach((comentario) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${comentario.id_comentario}</td>
                <td>${comentario.comentario || ""}</td>
                <td>${comentario.id_usuario || ""}</td>
                <td>
                    <input type="checkbox" ${comentario.visible ? "checked" : ""} onchange="cambiarVisibilidad(${comentario.id_comentario}, this.checked)">
                </td>
                <td class="action-buttons">
                    <button class="delete-btn" onclick="eliminarComentario(${comentario.id_comentario})">Eliminar</button>
                </td>
            `;
            commentsTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar comentarios:", error);
        alert("Error al cargar los comentarios: " + error.message);
    }
}

// Cambiar visibilidad del comentario
async function cambiarVisibilidad(id, visible) {
    try {
        const { error } = await supabase.from("comentarios").update({ visible }).eq("id_comentario", id);
        if (error) throw error;
        alert(`Comentario ${visible ? "visible" : "oculto"} con éxito`);
    } catch (error) {
        console.error("Error al cambiar visibilidad:", error);
        alert("Error al cambiar la visibilidad: " + error.message);
    }
}

// Eliminar comentario
async function eliminarComentario(id) {
    try {
        if (!confirm("¿Estás seguro de que quieres eliminar este comentario?")) return;

        const { error } = await supabase.from("comentarios").delete().eq("id_comentario", id);
        if (error) throw error;

        await cargarComentarios();
        alert("Comentario eliminado con éxito");
    } catch (error) {
        console.error("Error al eliminar comentario:", error);
        alert("Error al eliminar el comentario: " + error.message);
    }
}

// Inicializar la aplicación
function inicializar() {
    const usuario = getUsuario();
    if (usuario) {
        document.getElementById("user-info").style.display = "flex";
        document.getElementById("user-name").textContent = usuario.username || usuario.email || "Usuario";
        cargarComentarios();
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", inicializar); 