// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

// Elementos del DOM
const modal = document.getElementById('recipe-modal');
const addRecipeBtn = document.getElementById('add-recipe-btn');
const closeBtn = document.querySelector('.close');
const recipeForm = document.getElementById('recipe-form');
const recipesTableBody = document.getElementById('recipes-table-body');

// Cargar recetas al iniciar
async function cargarRecetas() {
    try {
        const { data: recetas, error } = await supabase
            .from('recetas')
            .select('*');

        if (error) throw error;

        recipesTableBody.innerHTML = '';
        recetas.forEach(receta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${receta.id}</td>
                <td>${receta.titulo}</td>
                <td>${receta.categoria}</td>
                <td>${receta.dificultad}</td>
                <td class="action-buttons">
                    <button class="edit-btn" onclick="editarReceta(${receta.id})">Editar</button>
                    <button class="delete-btn" onclick="eliminarReceta(${receta.id})">Eliminar</button>
                </td>
            `;
            recipesTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar recetas:', error);
        alert('Error al cargar las recetas');
    }
}

// Añadir nueva receta
async function añadirReceta(formData) {
    try {
        const { error } = await supabase
            .from('recetas')
            .insert([{
                titulo: formData.get('titulo'),
                descripcion: formData.get('descripcion'),
                dificultad: formData.get('dificultad'),
                tiempo: formData.get('tiempo'),
                categoria: formData.get('categoria'),
                ingredientes: formData.get('ingredientes'),
                pasos: formData.get('pasos')
            }]);

        if (error) throw error;

        modal.style.display = "none";
        cargarRecetas();
        alert('Receta añadida con éxito');
    } catch (error) {
        console.error('Error al añadir receta:', error);
        alert('Error al añadir la receta');
    }
}



// Editar receta
async function editarReceta(id) {
    try {
        const { data: receta, error } = await supabase
            .from('recetas')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        // Rellenar el formulario con los datos de la receta
        document.getElementById('titulo').value = receta.titulo;
        document.getElementById('descripcion').value = receta.descripcion;
        document.getElementById('dificultad').value = receta.dificultad;
        document.getElementById('tiempo').value = receta.tiempo;
        document.getElementById('categoria').value = receta.categoria;
        document.getElementById('ingredientes').value = receta.ingredientes;
        document.getElementById('pasos').value = receta.pasos;

        // Mostrar el modal
        document.getElementById('modal-title').textContent = 'Editar Receta';
        recipeForm.dataset.mode = 'edit';
        recipeForm.dataset.recetaId = id;
        modal.style.display = "block";
    } catch (error) {
        console.error('Error al cargar la receta para editar:', error);
        alert('Error al cargar la receta');
    }
}

// Eliminar receta
async function eliminarReceta(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
        try {
            const { error } = await supabase
                .from('recetas')
                .delete()
                .eq('id', id);

            if (error) throw error;

            cargarRecetas();
            alert('Receta eliminada con éxito');
        } catch (error) {
            console.error('Error al eliminar receta:', error);
            alert('Error al eliminar la receta');
        }
    }
}

// Event Listeners
addRecipeBtn.onclick = () => {
    recipeForm.reset();
    document.getElementById('modal-title').textContent = 'Añadir Nueva Receta';
    recipeForm.dataset.mode = 'add';
    modal.style.display = "block";
};

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

recipeForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(recipeForm);
    
    if (recipeForm.dataset.mode === 'edit') {
        try {
            const { error } = await supabase
                .from('recetas')
                .update({
                    titulo: formData.get('titulo'),
                    descripcion: formData.get('descripcion'),
                    dificultad: formData.get('dificultad'),
                    tiempo: formData.get('tiempo'),
                    categoria: formData.get('categoria'),
                    ingredientes: formData.get('ingredientes'),
                    pasos: formData.get('pasos')
                })
                .eq('id', recipeForm.dataset.recetaId);

            if (error) throw error;

            modal.style.display = "none";
            cargarRecetas();
            alert('Receta actualizada con éxito');
        } catch (error) {
            console.error('Error al actualizar receta:', error);
            alert('Error al actualizar la receta');
        }
    } else {
        añadirReceta(formData);
    }
};

// Verificar usuario y cargar datos iniciales
const usuario = JSON.parse(localStorage.getItem("usuario"));
if (usuario) {
    document.getElementById("user-info").style.display = "flex";
    document.getElementById("user-name").textContent = usuario.username;
    cargarRecetas();
} else {
    window.location.href = "../login.html";
} 