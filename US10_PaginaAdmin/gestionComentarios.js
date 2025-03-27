// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

// Elementos del DOM
const commentsTableBody = document.getElementById("comments-table-body");
const totalComentariosElement = document.getElementById("total-comentarios");

// Obtener usuario del localStorage
function getUsuario() {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
        window.location.href = "../login.html";
        return null;
    }
    return JSON.parse(usuario);
}

// Cargar comentarios y actualizar contador
async function cargarComentarios() {
    try {
        const { data: comentarios, error, count } = await supabase
            .from("comentarios")
            .select("*", { count: 'exact' })
            .order("fecha_comentario", { ascending: false });

        if (error) throw error;

        // Actualizar el contador de comentarios en el panel de administración si existe
        if (totalComentariosElement) {
            totalComentariosElement.textContent = count || 0;
        }

        commentsTableBody.innerHTML = "";

        if (!comentarios || comentarios.length === 0) {
            commentsTableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center">No hay comentarios disponibles</td>
                </tr>
            `;
            return;
        }

        comentarios.forEach((comentario) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="checkbox" class="comment-checkbox" data-id="${comentario.id_comentario}"></td>
                <td>${comentario.id_comentario}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="./../US1_PantallaInicio/Imagenes/blank-profile-picture-973460_1280.webp" alt="User" style="width: 30px; height: 30px; border-radius: 50%;">
                        <span>${comentario.id_usuario || "Usuario"}</span>
                    </div>
                </td>
                <td>${comentario.id_receta || "Receta"}</td>
                <td>${comentario.comentario || ""}</td>
                <td>${new Date(comentario.fecha_comentario).toLocaleDateString() || ""}</td>
                <td><span class="badge badge-${comentario.visible ? "success" : "warning"}">${comentario.visible ? "Aprobado" : "Pendiente"}</span></td>
                <td class="table-actions">
                    ${!comentario.visible ? `
                    <button class="btn btn-success btn-sm approve-comment" data-id="${comentario.id_comentario}">
                        <i class="fas fa-check"></i> Aprobar
                    </button>` : ''}
                    <button class="btn btn-info btn-sm view-comment" data-id="${comentario.id_comentario}">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    <button class="btn btn-danger btn-sm delete-comment" data-id="${comentario.id_comentario}">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </td>
            `;
            commentsTableBody.appendChild(row);
        });

        // Añadir event listeners a los botones después de crear las filas
        document.querySelectorAll(".view-comment").forEach(btn => {
            btn.addEventListener("click", function() {
                const commentId = this.getAttribute("data-id");
                verComentario(commentId, comentarios);
            });
        });

        document.querySelectorAll(".approve-comment").forEach(btn => {
            btn.addEventListener("click", function() {
                const commentId = this.getAttribute("data-id");
                cambiarVisibilidad(commentId, true);
            });
        });

        document.querySelectorAll(".delete-comment").forEach(btn => {
            btn.addEventListener("click", function() {
                const commentId = this.getAttribute("data-id");
                eliminarComentario(commentId);
            });
        });

    } catch (error) {
        console.error("Error al cargar comentarios:", error);
        alert("Error al cargar los comentarios: " + error.message);
    }
}

// Ver detalle del comentario
function verComentario(id, comentarios) {
    const comentario = comentarios.find(c => c.id_comentario == id);
    if (!comentario) return;

    document.getElementById("comment-user").textContent = comentario.id_usuario || "Usuario";
    document.getElementById("comment-recipe").textContent = comentario.id_receta || "Receta";
    document.getElementById("comment-text").textContent = comentario.comentario || "";
    document.getElementById("comment-date").textContent = new Date(comentario.fecha_comentario).toLocaleDateString() || "";
    document.getElementById("comment-status").textContent = comentario.visible ? "Aprobado" : "Pendiente";
    
    // Mostrar/ocultar botón de aprobar según el estado
    document.getElementById("approve-comment-btn").style.display = comentario.visible ? "none" : "inline-block";
    
    // Guardar el ID del comentario actual para las acciones del modal
    document.getElementById("approve-comment-btn").setAttribute("data-id", id);
    document.getElementById("delete-comment-btn").setAttribute("data-id", id);
    
    document.getElementById("comment-modal").style.display = "block";
}

