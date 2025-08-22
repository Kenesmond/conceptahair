// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const faqAnswer = this.nextElementSibling;
                const icon = this.querySelector('i');
                
                // Toggle active class on FAQ item
                faqItem.classList.toggle('active');
                
                // Toggle icon rotation
                if (faqItem.classList.contains('active')) {
                    faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    faqAnswer.style.maxHeight = '0';
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
                
                // Close other FAQ items if needed
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem && item.classList.contains('active')) {
                        item.classList.remove('active');
                        const otherAnswer = item.querySelector('.faq-answer');
                        const otherIcon = item.querySelector('.faq-question i');
                        otherAnswer.style.maxHeight = '0';
                        otherIcon.classList.remove('fa-chevron-up');
                        otherIcon.classList.add('fa-chevron-down');
                    }
                });
            });
        });
        
        // Initialize FAQ answers to be closed
        document.querySelectorAll('.faq-answer').forEach(answer => {
            answer.style.maxHeight = '0';
        });
    }

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // In a real application, you would send the form data to a server here
                // For demonstration, we'll show a success message
                showNotification('Your message has been sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();
            }
        });
        
        // Add input validation on blur
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }

    // Form Validation Functions
    function validateForm() {
        let isValid = true;
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        let isValid = true;
        const errorElement = field.nextElementSibling;
        
        // Remove existing error message
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        
        // Validate based on field type
        if (field.hasAttribute('required') && !field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && field.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value)) {
                showError(field, 'Please enter a valid email address');
                isValid = false;
            }
        } else if (field.type === 'tel' && field.value.trim()) {
            const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phonePattern.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                showError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        // Add or remove validation styling
        if (isValid) {
            field.classList.remove('invalid');
            field.classList.add('valid');
        } else {
            field.classList.remove('valid');
            field.classList.add('invalid');
        }
        
        return isValid;
    }
    
    function showError(field, message) {
        field.classList.add('invalid');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '5px';
        errorElement.style.display = 'block';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }
    
    // Notification System
    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '4px';
        notification.style.color = 'white';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        notification.style.transition = 'opacity 0.3s, transform 0.3s';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        if (type === 'success') {
            notification.style.background = '#2ecc71';
        } else {
            notification.style.background = '#e74c3c';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('nav') && 
            !e.target.classList.contains('menu-toggle')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        }
    });

    // Initialize map with additional functionality if needed
    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe) {
        // Add loading indicator for map
        mapIframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Style initial state
        mapIframe.style.opacity = '0';
        mapIframe.style.transition = 'opacity 0.5s';
    }
});