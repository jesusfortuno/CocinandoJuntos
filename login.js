// Primero importa el método createClient de Supabase
const { createClient } = supabase;

// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Obtén el formulario de inicio de sesión
const loginForm = document.getElementById("login-form");

// Agrega un listener al evento submit del formulario
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Obtén los valores de los campos email y contraseña
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Realiza el inicio de sesión usando Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("Error al iniciar sesión: " + error.message);
    } else {
      alert("Inicio de sesión exitoso");
      // Redirige al usuario a la página de inicio
      window.location.href = "inicio.html";
    }
  } catch (err) {
    console.error("Error:", err.message);
    alert("Error inesperado, intenta nuevamente.");
  }
});
