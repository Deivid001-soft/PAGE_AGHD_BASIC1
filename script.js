document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Menú Móvil (Hamburger)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace (Móvil)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 2. Animaciones de Intersección (Fade-in on scroll)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optimización: dejar de observar una vez animado
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // 3. Validación y Seguridad del Formulario
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    // Función básica para sanitizar inputs (Previene inyección HTML básica)
    const sanitizeHTML = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar recarga
            
            // Obtener valores
            const nombreRaw = document.getElementById('nombre').value.trim();
            const emailRaw = document.getElementById('email').value.trim();
            const mensajeRaw = document.getElementById('mensaje').value.trim();

            // Validar campos vacíos
            if (!nombreRaw || !emailRaw || !mensajeRaw) {
                formFeedback.textContent = "Por favor, completa todos los campos requeridos.";
                formFeedback.className = "form-feedback feedback-error";
                return;
            }

            // Validar formato de email mediante Regex simple
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailRaw)) {
                formFeedback.textContent = "Por favor, ingresa un correo electrónico válido.";
                formFeedback.className = "form-feedback feedback-error";
                return;
            }

            // Sanitizar datos para el payload
            const dataSegura = {
                nombre: sanitizeHTML(nombreRaw),
                email: sanitizeHTML(emailRaw),
                mensaje: sanitizeHTML(mensajeRaw)
            };

            // Simulación de envío de datos (Aquí conectarías tu backend PHP/NodeJS)
            console.log("Datos seguros listos para enviar:", dataSegura);
            
            formFeedback.textContent = "¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.";
            formFeedback.className = "form-feedback feedback-success";
            
            contactForm.reset();
            
            // Limpiar mensaje de éxito después de 5 segundos
            setTimeout(() => {
                formFeedback.textContent = "";
                formFeedback.className = "form-feedback";
            }, 5000);
        });
    }
    // 4. Slider Automático (Banner Deslizante)
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Tiempo en milisegundos (5000ms = 5 segundos)

    if(slides.length > 0) {
        setInterval(() => {
            // Quita la clase activa de la imagen actual
            slides[currentSlide].classList.remove('active');
            
            // Calcula cuál es la siguiente imagen (vuelve a 0 si llega al final)
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Añade la clase activa a la nueva imagen
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }
});