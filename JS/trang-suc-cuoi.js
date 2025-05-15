document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    renderStyledEarrings('.earring-card', weddingJewelryData.slice(0, 8));
    renderStyledEarrings('.necklace-card', weddingJewelryData.slice(8, 16));
    renderStyledEarrings('.watch-card', watchData);
    setupProductInteractions();
    setupNewsletter();
    setupStickyHeader();
    setupSearch();
    initializeWeddingCollectionCarousel();
});

function initializeWeddingCollectionCarousel() {
    if (typeof jQuery !== 'undefined' && jQuery.fn.owlCarousel) {
        jQuery('.wedding-collection-carousel').owlCarousel({
            loop: true,
            margin: 20,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
        console.log('Wedding Collection Carousel initialized successfully.');
    } 
}

function renderProducts(containerId, products) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    products.forEach(product => {
        html += `
            <div class="product-card" data-aos="fade-up">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-actions">
                        <button class="action-btn"><i class="fas fa-heart"></i></button>
                        <button class="action-btn"><i class="fas fa-shopping-cart"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <div class="product-count">
                        <span class="icon"><i class="fas fa-eye"></i></span>
                        <span class="count">${Math.floor(Math.random() * 100) + 10}</span>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function setupProductInteractions() {
    setTimeout(() => {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const addToCartBtn = card.querySelector('.action-btn:nth-child(2)');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const productName = card.querySelector('.product-info h3').textContent;
                    
                    showNotification(`Đã thêm ${productName} vào giỏ hàng`);
                });
            }

            const wishlistBtn = card.querySelector('.action-btn:nth-child(1)');
            if (wishlistBtn) {
                wishlistBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const productName = card.querySelector('.product-info h3').textContent;
                    
                    const heartIcon = this.querySelector('i');
                    heartIcon.classList.toggle('active');
                    
                    if (heartIcon.classList.contains('active')) {
                        this.style.backgroundColor = '#C48C46';
                        this.style.color = '#ffffff';
                        showNotification(`Đã thêm ${productName} vào danh sách yêu thích`);
                    } else {
                        this.style.backgroundColor = '#ffffff';
                        this.style.color = '#333';
                        showNotification(`Đã xóa ${productName} khỏi danh sách yêu thích`);
                    }
                });
            }
        });
    }, 100);
}

function setupNewsletter() {
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input');
            if (emailInput.value.trim() !== '') {
                showNotification('Cảm ơn bạn đã đăng ký nhận thông tin!');
                emailInput.value = '';
            } else {
                showNotification('Vui lòng nhập email của bạn!', 'error');
            }
        });
    }
}

function setupStickyHeader() {
    const mainHeader = document.querySelector('.main-header');
    const mainNav = document.querySelector('.main-nav');
    let headerHeight = mainHeader.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > headerHeight) {
            mainNav.classList.add('sticky');
        } else {
            mainNav.classList.remove('sticky');
        }
    });
}

function setupSearch() {
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input');
            if (searchInput.value.trim() !== '') {
                showNotification(`Đang tìm kiếm: ${searchInput.value}`);
            }
        });
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '4px';
    notification.style.color = '#ffffff';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'all 0.3s ease';
    
    if (type === 'success') {
        notification.style.backgroundColor = '#C48C46';
    } else {
        notification.style.backgroundColor = '#e74c3c';
    }
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    .main-nav.sticky {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }
    
    .action-btn i.active {
        color: #ffffff;
    }
`;
document.head.appendChild(style);

const weddingJewelryData = [
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/221/sp-gb0000y003060-bong-tai-vang-24k-pnj-trau-cau-1.png",
        altText: "Bông tai cưới Vàng 24K PNJ Trầu Cau 0000Y003060",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Nhẫn cưới Kim cương Vàng trắng 14K PNJ Trầu Cau DD00W005772", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Bông tai cưới Vàng 24K PNJ Trầu Cau 0000Y003060",
        price: "33.433.000đ",
        discount: "Giảm ngay 15% tiền công"
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/225/sp-gbddddw004320-bong-tai-kim-cuong-vang-trang-14k-pnj-trau-cau-1.png",
        altText: "Bông tai Kim cương Vàng Trắng 14K PNJ Trầu Cau DDDDW004320",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Nhẫn cưới Kim cương Vàng trắng 14K PNJ Trầu Cau DD00W005772", height: "30px", width: "30px" },
        ],
        name: "Bông tai Kim cương Vàng Trắng 14K PNJ Trầu Cau DDDDW004320",
        price: "55.788.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/215/sp-gc0000y000425-day-co-vang-24k-pnj-1.png",
        altText: "Dây cổ cưới Vàng 24K PNJ 0000Y000425",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Dây cổ cưới Vàng 24K PNJ 0000Y000425", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Dây cổ cưới Vàng 24K PNJ Trầu Cau 0000Y000425",
        price: "283.931.000đ",
        discount: "Giảm ngay 15% tiền công"
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/225/sp-gcddddw000765-day-co-kim-cuong-vang-trang-14k-pnj-trau-cau-1.png",
        altText: "Dây cổ Kim cương Vàng Trắng 14K PNJ Trầu Cau DDDDW000765",
        icons: [],
        name: "Dây cổ Kim cương Vàng Trắng 14K PNJ Trầu Cau DDDDW000765",
        price: "716.626.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/225/sp-gndd00w005772-nhan-kim-cuong-vang-trang-14k-pnj-trau-cau-1.png",
        altText: "Nhẫn cưới Kim cương Vàng trắng 14K PNJ Trầu Cau DD00W005772",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Nhẫn cưới Kim cương Vàng trắng 14K PNJ Trầu Cau DD00W005772", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Nhẫn cưới Kim cương Vàng trắng 14K PNJ Trầu Cau DD00W005772",
        price: "12.609.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/222/sp-gndd00w005773-nhan-kim-cuong-vang-trang-14k-pnj-trau-cau-1.png",
        altText: "Nhẫn Kim cương Vàng Trắng 14K PNJ Trầu Cau DD00W005773",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Nhẫn cưới Kim cương Vàng trắng 14K PNJ Trầu Cau DD00W005772", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Nhẫn cưới Kim cương Vàng Trắng 14K PNJ Trầu Cau DD00W005773",
        price: "13.451.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/225/sp-gnddddw013306-nhan-kim-cuong-vang-trang-14k-pnj-trau-cau-1.png",
        altText: "Nhẫn Kim cương Vàng Trắng 14K PNJ Trầu Cau DDDDW013306",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Nhẫn cưới Kim cương Vàng trắng 14K PNJ Trầu Cau DD00W005772", height: "30px", width: "30px" },
        ],
        name: "Nhẫn Kim cương Vàng Trắng 14K PNJ Trầu Cau DDDDW013306",
        price: "58.744.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/222/sp-gnpaxmw000187-nhan-vang-trang-10k-dinh-ngoc-trai-akoya-pnj-trau-cau-01.png",
        altText: "Nhẫn Vàng trắng 10K Đính ngọc trai Akoya PNJ Trầu Cau PAXMW000187",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Nhẫn cưới Kim cương Vàng trắng 14K PNJ Trầu Cau DD00W005772", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Nhẫn Vàng trắng 10K Đính ngọc trai Akoya PNJ Trầu Cau PAXMW000187",
        price: "9.694.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/213/sp-gm0000w000423-mat-day-chuyen-vang-trang-y-18k-pnj-1.png",
        altText: "Mặt dây chuyền Vàng trắng Ý 18K PNJ 0000W000423",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Mặt dây chuyền Vàng trắng Ý 18K PNJ 0000W000423", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Mặt dây chuyền Vàng trắng Ý 18K PNJ 0000W000423",
        price: "3.038.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/119/gc0000w000142-day-co-vang-trang-10k-pnj-01.png",
        altText: "Dây cổ Vàng trắng 10K PNJ 0000W000142",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Dây cổ Vàng trắng 10K PNJ True Love 0000W000142", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Dây cổ Vàng trắng 10K PNJ True Love 0000W000142",
        price: "19.204.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/119/gl0000w000743-lac-tay-vang-trang-10k-pnj-01.png",
        altText: "Lắc tay Vàng trắng 10K PNJ 0000W000743",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Lắc tay Vàng trắng 10K PNJ True Love 0000W000743", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Lắc tay Vàng trắng 10K PNJ True Love 0000W000743",
        price: "8.647.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/117/gmxmxmw001868-mat-day-chuyen-vang-trang-10k-dinh-da-ecz-pnj-01.png",
        altText: "Mặt dây chuyền Vàng trắng 10K đính đá ECZ PNJ XMXMW001868",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Mặt dây chuyền Vàng trắng 10K đính đá ECZ PNJ True Love XMXMW001868",
        price: "1.797.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/117/SBXMXMW000060-1.png",
        altText: "Bông tai Bạc đính đá PNJSilver True Love XMXMW000060",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Bông tai Bạc đính đá PNJSilver True Love XMXMW000060",
        price: "595.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/192/sp-sixmxmw000020-hat-charm-bac-dinh-da-pnjsilver-true-love-1.png",
        altText: "Hạt charm bạc đính đá PNJSilver True Love XMXMW000020",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Hạt charm Bạc đính đá PNJSilver True Love XMXMW000020",
        price: "445.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/118/sn0000w000057-nhan-nam-bac-pnjsilver-1.png",
        altText: "Nhẫn Nam Bạc PNJSilver 0000W000057",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Nhẫn Nam Bạc PNJSilver True Love 0000W000057",
        price: "455.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/174/sp-gbxmxmw002351-bong-tai-vang-trang-10k-dinh-da-ecz-pnj-1.png",
        altText: "Bông tai Vàng Trắng 10K đính đá ECZ PNJ XMXMW002351",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Bông tai Vàng Trắng 10K đính đá ECZ PNJ XMXMW002351", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Bông tai Vàng Trắng 10K đính đá ECZ PNJ XMXMW002351",
        price: "8.791.000đ",
        discount: ""
    }
];

const watchData = [
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00l42.0073-dong-ho-disney-marvel-nam-m-9062rgb-day-da-42-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-9062RGB Dây Da 42 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-9062RGB Dây Da 42 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-9062RGB Dây Da 42 mm",
        price: "4.950.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p42.0070-dong-ho-disney-marvel-nam-m-9059sgg-day-cao-su-42-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-9059SGG Dây Cao Su 42 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-9059SGG Dây Cao Su 42 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-9059SGG Dây Cao Su 42 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p50.0069-dong-ho-disney-marvel-nam-m-5029hhb-day-da-50-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-5029HHB Dây Da 50 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-5029HHB Dây Cao su 50 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-5029HHB Dây Cao su 50 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p50.0068-dong-ho-disney-marvel-nam-m-5029blr-day-da-50-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-5029BLR Dây Da 50 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-5029BLR Dây Cao su 50 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-5029BLR Dây Cao su 50 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p50.0067-dong-ho-disney-marvel-nam-m-5029blb-day-da-50-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-5029BLB Dây Da 50 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-5029BLB Dây Cao su 50 mm", height: "30px", width: "30px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-5029BLB Dây Cao su 50 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p50.0066-dong-ho-disney-marvel-nam-m-5029bgb-day-da-50-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-5029BGB Dây Da 50 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-5029BGB Dây Cao su 50 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-5029BGB Dây Cao su 50 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p50.0065-dong-ho-disney-marvel-nam-m-5029brb-day-da-50-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-5029BRB Dây Da 50 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-5029BRB Dây Cao su 50 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-5029BRB Dây Cao su 50 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p37.0063-dong-ho-disney-marvel-nam-m-9199-01bbb-day-cao-su-37-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-9199-01BBB Dây Cao Su 37 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-9199-01BBB Dây Cao Su 37 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-9199-01BBB Dây Cao Su 37 mm",
        price: "3.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p37.0062-dong-ho-disney-marvel-nam-m-9199-01sww-day-cao-su-37-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-9199-01SWW Dây Cao Su 37 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-9199-01SWW Dây Cao Su 37 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-9199-01SWW Dây Cao Su 37 mm",
        price: "3.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p40.0061-dong-ho-disney-marvel-nam-m-9232ltw-day-cao-su-40-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-9232LTW Dây Cao Su 40 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-9232LTW Dây Cao Su 40 mm",
        price: "2.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p40.0060-dong-ho-disney-marvel-nam-m-9232bbb-day-cao-su-40-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-9232BBB Dây Cao Su 40 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-9232BBB Dây Cao Su 40 mm",
        price: "2.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiaf00p50.0059-dong-ho-disney-marvel-nam-m-6072w-day-cao-su-50-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-6072W Dây Cao Su 50 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-6072W Dây Cao Su 50 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-6072W Dây Cao Su 50 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiaf00p50.0058-dong-ho-disney-marvel-nam-m-6072b1-day-cao-su-50-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-6072B1 Dây Cao Su 50 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-6072B1 Dây Cao Su 50 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-6072B1 Dây Cao Su 50 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiaf00p50.0057-dong-ho-disney-marvel-nam-m-6072b-day-cao-su-50-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-6072B Dây Cao Su 50 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-6072B Dây Cao Su 50 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-6072B Dây Cao Su 50 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiaf00p50.0056-dong-ho-disney-marvel-nam-m-6069r-day-cao-su-50-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-6069R Dây Cao Su 50 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-6069R Dây Cao Su 50 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-6069R Dây Cao Su 50 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiaf00p50.0055-dong-ho-disney-marvel-nam-m-6069b-day-cao-su-50-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-6069B Dây Cao Su 50 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-6069B Dây Cao Su 50 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-6069B Dây Cao Su 50 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiaf00p53.0054-dong-ho-disney-marvel-nam-m-6066r-day-cao-su-53-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-6066R Dây Cao Su 53 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-6066R Dây Cao Su 53 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-6066R Dây Cao Su 53 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiaf00p53.0053-dong-ho-disney-marvel-nam-m-6066b-day-cao-su-53-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-6066B Dây Cao Su 53 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-6066B Dây Cao Su 53 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-6066B Dây Cao Su 53 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p52.0051-dong-ho-disney-marvel-nam-m-5042w-day-da-52-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-5042W Dây Da 52 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-5042W Dây Cao su 52 mm",
        price: "2.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p52.0049-dong-ho-disney-marvel-nam-m-5042b-day-da-52-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-5042B Dây Da 52 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-5042B Dây Cao su 52 mm",
        price: "2.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiaf00p42.0048-dong-ho-disney-marvel-nam-m-6071w-day-cao-su-42-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-6071W Dây Cao Su 42 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-6071W Dây Cao Su 42 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-6071W Dây Cao Su 42 mm",
        price: "3.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiaf00p42.0047-dong-ho-disney-marvel-nam-m-6071b1-day-cao-su-42-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-6071B1 Dây Cao Su 42 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-6071B1 Dây Cao Su 42 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-6071B1 Dây Cao Su 42 mm",
        price: "3.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiaf00p42.0046-dong-ho-disney-marvel-nam-m-6071b-day-cao-su-42-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-6071B Dây Cao Su 42 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-6071B Dây Cao Su 42 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-6071B Dây Cao Su 42 mm",
        price: "3.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiaf00p43.0045-dong-ho-disney-marvel-nam-m-6070w-day-cao-su-43-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-6070W Dây Cao Su 43 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-6070W Dây Cao Su 43 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-6070W Dây Cao Su 43 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiaf00p43.0044-dong-ho-disney-marvel-nam-m-6070b1-day-cao-su-43-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-6070B1 Dây Cao Su 43 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-6070B1 Dây Cao Su 43 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-6070B1 Dây Cao Su 43 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiaf00s43.0043-dong-ho-disney-marvel-nam-m-6070b-day-kim-loai-43-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-6070B Dây Kim Loại 43 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg", alt: "Đồng hồ Disney & Marvel Nam M-6070B Dây Kim Loại 43 mm", height: "30px", width: "30px" },
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-6070B Dây Kim Loại 43 mm",
        price: "4.750.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p52.0039-dong-ho-disney-marvel-nam-m-5040b-day-da-52-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-5040B Dây Da 52 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-5040B Dây Cao su 52 mm",
        price: "2.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p52.0038-dong-ho-disney-marvel-nam-m-5040w-day-da-52-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-5040W Dây Da 52 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-5040W Dây Cao su 52 mm",
        price: "2.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p43.0037-dong-ho-disney-marvel-nam-m-9306w-day-cao-su-43-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-9306W Dây Cao Su 43 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-9306W Dây Cao Su 43 mm",
        price: "2.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00p43.0035-dong-ho-disney-marvel-nam-m-9306b-day-cao-su-43-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-9306B Dây Cao Su 43 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-9306B Dây Cao Su 43 mm",
        price: "2.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wmdiqf00s43.0034-dong-ho-disney-marvel-nam-m-9304w-day-kim-loai-43-mm-1.png",
        altText: "Đồng hồ Disney & Marvel Nam M-9304W Dây Kim Loại 43 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney & Marvel Nam M-9304W Dây Kim Loại 43 mm",
        price: "2.550.000đ",
        discount: ""
    },
    {
        imgSrc: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/211/sp-wfdiqfw0m28.0028-dong-ho-disney-watch-nu-pr-21014s2-day-kim-loai-28-mm-1.png",
        altText: "Đồng hồ Disney Watch Nữ PR-21014S2 Dây Kim Loại 28 mm",
        icons: [
            { src: "https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg", alt: "Giao hàng nhanh", height: "40px", width: "40px" }
        ],
        name: "Đồng hồ Disney Watch Nữ PR-21014S2 Dây Kim Loại 28 mm",
        price: "2.050.000đ",
        discount: ""
    }
];

