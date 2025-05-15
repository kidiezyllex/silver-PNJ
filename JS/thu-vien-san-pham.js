document.addEventListener('DOMContentLoaded', function () {
    initThumbnailGallery();
    initVariantPickers();
    initQuantitySelector();
    initBuyButtons();
    initAccordion();
});
function initThumbnailGallery() {
    const thumbnails = document.querySelectorAll('.product-gallery__thumbnail');
    const featuredImage = document.getElementById('mainImage');

    if (thumbnails.length > 0 && featuredImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function () {
                thumbnails.forEach(t => t.setAttribute('aria-current', 'false'));
                this.setAttribute('aria-current', 'true');
                const imageUrl = this.getAttribute('data-image-url');
                if (imageUrl) {
                    updateMainImage(imageUrl);
                }
            });
        });
    }

    const thumbnailScroller = document.querySelector('.product-gallery__thumbnail-scroller');
    const prevButton = document.querySelector('.thumbnail-nav-button.prev');
    const nextButton = document.querySelector('.thumbnail-nav-button.next');

    if (thumbnailScroller && prevButton && nextButton && thumbnails.length > 0) {
        let currentIndex = Array.from(thumbnails).findIndex(t => t.getAttribute('aria-current') === 'true');
        if (currentIndex === -1) currentIndex = 0;

        function showImageAt(index, e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            if (index < 0) index = thumbnails.length - 1;
            if (index >= thumbnails.length) index = 0;
            
            thumbnails.forEach(t => t.setAttribute('aria-current', 'false'));
            thumbnails[index].setAttribute('aria-current', 'true');
            
            const imageUrl = thumbnails[index].getAttribute('data-image-url');
            if (imageUrl) updateMainImage(imageUrl);
            thumbnails[index].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
            
            currentIndex = index;
        }

        function handleNavClick(e, direction) {
            e.preventDefault();
            e.stopPropagation();
            requestAnimationFrame(() => {
                showImageAt(direction === 'prev' ? currentIndex - 1 : currentIndex + 1);
            });
            return false;
        }

        prevButton.removeEventListener('click', handleNavClick);
        nextButton.removeEventListener('click', handleNavClick);
        
        prevButton.addEventListener('click', (e) => handleNavClick(e, 'prev'));
        nextButton.addEventListener('click', (e) => handleNavClick(e, 'next'));

        thumbnails.forEach((thumb, idx) => {
            thumb.addEventListener('click', function () {
                currentIndex = idx;
            });
        });
    }
}

function updateMainImage(imageUrl) {
    const featuredImage = document.getElementById('mainImage');
    if (featuredImage && imageUrl) {
        featuredImage.src = imageUrl;
        const baseSrc = imageUrl.split('?')[0];
        const params = imageUrl.split('?')[1];
        featuredImage.srcset =
            `${baseSrc}?${params}&width=200 200w, 
            ${baseSrc}?${params}&width=300 300w, 
            ${baseSrc}?${params}&width=400 400w, 
            ${baseSrc}?${params}&width=500 500w, 
            ${baseSrc}?${params}&width=600 600w`;
    }
}

function selectThumbnailByUrl(targetImageUrl) {
    const thumbnails = document.querySelectorAll('.product-gallery__thumbnail');

    thumbnails.forEach(thumb => {
        if (thumb.getAttribute('data-image-url') === targetImageUrl) {
            thumbnails.forEach(t => t.setAttribute('aria-current', 'false'));
            thumb.setAttribute('aria-current', 'true');
        }
    });
}
function initVariantPickers() {
    initColorPicker();
    initEngravingPicker();
}

function initColorPicker() {
    const colorOptions = document.querySelectorAll('input[name="option1"]');
    if (colorOptions.length > 0) {
        colorOptions.forEach(option => {
            option.addEventListener('change', function () {
                const colorText = this.nextElementSibling.querySelector('.sr-only').textContent;
                const colorDisplay = document.querySelector('.variant-picker__option-info span:last-child');
                if (colorDisplay) {
                    colorDisplay.textContent = colorText;
                }

                let selectedColor = this.value;

                const currentEngravingOption = document.querySelector('input[name="option2"]:checked');
                const currentEngraving = currentEngravingOption ? currentEngravingOption.value : 'none';

                const targetImageUrl = getProductImageUrl(selectedColor, currentEngraving);

                if (targetImageUrl) {
                    updateMainImage(targetImageUrl);
                    selectThumbnailByUrl(targetImageUrl);
                }
            });
        });
    }
}


function initEngravingPicker() {
    const engravingOptions = document.querySelectorAll('input[name="option2"]');
    if (engravingOptions.length > 0) {
        engravingOptions.forEach(option => {
            option.addEventListener('change', function () {
                let selectedEngraving = this.value;

                const currentColorOption = document.querySelector('input[name="option1"]:checked');
                const currentColor = currentColorOption ? currentColorOption.value : 'silver';

                const targetImageUrl = getProductImageUrl(currentColor, selectedEngraving);

                if (targetImageUrl) {
                    updateMainImage(targetImageUrl);
                    selectThumbnailByUrl(targetImageUrl);
                }
            });
        });
    }
}

