// 💡 Configurar Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

// 💡 Manejo del formulario de login
document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const { data: usuario, error } = await supabase
        .from("usuarios")
        .select("id, username, email")
        .eq("email", email)
        .eq("password", password)
        .single();

    if (error) {
      console.error("Error:", error.message);
      alert("Error al iniciar sesión. Verifica tus credenciales.");
      return;
    }

    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify({
        id: usuario.id,
        username: usuario.username,
        email: usuario.email
      }));
      alert("¡Inicio de sesión exitoso!");
      window.location.href = "./US1_PantallaInicio/index.html";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error inesperado. Por favor, intenta de nuevo.");
  }
});
