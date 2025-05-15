import { featuredProducts } from "../mocks/du-lieu.js";

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true
    });
    
    const productsContainer = document.querySelector('.products-container');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    const productSection = document.querySelector('.product-grid-section .container');
    if (productSection) {
        const filterBadgesContainer = document.createElement('div');
        filterBadgesContainer.className = 'filter-badges';
        
        const sectionHeader = productSection.querySelector('.section-header');
        if (sectionHeader) {
            sectionHeader.insertAdjacentElement('afterend', filterBadgesContainer);
        }
        
        const filterBadges = filterBadgesContainer.querySelectorAll('.filter-badge');
        filterBadges.forEach(badge => {
            badge.addEventListener('click', function() {
                filterBadges.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const selectedCategory = this.getAttribute('data-category');
                filterProducts(selectedCategory);
            });
        });
    }
    
    function filterProducts(category) {
        let filteredProducts;
        if (category === 'all') {
            filteredProducts = featuredProducts;
        } else {
            filteredProducts = featuredProducts.filter(product => 
                product.categories && product.categories.includes(category)
            );
        }
        
        if (productsContainer) {
            productsContainer.innerHTML = filteredProducts.map(createProductCard).join('');
            initProductCardEvents();
            currentIndex = 0;
            moveSlider(0);
            const productCards = document.querySelectorAll('.product-card');
            productsPerView = calculateProductsPerView();
            cardWidth = calculateCardWidth();
            maxIndex = Math.max(0, productCards.length - productsPerView);
            updateButtonStates();
        }
    }

    function createProductCard(product) {
        let imagesHtml = '';
        imagesHtml = `
        <div class="product-image primary-image">
            <img src="${product.images[0]}" alt="${product.name}">
        </div>
    `;
        const discountHtml = product.discount ? `<div class="product-discount"><i class='fa fa-bolt'></i> ${product.discount}</div>` : '';
        const stockHtml = typeof product.stock !== 'undefined' ? `<div class="product-stock"><span class="stock-icon"><i class='fa fa-box'></i></span>Còn hàng: <b>${product.stock}</b></div>` : '';
        return `
            <div class="product-card" data-product-id="${product.id}">
                <a href="${product.productUrl}" class="product-link">
                    <div class="product-image-wrapper">
                        ${imagesHtml}
                        <div class="product-badge">${product.badge || ''}</div>
                        ${discountHtml}
                        <button class="quick-view-btn" data-product-id="${product.id}">Xem nhanh</button>
                    </div>
                    <h3 class="product-title">${product.name}</h3>
                    ${stockHtml}
                    <div class="product-price">
                        <span class="current-price">${product.price || ''}</span>
                    </div>
                </a>
            </div>
        `;
    }

    if (productsContainer) {
        productsContainer.innerHTML = featuredProducts.map(createProductCard).join('');
    }
    
    const popupHtml = `
        <div id="quickViewPopup" class="quick-view-popup">
            <div class="popup-content">
                <button class="close-popup">&times;</button>
                <div class="popup-body">
                    <div class="popup-product-images">
                        <div class="popup-main-image">
                            <img id="popupMainImage" src="" alt="Product Image">
                        </div>
                        <div class="popup-image-thumbnails">
                        </div>
                    </div>
                    <div class="popup-product-info">
                        <h2 id="popupProductTitle" class="popup-product-title"></h2>
                        <div class="popup-product-price">
                            <span id="popupCurrentPrice" class="popup-current-price"></span>
                            <span id="popupOriginalPrice" class="popup-original-price"></span>
                            <span id="popupDiscount" class="popup-discount"></span>
                        </div>
                        <div id="popupStock" class="popup-stock"></div>
                        <div id="popupDescription" class="popup-description"></div>
                        <div class="popup-product-details">
                            <div class="popup-detail-item">
                                <span class="detail-label">Chất liệu:</span>
                                <span id="popupMaterial" class="detail-value"></span>
                            </div>
                            <div class="popup-detail-item">
                                <span class="detail-label">Kích thước:</span>
                                <span id="popupDimensions" class="detail-value"></span>
                            </div>
                            <div class="popup-detail-item">
                                <span class="detail-label">Trọng lượng:</span>
                                <span id="popupWeight" class="detail-value"></span>
                            </div>
                        </div>
                        
                        <div class="popup-features">
                            <h3 class="popup-features-title">Tính Năng Nổi Bật</h3>
                            <div class="popup-features-grid">
                                <div class="popup-feature-item">
                                    <div class="popup-feature-icon">
                                        <i class="fas fa-cogs"></i>
                                    </div>
                                    <div class="popup-feature-content">
                                        <h4>Thiết Kế Modular</h4>
                                        <p>Dễ dàng tháo lắp, thay đổi charm theo ý thích</p>
                                    </div>
                                </div>
                                <div class="popup-feature-item">
                                    <div class="popup-feature-icon">
                                        <i class="fas fa-tint"></i>
                                    </div>
                                    <div class="popup-feature-content">
                                        <h4>Chất Liệu Cao Cấp</h4>
                                        <p>Thép không gỉ 316L bền bỉ, không gây dị ứng</p>
                                    </div>
                                </div>
                                <div class="popup-feature-item">
                                    <div class="popup-feature-icon">
                                        <i class="fas fa-shield-alt"></i>
                                    </div>
                                    <div class="popup-feature-content">
                                        <h4>Độ Bền Cao</h4>
                                        <p>Chịu được va đập và sử dụng hàng ngày</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="popup-buttons">
                            <div class="popup-quantity">
                                <button class="quantity-btn decrease">-</button>
                                <input type="number" id="popupQuantity" class="quantity-input" value="1" min="1">
                                <button class="quantity-btn increase">+</button>
                            </div>
                            <button class="popup-add-to-cart">Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', popupHtml);
    
    const quickViewPopup = document.getElementById('quickViewPopup');
    const closePopupBtn = document.querySelector('.close-popup');
    
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            quickViewPopup.classList.remove('active');
        });
    }
    
    quickViewPopup.addEventListener('click', function(e) {
        if (e.target === quickViewPopup) {
            quickViewPopup.classList.remove('active');
        }
    });
    
    function showQuickViewPopup(productId) {
        const product = featuredProducts.find(p => p.id === parseInt(productId));
        if (!product) return;
        
        document.getElementById('popupProductTitle').textContent = product.name;
        document.getElementById('popupCurrentPrice').textContent = product.price;
        document.getElementById('popupOriginalPrice').textContent = product.price;
        document.getElementById('popupDiscount').textContent = product.discount;
        document.getElementById('popupDescription').textContent = product.description;
        document.getElementById('popupMaterial').textContent = product.material;
        document.getElementById('popupDimensions').textContent = product.dimensions;
        document.getElementById('popupWeight').textContent = product.weight;
        document.getElementById('popupStock').innerHTML = `<span class="stock-icon"><i class='fa fa-box'></i></span>Còn hàng: <b>${product.stock}</b>`;
        
        const popupMainImage = document.getElementById('popupMainImage');
        popupMainImage.src = product.images[0];
        popupMainImage.alt = product.name;
        
        const thumbnailsContainer = document.querySelector('.popup-image-thumbnails');
        thumbnailsContainer.innerHTML = '';
        
        product.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'popup-thumbnail' + (index === 0 ? ' active' : '');
            thumbnail.innerHTML = `<img src="${image}" alt="${product.name}">`;
            
            thumbnail.addEventListener('click', function() {
                popupMainImage.src = image;
                document.querySelectorAll('.popup-thumbnail').forEach(thumb => {
                    thumb.classList.remove('active');
                });
                thumbnail.classList.add('active');
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });
        
        const quantityInput = document.getElementById('popupQuantity');
        const decreaseBtn = document.querySelector('.quantity-btn.decrease');
        const increaseBtn = document.querySelector('.quantity-btn.increase');
        
        decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
        
        quickViewPopup.classList.add('active');
    }
    
    function initProductCardEvents() {
        const quickViewButtons = document.querySelectorAll('.quick-view-btn');
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const productId = this.getAttribute('data-product-id');
                showQuickViewPopup(productId);
            });
        });
    }
    
    initProductCardEvents();

    const productCards = document.querySelectorAll('.product-card');

    let productsPerView = calculateProductsPerView();
    let currentIndex = 0;
    let cardWidth = calculateCardWidth();
    let maxIndex = Math.max(0, productCards.length - productsPerView);

    window.addEventListener('resize', function() {
        productsPerView = calculateProductsPerView();
        cardWidth = calculateCardWidth();
        maxIndex = Math.max(0, productCards.length - productsPerView);
        moveSlider(currentIndex);
    });

    function calculateProductsPerView() {
        const containerWidth = productsContainer.parentElement.offsetWidth;
        let cardWidth;
        
        if (window.innerWidth >= 1200) {
            cardWidth = 280 + 20;
        } else if (window.innerWidth >= 992) {
            cardWidth = 260 + 20;
        } else if (window.innerWidth >= 768) {
            cardWidth = 240 + 20;
        } else {
            return 1;
        }
        
        const productsPerView = Math.floor(containerWidth / cardWidth);
        return Math.max(1, productsPerView);
    }

    function calculateCardWidth() {
        if (productCards.length === 0) return 0;
        
        let cardWidth;
        if (window.innerWidth >= 1200) {
            cardWidth = 280;
        } else if (window.innerWidth >= 992) {
            cardWidth = 260;
        } else if (window.innerWidth >= 768) {
            cardWidth = 240;
        } else {
            cardWidth = productCards[0].offsetWidth;
        }
        
        const gap = 20;
        return cardWidth + gap;
    }

    function moveSlider(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        const translateX = -currentIndex * cardWidth;
        productsContainer.style.transform = `translateX(${translateX}px)`;
        updateButtonStates();
    }

    function updateButtonStates() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;
        if (prevButton.disabled) {
            prevButton.classList.add('disabled');
        } else {
            prevButton.classList.remove('disabled');
        }
        if (nextButton.disabled) {
            nextButton.classList.add('disabled');
        } else {
            nextButton.classList.remove('disabled');
        }
    }

    prevButton.addEventListener('click', function() {
        moveSlider(currentIndex - 1);
    });

    nextButton.addEventListener('click', function() {
        moveSlider(currentIndex + 1);
    });

    updateButtonStates();
}); 