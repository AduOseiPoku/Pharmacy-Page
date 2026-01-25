// Pharmacy Page JavaScript Enhancements

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Trigger counter animation when element becomes visible
                if (entry.target.classList.contains('left-icon') || entry.target.classList.contains('right-icon')) {
                    const numberElement = entry.target.querySelector('p:nth-of-type(1)');
                    if (numberElement && !numberElement.dataset.animated) {
                        const targetNumber = parseInt(numberElement.textContent);
                        animateCounter(numberElement, targetNumber);
                        numberElement.dataset.animated = 'true';
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all cards and icons
    document.querySelectorAll('.info-card, .left-icon, .right-icon').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    
    // ============================================
    // 2. COUNTER ANIMATION
    // ============================================
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 2000; // 2 seconds
        const stepTime = duration / 60;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, stepTime);
    }

    
    // ============================================
    // 3. BUTTON RIPPLE EFFECT
    // ============================================
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    
    // ============================================
    // 4. SMOOTH SCROLL FOR NAVIGATION (if you add anchor links)
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    
    // ============================================
    // 5. HEADER BACKGROUND ON SCROLL
    // ============================================
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 191, 165, 0.2)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 191, 165, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    
    // ============================================
    // 6. CARD STAGGER ANIMATION
    // ============================================
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    
    // ============================================
    // 7. ACTIVE NAV LINK HIGHLIGHTING (Optional)
    // ============================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
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
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    
    // ============================================
    // 8. PERFORMANCE: Lazy Load Images (Optional Enhancement)
    // ============================================
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });

    
    // ============================================
    // 9. CONSOLE WELCOME MESSAGE
    // ============================================
    console.log('%c🏥 Pharm Direct - Powered by Modern Web Tech', 
        'color: #00BFA5; font-size: 16px; font-weight: bold;');
    console.log('%cWebsite loaded successfully! ✨', 
        'color: #0B1B32; font-size: 12px;');
});