function getProductImageUrl(color, engraving) {
    let imageUrl = '';

    if (engraving === 'none') {
        switch (color) {
            case 'silver':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/slvrtp.png?v=1712640261&width=600';
                break;
            case 'gold':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/gldtp.png?v=1712640261&width=600';
                break;
            case 'rose-gold':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/rsgldtp.png?v=1712640261&width=600';
                break;
            case 'black':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/blacktp.png?v=1712639786&width=600';
                break;
        }
    } else if (engraving === 'star') {
        switch (color) {
            case 'silver':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/slvrstrtp.png?v=1712640261&width=600';
                break;
            case 'gold':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/gldstrtp.png?v=1712640261&width=600';
                break;
            case 'rose-gold':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/rsgldstrtp.png?v=1712640261&width=600';
                break;
            case 'black':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/blacktp.png?v=1712639786&width=600';
                break;
        }
    } else if (engraving === 'butterfly') {
        switch (color) {
            case 'silver':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/slvrbflytp.png?v=1712640261&width=600';
                break;
            case 'gold':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/gldbflytp.png?v=1712640261&width=600';
                break;
            case 'rose-gold':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/rsgldbflytp.png?v=1712640261&width=600';
                break;
            case 'black':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/blacktp.png?v=1712639786&width=600';
                break;
        }
    } else if (engraving === 'heart') {
        switch (color) {
            case 'silver':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/slvrhrttp.png?v=1712640261&width=600';
                break;
            case 'gold':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/gldbhrttp.png?v=1712640261&width=600';
                break;
            case 'rose-gold':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/rsgldbhrttp.png?v=1712639859&width=600';
                break;
            case 'black':
                imageUrl = 'https://myitaliancharms.com/cdn/shop/files/blacktp.png?v=1712639786&width=600';
                break;
        }
    }

    return imageUrl;
}

function initQuantitySelector() {
    const quantityInput = document.querySelector('.quantity-selector__input');
    const decreaseBtn = document.querySelector('.quantity-selector__button:first-child');
    const increaseBtn = document.querySelector('.quantity-selector__button:last-child');

    if (quantityInput && decreaseBtn && increaseBtn) {
        let quantity = 1;
        updateQuantityState();
        quantityInput.addEventListener('change', function () {
            quantity = parseInt(this.value) || 1;
            if (quantity < 1) quantity = 1;
            this.value = quantity;
            updateQuantityState();
        });
        decreaseBtn.addEventListener('click', function () {
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
                updateQuantityState();
            }
        });
        increaseBtn.addEventListener('click', function () {
            quantity++;
            quantityInput.value = quantity;
            updateQuantityState();
        });
        function updateQuantityState() {
            decreaseBtn.disabled = quantity <= 1;
        }
    }
}

function initBuyButtons() {
    const addToCartBtn = document.querySelector('.buy-buttons .button');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const productInfo = getSelectedProductInfo();
            alert(`Đã thêm vào giỏ hàng:
            Sản phẩm: ${productInfo.title}
            Màu sắc: ${productInfo.color}
            Khắc: ${productInfo.engraving}
            Số lượng: ${productInfo.quantity}`);
        });
    }

    const buyNowBtn = document.querySelector('.buy-buttons .button--secondary');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const productInfo = getSelectedProductInfo();
            alert(`Đang chuyển đến trang thanh toán:
            Sản phẩm: ${productInfo.title}
            Màu sắc: ${productInfo.color}
            Khắc: ${productInfo.engraving}
            Số lượng: ${productInfo.quantity}`);
        });
    }
}

function getSelectedProductInfo() {
    const productTitle = document.querySelector('.product-title').textContent.trim();
    const colorOption = document.querySelector('input[name="option1"]:checked');
    const engravingOption = document.querySelector('input[name="option2"]:checked');
    const quantity = document.querySelector('.quantity-selector__input').value;

    const selectedColor = colorOption ? colorOption.nextElementSibling.querySelector('.sr-only').textContent : 'Bạc';
    const selectedEngraving = engravingOption ? engravingOption.nextElementSibling.querySelector('span').textContent : 'Không';

    return {
        title: productTitle,
        color: selectedColor,
        engraving: selectedEngraving,
        quantity: quantity
    };
}

function initAccordion() {
    const accordionDetails = document.querySelectorAll('.accordion__disclosure');
    if (accordionDetails.length > 0) {
        accordionDetails.forEach(detail => {
            detail.addEventListener('toggle', function () {
                this.setAttribute('aria-expanded', this.open);
            });
        });
    }
} 