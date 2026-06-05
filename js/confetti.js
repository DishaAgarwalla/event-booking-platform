// Confetti Animation for Booking Success
function triggerConfetti() {
    const colors = ['#6c63ff', '#ff6584', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'];
    
    for (let i = 0; i < 150; i++) {
        createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.zIndex = '99999';
    confetti.style.pointerEvents = 'none';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.opacity = '0.8';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
        { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
        duration: 1500 + Math.random() * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => {
        confetti.remove();
    };
}

// Multiple bursts for more effect
function triggerMultipleConfetti(bursts = 3) {
    for (let i = 0; i < bursts; i++) {
        setTimeout(() => {
            triggerConfetti();
        }, i * 200);
    }
}