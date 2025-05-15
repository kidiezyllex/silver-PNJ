document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    $('.banner-slides').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: true,
        prevArrow: $('.banner-slider .slider-prev'),
        nextArrow: $('.banner-slider .slider-next'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $('.product-slides').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        prevArrow: $('.product-slider .slider-prev'),
        nextArrow: $('.product-slider .slider-next'),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.special-slider .product-slides').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        prevArrow: $('.special-slider .slider-prev'),
        nextArrow: $('.special-slider .slider-next'),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const tagBtns = document.querySelectorAll('.tag-btn');
    tagBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            tagBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    const promotionItems = document.querySelectorAll('.promotion-item');
    promotionItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    const createMobileMenu = () => {
        const headerContent = document.querySelector('.header-content');
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

        headerContent.insertBefore(mobileMenuBtn, headerContent.firstChild);

        const mobileMenu = document.createElement('div');
        mobileMenu.classList.add('mobile-menu');

        const mainNav = document.querySelector('.main-nav ul').cloneNode(true);
        mobileMenu.appendChild(mainNav);

        document.body.appendChild(mobileMenu);

        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    };

    if (window.innerWidth < 992) {
        createMobileMenu();
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth < 992 && !document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        }
    });

    const addMobileMenuStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-btn {
                display: none;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
            }
            
            @media (max-width: 992px) {
                .mobile-menu-btn {
                    display: block;
                }
                
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    left: -100%;
                    width: 80%;
                    max-width: 300px;
                    height: 100vh;
                    background-color: #fff;
                    z-index: 1000;
                    padding: 50px 20px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    transition: left 0.3s ease;
                    overflow-y: auto;
                }
                
                .mobile-menu.active {
                    left: 0;
                }
                
                .mobile-menu ul {
                    flex-direction: column;
                }
                
                .mobile-menu ul li {
                    margin-bottom: 15px;
                }
                
                body.menu-open {
                    overflow: hidden;
                }
            }
        `;
        document.head.appendChild(style);
    };

    addMobileMenuStyles();

    const setupCountdown = () => {
        const now = new Date();
        const endTime = new Date(now.getTime() + 3 * 60 * 60 * 1000);
        const countdownEl = document.createElement('div');
        countdownEl.classList.add('countdown');
        countdownEl.innerHTML = `
            <div class="countdown-item">
                <span class="hours">03</span>
                <span class="label">Giờ</span>
            </div>
            <div class="countdown-item">
                <span class="minutes">00</span>
                <span class="label">Phút</span>
            </div>
            <div class="countdown-item">
                <span class="seconds">00</span>
                <span class="label">Giây</span>
            </div>
        `;

        const heroText = document.querySelector('.hero-text');
        heroText.insertBefore(countdownEl, document.querySelector('.promo-description'));
        const updateCountdown = () => {
            const now = new Date();
            const timeLeft = endTime - now;

            if (timeLeft <= 0) {
                countdownEl.innerHTML = '<p>Ưu đãi đã kết thúc!</p>';
                return;
            }

            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownEl.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
            countdownEl.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
            countdownEl.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
        };

        updateCountdown();

        setInterval(updateCountdown, 1000);

        const style = document.createElement('style');
        style.textContent = `
            .countdown {
                display: flex;
                gap: 15px;
                margin: 20px 0;
                justify-content: center;
            }
            
            .countdown-item {
                background-color: var(--filled-btn-bg);
                color: #fff;
                padding: 10px;
                border-radius: 5px;
                text-align: center;
                min-width: 60px;
            }
            
            .countdown-item span {
                display: block;
            }
            
            .countdown-item .hours,
            .countdown-item .minutes,
            .countdown-item .seconds {
                font-size: 24px;
                font-weight: bold;
            }
            
            .countdown-item .label {
                font-size: 12px;
                margin-top: 5px;
            }
            
            @media (max-width: 576px) {
                .countdown {
                    gap: 10px;
                }
                
                .countdown-item {
                    min-width: 50px;
                    padding: 8px;
                }
                
                .countdown-item .hours,
                .countdown-item .minutes,
                .countdown-item .seconds {
                    font-size: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    };

    setupCountdown();
});