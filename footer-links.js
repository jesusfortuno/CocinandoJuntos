// Script para corregir los enlaces del footer en todas las páginas
document.addEventListener("DOMContentLoaded", () => {
    // Obtener todos los enlaces del footer
    const footerLinks = document.querySelectorAll("footer a")
  
    // Mapa de enlaces y sus destinos correctos (rutas absolutas)
    const linkMap = {
      // Sobre Nosotros
      "Quiénes Somos": "/US1_PantallaInicio/quienes-somos.html",
      "Qui Som": "/US1_PantallaInicio/quienes-somos.html",
      Contacto: "/US1_PantallaInicio/contacto.html",
      Contacte: "/US1_PantallaInicio/contacto.html",
  
      // Legal
      "Política de Privacidad": "/US1_PantallaInicio/politica_privacidad.html",
      "Política de Privacitat": "/US1_PantallaInicio/politica_privacidad.html",
      "Términos y Condiciones": "/US1_PantallaInicio/terminos_condiciones.html",
      "Termes i Condicions": "/US1_PantallaInicio/terminos_condiciones.html",
      "Política de Cookies": "/US1_PantallaInicio/politica_cookies.html",
      "Aviso Legal": "/US1_PantallaInicio/aviso_legal.html",
      "Avís Legal": "/US1_PantallaInicio/aviso_legal.html",
  
      // Comunidad
      Recetas: "/Platos.html",
      Receptes: "/Platos.html",
      Chefs: "/US1_PantallaInicio/chefs.html",
      Xefs: "/US1_PantallaInicio/chefs.html",
    }
  
    // Obtener la ruta base del proyecto
    const baseUrl = getBaseUrl()
    console.log("Base URL detectada:", baseUrl)
  
    // Corregir cada enlace
    footerLinks.forEach((link) => {
      const linkText = link.textContent.trim()
      if (linkMap[linkText]) {
        // Construir la URL completa
        const newHref = baseUrl + linkMap[linkText]
        console.log(`Actualizando enlace "${linkText}" a: ${newHref}`)
        link.href = newHref
  
        // Añadir un atributo de datos para depuración
        link.setAttribute("data-original-text", linkText)
      }
    })
  
    // Función para obtener la URL base del proyecto
    function getBaseUrl() {
      // Intentar obtener la ruta base a partir de la URL actual
      const currentPath = window.location.pathname
      const pathSegments = currentPath.split("/")
  
      // Buscar el segmento "CocinandoJuntos" en la ruta
      const projectIndex = pathSegments.findIndex(
        (segment) =>
          segment.toLowerCase() === "cocinandojuntos" ||
          segment.toLowerCase() === "clases" ||
          segment.toLowerCase() === "documents",
      )
  
      if (projectIndex !== -1) {
        // Construir la ruta base hasta el directorio del proyecto
        const basePath = pathSegments.slice(0, projectIndex + 1).join("/") + "/"
        return basePath
      }
  
      // Si no podemos determinar la ruta base, usar la ruta actual como fallback
      const lastSlashIndex = currentPath.lastIndexOf("/")
      if (lastSlashIndex !== -1) {
        return currentPath.substring(0, lastSlashIndex + 1)
      }
  
      return "/"
    }
  })
  