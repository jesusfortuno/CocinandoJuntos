// Este archivo se encargará de redirigir a los usuarios con rol "chef" a la página de chef

document.addEventListener("DOMContentLoaded", () => {
    // Verificar si hay un usuario en localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"))
  
    // Obtener el enlace de perfil
    const profileLink = document.getElementById("profile-link")
  
    if (profileLink && usuario && usuario.rol === "chef") {
      console.log("Usuario chef detectado, modificando enlace de perfil")
      // Modificar el enlace para que vaya a la página de chef
      profileLink.href = "../chef-page.html"
    }
  
    // También modificar el comportamiento del clic en el nombre de usuario
    const usernameElement = document.getElementById("username")
    if (usernameElement && usuario) {
      usernameElement.addEventListener("click", (e) => {
        e.preventDefault()
        if (usuario.rol === "chef") {
          window.location.href = "../chef-page.html"
        } else {
          window.location.href = "../US7_PaginaDeUsuario/usuario.html"
        }
      })
    }
  })
  