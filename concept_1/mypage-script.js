class MyPage {
    constructor() {
        this.currentUser = null;
        this.orders = [];
        this.wishlist = [];
        this.addresses = [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        this.init();
    }

    init() {
        this.checkAuth();
        this.loadUserData();
        this.setupEventListeners();
        this.updateCartDisplay();
        this.loadSampleData();
    }

    checkAuth() {
        const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
        
        if (!userData) {
            alert('Please login to access your account.');
            window.location.href = 'login.html';
            return;
        }
        
        this.currentUser = JSON.parse(userData);
        this.updateUserProfile();
    }

    updateUserProfile() {
        const user = this.currentUser;
        document.getElementById('profile-name').textContent = user.name || 'USER NAME';
        document.getElementById('profile-email').textContent = user.email || 'user@email.com';
        document.getElementById('user-greeting').textContent = `Welcome, ${user.name}`;
        
        // Update member since date
        const joinDate = new Date(user.loginTime || Date.now()).getFullYear();
        document.getElementById('member-date').textContent = joinDate;
        
        // Update form fields
        if (user.name) {
            const nameParts = user.name.split(' ');
            document.getElementById('first-name').value = nameParts[0] || '';
            document.getElementById('last-name').value = nameParts.slice(1).join(' ') || '';
        }
        document.getElementById('email').value = user.email || '';
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('birth-date').value = user.birth || '';
        document.getElementById('gender').value = user.gender || '';
    }

    setupEventListeners() {
        // Sidebar navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.dataset.section;
                
                if (section) {
                    this.showSection(section);
                    this.updateActiveNav(e.target);
                } else if (e.target.classList.contains('logout')) {
                    this.logout();
                }
            });
        });

        // Profile form
        document.getElementById('save-profile').addEventListener('click', () => {
            this.saveProfile();
        });

        // Orders filter
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterOrders(e.target.dataset.filter);
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Add address
        document.querySelector('.add-address-btn').addEventListener('click', () => {
            this.showAddressModal();
        });

        // Address form
        document.getElementById('address-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAddress();
        });

        // Modal close
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Cancel buttons
        document.querySelectorAll('.cancel-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Settings buttons
        document.querySelector('.change-password-btn').addEventListener('click', () => {
            this.changePassword();
        });

        document.querySelector('.delete-account-btn').addEventListener('click', () => {
            this.deleteAccount();
        });

        // Cart functionality
        document.querySelector('.cart-icon').addEventListener('click', () => {
            this.showCartModal();
        });

        const cartModal = document.getElementById('cart-modal');
        cartModal.querySelector('.close').addEventListener('click', () => {
            cartModal.style.display = 'none';
        });

        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });

        document.querySelector('.checkout-btn').addEventListener('click', () => {
            this.checkout();
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        document.getElementById(`${sectionName}-section`).classList.add('active');

        // Load section-specific data
        switch (sectionName) {
            case 'orders':
                this.loadOrders();
                break;
            case 'wishlist':
                this.loadWishlist();
                break;
            case 'address':
                this.loadAddresses();
                break;
        }
    }

    updateActiveNav(activeItem) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        activeItem.classList.add('active');
    }

    saveProfile() {
        const formData = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            birthDate: document.getElementById('birth-date').value,
            gender: document.getElementById('gender').value
        };

        // Update current user data
        this.currentUser.name = `${formData.firstName} ${formData.lastName}`.trim();
        this.currentUser.email = formData.email;
        this.currentUser.phone = formData.phone;
        this.currentUser.birth = formData.birthDate;
        this.currentUser.gender = formData.gender;

        // Save to storage
        const storageKey = localStorage.getItem('userData') ? 'userData' : 'userData';
        if (localStorage.getItem('userData')) {
            localStorage.setItem('userData', JSON.stringify(this.currentUser));
        } else {
            sessionStorage.setItem('userData', JSON.stringify(this.currentUser));
        }

        this.updateUserProfile();
        this.showMessage('Profile updated successfully!', 'success');
    }

    loadSampleData() {
        // Sample orders
        this.orders = [
            {
                id: 'ORD-001',
                date: '2024-01-15',
                status: 'completed',
                total: 132200,
                items: [
                    { name: 'BACK PRINT LOGO TEE', price: 43200, quantity: 1, image: 'https://ambient.diskn.com/detailimg/25SS/MEN/top/IM2E2TO08/black/250114_INSILENCE_DAY%201_0190.jpg' },
                    { name: 'OVERSIZED HOODIE', price: 89000, quantity: 1, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center' }
                ]
            },
            {
                id: 'ORD-002',
                date: '2024-01-10',
                status: 'processing',
                total: 274000,
                items: [
                    { name: 'WIDE CARGO PANTS', price: 125000, quantity: 1, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop&crop=center' },
                    { name: 'MINIMAL SNEAKERS', price: 149000, quantity: 1, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center' }
                ]
            }
        ];

        // Sample wishlist
        this.wishlist = [
            { id: 1, name: 'BACK PRINT LOGO TEE', price: 43200, image: 'https://ambient.diskn.com/detailimg/25SS/MEN/top/IM2E2TO08/black/250114_INSILENCE_DAY%201_0190.jpg' },
            { id: 3, name: 'WIDE CARGO PANTS', price: 125000, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop&crop=center' }
        ];

        // Sample addresses
        this.addresses = [
            {
                id: 1,
                name: 'Home',
                recipient: 'John Doe',
                phone: '010-1234-5678',
                postalCode: '12345',
                address1: '123 Main Street',
                address2: 'Apt 4B',
                city: 'Seoul',
                state: 'Seoul'
            },
            {
                id: 2,
                name: 'Office',
                recipient: 'John Doe',
                phone: '010-1234-5678',
                postalCode: '54321',
                address1: '456 Business Ave',
                address2: 'Floor 10',
                city: 'Seoul',
                state: 'Seoul'
            }
        ];
    }

    loadOrders() {
        const ordersList = document.getElementById('orders-list');
        
        if (this.orders.length === 0) {
            ordersList.innerHTML = '<p>No orders found.</p>';
            return;
        }

        ordersList.innerHTML = this.orders.map(order => `
            <div class="order-item" data-status="${order.status}">
                <div class="order-header">
                    <div class="order-number">Order #${order.id}</div>
                    <div class="order-status ${order.status}">${order.status.toUpperCase()}</div>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-product">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="order-product-info">
                                <h4>${item.name}</h4>
                                <p>Quantity: ${item.quantity} | Price: ₩${item.price.toLocaleString()}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    Order Date: ${order.date} | Total: ₩${order.total.toLocaleString()}
                </div>
            </div>
        `).join('');
    }

    filterOrders(filter) {
        const orderItems = document.querySelectorAll('.order-item');
        
        orderItems.forEach(item => {
            if (filter === 'all' || item.dataset.status === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    loadWishlist() {
        const wishlistGrid = document.getElementById('wishlist-grid');
        
        if (this.wishlist.length === 0) {
            wishlistGrid.innerHTML = '<p>Your wishlist is empty.</p>';
            return;
        }

        wishlistGrid.innerHTML = this.wishlist.map(item => `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p class="price">₩${item.price.toLocaleString()}</p>
                <button class="remove-wishlist" onclick="myPage.removeFromWishlist(${item.id})">REMOVE</button>
            </div>
        `).join('');
    }

    removeFromWishlist(itemId) {
        this.wishlist = this.wishlist.filter(item => item.id !== itemId);
        this.loadWishlist();
        this.showMessage('Item removed from wishlist', 'success');
    }

    loadAddresses() {
        const addressesList = document.getElementById('addresses-list');
        
        if (this.addresses.length === 0) {
            addressesList.innerHTML = '<p>No addresses saved.</p>';
            return;
        }

        addressesList.innerHTML = this.addresses.map(address => `
            <div class="address-item">
                <div class="address-header">
                    <div class="address-name">${address.name}</div>
                    <div class="address-actions">
                        <button class="edit-address" onclick="myPage.editAddress(${address.id})">EDIT</button>
                        <button class="delete-address" onclick="myPage.deleteAddress(${address.id})">DELETE</button>
                    </div>
                </div>
                <div class="address-details">
                    <p><strong>${address.recipient}</strong></p>
                    <p>${address.phone}</p>
                    <p>${address.address1} ${address.address2}</p>
                    <p>${address.city}, ${address.state} ${address.postalCode}</p>
                </div>
            </div>
        `).join('');
    }

    showAddressModal() {
        document.getElementById('address-modal').style.display = 'block';
        // Clear form
        document.getElementById('address-form').reset();
    }

    saveAddress() {
        const formData = {
            id: Date.now(),
            name: document.getElementById('address-name').value,
            recipient: document.getElementById('recipient-name').value,
            phone: document.getElementById('phone-number').value,
            postalCode: document.getElementById('postal-code').value,
            address1: document.getElementById('address-line1').value,
            address2: document.getElementById('address-line2').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value
        };

        this.addresses.push(formData);
        this.loadAddresses();
        document.getElementById('address-modal').style.display = 'none';
        this.showMessage('Address saved successfully!', 'success');
    }

    editAddress(addressId) {
        const address = this.addresses.find(addr => addr.id === addressId);
        if (address) {
            // Fill form with existing data
            document.getElementById('address-name').value = address.name;
            document.getElementById('recipient-name').value = address.recipient;
            document.getElementById('phone-number').value = address.phone;
            document.getElementById('postal-code').value = address.postalCode;
            document.getElementById('address-line1').value = address.address1;
            document.getElementById('address-line2').value = address.address2;
            document.getElementById('city').value = address.city;
            document.getElementById('state').value = address.state;
            
            // Remove old address and show modal
            this.deleteAddress(addressId, false);
            this.showAddressModal();
        }
    }

    deleteAddress(addressId, showMessage = true) {
        this.addresses = this.addresses.filter(addr => addr.id !== addressId);
        this.loadAddresses();
        if (showMessage) {
            this.showMessage('Address deleted successfully!', 'success');
        }
    }

    changePassword() {
        const newPassword = prompt('Enter new password:');
        if (newPassword && newPassword.length >= 6) {
            this.currentUser.password = newPassword;
            const storageKey = localStorage.getItem('userData') ? 'userData' : 'userData';
            if (localStorage.getItem('userData')) {
                localStorage.setItem('userData', JSON.stringify(this.currentUser));
            } else {
                sessionStorage.setItem('userData', JSON.stringify(this.currentUser));
            }
            this.showMessage('Password changed successfully!', 'success');
        } else if (newPassword) {
            this.showMessage('Password must be at least 6 characters long.', 'error');
        }
    }

    deleteAccount() {
        const confirmation = confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmation) {
            const finalConfirmation = confirm('This will permanently delete all your data. Are you absolutely sure?');
            if (finalConfirmation) {
                localStorage.removeItem('userData');
                sessionStorage.removeItem('userData');
                alert('Account deleted successfully.');
                window.location.href = 'index.html';
            }
        }
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('userData');
            sessionStorage.removeItem('userData');
            window.location.href = 'index.html';
        }
    }

    // Cart functionality
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
                    ${item.size ? `<p>Size: ${item.size}</p>` : ''}
                </div>
                <div>
                    <span>${item.quantity}</span>
                </div>
            </div>
        `).join('');

        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPriceElement.textContent = totalPrice.toLocaleString();
    }

    checkout() {
        if (this.cart.length === 0) {
            alert('Your bag is empty.');
            return;
        }

        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const confirmation = confirm(`Complete purchase for ₩${totalPrice.toLocaleString()}?`);
        
        if (confirmation) {
            // Add to order history
            const newOrder = {
                id: 'ORD-' + String(Date.now()).slice(-6),
                date: new Date().toISOString().split('T')[0],
                status: 'processing',
                total: totalPrice,
                items: [...this.cart]
            };
            
            this.orders.unshift(newOrder);
            
            alert('Order completed. Thank you for shopping with MGB.');
            this.cart = [];
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.updateCartDisplay();
            document.getElementById('cart-modal').style.display = 'none';
        }
    }

    loadUserData() {
        // Load user-specific data from localStorage if needed
        const userKey = `user_${this.currentUser.email}`;
        const savedData = localStorage.getItem(userKey);
        
        if (savedData) {
            const data = JSON.parse(savedData);
            this.orders = data.orders || this.orders;
            this.wishlist = data.wishlist || this.wishlist;
            this.addresses = data.addresses || this.addresses;
        }
        
        // Sync cart from main shopping mall
        this.syncCartFromMain();
    }

    saveUserData() {
        // Save user-specific data to localStorage
        const userKey = `user_${this.currentUser.email}`;
        const userData = {
            orders: this.orders,
            wishlist: this.wishlist,
            addresses: this.addresses
        };
        localStorage.setItem(userKey, JSON.stringify(userData));
    }

    syncCartFromMain() {
        // Get cart data from main shopping mall
        const mainCart = JSON.parse(localStorage.getItem('cart')) || [];
        this.cart = mainCart;
        this.updateCartDisplay();
    }

    showMessage(message, type) {
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 1rem 2rem;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            animation: slideDown 0.3s ease-out;
            ${type === 'error' ? 'background: #e74c3c;' : 'background: #27ae60;'}
        `;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

const myPage = new MyPage();

const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;
document.head.appendChild(style);