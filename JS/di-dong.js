document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            if (mainNav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        document.addEventListener('click', function(event) {
            const isClickInside = mainNav.contains(event.target) || mobileToggle.contains(event.target);
            
            if (!isClickInside && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                body.style.overflow = '';
            }
        });
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }
    
    function handleResize() {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            body.style.overflow = '';
        }
    }
    
    window.addEventListener('resize', handleResize);
}); 