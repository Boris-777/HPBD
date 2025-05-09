document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.gallery-wrapper');
    const items = document.querySelectorAll('.gallery-item');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const themeToggle = document.getElementById('themeToggle');
    const starsContainer = document.getElementById('starsContainer');
    
    let currentIndex = 0;
    const totalItems = items.length;
    let isDarkMode = false;

    // Create stars for night mode
    function createStars() {
        starsContainer.innerHTML = '';
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 2 + 's';
            starsContainer.appendChild(star);
        }
    }

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        if (isDarkMode) {
            createStars();
        }
    });
    
    // Create thumbnails
    items.forEach((item, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        if (index === 0) thumbnail.classList.add('active');
        
        const img = item.querySelector('img').cloneNode();
        thumbnail.appendChild(img);
        
        thumbnail.addEventListener('click', () => {
            goToSlide(index);
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    function updateGallery() {
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update thumbnails
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });

        // Animate current image
        const currentImage = items[currentIndex].querySelector('img');
        currentImage.style.animation = 'none';
        currentImage.offsetHeight; // Trigger reflow
        currentImage.style.animation = 'imageAppear 0.5s ease-out';
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateGallery();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateGallery();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateGallery();
    }
    
    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Initial animation
    updateGallery();
}); 