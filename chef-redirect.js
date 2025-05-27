// Este archivo se encargará de redirigir a los usuarios con rol "chef" a la página de chef

document.addEventListener("DOMContentLoaded", () => {
  // Verificar si hay un usuario en localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario"))

  if (usuario && usuario.rol === "chef") {
    console.log("Usuario chef detectado en chef-redirect.js")

    // Obtener el enlace de perfil
    const profileLink = document.getElementById("user-profile-link")
    if (profileLink) {
      console.log("Enlace de perfil encontrado, modificando para chef")
      // Modificar el enlace para que vaya a la página de chef
      profileLink.href = "../chef-page.html"
    }

    // También modificar el comportamiento del clic en el nombre de usuario
    const usernameElement = document.getElementById("user-name")
    if (usernameElement) {
      usernameElement.addEventListener("click", (e) => {
        e.preventDefault()
        window.location.href = "../chef-page.html"
      })
    }

    // Si estamos en la página de usuario normal y somos chef, redirigir a la página de chef
    if (window.location.href.includes("US7_PaginaDeUsuario/usuario.html")) {
      console.log("Chef en página de usuario normal, redirigiendo...")
      window.location.href = "../chef-page.html"
    }
  }
})
