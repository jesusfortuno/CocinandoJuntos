// 💡 Configurar Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

// 💡 Manejo del botón de añadir a favoritos
document.querySelector(".favorite-btn").addEventListener("click", async function () {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const recetaId = this.getAttribute("data-receta-id");

    if (!usuario) {
        alert("Debes iniciar sesión para añadir a favoritos.");
        return;
    }

    try {
        const { error } = await supabase
            .from("favoritos")
            .insert([
                { usuario_id: usuario.id, receta_id: recetaId, fecha_guardado: new Date() }
            ]);

        if (error) {
            console.error("Error al añadir a favoritos:", error);
            alert("Error al añadir a favoritos. Puede que ya esté en favoritos.");
        } else {
            alert("Receta añadida a favoritos correctamente.");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Error de conexión. Intenta más tarde.");
    }
});