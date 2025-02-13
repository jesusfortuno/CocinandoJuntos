// 💡 Primero carga el cliente de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU";

// 💡 Luego crea el cliente de Supabase (antes de usarlo)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

document.getElementById("register-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const securityQuestion = document.getElementById("security-question").value;
  const securityAnswer = document.getElementById("security-answer").value;

  try {
    // 💡 Insertar los datos en Supabase
    const { data, error } = await supabase.from("usuarios").insert([
      {
        username,
        email,
        password, // Recuerda cifrarla antes de guardarla
        security_question: securityQuestion,
        security_answer: securityAnswer
      }
    ]);

    if (error) {
      console.error("Error al insertar datos:", error);
      alert("Error al registrar usuario.");
    } else {
      alert("¡Registro exitoso!");
      window.location.href = "./US1_PantallaInicio/index.html";
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert("Error de conexión. Intenta más tarde.");
  }
});
