// Configurar Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU";
//const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);
const supabase = window.supabase.createClient(SUPABASE_URL, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODY4MjI1OCwiZXhwIjoyMDU0MjU4MjU4fQ.k7efL1qWYCqZQlNF2GUOxq8pNWJsvkq9YPulgGb3Inc");


document.getElementById("change-password-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const securityQuestion = document.getElementById("security-question").value;
    const securityAnswer = document.getElementById("security-answer").value.trim();
    const newPassword = document.getElementById("new-password").value;

    try {
        console.log("🔍 Buscando usuario con email:", email);

        // 🔹 1️⃣ Buscar usuario por email
        const { data, error } = await supabase
            .from("usuarios")
            .select("email, security_question, security_answer")
            .eq("email", email)
            .single();

        if (error || !data) {
            console.error("❌ Error buscando usuario:", error);
            alert("❌ Correo no encontrado en la base de datos.");
            return;
        }

        console.log("✅ Usuario encontrado:", data);

        // 🔹 2️⃣ Verificar la pregunta y respuesta de seguridad
        if (data.security_question !== securityQuestion || data.security_answer !== securityAnswer) {
            alert("❌ La pregunta o respuesta de seguridad es incorrecta.");
            return;
        }

        console.log("🔄 Intentando actualizar la contraseña...");

        const { data: updateData, error: updateError } = await supabase
            .from("usuarios")
            .update({ password: newPassword })  // Asegúrate de que el campo se llama "password"
            .eq("email", email)
            .select();

        console.log("📡 Petición enviada a Supabase");

        // 🔹 Verificar si hubo error
        if (updateError) {
            console.error("❌ Error al actualizar contraseña:", updateError);
            alert("❌ No se pudo cambiar la contraseña.");
            return;
        }

        console.log("✅ Contraseña actualizada en Supabase:", updateData);
        alert("✅ ¡Contraseña cambiada! Ahora puedes iniciar sesión.");
        window.location.href = "login.html";


    } catch (error) {
        console.error("❌ Error inesperado:", error);
        alert("❌ Ocurrió un error. Intenta más tarde.");
    }
});
