// Función para generar un nombre de archivo a partir del título de la receta
function generarNombreArchivo(titulo) {
    return titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
      .replace(/[^\w\s]/g, "") // Eliminar caracteres especiales
      .replace(/\s+/g, "-") // Reemplazar espacios con guiones
      .substring(0, 50) // Limitar longitud
  }
  
  // Función para generar el HTML de la receta
  function generarHTMLReceta(receta) {
    // Generar lista de ingredientes
    const ingredientesHTML = receta.ingredientes
      .split("\n")
      .map((ingrediente) => `<li>${ingrediente.trim()}</li>`)
      .join("\n                    ")
  
    // Generar lista de pasos
    const pasosHTML = receta.pasos
      .split("\n")
      .map((paso, index) => `<li>${paso.trim()}</li>`)
      .join("\n                    ")
  
    // Determinar la cultura para el breadcrumb (usando el campo con C mayúscula)
    const culturaBreadcrumb = receta.Cultura || "Otras Culturas"
  
    // Determinar la categoría para el breadcrumb como respaldo
    let categoriaBreadcrumb = receta.categoria || "Platos Principales"
    if (receta.categoria === "Postre") categoriaBreadcrumb = "Postres"
    if (receta.categoria === "Entrante") categoriaBreadcrumb = "Entrantes"
    if (receta.categoria === "Desayuno") categoriaBreadcrumb = "Desayunos"
    if (receta.categoria === "Merienda") categoriaBreadcrumb = "Meriendas"
    if (receta.categoria === "Cena") categoriaBreadcrumb = "Cenas"
    if (receta.categoria === "Sopa") categoriaBreadcrumb = "Sopas"
    if (receta.categoria === "Ensalada") categoriaBreadcrumb = "Ensaladas"
  
    // Generar el HTML completo
    return `<!DOCTYPE html>
  <html lang="es">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${receta.titulo} - Cocinando Juntos</title>
      <link rel="stylesheet" href="global.css">
      <link rel="stylesheet" href="../US1_PantallaInicio/styles2.css">
      <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
      <link rel="stylesheet" href="../notification-styles.css">
      <script src="../notification-center.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  </head>
  
  <body>
      <nav>
          <a href="../US1_PantallaInicio/index.html">
              <div class="logo">
                  <img src="../US1_PantallaInicio/Imagenes/logo-cocinando-juntos.png" alt="Logo Cocinando Juntos">
              </div>
          </a>
          <input type="text" class="search-bar" placeholder="Buscar recetas...">
  
          <div id="user-info" class="user-info" style="display: none;">
              <img src="../US1_PantallaInicio/Imagenes/blank-profile-picture-973460_1280.webp" alt="User Icon"
                  class="user-icon">
              <a href="../US7_PaginaDeUsuario/usuario.html"><span id="user-name">Nombre del Usuario</span></a>
              <a href="#" id="logout-btn" class="auth-buttons">Cerrar Sesión</a>
          </div>
  
          <a href="../login.html" id="auth-button" class="auth-buttons">Iniciar Sesión</a>
          <div class="menu-icon">☰</div>
      </nav>
  
      <main>
          <div class="breadcrumb">
              <a href="./../US1_PantallaInicio/index.html">Inicio</a> > <a
                  href="./../US1_PantallaInicio/culturas.html">Cultura ${culturaBreadcrumb}</a> > ${receta.titulo}
          </div>
  
          <div class="recipe-title">
              <h1>${receta.titulo} <span class="recipe-rating" id="recipeRating"></span></h1>
          </div>
  
          <div class="recipe-main-content">
              <!-- Columna izquierda: Foto principal y carrusel debajo -->
              <div class="recipe-left-column">
                  <div class="recipe-photo">
                      <a href="../US1_PantallaInicio/Imagenes/placeholder.jpg" target="_blank">
                          <img src="../US1_PantallaInicio/Imagenes/placeholder.jpg" alt="${receta.titulo}"
                              style="aspect-ratio: 1024/576; object-fit: cover;">
                      </a>
                  </div>
  
                  <!-- Carrusel de imágenes debajo de la foto principal -->
                  <div class="image-carousel-container">
                      <div class="image-thumbnails" id="imageThumbnails">
                          <div class="thumbnail active" data-index="0" data-src="../US1_PantallaInicio/Imagenes/placeholder.jpg">
                              <img src="../US1_PantallaInicio/Imagenes/placeholder.jpg" alt="${receta.titulo} 1">
                          </div>
                      </div>
                  </div>
              </div>
  
              <!-- Columna central: Información de la receta -->
              <div class="recipe-center-column">
                  <div class="recipe-info">
                      <div class="recipe-tags">
                          <span class="tag">Dificultad: ${receta.dificultad}</span>
                          <span class="tag">Tiempo: ${receta.tiempo}</span>
                          <span class="tag">Categoría: ${receta.categoria}</span>
                          ${receta.Cultura ? `<span class="tag">Cultura: ${receta.Cultura}</span>` : ""}
                      </div>
  
                      <div class="recipe-actions">
                          <button class="button favorite-btn" data-receta-id="${receta.id}">❤️ Añadir a Favoritos</button>
                          <button class="button rate-btn" id="rateButton">⭐ Valorar</button>
                      </div>
                  </div>
              </div>
  
              <!-- Columna derecha: Video de la receta -->
              <div class="recipe-right-column">
                  <div class="recipe-video">
                      <iframe id="recipeVideo" width="96%" height="223" src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                          title="${receta.titulo}" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen>
                      </iframe>
                  </div>
              </div>
          </div>
  
          <div class="recipe-container">
              <div class="recipe-ingredients">
                  <h2>Ingredientes</h2>
                  <ul>
                      ${ingredientesHTML}
                  </ul>
              </div>
  
              <div class="recipe-steps">
                  <h2>Pasos para la Receta</h2>
                  <ol>
                      ${pasosHTML}
                  </ol>
              </div>
          </div>
  
          <!-- Sección de comentarios -->
          <div id="commentsSection">
              <h3>Deja tu comentario</h3>
              <div id="replyingTo" class="replying-to" style="display: none;"></div>
              <div class="rating" id="ratingStars">
                  <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
              </div>
              <textarea id="commentText" placeholder="Escribe tu comentario aquí..."></textarea>
              <div class="comment-buttons">
                  <button id="submitComment">Publicar</button>
                  <button id="cancelReply" style="display: none;">Cancelar</button>
              </div>
              <div id="commentsList">
                  <p>Cargando comentarios...</p>
              </div>
          </div>
      </main>
  
      <footer>
          <p>© 2025 Cocinando Juntos - Todos los derechos reservados</p>
      </footer>
  
  
      <script type="module" src="../favoritos.js"></script>
      <script type="module" src="../valorar.js"></script>
      <script>
          // Obtener el usuario desde localStorage
          const usuario = JSON.parse(localStorage.getItem("usuario"));
          const userInfo = document.getElementById("user-info");
          const authButton = document.getElementById("auth-button");
          const userName = document.getElementById("user-name");
          const logoutBtn = document.getElementById("logout-btn");
  
          // Mostrar información del usuario si está logueado
          if (usuario) {
              userInfo.style.display = "flex";
              authButton.style.display = "none";
              userName.textContent = usuario.username;
              console.log("ID del usuario:", usuario.id); // Para debug
          } else {
              userInfo.style.display = "none";
              authButton.style.display = "block";
          }
  
          // Manejar el botón de favoritos - usando una función nombrada para evitar duplicados
          const favButton = document.querySelector('.favorite-btn');
          if (favButton) {
              // Remover eventos previos si existen
              favButton.replaceWith(favButton.cloneNode(true));
              const newFavButton = document.querySelector('.favorite-btn');
  
              newFavButton.addEventListener('click', async function favButtonHandler() {
                  if (!usuario) {
                      alert('Debes iniciar sesión para guardar en favoritos');
                      window.location.href = '../login.html';
                      return;
                  }
  
                  // Deshabilitar el botón mientras se procesa
                  this.disabled = true;
  
                  const recetaId = this.getAttribute('data-receta-id');
                  const resultado = await agregarAFavoritos(recetaId);
  
                  if (resultado) {
                      this.classList.add('favorito-activo');
                      this.textContent = ' En Favoritos';
                  }
  
                  // Rehabilitar el botón
                  this.disabled = false;
              });
          }
  
          // Manejar el cierre de sesión
          logoutBtn.addEventListener('click', function (e) {
              e.preventDefault();
              localStorage.removeItem('usuario');
              window.location.href = '../login.html';
          });
  
          // Ensure all carousel images have the same aspect ratio and are clickable
          document.addEventListener('DOMContentLoaded', function () {
              const mainImageContainer = document.querySelector('.recipe-photo');
              const mainImage = mainImageContainer.querySelector('img');
              const thumbnails = document.querySelectorAll('.thumbnail');
  
              // Set aspect ratio for all images
              const allImages = document.querySelectorAll('.recipe-photo img, .thumbnail img');
              allImages.forEach(img => {
                  img.style.aspectRatio = '1024/576';
                  img.style.objectFit = 'cover';
              });
  
              // Handle thumbnail clicks
              thumbnails.forEach(thumbnail => {
                  thumbnail.addEventListener('click', function () {
                      // Update active state
                      thumbnails.forEach(t => t.classList.remove('active'));
                      this.classList.add('active');
  
                      // Get image source
                      const imgSrc = this.getAttribute('data-src');
  
                      // Update main image
                      mainImage.src = imgSrc;
  
                      // Update link href
                      const mainImageLink = mainImageContainer.querySelector('a');
                      mainImageLink.href = imgSrc;
                  });
              });
          });
      </script>
  </body>
  </html>`
  }
  
  // Función para descargar el HTML como archivo
  function descargarArchivoHTML(nombreArchivo, contenidoHTML) {
    // Crear un objeto Blob con el contenido HTML
    const blob = new Blob([contenidoHTML], { type: "text/html" })
  
    // Crear un enlace para descargar el archivo
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${nombreArchivo}.html`
  
    // Añadir el enlace al documento, hacer clic en él y luego eliminarlo
    document.body.appendChild(a)
    a.click()
  
    // Limpiar
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 0)
  
    return true
  }
  
  // Exportar las funciones para usarlas en gestionRecetas.js
  window.generadorRecetas = {
    generarNombreArchivo,
    generarHTMLReceta,
    descargarArchivoHTML,
  }
  
  