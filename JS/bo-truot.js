document.addEventListener('DOMContentLoaded', function() {
    initSlideshow();
});
function initSlideshow() {
    const slides = document.querySelectorAll('.slideshow-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 1; 
    let slideInterval;
    const slideshowContainer = document.querySelector('.slideshow-container'); 

    if (slideshowContainer) {
        slideshowContainer.style.cursor = 'grab';
    }
    function startSlideshow() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000); 
    }

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval); 
            showSlide(index);
            startSlideshow(); 
        });
    });

    startSlideshow();

    let touchstartX = 0;
    let touchendX = 0;
    let isDragging = false;

    function handleGesture() {
        if (touchendX < touchstartX - 50) { 
            clearInterval(slideInterval);
            nextSlide();
            startSlideshow();
        }
        if (touchendX > touchstartX + 50) { 
            clearInterval(slideInterval);
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
            startSlideshow();
        }
    }

    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slideshowContainer.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleGesture();
        });

        slideshowContainer.addEventListener('mousedown', e => {
            isDragging = true;
            touchstartX = e.screenX;
            slideshowContainer.style.cursor = 'grabbing';
        });

        slideshowContainer.addEventListener('mouseup', e => {
            if (isDragging) {
                isDragging = false;
                touchendX = e.screenX;
                slideshowContainer.style.cursor = 'grab';
                handleGesture();
            }
        });

        slideshowContainer.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                slideshowContainer.style.cursor = 'grab';
            }
        });
    }
} 