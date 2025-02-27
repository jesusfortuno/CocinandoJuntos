document.addEventListener('DOMContentLoaded', () => {
    // Configuración de Supabase
    const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co";
    const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU";
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const userInfo = document.getElementById("user-info");
    const changePasswordBtn = document.querySelector('.profile-info .primary-btn');
    const passwordModal = document.getElementById('password-modal');
      async function fetchSavedRecipes(userId) {
    try {
        console.log('Buscando recetas para usuario:', userId);

        // Consulta para obtener las recetas favoritas del usuario
        const { data: savedRecipes, error } = await supabase
            .from('favoritos')
            .select(`
                id,
                receta_id,
                fecha_guardado,
                recetas (
                    id, 
                    titulo
                )
            `)
            .eq('usuario_id', userId);

        if (error) {
            console.error('Error en la consulta:', error);
            throw error;
        }

        console.log('Recetas guardadas:', savedRecipes);

        const recipesContainer = document.getElementById('saved-recipes-container');
        recipesContainer.innerHTML = ''; // Limpiar contenedor

        // Verificar si hay recetas guardadas
        if (!savedRecipes || savedRecipes.length === 0) {
            recipesContainer.innerHTML = '<p>No tienes recetas guardadas</p>';
            return;
        }

        // Función para obtener una imagen según el título de la receta
        function obtenerImagenParaReceta(titulo) {
            const mapaImagenes = {
                'Pollo': '../US1_PantallaInicio/Imagenes/China/pollo-agridulce.jpg',
                'Bolitas': '../US1_PantallaInicio/Imagenes/China/bollitos-chinos.jpg',
                'Galletas': '../US1_PantallaInicio/Imagenes/China/galletas-de-sesamo.jpg',
                'Fideos': '../US1_PantallaInicio/Imagenes/China/fideos-salteados.jpg',
                'Tortilla': '../US1_PantallaInicio/Imagenes/España/tortilla-patatas.jpeg',
                'Churros': '../US1_PantallaInicio/Imagenes/España/churros-chocolate.jpg',
                'Paella': '../US1_PantallaInicio/Imagenes/España/paella.png',
                'Pan': '../US1_PantallaInicio/Imagenes/España/pan-tomate.jpg',
                'Coq': '../US1_PantallaInicio/Imagenes/Francia/coq-au-vin.jpg',
                'Crepas': '../US1_PantallaInicio/Imagenes/Francia/crepas-dulces.jpg',
                'Quiche': '../US1_PantallaInicio/Imagenes/Francia/quiche-lorraine.pn.webp',
                'Tostada': '../US1_PantallaInicio/Imagenes/Francia/tostada-francesa.jpg',
                'Capuccino': '../US1_PantallaInicio/Imagenes/Italia/bizcocho-capuccino.jpg',
                'Cannoli': '../US1_PantallaInicio/Imagenes/Italia/cannoli.png',
                'Lasaña': '../US1_PantallaInicio/Imagenes/Italia/lasaña.jpg',
                'Margarita': '../US1_PantallaInicio/Imagenes/Italia/pizza-margarita.jpg',
                'Dorayaki': '../US1_PantallaInicio/Imagenes/Japon/dorayaki.jpg',
                'Ramen': '../US1_PantallaInicio/Imagenes/Japon/ramen.jpg',
                'Sushi': '../US1_PantallaInicio/Imagenes/Japon/sushi.jpeg',
                'Tamagoyaki': '../US1_PantallaInicio/Imagenes/Japon/tamagoyaki.jpg',
                'Arepa Venezolana': '../US1_PantallaInicio/Imagenes/Venezuela/arepa-venezolana.jpg',
                'Cachapa': '../US1_PantallaInicio/Imagenes/Venezuela/cachapa-venezolana.jpg',
                'Criollo': '../US1_PantallaInicio/Imagenes/Venezuela/criollo-venezolano.jpg',
                'Golfeados': '../US1_PantallaInicio/Imagenes/Venezuela/Golfeados-venezolanos.png',
                'default': '../imagenes/receta-default.jpg'
            };

            // Buscar una imagen que coincida parcialmente con el título
            for (let [palabra, imagen] of Object.entries(mapaImagenes)) {
                if (titulo.toLowerCase().includes(palabra.toLowerCase())) {
                    return imagen;
                }
            }

            // Si no se encuentra, devolver imagen por defecto
            return mapaImagenes['default'];
        }

        // Modificar la parte de generar recetas guardadas
        savedRecipes.forEach(favorite => {
            if (favorite.recetas) {
                const recipe = favorite.recetas;
                const recipeElement = document.createElement('div');
                recipeElement.classList.add('recipe');
        
                // Generar imagen para la receta
                const imagenReceta = obtenerImagenParaReceta(recipe.titulo);
        
                recipeElement.innerHTML = `
                    <img src="${imagenReceta}" alt="${recipe.titulo}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
                    <h4>${recipe.titulo}</h4>
                    <a href="../US6_GuardarRecetas/${recipe.titulo.toLowerCase().replace(/\s+/g, '-')}.html?id=${recipe.id}" 
               style="
                   display: inline-block;
                   background-color: #e1d4cc;
                   color: #6b4423;
                   padding: 8px 15px;
                   border-radius: 5px;
                   text-decoration: none;
                   font-weight: bold;
                   transition: background-color 0.3s ease;
               "
               onmouseover="this.style.backgroundColor='#d1c4b8'"
               onmouseout="this.style.backgroundColor='#e1d4cc'"
                    >Ver Receta</a>
                `;
                recipesContainer.appendChild(recipeElement);
            }
        });
    } catch (error) {
        console.error('Error al cargar recetas guardadas:', error);
        const recipesContainer = document.getElementById('saved-recipes-container');
        recipesContainer.innerHTML = '<p>Error al cargar recetas</p>';
    }
}                if (usuario) {        // Mostrar información del usuario        userInfo.style.display = "flex";
        document.getElementById("user-name").textContent = usuario.username || "Usuario";
        document.getElementById("profile-user-name").textContent = usuario.username || "Usuario";
        document.getElementById("user-email").textContent = usuario.email || "No disponible";
        // Cargar recetas guardadas
        fetchSavedRecipes(usuario.id);
        

        // Event listener para el botón de cambiar contraseña
        changePasswordBtn.addEventListener('click', () => {
            passwordModal.style.display = 'flex';
        });

        // Event listener para cerrar el modal
        window.closeModal = function() {
            passwordModal.style.display = 'none';
        };

        // Event listener para el formulario de cambio de contraseña
        document.getElementById('change-password-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (newPassword !== confirmPassword) {
                alert('Las contraseñas nuevas no coinciden');
                return;
            }

            try {
                // Actualizamos la contraseña directamente
                const { data, error } = await supabase
                    .from('usuarios')
                    .update({ password: newPassword })
                    .eq('email', usuario.email)
                    .select();

                if (error) throw error;

                console.log('Contraseña actualizada:', data);
                alert('¡Contraseña actualizada con éxito!');
                closeModal();
                document.getElementById('change-password-form').reset();

            } catch (error) {
                console.error('Error en la actualización:', error);
                alert('Error al actualizar la contraseña: ' + error.message);
            }
        });

        // Event listener para cerrar sesión
        document.getElementById("logout-btn").addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuario");
            window.location.reload();
        });
    }

    // Función para mostrar/ocultar contraseña
    window.togglePassword = function(inputId) {
        const input = document.getElementById(inputId);
        input.type = input.type === 'password' ? 'text' : 'password';
    }
});
