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

    // Set up date restrictions (can't book in the past, respect salon closed days)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        // Set minimum date to today
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;
        dateInput.setAttribute('min', todayStr);
        
        // Add change event to validate day of week
        dateInput.addEventListener('change', function() {
            validateDate(this);
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

    // Booking Form Validation and Submission
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateBookingForm()) {
                // In a real application, you would send the form data to a server here
                // For demonstration, we'll show a success message
                showNotification('Your appointment has been booked successfully! You will receive a confirmation email shortly.', 'success');
                
                // You could redirect to a confirmation page or reset the form
                // bookingForm.reset();
            }
        });
        
        // Add input validation on blur
        const formInputs = bookingForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }

    // Date validation function
    function validateDate(dateField) {
        const selectedDate = new Date(dateField.value);
        const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Check if selected date is a Monday (salon is closed)
        if (dayOfWeek === 1) { // Monday is day 1
            showError(dateField, 'Sorry, the salon is closed on Mondays. Please choose another date.');
            return false;
        }
        
        // Clear any existing error
        clearError(dateField);
        return true;
    }

    // Form Validation Functions
    function validateBookingForm() {
        let isValid = true;
        const formInputs = bookingForm.querySelectorAll('input, select, textarea');
        
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        // Additional validation for date
        const dateInput = document.getElementById('date');
        if (dateInput && dateInput.value) {
            if (!validateDate(dateInput)) {
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function validateField(field) {
        let isValid = true;
        
        // Remove existing error message
        clearError(field);
        
        // Validate based on field type and requirements
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
    
    function clearError(field) {
        field.classList.remove('invalid');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
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

    // Initialize service selection effects
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            // You could add logic here to adjust available times based on service duration
            // For example, coloring services might take longer than a haircut
        });
    }
});