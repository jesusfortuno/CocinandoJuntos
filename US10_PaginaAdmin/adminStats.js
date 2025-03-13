// Configuración de Supabase
const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

// Función para obtener estadísticas
async function obtenerEstadisticas() {
    try {
        // Obtener total de recetas
        const { data: recetas, error: errorRecetas } = await supabase
            .from('recetas')
            .select('*');

        if (errorRecetas) {
            console.error('Error al obtener recetas:', errorRecetas);
            throw errorRecetas;
        }

        console.log('Recetas encontradas:', recetas);

        // Obtener total de usuarios
        const { count: totalUsuarios, error: errorUsuarios } = await supabase
            .from('usuarios')
            .select('*', { count: 'exact', head: true });

        if (errorUsuarios) {
            console.error('Error al obtener usuarios:', errorUsuarios);
            throw errorUsuarios;
        }

        // Actualizar los elementos en el DOM
        document.getElementById('total-recetas').textContent = recetas ? recetas.length : 0;
        document.getElementById('total-usuarios').textContent = totalUsuarios || 0;

    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        document.getElementById('total-recetas').textContent = '0';
        document.getElementById('total-usuarios').textContent = '0';
    }
}

// Función para insertar una receta de prueba
async function insertarRecetaPrueba() {
    try {
        const { data, error } = await supabase
            .from('recetas')
            .insert([
                {
                    titulo: 'Receta de prueba',
                    descripcion: 'Esta es una receta de prueba',
                    dificultad: 'Fácil',
                    tiempo: '30 minutos',
                    categoria: 'Prueba',
                    ingredientes: 'Ingredientes de prueba',
                    pasos: 'Pasos de prueba'
                }
            ]);

        if (error) {
            console.error('Error al insertar receta de prueba:', error);
        } else {
            console.log('Receta de prueba insertada:', data);
            obtenerEstadisticas(); // Actualizar estadísticas
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Cargar estadísticas cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    obtenerEstadisticas();
    
    // Descomentar la siguiente línea si quieres probar insertando una receta
    // insertarRecetaPrueba();
});