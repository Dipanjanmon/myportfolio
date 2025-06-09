// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll progress indicator
    initScrollProgress();

    // Initialize particle background
    initParticles();

    // Initialize mobile menu toggle
    initMobileMenu();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize logo click behavior
    initLogoClick();

    // Initialize skill progress bars
    initSkillBars();

    // Initialize stat counters
    initStatCounters();

    // Initialize contact form validation
    initContactForm();
});

// Scroll Progress Indicator
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (!scrollProgress) return;

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = `${scrollPercentage}%`;
    });
}

// Particle Background
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle settings
    const particleCount = 100;
    const particles = [];
    const colors = ['#00d4ff', '#8b5cf6', '#ff0080', '#00ff88'];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 0.5 + 0.1,
            directionX: Math.random() * 2 - 1,
            directionY: Math.random() * 2 - 1
        });
    }
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Move particles
            particle.x += particle.directionX * particle.speed;
            particle.y += particle.directionY * particle.speed;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.directionX *= -1;
            }
            
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.directionY *= -1;
            }
            
            // Draw particles
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        // Connect particles
        connectParticles();
    }
    
    // Connect particles with lines
    function connectParticles() {
        const maxDistance = 150;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = 1 - (distance / maxDistance);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Start animation
    animate();
}

// Mobile Menu Toggle
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
        
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Animate elements when they enter the viewport
    const animateElements = document.querySelectorAll('.section__title, .project-card, .skill-category, .timeline-item, .contact__item, .contact__form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Skill Progress Bars
function initSkillBars() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = `${width}%`;
            }
        });
    }, { threshold: 0.1 });
    
    skillProgressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Stat Counters
function initStatCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const updateCounter = () => {
                    const increment = target / 50;
                    if (count < target) {
                        count += increment;
                        entry.target.textContent = Math.ceil(count);
                        setTimeout(updateCounter, 20);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                updateCounter();
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Contact Form Validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--neon-magenta)';
                
                // Reset border after a delay
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            } else {
                input.style.borderColor = 'var(--neon-green)';
            }
        });
        
        if (isValid) {
            // Show success message (in a real app, you would send data to a server here)
            const successMessage = document.createElement('div');
            successMessage.className = 'status status--success';
            successMessage.textContent = 'Message sent successfully!';
            
            // Clear form
            contactForm.reset();
            
            // Append and remove success message
            contactForm.appendChild(successMessage);
            setTimeout(() => {
                successMessage.remove();
                inputs.forEach(input => {
                    input.style.borderColor = '';
                });
            }, 3000);
        }
    });
}

// Logo Click Behavior
function initLogoClick() {
    const logoLink = document.querySelector('.nav__brand-link');
    
    if (!logoLink) return;

    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Go to Top Button
const goToTopBtn = document.getElementById('goToTopBtn');

// Show button when user scrolls down 200px
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        goToTopBtn.classList.add('visible');
    } else {
        goToTopBtn.classList.remove('visible');
    }
});

// Smooth scroll to top when button is clicked
goToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});