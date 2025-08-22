// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Service category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter service cards
            serviceCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    // Add animation for appearing cards
                    card.style.animation = 'fadeIn 0.5s forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on FAQ item
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
            
            // Rotate chevron icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });
    
    // Testimonial carousel functionality
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
        let currentTestimonial = 0;
        
        // Function to show a specific testimonial
        function showTestimonial(index) {
            testimonialCards.forEach(card => {
                card.style.display = 'none';
                card.classList.remove('active');
            });
            testimonialCards[index].style.display = 'block';
            setTimeout(() => {
                testimonialCards[index].classList.add('active');
            }, 50);
        }
        
        // Initially show the first testimonial
        showTestimonial(currentTestimonial);
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's not an on-page anchor
            if (this.getAttribute('href') === '#' || 
                this.getAttribute('href').startsWith('#!') ||
                this.getAttribute('href').startsWith('javascript')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            // Only process internal page anchors
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Newsletter form validation
    const subscribeForm = document.querySelector('.footer-column form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }
            
            // Here you would typically send the data to a server
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Add loading state to buttons to improve UX
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only add loading for buttons that likely trigger actions
            if (this.getAttribute('type') !== 'submit' && 
                !this.getAttribute('href').includes('booking.html')) {
                return;
            }
            
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.classList.add('loading');
            
            // Prevent further clicks while loading
            e.preventDefault();
            
            // For demonstration, reset after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('loading');
                
                // If it's a booking button, navigate to booking page
                if (this.getAttribute('href').includes('booking.html')) {
                    window.location.href = this.getAttribute('href');
                }
            }, 2000);
        });
    });
    
    // Add scroll animation for sections
    const animatedSections = document.querySelectorAll('.services, .pricing, .process, .testimonials, .faq, .cta');
    
    function checkScroll() {
        animatedSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }
    
    // Check scroll position on load and scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Initialize by checking scroll position
    checkScroll();
});