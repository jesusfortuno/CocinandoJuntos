// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);
  async function agregarAFavoritos(recetaId) {
      return new Promise(async (resolve, reject) => {
          try {
              const usuarioGuardado = localStorage.getItem("usuario");

              if (!usuarioGuardado) {
                  alert("Debes iniciar sesión para guardar recetas en favoritos");
                  window.location.href = "/login.html";
                  reject(false);
                  return;
              }

              const usuario = JSON.parse(usuarioGuardado);

              // Verificar que tengamos un ID de usuario válido
              if (!usuario.id) {
                  console.error("ID de usuario no encontrado");
                  alert("Error: Usuario no identificado correctamente");
                  reject(false);
                  return;
              }

              console.log("Intentando guardar favorito:");
              console.log("Usuario ID:", usuario.id);
              console.log("Receta ID:", recetaId);

              // Verificar si ya existe el favorito
              const { data: existentes, error: checkError } = await supabase
                  .from("favoritos")
                  .select("*")
                  .eq("usuario_id", usuario.id)
                  .eq("receta_id", parseInt(recetaId));

              console.log("Favoritos existentes:", existentes);
              console.log("Error de verificación:", checkError);

              if (checkError) {
                  console.error("Error al verificar favoritos:", checkError);
                  reject(false);
                  return;
              }

              if (existentes && existentes.length > 0) {
                  console.log("Receta ya existe en favoritos:", existentes);
                  alert("Esta receta ya está en tus favoritos");
                  reject(false);
                  return;
              }

              // Si no existe, insertar nuevo favorito
              const { error, data } = await supabase
                  .from("favoritos")
                  .insert({
                      usuario_id: usuario.id,
                      receta_id: parseInt(recetaId),
                      fecha_guardado: new Date().toISOString()
                  });

              console.log("Resultado de inserción:", data);
              console.log("Error de inserción:", error);

              if (error) {
                  console.error("Error al guardar:", error);
                  alert("Error al guardar en favoritos");
                  reject(false);
                  return;
              }

              console.log("Favorito guardado exitosamente");
              alert("¡Receta guardada en favoritos!");
              resolve(true);

          } catch (error) {
              console.error("Error inesperado:", error);
              alert("Error inesperado al guardar en favoritos");
              reject(false);
          }
      });
  }

  // Manejo del botón de añadir a favoritos
  document.addEventListener('DOMContentLoaded', function() {
      const favButtons = document.querySelectorAll(".favorite-btn");

      favButtons.forEach(favButton => {
          // Desactivar el botón después de un clic para prevenir múltiples envíos
          favButton.addEventListener("click", async function (event) {
              // Prevenir acciones por defecto
              event.preventDefault();
            
              // Desactivar el botón inmediatamente
              this.disabled = true;
            
              const recetaId = this.getAttribute("data-receta-id");

              console.log("Botón de favoritos clickeado");
              console.log("Receta ID:", recetaId);

              try {
                  const resultado = await agregarAFavoritos(recetaId);

                  if (resultado) {
                      this.classList.add('favorito-activo');
                      this.textContent = '❤️ En Favoritos';
                  }
              } catch (error) {
                  console.error("Error al añadir a favoritos:", error);
              } finally {
                  // Reactivar el botón
                  this.disabled = false;
              }
          }, { once: true }); // Asegura que el evento solo se ejecute una vez
      });
  });