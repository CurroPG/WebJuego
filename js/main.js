// Add simple interactivity for a more dynamic feel

document.addEventListener('DOMContentLoaded', () => {
    // 1. Hover sound effect on buttons (using a synthetic beep to keep it dependency-free)
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    function playHoverSound() {
        if(audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // high pitch beep
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // volume
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
    }

    const interactiveElements = document.querySelectorAll('button, .feature-card, .blog-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Uncomment to enable sci-fi hover sounds
            // playHoverSound();
        });
    });

    // 2. Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in to elements
    const elementsToAnimate = document.querySelectorAll('.feature-card, .blog-card, .arena-text');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(el);
    });

    // 3. Funcionalidad para los botones "Ver Más" de Dominio Táctico
    const verMasButtons = document.querySelectorAll('.btn-outline');
    verMasButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Simulamos un efecto de consola para encajar con la temática
            const textoOriginal = this.innerText;
            this.innerText = "[ ESCANEANDO DATOS... ]";
            this.style.color = "var(--neon-purple)";
            this.style.borderColor = "var(--neon-purple)";
            
            setTimeout(() => {
                alert("[ ENLACE DE DATOS CIFRADO ]\nPara experimentar esta característica al máximo, dirígete a la arena.\n\n-> Inicia NeoNBrawL para descubrir más.");
                // Devolvemos el botón a su estado original
                this.innerText = textoOriginal;
                this.style.color = "var(--neon-green)";
                this.style.borderColor = "var(--neon-green)";
            }, 600);
        });
    });
});
