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
    // 💡 Buscar usuario por email
    const { data, error } = await supabase
      .from("usuarios")
      .select("email, password") // Asegúrate de que la columna 'password' esté guardada de manera segura (hash)
      .eq("email", email)
      .single();

    if (error) {
      console.error("Error al buscar usuario:", error);
      alert("Error al iniciar sesión. Verifica tus credenciales.");
      return;
    }

    // 💡 Verificar contraseña
    if (data) {
      if (data.password === password) {
        // Obtener información completa del usuario
        const { data: userData, error: userError } = await supabase
          .from("usuarios")
          .select("*")
          .eq("email", email)
          .single();
        
        if (!userError) {
          // Guardamos el username en lugar del nombre
          const userToStore = {
            username: userData.username,  // cambiado de nombre a username
            email: userData.email,
            // otros campos que quieras guardar
          };
          localStorage.setItem("usuario", JSON.stringify(userToStore));
          alert("¡Inicio de sesión exitoso!");
          window.location.href = "./US1_PantallaInicio/index.html";
        }
      } else {
        alert("Correo o contraseña incorrectos.");
      }
    } else {
      alert("Usuario no encontrado.");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert("Error de conexión. Intenta más tarde.");
  }
});
