const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co/rest/v1/usuarios";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU";

document.getElementById("register-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const securityQuestion = document.getElementById("security-question").value;
  const securityAnswer = document.getElementById("security-answer").value;

  const data = {
    username: username,
    email: email,
    password: password, // En Supabase deberías almacenar el hash, esto es solo demostrativo
    security_question: securityQuestion,
    security_answer: securityAnswer
  };

  try {
    const response = await fetch(SUPABASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_API_KEY,
        "Authorization": `Bearer ${SUPABASE_API_KEY}`,
        "Prefer": "return=representation"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("¡Registro exitoso!");
      window.location.href = "inicio.html";
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
      alert("Error al registrar usuario. Verifica los datos.");
    }
  } catch (error) {
    console.error("Error de red:", error);
    alert("Error de conexión. Intenta de nuevo más tarde.");
  }
});
