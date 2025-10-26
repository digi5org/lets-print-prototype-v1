// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Pricing Toggle (Monthly/Annual)
const pricingToggle = document.getElementById('pricingToggle');
const monthlyLabel = document.getElementById('monthlyLabel');
const annualLabel = document.getElementById('annualLabel');
const priceAmounts = document.querySelectorAll('.pricing-price .amount');

if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
        const isAnnual = pricingToggle.checked;
        
        // Toggle active class on labels
        monthlyLabel.classList.toggle('active', !isAnnual);
        annualLabel.classList.toggle('active', isAnnual);
        
        // Update prices with animation
        priceAmounts.forEach(amount => {
            const monthlyPrice = amount.getAttribute('data-monthly');
            const annualPrice = amount.getAttribute('data-annual');
            
            // Add animation class
            amount.style.transform = 'scale(0.8)';
            amount.style.opacity = '0';
            
            setTimeout(() => {
                amount.textContent = isAnnual ? annualPrice : monthlyPrice;
                amount.style.transform = 'scale(1)';
                amount.style.opacity = '1';
            }, 150);
        });
    });
}

// Testimonials Slider
let currentTestimonial = 0;
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialCards = testimonialTrack ? testimonialTrack.querySelectorAll('.testimonial-card') : [];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('testimonialDots');

// Create dots for testimonials
if (dotsContainer && testimonialCards.length > 0) {
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot-btn');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
}

const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot-btn') : [];

function updateTestimonialSlider() {
    if (testimonialTrack && testimonialCards.length > 0) {
        const offset = -currentTestimonial * 100;
        testimonialTrack.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonialSlider();
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateTestimonialSlider();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    updateTestimonialSlider();
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
}

// Auto-advance testimonials every 5 seconds
let testimonialInterval;
if (testimonialCards.length > 0) {
    testimonialInterval = setInterval(nextTestimonial, 5000);

    // Pause auto-advance on hover
    if (testimonialTrack) {
        testimonialTrack.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        testimonialTrack.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
    }
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" (used for demo buttons)
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 217, 255, 0.2)';
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.borderBottomColor = 'rgba(0, 217, 255, 0.3)';
    } else {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 217, 255, 0.15)';
        navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        navbar.style.borderBottomColor = 'rgba(0, 217, 255, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.role-card, .step, .feature-card, .pricing-card, .testimonial-card, .faq-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add floating animation to hero mockup
const heroMockup = document.querySelector('.hero-mockup');
if (heroMockup) {
    let floatDirection = 1;
    let floatPosition = 0;
    
    setInterval(() => {
        floatPosition += floatDirection * 0.5;
        
        if (floatPosition > 10 || floatPosition < -10) {
            floatDirection *= -1;
        }
        
        heroMockup.style.transform = `translateY(${floatPosition}px)`;
    }, 50);
}

// Handle demo button clicks
const demoButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
demoButtons.forEach(button => {
    if (button.getAttribute('href') === '#') {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a simple notification
            const notification = document.createElement('div');
            notification.textContent = '🚀 Demo functionality - This would open the respective action!';
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: #2563EB;
                color: white;
                padding: 16px 32px;
                border-radius: 8px;
                box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                font-weight: 600;
                animation: slideDown 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        });
    }
});

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
    }
`;
document.head.appendChild(style);

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe hero stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            // Extract number from text (e.g., "500+" -> 500)
            const number = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/[\d.]/g, '');
            
            let counter = 0;
            const interval = setInterval(() => {
                counter += Math.ceil(number / 50);
                if (counter >= number) {
                    statNumber.textContent = number + suffix;
                    clearInterval(interval);
                } else {
                    statNumber.textContent = counter + suffix;
                }
            }, 30);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelectorAll('.hero-stats .stat');
heroStats.forEach(stat => statsObserver.observe(stat));

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && scrolled < window.innerHeight) {
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroText) {
            heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
});

// Template Selection
function selectTemplate(templateName) {
    // Create a notification for template selection
    const notification = document.createElement('div');
    
    const templateNames = {
        'modern': 'Modern Minimalist',
        'creative': 'Creative Studio',
        'ecommerce': 'E-Commerce Pro',
        'bold': 'Bold Impact',
        'classic': 'Classic Business',
        'startup': 'Startup Launch'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            <div>
                <strong>${templateNames[templateName]} Template Selected!</strong><br>
                <small>Setting up your storefront...</small>
            </div>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        color: white;
        padding: 20px 32px;
        border-radius: 12px;
        box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 500;
        animation: slideDown 0.3s ease;
        min-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Simulate loading and redirect to dashboard
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 12px;">�</div>
                    <strong>Template Ready!</strong><br>
                    <small>Redirecting to your dashboard...</small>
                </div>
            `;
            successMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                color: #111827;
                padding: 40px 60px;
                border-radius: 16px;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                z-index: 10001;
                animation: scaleIn 0.3s ease;
            `;
            
            document.body.appendChild(successMsg);
            
            // Add overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `;
            document.body.appendChild(overlay);
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }, 300);
    }, 2000);
}

// Preview Template
const previewButtons = document.querySelectorAll('.btn-preview');
previewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Get the template card
        const templateCard = button.closest('.template-card');
        const templateInfo = templateCard.querySelector('.template-info h3').textContent;
        
        // Create preview modal
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 32px; max-width: 800px; width: 90%; position: relative;">
                <button id="closeModal" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 32px; cursor: pointer; color: #6B7280;">&times;</button>
                <h2 style="margin-bottom: 16px; color: #111827;">${templateInfo}</h2>
                <p style="color: #6B7280; margin-bottom: 24px;">Full preview coming soon! This template includes:</p>
                <ul style="color: #374151; line-height: 2; margin-left: 24px;">
                    <li>Responsive design for all devices</li>
                    <li>Customizable colors and branding</li>
                    <li>Built-in product catalog</li>
                    <li>Shopping cart integration</li>
                    <li>Customer account portal</li>
                    <li>Order tracking system</li>
                </ul>
                <div style="margin-top: 32px; display: flex; gap: 12px; justify-content: center;">
                    <button class="btn-secondary" onclick="document.getElementById('closeModal').click()">Close</button>
                    <button class="btn-primary" onclick="selectTemplate('${templateCard.querySelector('.btn-use-template').onclick.toString().match(/'([^']+)'/)[1]}')">Use This Template</button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
            padding: 24px;
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('#closeModal');
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeBtn.click();
            }
        });
    });
});

// Add additional animation keyframes
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(additionalStyles);

// Log initialization
console.log('🎨 Let\'s Print - Landing Page Initialized');
console.log('📱 Mobile menu:', mobileMenuToggle ? 'Ready' : 'Not found');
console.log('💰 Pricing toggle:', pricingToggle ? 'Ready' : 'Not found');
console.log('💬 Testimonials:', testimonialCards.length + ' loaded');
console.log('❓ FAQ items:', faqItems.length + ' loaded');
console.log('🎨 Templates:', document.querySelectorAll('.template-card').length + ' available');

// Futuristic particle effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    document.body.prepend(particlesContainer);
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const startX = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(0, 217, 255, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            left: ${startX}%;
            bottom: -10px;
            animation: floatUp ${duration}s ${delay}s infinite;
            opacity: 0;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add animation keyframes
    const particleStyles = document.createElement('style');
    particleStyles.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.5;
            }
            90% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyles);
}

// Initialize particles
createParticles();

// Add cursor glow effect
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(0, 217, 255, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease-out;
    transform: translate(-50%, -50%);
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

console.log('✨ Futuristic effects loaded');
