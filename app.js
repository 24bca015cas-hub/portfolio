// Page Navigation System
class PortfolioApp {
    constructor() {
        this.currentPage = 'home';
        this.pages = document.querySelectorAll('.page');
        this.navLinks = document.querySelectorAll('.nav__link');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initAnimations();
        // Initialize with home page visible
        this.initializePages();
    }
    
    initializePages() {
        // Hide all pages first
        this.pages.forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
        });
        
        // Show home page
        this.showPage('home');
        this.updateNavigation('home');
    }
    
    bindEvents() {
        // Navigation clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });
        
        // Smooth scroll for internal links
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('smooth-scroll')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
        
        // Add intersection observer for animations
        this.setupScrollAnimations();
        
        // Add hover effects for skill tags
        this.setupSkillTagAnimations();
    }
    
    navigateToPage(page) {
        if (page === this.currentPage) return;
        
        // Hide current page with animation
        const currentPageEl = document.getElementById(this.currentPage);
        
        if (currentPageEl) {
            currentPageEl.style.opacity = '0';
            currentPageEl.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                currentPageEl.classList.remove('active');
                currentPageEl.style.display = 'none';
                this.showPage(page);
            }, 300);
        } else {
            this.showPage(page);
        }
        
        // Update navigation
        this.updateNavigation(page);
        this.currentPage = page;
        
        // Update browser history
        window.history.pushState({page: page}, '', `#${page}`);
    }
    
    showPage(page) {
        const pageEl = document.getElementById(page);
        if (pageEl) {
            // Reset styles and show page
            pageEl.style.display = 'block';
            pageEl.style.opacity = '0';
            pageEl.style.transform = 'translateY(20px)';
            
            // Force reflow
            pageEl.offsetHeight;
            
            // Add active class and animate in
            pageEl.classList.add('active');
            
            // Animate in with delay
            setTimeout(() => {
                pageEl.style.opacity = '1';
                pageEl.style.transform = 'translateY(0)';
            }, 50);
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Trigger page-specific animations
            this.triggerPageAnimations(page);
        }
    }
    
    triggerPageAnimations(page) {
        if (page === 'contact') {
            // Animate contact cards
            const contactCards = document.querySelectorAll('.contact-card');
            contactCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 200 + (index * 100));
            });
        }
    }
    
    updateNavigation(activePage) {
        this.navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            if (linkPage === activePage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    initAnimations() {
        // Add stagger animation to skill tags
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
            tag.classList.add('fade-in-up');
        });
        
        // Add animation to social links
        const socialLinks = document.querySelectorAll('.social__link');
        socialLinks.forEach((link, index) => {
            link.style.animationDelay = `${index * 0.1}s`;
            link.classList.add('fade-in-up');
        });
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.about__content, .social, .contact-card, .project');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    setupSkillTagAnimations() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                // Add ripple effect
                this.createRippleEffect(tag);
            });
        });
    }
    
    createRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Enhanced Image Interaction
class ImageEffects {
    constructor() {
        this.heroImage = document.querySelector('.hero__image');
        this.init();
    }
    
    init() {
        if (this.heroImage) {
            this.setupMouseTracking();
            this.setupClickEffect();
        }
    }
    
    setupMouseTracking() {
        this.heroImage.addEventListener('mousemove', (e) => {
            const rect = this.heroImage.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (mouseY / rect.height) * 5;
            const rotateY = (mouseX / rect.width) * -5;
            
            this.heroImage.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        this.heroImage.addEventListener('mouseleave', () => {
            this.heroImage.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
        });
    }
    
    setupClickEffect() {
        this.heroImage.addEventListener('click', () => {
            this.heroImage.style.animation = 'none';
            this.heroImage.offsetHeight; // Trigger reflow
            this.heroImage.style.animation = 'pulse 0.6s ease-in-out';
            
            setTimeout(() => {
                this.heroImage.style.animation = '';
            }, 600);
        });
    }
}

// Social Media Links Handler
class SocialLinksHandler {
    constructor() {
        this.init();
    }
    
    init() {
        // Ensure all social links open in new tabs
        const socialLinks = document.querySelectorAll('.social__link');
        socialLinks.forEach(link => {
            // Add target="_blank" if not already present
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
            }
            // Add rel="noopener noreferrer" for security
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add click analytics/tracking if needed
            link.addEventListener('click', (e) => {
                console.log(`Social link clicked: ${link.getAttribute('href')}`);
                // Add analytics tracking here if needed
            });
        });
    }
}

// Smooth Scrolling Enhancement
class SmoothScrolling {
    constructor() {
        this.init();
    }
    
    init() {
        // Add smooth scrolling to all internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link && !link.classList.contains('nav__link')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
}

// Loading Animation
class LoadingAnimation {
    constructor() {
        this.init();
    }
    
    init() {
        // Add loading class to body
        document.body.classList.add('loading');
        
        // Remove loading class when page is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
                this.startEntryAnimations();
            }, 300);
        });
    }
    
    startEntryAnimations() {
        // Trigger hero animations
        const heroImage = document.querySelector('.hero__image-container');
        const heroText = document.querySelector('.hero__text');
        
        if (heroImage) {
            heroImage.style.animation = 'heroImageEnter 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both';
        }
        
        if (heroText) {
            heroText.style.animation = 'heroTextEnter 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both';
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    window.portfolioApp = new PortfolioApp();
    new ImageEffects();
    new SocialLinksHandler();
    new SmoothScrolling();
    new LoadingAnimation();
    
    // Add CSS for additional animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        /* Additional animations */
        .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        body.loading * {
            animation-play-state: paused;
        }
        
        /* Improved hover transitions */
        .contact-card,
        .skill-tag,
        .social__link {
            will-change: transform;
        }
        
        /* Performance optimizations */
        .hero__image {
            will-change: transform;
            transform-style: preserve-3d;
        }
        
        /* Ensure pages are properly hidden/shown */
        .page {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            display: none;
        }
        
        .page.active {
            opacity: 1;
            transform: translateY(0);
            display: block;
        }
        
        /* Contact page specific styling */
        .contact-card {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    document.head.appendChild(additionalStyles);
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    if (window.portfolioApp && e.state && e.state.page) {
        window.portfolioApp.navigateToPage(e.state.page);
    }
});

// Export for potential external use
window.PortfolioApp = PortfolioApp;