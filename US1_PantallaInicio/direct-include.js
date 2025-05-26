const navContent = `
    <nav class="top-nav">
        <div class="logo">
            <img src="./assets/img/logo-dark.svg" alt="Logo">
        </div>
        <div class="user-info">
            <span id="user-name" data-i18n="Nombre del usuario">Nombre del usuario</span>
            <a href="#" id="logout-btn" class="auth-buttons" data-i18n="Cerrar Sesión">Cerrar Sesión</a>
        </div>
    </nav>
`

const footerContent = `
    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <img src="./assets/img/logo-dark.svg" alt="Logo">
            </div>
            <div class="footer-section">
                <h3 data-i18n="Sobre Nosotros">Sobre Nosotros</h3>
                <ul>
                    <li><a href="./quienes-somos.html" data-i18n="Quiénes Somos">Quiénes Somos</a></li>
                    <li><a href="./terminos-y-condiciones.html" data-i18n="Términos y Condiciones">Términos y Condiciones</a></li>
                    <li><a href="./politica-de-privacidad.html" data-i18n="Política de Privacidad">Política de Privacidad</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3 data-i18n="Soporte">Soporte</h3>
                <ul>
                    <li><a href="./faq.html" data-i18n="Preguntas Frecuentes">Preguntas Frecuentes</a></li>
                    <li><a href="./contacto.html" data-i18n="Contacto">Contacto</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3 data-i18n="Síguenos">Síguenos</h3>
                <div class="social-links">
                    <a href="#" target="_blank"><img src="./assets/img/facebook.svg" alt="Facebook"></a>
                    <a href="#" target="_blank"><img src="./assets/img/twitter.svg" alt="Twitter"></a>
                    <a href="#" target="_blank"><img src="./assets/img/instagram.svg" alt="Instagram"></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p data-i18n="Derechos de autor">© 2024 Todos los derechos reservados</p>
        </div>
    </footer>
`

document.addEventListener("DOMContentLoaded", () => {
  const topNavContainer = document.getElementById("top-nav-container")
  const footerContainer = document.getElementById("footer-container")

  if (topNavContainer) {
    topNavContainer.innerHTML = navContent
  }

  if (footerContainer) {
    footerContainer.innerHTML = footerContent
  }
})
