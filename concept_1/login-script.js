class LoginManager {
    constructor() {
        this.users = [
            { email: 'admin@shop.com', password: 'admin123', name: '관리자' },
            { email: 'user@shop.com', password: 'user123', name: '사용자' }
        ];
        this.registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkLoginStatus();
        this.prefillEmailFromURL();
    }

    setupEventListeners() {
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        const socialButtons = document.querySelectorAll('.social-btn');
        socialButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleSocialLogin(e.target.textContent.trim());
            });
        });

        const forgotPasswordLink = document.querySelector('.forgot-password');
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleForgotPassword();
        });
    }

    handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        if (!this.validateInput(email, password)) {
            return;
        }

        this.showLoading();

        setTimeout(() => {
            let user = this.users.find(u => u.email === email && u.password === password);
            
            if (!user) {
                user = this.registeredUsers.find(u => u.email === email && u.password === password);
            }
            
            if (user) {
                this.loginSuccess(user, remember);
            } else {
                this.loginFailed();
            }
            
            this.hideLoading();
        }, 1500);
    }

    validateInput(email, password) {
        if (!email || !password) {
            this.showError('이메일과 비밀번호를 입력해주세요.');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showError('올바른 이메일 형식을 입력해주세요.');
            return false;
        }

        if (password.length < 6) {
            this.showError('비밀번호는 6자 이상이어야 합니다.');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    loginSuccess(user, remember) {
        const userData = {
            email: user.email,
            name: user.name,
            loginTime: new Date().toISOString()
        };

        if (remember) {
            localStorage.setItem('userData', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('userData', JSON.stringify(userData));
        }

        this.showSuccess(`${user.name}님, 환영합니다!`);
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    loginFailed() {
        this.showError('이메일 또는 비밀번호가 잘못되었습니다.');
        this.clearForm();
    }

    handleSocialLogin(provider) {
        this.showLoading();
        
        setTimeout(() => {
            const socialUser = {
                email: `${provider.toLowerCase()}@user.com`,
                name: `${provider} 사용자`,
                loginTime: new Date().toISOString()
            };

            sessionStorage.setItem('userData', JSON.stringify(socialUser));
            this.hideLoading();
            this.showSuccess(`${provider} 로그인 성공!`);
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 1000);
    }

    handleForgotPassword() {
        const email = prompt('가입하신 이메일을 입력해주세요:');
        
        if (email && this.isValidEmail(email)) {
            this.showSuccess('비밀번호 재설정 링크를 이메일로 전송했습니다.');
        } else if (email) {
            this.showError('올바른 이메일을 입력해주세요.');
        }
    }

    checkLoginStatus() {
        const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
        
        if (userData) {
            const user = JSON.parse(userData);
            if (confirm(`${user.name}님으로 이미 로그인되어 있습니다. 쇼핑몰로 이동하시겠습니까?`)) {
                window.location.href = 'index.html';
            }
        }
    }

    showLoading() {
        document.getElementById('loading').style.display = 'flex';
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
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

    clearForm() {
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('remember').checked = false;
    }

    prefillEmailFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        
        if (email) {
            document.getElementById('email').value = decodeURIComponent(email);
            document.getElementById('password').focus();
        }
    }
}

const loginManager = new LoginManager();

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