// Welcome Section Animation
function enterSite() {
    const welcomeSection = document.getElementById('welcome');
    const mainContent = document.getElementById('mainContent');
    
    // Hide welcome section
    welcomeSection.classList.add('hidden');
    
    // Show main content after delay
    setTimeout(() => {
        mainContent.classList.add('visible');
        initScrollAnimations();
    }, 800);
}

// Scroll Animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('.material-section');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offset = 80; // Navbar height
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Card Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.example-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'cardPulse 0.6s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
});

// Add dynamic card pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes cardPulse {
        0% { transform: translateY(-10px) scale(1.02); }
        50% { transform: translateY(-12px) scale(1.03); }
        100% { transform: translateY(-10px) scale(1.02); }
    }
`;
document.head.appendChild(style);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.material-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .nav-link.active {
        color: var(--accent-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeLinkStyle);

// Add cursor trail effect (optional elegant touch)
let dots = [];
const maxDots = 20;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.left = e.pageX + 'px';
        dot.style.top = e.pageY + 'px';
        document.body.appendChild(dot);
        
        dots.push(dot);
        
        if (dots.length > maxDots) {
            const oldDot = dots.shift();
            oldDot.remove();
        }
        
        setTimeout(() => {
            dot.remove();
            dots = dots.filter(d => d !== dot);
        }, 1000);
    }
});

// Cursor dot styling
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-dot {
        position: absolute;
        width: 6px;
        height: 6px;
        background: var(--accent-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.6;
        animation: fadeDot 1s ease-out forwards;
    }
    
    @keyframes fadeDot {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(cursorStyle);

// Add typing animation to welcome subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Counter animation for section numbers
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toString().padStart(2, '0');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toString().padStart(2, '0');
        }
    }, 16);
}

// Initialize counter animations when sections become visible
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.section-number');
            const targetNumber = parseInt(number.textContent);
            animateCounter(number, targetNumber);
            numberObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe sections after main content is visible
setTimeout(() => {
    const sections = document.querySelectorAll('.material-section');
    sections.forEach(section => numberObserver.observe(section));
}, 1500);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.querySelector('.welcome-section.active')) {
        enterSite();
    }
});

// Preload animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loaded class styling
const loadedStyle = document.createElement('style');
loadedStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body.loaded {
        overflow-x: hidden;
    }
`;
document.head.appendChild(loadedStyle);

// Add interactive card click effect
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.example-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Ripple effect styling
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .example-card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(233, 69, 96, 0.4);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Log website info
console.log('%c🎨 Site créé par SOULAYMA DHAHBI', 'color: #e94560; font-size: 16px; font-weight: bold;');
console.log('%c💻 Développé par Med Aymen Troudi', 'color: #667eea; font-size: 16px; font-weight: bold;');

// Initialize Radar Charts
function initRadarCharts() {
    // Common chart options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            r: {
                beginAtZero: true,
                max: 10,
                ticks: {
                    stepSize: 2,
                    font: {
                        size: 11
                    }
                },
                pointLabels: {
                    font: {
                        size: 12,
                        weight: '600'
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(26, 26, 46, 0.9)',
                padding: 12,
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                borderColor: '#e94560',
                borderWidth: 2
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    };

    // Matériaux Métalliques
    const ctxMetalliques = document.getElementById('radarMetalliques');
    if (ctxMetalliques) {
        new Chart(ctxMetalliques, {
            type: 'radar',
            data: {
                labels: ['Résistance', 'Conductivité', 'Durabilité', 'Légèreté', 'Coût', 'Recyclabilité'],
                datasets: [{
                    label: 'Performance',
                    data: [9, 10, 8, 5, 6, 9],
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(102, 126, 234, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: commonOptions
        });
    }

    // Matériaux Organiques
    const ctxOrganiques = document.getElementById('radarOrganiques');
    if (ctxOrganiques) {
        new Chart(ctxOrganiques, {
            type: 'radar',
            data: {
                labels: ['Résistance', 'Conductivité', 'Durabilité', 'Légèreté', 'Coût', 'Recyclabilité'],
                datasets: [{
                    label: 'Performance',
                    data: [5, 2, 6, 8, 9, 7],
                    backgroundColor: 'rgba(240, 147, 251, 0.2)',
                    borderColor: 'rgba(245, 87, 108, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(245, 87, 108, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(245, 87, 108, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: commonOptions
        });
    }

    // Matériaux Minéraux
    const ctxMineraux = document.getElementById('radarMineraux');
    if (ctxMineraux) {
        new Chart(ctxMineraux, {
            type: 'radar',
            data: {
                labels: ['Résistance', 'Conductivité', 'Durabilité', 'Légèreté', 'Coût', 'Recyclabilité'],
                datasets: [{
                    label: 'Performance',
                    data: [8, 1, 9, 4, 7, 6],
                    backgroundColor: 'rgba(79, 172, 254, 0.2)',
                    borderColor: 'rgba(0, 242, 254, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(0, 242, 254, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 242, 254, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: commonOptions
        });
    }

    // Matériaux Composites
    const ctxComposites = document.getElementById('radarComposites');
    if (ctxComposites) {
        new Chart(ctxComposites, {
            type: 'radar',
            data: {
                labels: ['Résistance', 'Conductivité', 'Durabilité', 'Légèreté', 'Coût', 'Recyclabilité'],
                datasets: [{
                    label: 'Performance',
                    data: [10, 6, 9, 9, 4, 5],
                    backgroundColor: 'rgba(67, 233, 123, 0.2)',
                    borderColor: 'rgba(56, 249, 215, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(56, 249, 215, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(56, 249, 215, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: commonOptions
        });
    }
}

// Initialize charts when sections become visible
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const canvas = entry.target.querySelector('canvas');
            if (canvas && !canvas.chart) {
                // Trigger chart initialization
                setTimeout(() => {
                    initRadarCharts();
                }, 200);
                chartObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.3 });

// Start observing radar cards after site loads
setTimeout(() => {
    const radarCards = document.querySelectorAll('.radar-card');
    radarCards.forEach(card => chartObserver.observe(card));
}, 2000);

// Animate application items when visible
const appObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.application-item');
            items.forEach((item, i) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50);
                }, i * 150);
            });
            appObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

setTimeout(() => {
    const appCards = document.querySelectorAll('.applications-card');
    appCards.forEach(card => appObserver.observe(card));
}, 2000);
