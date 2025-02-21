// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

async function agregarAFavoritos(recetaId) {
    try {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (!usuarioGuardado) {
            alert("Debes iniciar sesión para guardar recetas en favoritos");
            window.location.href = "/login.html";
            return false;
        }

        const usuario = JSON.parse(usuarioGuardado);
        
        // Insertar en favoritos
        const { error } = await supabase
            .from("favoritos")
            .insert({
                usuario_id: usuario.id,
                receta_id: parseInt(recetaId),
                fecha_guardado: new Date().toISOString()
            });

        if (error) {
            if (error.code === '23505') {
                alert("Esta receta ya está en tus favoritos");
            } else {
                console.error("Error al guardar:", error);
                alert("Error al guardar en favoritos");
            }
            return false;
        }

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