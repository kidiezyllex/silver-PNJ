document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS === 'undefined') {
        console.warn('AOS is not properly initialized. Ensure AOS library is included.');
    } else {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true,
            offset: 100
        });
    }

    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    createPlaceholderLogo();
});

document.addEventListener('DOMContentLoaded', function() {

    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn-filled')) {
                this.style.background = 'linear-gradient(45deg, #143765, #1a4b8a)';
            } else if (this.classList.contains('btn-outline')) {
                this.style.background = 'linear-gradient(45deg, #ECF3FB, #d9e9f7)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (this.classList.contains('btn-filled')) {
                this.style.background = '#143765';
            } else if (this.classList.contains('btn-outline')) {
                this.style.background = '#ECF3FB';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach((item, index) => {
        if (!item.classList.contains('logo-item')) {
            item.style.backgroundImage = `url(https://picsum.photos/400/300?random=${30 + index})`;
            item.style.backgroundSize = 'cover';
            item.style.backgroundPosition = 'center';
        }
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
            
            const title = this.querySelector('h3');
            const button = this.querySelector('.btn');
            
            if (title) {
                title.style.transform = 'translateY(-5px)';
                title.style.transition = 'all 0.3s ease';
            }
            
            if (button) {
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            
            const title = this.querySelector('h3');
            const button = this.querySelector('.btn');
            
            if (title) {
                title.style.transform = 'translateY(0)';
            }
            
            if (button) {
                button.style.opacity = '0.8';
                button.style.transform = 'translateY(5px)';
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const gridButtons = document.querySelectorAll('.grid-item .btn');
    
    gridButtons.forEach(button => {
        button.style.opacity = '0.8';
        button.style.transform = 'translateY(5px)';
        button.style.transition = 'all 0.3s ease';
    });
});