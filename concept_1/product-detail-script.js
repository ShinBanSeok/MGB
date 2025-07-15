class ProductDetail {
    constructor() {
        this.products = [
            {
                id: 1,
                name: 'BACK PRINT LOGO TEE',
                price: 43200,
                images: [
                    'https://ambient.diskn.com/detailimg/25SS/MEN/top/IM2E2TO08/black/250114_INSILENCE_DAY%201_0190.jpg',
                    'https://ambient.diskn.com/detailimg/25SS/MEN/top/IM2E2TO08/black/250114_INSILENCE_DAY%201_0219.jpg',
                    'https://ambient.diskn.com/detailimg/25SS/MEN/top/IM2E2TO08/black/250114_INSILENCE_DAY%201_0194.jpg',
                    'https://ambient.diskn.com/detailimg/25SS/MEN/top/IM2E2TO08/black/250114_INSILENCE_DAY%201_0196.jpg'
                ],
                description: 'Semi-oversized fit t-shirt with signature back logo print. Made from premium cotton for ultimate comfort and durability. Perfect for casual streetwear styling.',
                details: [
                    'Material: Cotton 100%',
                    'Made in Korea',
                    'Semi-oversized fit',
                    'Back logo print',
                    'Machine washable',
                    'Round neck'
                ],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['black', 'white']
            },
            {
                id: 2,
                name: 'OVERSIZED HOODIE',
                price: 89000,
                images: [
                    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1556821840-3a9fbc8e55d5?w=500&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop&crop=center'
                ],
                description: 'Premium oversized hoodie crafted for maximum comfort and style. Features a soft fleece interior and adjustable drawstring hood.',
                details: [
                    'Material: Cotton 80%, Polyester 20%',
                    'Made in Korea',
                    'Oversized fit',
                    'Fleece interior',
                    'Adjustable hood',
                    'Kangaroo pocket'
                ],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['black', 'gray', 'white']
            },
            {
                id: 3,
                name: 'WIDE CARGO PANTS',
                price: 125000,
                images: [
                    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1506629905607-e5f14b71b4e0?w=500&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop&crop=center'
                ],
                description: 'Modern wide-fit cargo pants with multiple utility pockets. Designed for both function and street style aesthetics.',
                details: [
                    'Material: Cotton 65%, Polyester 35%',
                    'Made in Korea',
                    'Wide fit',
                    'Multiple cargo pockets',
                    'Adjustable waist',
                    'Reinforced knees'
                ],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['black', 'gray']
            },
            {
                id: 4,
                name: 'MINIMAL SNEAKERS',
                price: 149000,
                images: [
                    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop&crop=center'
                ],
                description: 'Clean minimal sneakers with premium leather construction. Perfect for everyday wear with superior comfort and style.',
                details: [
                    'Material: Premium Leather',
                    'Made in Korea',
                    'Cushioned sole',
                    'Breathable interior',
                    'Durable rubber outsole',
                    'Minimalist design'
                ],
                sizes: ['240', '250', '260', '270', '280'],
                colors: ['white', 'black']
            }
        ];
        
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.selectedSize = null;
        this.selectedColor = 'black';
        this.quantity = 1;
        this.currentProduct = null;
        
        this.init();
    }

    init() {
        this.loadProduct();
        this.setupEventListeners();
        this.updateCartDisplay();
        this.checkUserLogin();
    }

    loadProduct() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id')) || 1;
        
        this.currentProduct = this.products.find(p => p.id === productId);
        
        if (this.currentProduct) {
            this.renderProduct();
            this.loadRelatedProducts();
        }
    }

    renderProduct() {
        const product = this.currentProduct;
        
        // Update product info
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `₩${product.price.toLocaleString()}`;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-breadcrumb').textContent = product.name;
        
        // Update images
        const mainImage = document.getElementById('main-product-image');
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
        
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (product.images[index]) {
                thumb.src = product.images[index];
                thumb.alt = `${product.name} ${index + 1}`;
            }
        });
        
        // Update product details
        const detailsList = document.getElementById('product-details-list');
        detailsList.innerHTML = product.details.map(detail => `<li>${detail}</li>`).join('');
        
        // Update page title
        document.title = `${product.name} - MGB`;
    }

    loadRelatedProducts() {
        const relatedProducts = this.products.filter(p => p.id !== this.currentProduct.id).slice(0, 3);
        const relatedGrid = document.getElementById('related-products-grid');
        
        relatedGrid.innerHTML = relatedProducts.map(product => `
            <div class="related-product" onclick="productDetail.goToProduct(${product.id})">
                <img src="${product.images[0]}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">₩${product.price.toLocaleString()}</p>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Thumbnail images
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById('main-product-image').src = e.target.src;
            });
        });

        // Size selection
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedSize = e.target.dataset.size;
            });
        });

        // Color selection
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedColor = e.target.dataset.color;
            });
        });

        // Quantity controls
        document.querySelector('.qty-btn.minus').addEventListener('click', () => {
            if (this.quantity > 1) {
                this.quantity--;
                document.querySelector('.quantity').textContent = this.quantity;
            }
        });

        document.querySelector('.qty-btn.plus').addEventListener('click', () => {
            this.quantity++;
            document.querySelector('.quantity').textContent = this.quantity;
        });

        // Add to cart
        document.getElementById('add-to-cart').addEventListener('click', () => {
            this.addToCart();
        });

        // Buy now
        document.querySelector('.buy-now-btn').addEventListener('click', () => {
            this.buyNow();
        });

        // Cart modal
        document.querySelector('.cart-icon').addEventListener('click', () => {
            this.showCartModal();
        });

        const modal = document.getElementById('cart-modal');
        document.querySelector('.close').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        document.querySelector('.checkout-btn').addEventListener('click', () => {
            this.checkout();
        });
    }

    addToCart() {
        if (!this.selectedSize) {
            alert('Please select a size.');
            return;
        }

        const cartItem = {
            id: this.currentProduct.id,
            name: this.currentProduct.name,
            price: this.currentProduct.price,
            image: this.currentProduct.images[0],
            size: this.selectedSize,
            color: this.selectedColor,
            quantity: this.quantity
        };

        const existingItem = this.cart.find(item => 
            item.id === cartItem.id && 
            item.size === cartItem.size && 
            item.color === cartItem.color
        );

        if (existingItem) {
            existingItem.quantity += this.quantity;
        } else {
            this.cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartDisplay();
        this.showAddToCartFeedback();
    }

    buyNow() {
        if (!this.selectedSize) {
            alert('Please select a size.');
            return;
        }

        this.addToCart();
        this.showCartModal();
    }

    showCartModal() {
        const modal = document.getElementById('cart-modal');
        modal.style.display = 'block';
        this.renderCartItems();
    }

    renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your bag is empty.</p>';
            totalPriceElement.textContent = '0';
            return;
        }

        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>₩${item.price.toLocaleString()}</p>
                    <p>Size: ${item.size} | Color: ${item.color}</p>
                </div>
                <div>
                    <button onclick="productDetail.updateQuantity(${item.id}, '${item.size}', '${item.color}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="productDetail.updateQuantity(${item.id}, '${item.size}', '${item.color}', ${item.quantity + 1})">+</button>
                </div>
                <button onclick="productDetail.removeFromCart(${item.id}, '${item.size}', '${item.color}')">REMOVE</button>
            </div>
        `).join('');

        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPriceElement.textContent = totalPrice.toLocaleString();
    }

    updateQuantity(id, size, color, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(id, size, color);
            return;
        }

        const item = this.cart.find(item => 
            item.id === id && item.size === size && item.color === color
        );

        if (item) {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.updateCartDisplay();
            this.renderCartItems();
        }
    }

    removeFromCart(id, size, color) {
        this.cart = this.cart.filter(item => 
            !(item.id === id && item.size === size && item.color === color)
        );
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartDisplay();
        this.renderCartItems();
    }

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    showAddToCartFeedback() {
        const feedback = document.createElement('div');
        feedback.textContent = 'ADDED TO BAG';
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #000;
            color: white;
            padding: 1rem 2rem;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-size: 0.9rem;
            z-index: 3000;
            animation: fadeInOut 2s ease-in-out;
        `;
        document.body.appendChild(feedback);

        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 2000);
    }

    checkout() {
        if (this.cart.length === 0) {
            alert('Your bag is empty.');
            return;
        }

        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const confirmation = confirm(`Complete purchase for ₩${totalPrice.toLocaleString()}?`);
        
        if (confirmation) {
            alert('Order completed. Thank you for shopping with MGB.');
            this.cart = [];
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.updateCartDisplay();
            document.getElementById('cart-modal').style.display = 'none';
        }
    }

    checkUserLogin() {
        const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
        const userGreeting = document.getElementById('user-greeting');
        const loginLink = document.querySelector('.login-link');

        if (userData) {
            const user = JSON.parse(userData);
            userGreeting.textContent = `Welcome, ${user.name}`;
            userGreeting.style.cursor = 'pointer';
            userGreeting.addEventListener('click', () => {
                window.location.href = 'mypage.html';
            });
            
            // Show/hide navigation items based on login status
            const loginNavLink = document.getElementById('login-nav-link');
            const mypageNavLink = document.getElementById('mypage-nav-link');
            
            if (loginNavLink) {
                loginNavLink.style.display = 'none';
            }
            if (mypageNavLink) {
                mypageNavLink.style.display = 'block';
            }
            
            loginLink.textContent = 'LOGOUT';
            loginLink.href = '#';
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        } else {
            // Show login link, hide mypage link
            const loginNavLink = document.getElementById('login-nav-link');
            const mypageNavLink = document.getElementById('mypage-nav-link');
            
            if (loginNavLink) {
                loginNavLink.style.display = 'block';
            }
            if (mypageNavLink) {
                mypageNavLink.style.display = 'none';
            }
        }
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('userData');
            sessionStorage.removeItem('userData');
            location.reload();
        }
    }

    goToProduct(productId) {
        window.location.href = `product-detail.html?id=${productId}`;
    }
}

const productDetail = new ProductDetail();

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);