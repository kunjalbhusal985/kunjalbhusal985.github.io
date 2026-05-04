document.addEventListener('DOMContentLoaded', function() {
    // Create confetti on page load
    createConfetti();

    // Handle RSVP form submission
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const attendance = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;

            // Log to console (you can replace this with API call)
            console.log({
                name: name,
                email: email,
                attendance: attendance,
                message: message,
                timestamp: new Date().toISOString()
            });

            // Show success notification
            showSuccessNotification(`Thank you ${name}! Your RSVP has been received.`);

            // Reset form
            this.reset();
        });
    }
});

function createConfetti() {
    const confettiCount = 30;
    const container = document.querySelector('.container');

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '-1';

        document.body.appendChild(confetti);

        // Animate confetti
        animateConfetti(confetti);
    }
}

function animateConfetti(element) {
    const duration = Math.random() * 3 + 2;
    const xOffset = (Math.random() - 0.5) * 200;
    const yOffset = window.innerHeight + 10;

    element.animate(
        [
            { transform: 'translateY(0) translateX(0)', opacity: 1 },
            { transform: `translateY(${yOffset}px) translateX(${xOffset}px)`, opacity: 0 }
        ],
        {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }
    ).onfinish = () => {
        element.remove();
    };
}

function getRandomColor() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b', '#fa709a', '#fee140'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.animate(
            [
                { opacity: 1, transform: 'translateX(0)' },
                { opacity: 0, transform: 'translateX(400px)' }
            ],
            {
                duration: 500,
                easing: 'ease-in'
            }
        ).onfinish = () => {
            notification.remove();
        };
    }, 3500);
}

// Social sharing functionality
document.addEventListener('DOMContentLoaded', function() {
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.className.includes('facebook') ? 'facebook' :
                           this.className.includes('whatsapp') ? 'whatsapp' : 'twitter';
            
            const message = 'You are invited to Kunjal Bhusal Bartan! Check it out: ' + window.location.href;
            let url = '';

            if (platform === 'facebook') {
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
            } else if (platform === 'whatsapp') {
                url = `https://wa.me/?text=${encodeURIComponent(message)}`;
            } else if (platform === 'twitter') {
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(window.location.href)}`;
            }

            if (url) {
                window.open(url, '_blank', 'width=600,height=400');
            }
        });
    });
});