// Cambiar visibilidad del comentario
async function cambiarVisibilidad(id, visible) {
    try {
        if (visible && !confirm("¿Estás seguro de que deseas aprobar este comentario?")) return;

        const { error } = await supabase.from("comentarios").update({ visible }).eq("id_comentario", id);
        if (error) throw error;
        
        await cargarComentarios();
        document.getElementById("comment-modal").style.display = "none";
        alert(`Comentario ${visible ? "aprobado" : "ocultado"} con éxito`);
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
        document.getElementById("comment-modal").style.display = "none";
        alert("Comentario eliminado con éxito");
    } catch (error) {
        console.error("Error al eliminar comentario:", error);
        alert("Error al eliminar el comentario: " + error.message);
    }
}

// Aprobar todos los comentarios seleccionados
async function aprobarSeleccionados() {
    try {
        const checkboxes = document.querySelectorAll(".comment-checkbox:checked");
        if (checkboxes.length === 0) {
            alert("No hay comentarios seleccionados");
            return;
        }
        
        if (!confirm(`¿Estás seguro de que deseas aprobar ${checkboxes.length} comentarios?`)) return;
        
        const ids = Array.from(checkboxes).map(cb => cb.getAttribute("data-id"));
        
        const { error } = await supabase
            .from("comentarios")
            .update({ visible: true })
            .in("id_comentario", ids);
            
        if (error) throw error;
        
        await cargarComentarios();
        alert("Comentarios aprobados con éxito");
    } catch (error) {
        console.error("Error al aprobar comentarios:", error);
        alert("Error al aprobar los comentarios: " + error.message);
    }
}

// Eliminar todos los comentarios seleccionados
async function eliminarSeleccionados() {
    try {
        const checkboxes = document.querySelectorAll(".comment-checkbox:checked");
        if (checkboxes.length === 0) {
            alert("No hay comentarios seleccionados");
            return;
        }
        
        if (!confirm(`¿Estás seguro de que deseas eliminar ${checkboxes.length} comentarios?`)) return;
        
        const ids = Array.from(checkboxes).map(cb => cb.getAttribute("data-id"));
        
        const { error } = await supabase
            .from("comentarios")
            .delete()
            .in("id_comentario", ids);
            
        if (error) throw error;
        
        await cargarComentarios();
        alert("Comentarios eliminados con éxito");
    } catch (error) {
        console.error("Error al eliminar comentarios:", error);
        alert("Error al eliminar los comentarios: " + error.message);
    }
}

// Obtener total de comentarios para el panel de administración
async function obtenerTotalComentarios() {
    try {
        const { count, error } = await supabase
            .from("comentarios")
            .select("*", { count: 'exact', head: true });

        if (error) throw error;
        
        // Actualizar el contador en el panel de administración si existe
        if (totalComentariosElement) {
            totalComentariosElement.textContent = count || 0;
        }
        
        return count || 0;
    } catch (error) {
        console.error("Error al obtener total de comentarios:", error);
        return 0;
    }
}

// Inicializar la aplicación
function inicializar() {
    const usuario = getUsuario();
    if (usuario) {
        document.getElementById("user-info").style.display = "flex";
        document.getElementById("user-name").textContent = usuario.username || usuario.email || "Usuario";
        document.getElementById("sidebar-admin-name").textContent = usuario.username || usuario.email || "Usuario";
        
        // Cargar comentarios si estamos en la página de gestión
        if (commentsTableBody) {
            cargarComentarios();
            
            // Configurar eventos para acciones por lotes
            document.getElementById("approve-all-btn").addEventListener("click", aprobarSeleccionados);
            document.getElementById("delete-all-btn").addEventListener("click", eliminarSeleccionados);
        } else {
            // Si estamos en otra página (como el dashboard), solo obtener el total
            obtenerTotalComentarios();
        }
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", inicializar);