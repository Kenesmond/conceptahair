// Wait for DOM to fully load
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

    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Before & After Slider
    const comparisonSlider = document.querySelector('.comparison-slider');
    if (comparisonSlider) {
        const sliderHandle = comparisonSlider.querySelector('.slider-handle');
        const beforeImage = comparisonSlider.querySelector('.before-image');
        
        let isMoving = false;
        
        // Function to move slider
        function moveSlider(clientX) {
            if (!isMoving) return;
            
            const sliderRect = comparisonSlider.getBoundingClientRect();
            let position = clientX - sliderRect.left;
            
            // Constrain position within slider bounds
            position = Math.max(0, Math.min(position, sliderRect.width));
            
            // Calculate percentage
            const percentage = (position / sliderRect.width) * 100;
            
            // Update UI
            beforeImage.style.width = `${percentage}%`;
            sliderHandle.style.left = `${percentage}%`;
        }
        
        // Event listeners for slider
        sliderHandle.addEventListener('mousedown', function() {
            isMoving = true;
        });
        
        comparisonSlider.addEventListener('mousemove', function(e) {
            moveSlider(e.clientX);
        });
        
        // Touch events for mobile
        sliderHandle.addEventListener('touchstart', function() {
            isMoving = true;
        });
        
        comparisonSlider.addEventListener('touchmove', function(e) {
            if (e.touches.length === 1) { // Only process if one finger is used
                moveSlider(e.touches[0].clientX);
            }
        });
        
        // Stop moving when mouse/touch is released
        document.addEventListener('mouseup', function() {
            isMoving = false;
        });
        
        document.addEventListener('touchend', function() {
            isMoving = false;
        });
        
        // Initialize slider position
        beforeImage.style.width = '50%';
        sliderHandle.style.left = '50%';
    }

    // Gallery Image Hover Effect Enhancement
    const galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.footer-column form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
});