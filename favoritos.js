import { supabase } from "./supabaseConfig.js";

async function agregarAFavoritos(recetaId) {
    try {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (!usuarioGuardado) {
            alert("Debes iniciar sesión para guardar recetas en favoritos");
            window.location.href = "/login.html";
            return false;
        }

        const usuario = JSON.parse(usuarioGuardado);
        
        // Verificar que tengamos un ID de usuario válido
        if (!usuario.id) {
            console.error("ID de usuario no encontrado");
            alert("Error: Usuario no identificado correctamente");
            return false;
        }

        console.log("Intentando guardar favorito para usuario:", usuario.id);

        // Verificar si ya existe el favorito
        const { data: existente } = await supabase
            .from("favoritos")
            .select("id")
            .eq("usuario_id", usuario.id)
            .eq("receta_id", parseInt(recetaId))
            .maybeSingle();

        if (existente) {
            alert("Esta receta ya está en tus favoritos");
            return false;
        }

        // Si no existe, insertar nuevo favorito
        const { error } = await supabase
            .from("favoritos")
            .insert({
                usuario_id: usuario.id,
                receta_id: parseInt(recetaId),
                fecha_guardado: new Date().toISOString()
            });

        if (error) {
            console.error("Error al guardar:", error);
            alert("Error al guardar en favoritos");
            return false;
        }

        console.log("Favorito guardado exitosamente");
        alert("¡Receta guardada en favoritos!");
        return true;

    } catch (error) {
        console.error("Error inesperado:", error);
        alert("Error inesperado al guardar en favoritos");
        return false;
    }
}

// Manejo del botón de añadir a favoritos
document.addEventListener('DOMContentLoaded', function() {
    const favButton = document.querySelector(".favorite-btn");
    if (favButton) {
        favButton.addEventListener("click", async function () {
            const recetaId = this.getAttribute("data-receta-id");
            const resultado = await agregarAFavoritos(recetaId);
            if (resultado) {
                this.classList.add('favorito-activo');
                this.textContent = '❤️ En Favoritos';
            }
        });
    }
});