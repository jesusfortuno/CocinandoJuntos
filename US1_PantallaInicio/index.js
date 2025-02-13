document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const dotsContainer = document.querySelector('.dots-container');

    // Función para actualizar la visibilidad de las tarjetas según el ancho de la pantalla
    function updateCardsVisibility() {
        const windowWidth = window.innerWidth;
        slides.forEach(slide => {
            const cards = slide.querySelectorAll('.slide-card');
            cards.forEach((card, index) => {
                if (windowWidth <= 768) {
                    // Mostrar solo 1 tarjeta
                    card.style.display = index === 0 ? 'block' : 'none';
                } else if (windowWidth <= 1024) {
                    // Mostrar 2 tarjetas
                    card.style.display = index < 2 ? 'block' : 'none';
                } else {
                    // Mostrar todas las tarjetas
                    card.style.display = 'block';
                }
            });
        });
    }

    // Crear los dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function moveSlide(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    // Event listeners
    window.addEventListener('resize', updateCardsVisibility);
    window.moveSlide = moveSlide;
    window.goToSlide = goToSlide;

    // Inicialización
    updateCardsVisibility();
    setInterval(() => moveSlide(1), 5000);
});