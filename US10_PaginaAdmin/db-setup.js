// Script para añadir el campo cultura a la tabla recetas si no existe
// Este script se puede ejecutar desde la consola del navegador

async function agregarCampoCultura() {
    const SUPABASE_URL = "https://uonkcjrokwtgvimjxawm.supabase.co"
    const SUPABASE_API_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY)
  
    try {
      // Intentar obtener una receta para verificar la estructura
      const { data, error } = await supabase.from("recetas").select("cultura").limit(1)
  
      if (error && error.message && error.message.includes('column "cultura" does not exist')) {
        console.log("El campo 'cultura' no existe en la tabla. Debes añadirlo manualmente desde el panel de Supabase.")
        alert(`
          Para añadir el campo 'cultura' a la tabla 'recetas', sigue estos pasos:
          
          1. Ve al panel de administración de Supabase
          2. Navega a la sección "Table Editor"
          3. Selecciona la tabla "recetas"
          4. Haz clic en "Edit table"
          5. Añade una nueva columna con:
             - Nombre: cultura
             - Tipo: text
             - Default Value: (déjalo en blanco)
             - Is Nullable: true
          6. Guarda los cambios
          
          Una vez añadido el campo, recarga esta página.
        `)
      } else if (!error) {
        console.log("El campo 'cultura' ya existe en la tabla recetas.")
        alert("El campo 'cultura' ya existe en la tabla recetas.")
      } else {
        console.error("Error al verificar el campo:", error)
        alert("Error al verificar el campo: " + error.message)
      }
    } catch (error) {
      console.error("Error general:", error)
      alert("Error general: " + error.message)
    }
  }
  
  // Ejecutar la función
  agregarCampoCultura()
  
  