function renderStyledEarrings(containerSelector, products) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error(`Earrings container "${containerSelector}" not found.`);
        return;
    }

    let html = '';
    products.forEach(product => {
        let iconsHtml = '';
        if (product.icons && product.icons.length > 0) {
            product.icons.forEach(icon => {
                iconsHtml += `<img src="${icon.src}" alt="${icon.alt}" height="${icon.height}" width="${icon.width}">`;
            });
        }

        const iconContainerJustify = 'space-between';

        html += `
            <div style="padding-bottom: 25px; background-color: #F7F7F7; display: flex; flex-direction: column; align-items: center; justify-content: center; max-width: 300px;">
                <img src="${product.imgSrc}" alt="${product.altText}" width="300px">
                <div style="display: flex; flex-direction: row; align-items: center; justify-content: ${iconContainerJustify}; padding-left: 20px; padding-right: 20px; margin-top: -50px; width: 100%; margin-bottom: 25px; min-height: 40px;">
                    ${iconsHtml}
                </div>
                <p style="font-size: 14px; color: #333333; text-align: center;">${product.name}</p>
                <p style="font-size: 16px; font-weight: 600; color: #C48C46; text-align: center;">${product.price}</p>
                <p style="font-size: 12px; color: red ; text-align: center;">${product.discount}</p>
            </div>
        `;
    });
    container.innerHTML = html;
}