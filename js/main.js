// Navigation Active Link Handler
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.left = navMenu.style.left === '0px' ? '-100%' : '0px';
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.left = '-100%';
    });
});

// Scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animations
document.querySelectorAll('.project-card, .skill-category, .experience-card, .achievement-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Update email links
const emailElements = document.querySelectorAll('a[href="mailto:adapanishithreddy121@gmail.com"]');
emailElements.forEach(el => {
    el.href = 'mailto:adapanishithreddy121@gmail.com';
});

// Update GitHub and LinkedIn links
document.querySelector('a[href="https://github.com"]').href = 'https://github.com/nishith232-A';
document.querySelector('a[href="https://linkedin.com"]').href = 'https://www.linkedin.com/in/adapa-nishith-reddy-615177285/';
document.querySelector('a[href="https://twitter.com"]').href = 'https://twitter.com/nishith';
