// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const terminalContent = document.getElementById('terminal-content');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Terminal Animation
const terminalLines = [
    {
        type: 'command',
        content: '<span class="prompt">ketaki@portfolio:~$</span> <span class="command">cat about.txt</span>'
    },
    {
        type: 'output',
        content: 'Full Stack Developer passionate about creating innovative solutions'
    },
    {
        type: 'output',
        content: 'Experience: 5+ years in web development'
    },
    {
        type: 'output',
        content: 'Education: Computer Science Graduate'
    },
    {
        type: 'command',
        content: '<span class="prompt">ketaki@portfolio:~$</span> <span class="command">ls skills/</span>'
    },
    {
        type: 'output',
        content: 'frontend/  backend/  databases/  tools/  design/'
    },
    {
        type: 'command',
        content: '<span class="prompt">ketaki@portfolio:~$</span> <span class="command">echo $MOTTO</span>'
    },
    {
        type: 'output',
        content: '"Code with purpose, design with passion, deliver with excellence"'
    },
    {
        type: 'command',
        content: '<span class="prompt">ketaki@portfolio:~$</span> <span class="command typing-animation">_</span>'
    }
];

let currentLine = 0;
let isTyping = false;

function typeTerminalLine() {
    if (currentLine >= terminalLines.length) return;
    
    isTyping = true;
    const line = terminalLines[currentLine];
    const terminalLine = document.createElement('div');
    terminalLine.className = 'terminal-line';
    
    if (line.type === 'command') {
        terminalLine.innerHTML = line.content;
    } else {
        terminalLine.textContent = line.content;
        terminalLine.style.color = 'var(--light-gray)';
        terminalLine.style.marginLeft = '1rem';
    }
    
    terminalContent.appendChild(terminalLine);
    
    // Animate the line appearing
    setTimeout(() => {
        terminalLine.style.opacity = '1';
        currentLine++;
        isTyping = false;
        
        // Continue to next line after a delay
        if (currentLine < terminalLines.length) {
            setTimeout(typeTerminalLine, line.type === 'command' ? 1000 : 800);
        }
    }, 100);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in animation
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Start terminal animation when terminal section is visible
            if (entry.target.classList.contains('terminal-section') && !isTyping && currentLine === 0) {
                setTimeout(() => {
                    typeTerminalLine();
                }, 500);
            }
            
            // Animate skill cards
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                entry.target.classList.add('animate-in');
            }
            
            // Animate project cards
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                entry.target.classList.add('animate-in');
            }
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('section, .skill-card, .project-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove background opacity based on scroll
    if (scrollTop > 100) {
        navbar.style.backgroundColor = 'rgba(34, 40, 49, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--dark-gray)';
        navbar.style.backdropFilter = 'none';
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Contact form handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    try {
        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        submitBtn.innerHTML = '✓ Message Sent!';
        submitBtn.style.background = '#27ca3f';
        
        // Reset form
        contactForm.reset();
        
        // Show success notification
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
    } catch (error) {
        // Show error message
        submitBtn.innerHTML = '✗ Failed to Send';
        submitBtn.style.background = '#ff5f56';
        
        showNotification('Failed to send message. Please try again.', 'error');
    }
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'linear-gradient(135deg, var(--cyan), #007a85)';
        submitBtn.disabled = false;
    }, 3000);
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ca3f' : type === 'error' ? '#ff5f56' : 'var(--cyan)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    const closeBtn = notification.querySelector('button');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Skills section counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 50);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Theme toggle functionality (bonus feature)
function createThemeToggle() {
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '🌙';
    toggleBtn.className = 'theme-toggle';
    toggleBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--cyan);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0, 173, 181, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        toggleBtn.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(toggleBtn);
}

// Initialize theme toggle
createThemeToggle();

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    const originalText = text;
    element.textContent = '';
    
    function type() {
        if (i < originalText.length) {
            element.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero .subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        typeWriter(subtitle, text, 80);
    }
});

// Smooth reveal animations for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add active class styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in.active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(activeStyle);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize reveal animations
    revealOnScroll();
});

// Handle form input focus effects
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// Add easter egg - konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 Easter egg found! You\'re awesome!', 'success');
        konamiCode = [];
    }
});

console.log('🚀 Portfolio loaded successfully! Try the Konami code for a surprise...');