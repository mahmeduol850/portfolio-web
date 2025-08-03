// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.innerHTML = '&uarr;';
    scrollToTopBtn.title = 'Go to top';
    document.body.appendChild(scrollToTopBtn);

    // Navbar background and scroll-to-top button visibility
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        // Navbar effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll-to-top button visibility
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Scroll to top function
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        let fromTop = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (fromTop >= sectionTop && fromTop <= sectionTop + sectionHeight) {
                const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
                if (navLink) navLink.classList.add('active');
            } else {
                const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
                if (navLink) navLink.classList.remove('active');
            }
        });
    }

    // Initial scroll state
    handleScroll();
    
    // Add scroll event listeners
    window.addEventListener('scroll', function() {
        handleScroll();
        highlightNav();
    });
    }
});

// Add animation to sections when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .timeline-panel, .contact-info > div');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.classList.add('fade-in');
        }
    });
};

// Initial check
window.addEventListener('load', animateOnScroll);
// Check on scroll
window.addEventListener('scroll', animateOnScroll);

// Add current year to footer
document.addEventListener('DOMContentLoaded', function() {
    const year = new Date().getFullYear();
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        yearElement.textContent = `© ${year} Muhammad Ahmed. All rights reserved.`;
    }
});
