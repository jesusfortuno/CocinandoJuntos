// Versión simplificada para probar
console.log("Script cargado correctamente")

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado")

  // Buscar el contenedor
  const container = document.querySelector(".chefs-container")
  console.log("Contenedor encontrado:", container)

  if (container) {
    // Crear chefs de prueba con las imágenes reales
    const chefsTest = [
      { name: "Chef Profesional", image: "../Imagenes/chef-professional.jpg" },
      { name: "Chef Juanma", image: "../Imagenes/chef-juanma.jpeg" },
      { name: "Chef Miguel", image: "../Imagenes/chef-miguel.jpeg" },
    ]

    container.innerHTML = ""

    chefsTest.forEach((chef) => {
      const chefDiv = document.createElement("div")
      chefDiv.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 10px; margin: 10px; text-align: center;">
          <img src="${chef.image}" alt="${chef.name}" style="width: 200px; height: 200px; object-fit: cover;" 
               onerror="console.error('Error cargando: ${chef.image}'); this.style.background='red';"
               onload="console.log('Imagen cargada: ${chef.image}')">
          <h3>${chef.name}</h3>
        </div>
      `
      container.appendChild(chefDiv)
    })

    console.log("Chefs agregados al contenedor")
  } else {
    console.error("No se encontró .chefs-container")
    // Mostrar todos los elementos disponibles
    console.log("Elementos disponibles:", document.querySelectorAll("*"))
  }
})
