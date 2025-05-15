document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    const categoryTrack = document.querySelector('.carousel-track');
    const categoryPrevBtn = document.querySelector('.product-categories .prev-btn');
    const categoryNextBtn = document.querySelector('.product-categories .next-btn');
    
    if (categoryTrack && categoryPrevBtn && categoryNextBtn) {
        const categoryItemWidth = categoryTrack.querySelector('.carousel-item').offsetWidth + 20;
        
        categoryPrevBtn.addEventListener('click', () => {
            categoryTrack.scrollBy({
                left: -categoryItemWidth * 3,
                behavior: 'smooth'
            });
        });
        
        categoryNextBtn.addEventListener('click', () => {
            categoryTrack.scrollBy({
                left: categoryItemWidth * 3,
                behavior: 'smooth'
            });
        });
    }

    const promotionsContainer = document.querySelector('.promotions-container');
    const promotionsPrevBtn = document.querySelector('.brand-promotions .prev-btn');
    const promotionsNextBtn = document.querySelector('.brand-promotions .next-btn');
    
    if (promotionsContainer && promotionsPrevBtn && promotionsNextBtn) {
        const promotionCardWidth = promotionsContainer.querySelector('.promotion-card').offsetWidth + 20;
        
        promotionsPrevBtn.addEventListener('click', () => {
            promotionsContainer.scrollBy({
                left: -promotionCardWidth,
                behavior: 'smooth'
            });
        });
        
        promotionsNextBtn.addEventListener('click', () => {
            promotionsContainer.scrollBy({
                left: promotionCardWidth,
                behavior: 'smooth'
            });
        });
    }

    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        const nameInput = registrationForm.querySelector('input[type="text"]');
        const phoneInput = registrationForm.querySelector('input[type="tel"]');
        const selectInput = registrationForm.querySelector('select');
        
        nameInput.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
        
        phoneInput.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    }
});
const shellImage = new Image();
shellImage.src = 'IMG/shell.png';