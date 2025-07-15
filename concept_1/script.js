class ShoppingMall {
    constructor() {
        this.cart = [];
        this.products = [
            { id: 1, name: 'BACK PRINT LOGO TEE', price: 43200, image: 'https://ambient.diskn.com/detailimg/25SS/MEN/top/IM2E2TO08/black/250114_INSILENCE_DAY%201_0190.jpg' },
            { id: 2, name: 'OVERSIZED HOODIE', price: 89000, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center' },
            { id: 3, name: 'WIDE CARGO PANTS', price: 125000, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop&crop=center' },
            { id: 4, name: 'MINIMAL SNEAKERS', price: 149000, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center' }
        ];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCartDisplay();
        this.checkUserLogin();
    }

    setupEventListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart, .quick-add');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.addToCart(productId);
            });
        });

        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.addEventListener('click', () => {
            this.showCartModal();
        });

        const closeModal = document.querySelector('.close');
        closeModal.addEventListener('click', () => {
            this.hideCartModal();
        });

        const modal = document.getElementById('cart-modal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideCartModal();
            }
        });

        const checkoutBtn = document.querySelector('.checkout-btn');
        checkoutBtn.addEventListener('click', () => {
            this.checkout();
        });

        const ctaButton = document.querySelector('.cta-button');
        ctaButton.addEventListener('click', () => {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });

        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            const existingItem = this.cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
            this.updateCartDisplay();
            this.showAddToCartFeedback();
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartDisplay();
        this.renderCartItems();
    }

    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.updateCartDisplay();
            this.renderCartItems();
        }
    }

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    showCartModal() {
        const modal = document.getElementById('cart-modal');
        modal.style.display = 'block';
        this.renderCartItems();
    }

    hideCartModal() {
        const modal = document.getElementById('cart-modal');
        modal.style.display = 'none';
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
                </div>
                <div>
                    <button onclick="shoppingMall.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="shoppingMall.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button onclick="shoppingMall.removeFromCart(${item.id})">REMOVE</button>
            </div>
        `).join('');

        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPriceElement.textContent = totalPrice.toLocaleString();
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
            this.updateCartDisplay();
            this.hideCartModal();
        }
    }

    checkUserLogin() {
        const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
        const userGreeting = document.getElementById('user-greeting');
        const loginLink = document.querySelector('.login-link');

        // Get navigation elements
        const loginNavLink = document.getElementById('login-nav-link');
        const mypageNavLink = document.getElementById('mypage-nav-link');

        if (userData) {
            const user = JSON.parse(userData);
            
            // Update user greeting
            if (userGreeting) {
                userGreeting.textContent = `Welcome, ${user.name}`;
                userGreeting.style.cursor = 'pointer';
                userGreeting.addEventListener('click', () => {
                    window.location.href = 'mypage.html';
                });
            }
            
            // Show MY PAGE, hide LOGIN in navigation
            if (loginNavLink) {
                loginNavLink.parentElement.style.display = 'none';
            }
            if (mypageNavLink) {
                mypageNavLink.parentElement.style.display = 'block';
            }
            
            // Update login link to logout
            if (loginLink) {
                loginLink.textContent = 'LOGOUT';
                loginLink.href = '#';
                loginLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                });
            }
        } else {
            // Show LOGIN, hide MY PAGE in navigation
            if (loginNavLink) {
                loginNavLink.parentElement.style.display = 'block';
            }
            if (mypageNavLink) {
                mypageNavLink.parentElement.style.display = 'none';
            }
        }
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('userData');
            sessionStorage.removeItem('userData');
            
            // Reset navigation visibility
            const loginNavLink = document.getElementById('login-nav-link');
            const mypageNavLink = document.getElementById('mypage-nav-link');
            
            if (loginNavLink) {
                loginNavLink.parentElement.style.display = 'block';
            }
            if (mypageNavLink) {
                mypageNavLink.parentElement.style.display = 'none';
            }
            
            location.reload();
        }
    }
}

function goToProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

const shoppingMall = new ShoppingMall();

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);