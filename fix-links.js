/**
 * Script para corregir los enlaces del footer en todas las páginas
 * Este script debe incluirse en todas las páginas después de cargar el footer
 */
;(() => {
  // Ejecutar cuando el DOM esté completamente cargado
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFixLinks)
  } else {
    initFixLinks()
  }

  function initFixLinks() {
    // Esperar un momento para asegurarse de que el footer se ha cargado
    setTimeout(fixFooterLinks, 100)
  }

  function fixFooterLinks() {
    // Obtener todos los enlaces del footer
    const footerLinks = document.querySelectorAll("footer a")
    if (footerLinks.length === 0) {
      console.log("No se encontraron enlaces en el footer. Reintentando en 500ms...")
      setTimeout(fixFooterLinks, 500)
      return
    }

    console.log(`Encontrados ${footerLinks.length} enlaces en el footer.`)

    // Determinar la ruta base del proyecto
    const baseUrl = window.location.origin
    const projectPath = getProjectPath()
    console.log("Ruta base del proyecto:", baseUrl + projectPath)

    // Mapa de enlaces y sus destinos correctos (rutas absolutas)
    const linkMap = {
      // Sobre Nosotros
      "Quiénes Somos": projectPath + "US1_PantallaInicio/quienes-somos.html",
      "Qui Som": projectPath + "US1_PantallaInicio/quienes-somos.html",
      "Who We Are": projectPath + "US1_PantallaInicio/quienes-somos.html",
      Contacto: projectPath + "US1_PantallaInicio/contacto.html",
      Contacte: projectPath + "US1_PantallaInicio/contacto.html",
      Contact: projectPath + "US1_PantallaInicio/contacto.html",

      // Legal
      "Política de Privacidad": projectPath + "US1_PantallaInicio/politica_privacidad.html",
      "Política de Privacitat": projectPath + "US1_PantallaInicio/politica_privacidad.html",
      "Privacy Policy": projectPath + "US1_PantallaInicio/politica_privacidad.html",
      "Términos y Condiciones": projectPath + "US1_PantallaInicio/terminos_condiciones.html",
      "Termes i Condicions": projectPath + "US1_PantallaInicio/terminos_condiciones.html",
      "Terms and Conditions": projectPath + "US1_PantallaInicio/terminos_condiciones.html",
      "Política de Cookies": projectPath + "US1_PantallaInicio/politica_cookies.html",
      "Cookie Policy": projectPath + "US1_PantallaInicio/politica_cookies.html",
      "Aviso Legal": projectPath + "US1_PantallaInicio/aviso_legal.html",
      "Avís Legal": projectPath + "US1_PantallaInicio/aviso_legal.html",
      "Legal Notice": projectPath + "US1_PantallaInicio/aviso_legal.html",

      // Comunidad
      Recetas: projectPath + "Platos.html",
      Receptes: projectPath + "Platos.html",
      Recipes: projectPath + "Platos.html",
      Chefs: projectPath + "US1_PantallaInicio/chefs.html",
      Xefs: projectPath + "US1_PantallaInicio/chefs.html",
    }

    // Corregir cada enlace
    footerLinks.forEach((link) => {
      const linkText = link.textContent.trim()
      if (linkMap[linkText]) {
        // Construir la URL completa
        const newHref = baseUrl + linkMap[linkText]
        console.log(`Actualizando enlace "${linkText}" a: ${newHref}`)
        link.href = newHref

        // Añadir un atributo de datos para depuración
        link.setAttribute("data-fixed", "true")
      }
    })
  }

  // Función para obtener la ruta del proyecto
  function getProjectPath() {
    const path = window.location.pathname

    // Buscar "CocinandoJuntos" en la ruta
    const match = path.match(/(.*)CocinandoJuntos\//i)
    if (match && match[1]) {
      return match[1] + "CocinandoJuntos/"
    }

    // Si no encontramos "CocinandoJuntos", buscar "clases"
    const classesMatch = path.match(/(.*)clases\//i)
    if (classesMatch && classesMatch[1]) {
      return classesMatch[1] + "clases/CocinandoJuntos/"
    }

    // Si no podemos determinar la ruta, devolver una ruta relativa
    return "/"
  }
})()
