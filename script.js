document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const starsContainer = document.getElementById('starsContainer');
    const petalsContainer = document.getElementById('petalsContainer');
    const heartButton = document.getElementById('heartButton');
    const secretArea = document.getElementById('secretArea');
    const secretMessage = document.getElementById('secretMessage');
    const sweetMessageModal = document.getElementById('sweetMessageModal');
    const sweetMessage = document.getElementById('sweetMessage');
    const closeModal = document.getElementById('closeModal');
    
    let isDarkMode = false;
    let isSecretVisible = false;
    let floatingHearts = [];
    let petals = [];
    let activeMessage = null;

    // Sweet messages for floating hearts
    const sweetMessages = [
        "Ты моё солнышко 🌞",
        "Ты причина моей улыбки 💖",
        "Я скучаю по тебе каждую секунду 💋",
        "Моё сердце бьётся только для тебя ❤️‍🔥",
        "Ты - моя любовь 💝",
        "Ты - моё счастье ✨",
        "Ты - моя мечта 🌟",
        "Ты - моя радость 💕",
        "Ты - моя нежность 💗",
        "Ты - моя любовь навсегда 💘"
    ];

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

    // Create petals
    function createPetals() {
        petalsContainer.innerHTML = '';
        for (let i = 0; i < 15; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.width = Math.random() * 15 + 10 + 'px';
            petal.style.height = petal.style.width;
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDelay = Math.random() * 5 + 's';
            petal.style.animationDuration = Math.random() * 5 + 5 + 's';
            petalsContainer.appendChild(petal);
        }
    }

    // Create floating hearts
    function createFloatingHearts() {
        const container = document.body;
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2 + 's';
            
            // Assign a specific message to each heart
            const message = sweetMessages[i % sweetMessages.length];
            
            heart.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!activeMessage) {  // Only show message if no other message is active
                    showHeartMessage(heart, message);
                }
            });
            
            container.appendChild(heart);
            floatingHearts.push(heart);
        }
    }

    // Show heart message
    function showHeartMessage(heart, message) {
        // Remove any existing message
        if (activeMessage) {
            activeMessage.remove();
        }

        // Create new message bubble
        const messageBubble = document.createElement('div');
        messageBubble.className = 'heart-message';
        messageBubble.textContent = message;

        // Position the message near the heart
        const heartRect = heart.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        messageBubble.style.position = 'absolute';
        messageBubble.style.left = `${heartRect.left + scrollLeft}px`;
        messageBubble.style.top = `${heartRect.top + scrollTop - 40}px`;

        document.body.appendChild(messageBubble);
        activeMessage = messageBubble;

        // Add entrance animation
        messageBubble.style.animation = 'messageAppear 0.3s ease-out forwards';

        // Remove message after delay
        setTimeout(() => {
            messageBubble.style.animation = 'messageDisappear 0.3s ease-out forwards';
            setTimeout(() => {
                messageBubble.remove();
                activeMessage = null;
            }, 300);
        }, 3000);
    }

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        if (isDarkMode) {
            createStars();
        }
    });

    // Heart button click
    heartButton.addEventListener('click', () => {
        heartButton.classList.add('pulse');
        setTimeout(() => {
            window.location.href = 'gallery.html';
        }, 800);
    });

    // Secret area
    secretArea.addEventListener('click', () => {
        if (!isSecretVisible) {
            secretMessage.style.display = 'block';
            isSecretVisible = true;
            setTimeout(() => {
                secretMessage.style.display = 'none';
                isSecretVisible = false;
            }, 3000);
        }
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        sweetMessageModal.style.display = 'none';
    });

    // Close modal when clicking outside
    sweetMessageModal.addEventListener('click', (e) => {
        if (e.target === sweetMessageModal) {
            sweetMessageModal.style.display = 'none';
        }
    });

    // Initialize animations
    createPetals();
    createFloatingHearts();

    // Love phrases animation
    const phrases = document.querySelectorAll('.love-phrase');
    phrases.forEach((phrase, index) => {
        phrase.style.animationDelay = `${index * 8}s`;
    });
}); 