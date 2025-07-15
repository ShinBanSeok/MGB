class RegisterManager {
    constructor() {
        this.registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        this.termsContent = {
            terms: `
                <h3>이용약관</h3>
                <p>1. 본 약관은 Shopping Mall에서 제공하는 서비스 이용에 관한 조건을 규정합니다.</p>
                <p>2. 회원은 서비스 이용 시 본 약관과 관련 법령을 준수해야 합니다.</p>
                <p>3. 회원은 정확한 정보를 제공해야 하며, 허위 정보 제공 시 서비스 이용이 제한될 수 있습니다.</p>
                <p>4. 회원의 개인정보는 관련 법령에 따라 보호됩니다.</p>
                <p>5. 서비스 이용 중 발생하는 문제에 대해서는 고객센터로 문의해 주시기 바랍니다.</p>
            `,
            privacy: `
                <h3>개인정보 처리방침</h3>
                <p>1. 수집하는 개인정보 항목</p>
                <p>- 필수항목: 이름, 이메일, 비밀번호</p>
                <p>- 선택항목: 전화번호, 생년월일</p>
                <p>2. 개인정보 이용목적</p>
                <p>- 회원관리 및 서비스 제공</p>
                <p>- 고객상담 및 불만처리</p>
                <p>3. 개인정보 보유기간</p>
                <p>- 회원탈퇴 시까지 보유</p>
                <p>4. 개인정보 제3자 제공</p>
                <p>- 원칙적으로 제3자에게 제공하지 않습니다.</p>
            `
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupValidation();
    }

    setupEventListeners() {
        const registerForm = document.getElementById('register-form');
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        const checkEmailBtn = document.getElementById('check-email-btn');
        checkEmailBtn.addEventListener('click', () => {
            this.checkEmailAvailability();
        });

        const termsLinks = document.querySelectorAll('.terms-link');
        termsLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const type = e.target.closest('.checkbox-item').querySelector('input').id;
                this.showTermsModal(type);
            });
        });

        const modal = document.getElementById('terms-modal');
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        const requiredCheckboxes = document.querySelectorAll('input[type="checkbox"][required]');
        requiredCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateSubmitButton();
            });
        });
    }

    setupValidation() {
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const emailInput = document.getElementById('email');

        passwordInput.addEventListener('input', () => {
            this.checkPasswordStrength();
            this.checkPasswordMatch();
        });

        confirmPasswordInput.addEventListener('input', () => {
            this.checkPasswordMatch();
        });

        emailInput.addEventListener('input', () => {
            const emailStatus = document.getElementById('email-status');
            emailStatus.textContent = '';
            emailStatus.className = '';
        });
    }

    checkPasswordStrength() {
        const password = document.getElementById('password').value;
        const strengthFill = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');

        let strength = 0;
        let strengthLabel = '';

        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        strengthFill.className = 'strength-fill';

        if (strength <= 2) {
            strengthFill.classList.add('weak');
            strengthLabel = '약함';
        } else if (strength <= 3) {
            strengthFill.classList.add('medium');
            strengthLabel = '보통';
        } else {
            strengthFill.classList.add('strong');
            strengthLabel = '강함';
        }

        strengthText.textContent = `비밀번호 강도: ${strengthLabel}`;
    }

    checkPasswordMatch() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const matchIndicator = document.getElementById('password-match');

        if (confirmPassword === '') {
            matchIndicator.textContent = '';
            matchIndicator.className = 'match-indicator';
        } else if (password === confirmPassword) {
            matchIndicator.textContent = '✓';
            matchIndicator.className = 'match-indicator match';
        } else {
            matchIndicator.textContent = '✗';
            matchIndicator.className = 'match-indicator no-match';
        }

        this.updateSubmitButton();
    }

    checkEmailAvailability() {
        const email = document.getElementById('email').value;
        const emailStatus = document.getElementById('email-status');

        if (!email) {
            this.showError('이메일을 입력해주세요.');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showError('올바른 이메일 형식을 입력해주세요.');
            return;
        }

        const isAvailable = !this.registeredUsers.some(user => user.email === email);

        if (isAvailable) {
            emailStatus.textContent = '사용 가능한 이메일입니다.';
            emailStatus.className = 'available';
        } else {
            emailStatus.textContent = '이미 사용 중인 이메일입니다.';
            emailStatus.className = 'unavailable';
        }

        this.updateSubmitButton();
    }

    updateSubmitButton() {
        const registerBtn = document.querySelector('.register-btn');
        const requiredCheckboxes = document.querySelectorAll('input[type="checkbox"][required]');
        const allRequiredChecked = Array.from(requiredCheckboxes).every(cb => cb.checked);
        const passwordMatch = document.getElementById('password-match').classList.contains('match');
        const emailChecked = document.getElementById('email-status').classList.contains('available');

        registerBtn.disabled = !(allRequiredChecked && passwordMatch && emailChecked);
    }

    showTermsModal(type) {
        const modal = document.getElementById('terms-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalText = document.getElementById('modal-text');

        if (type === 'agree-terms') {
            modalTitle.textContent = '이용약관';
            modalText.innerHTML = this.termsContent.terms;
        } else if (type === 'agree-privacy') {
            modalTitle.textContent = '개인정보 처리방침';
            modalText.innerHTML = this.termsContent.privacy;
        }

        modal.style.display = 'block';
    }

    handleRegister() {
        const formData = this.getFormData();
        
        if (!this.validateRegistration(formData)) {
            return;
        }

        this.showLoading();

        setTimeout(() => {
            this.registerUser(formData);
            this.hideLoading();
        }, 2000);
    }

    getFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirm-password').value,
            phone: document.getElementById('phone').value.trim(),
            birth: document.getElementById('birth').value,
            agreeTerms: document.getElementById('agree-terms').checked,
            agreePrivacy: document.getElementById('agree-privacy').checked,
            agreeMarketing: document.getElementById('agree-marketing').checked
        };
    }

    validateRegistration(data) {
        if (!data.name || !data.email || !data.password) {
            this.showError('필수 정보를 모두 입력해주세요.');
            return false;
        }

        if (!this.isValidEmail(data.email)) {
            this.showError('올바른 이메일 형식을 입력해주세요.');
            return false;
        }

        if (data.password.length < 8) {
            this.showError('비밀번호는 8자 이상이어야 합니다.');
            return false;
        }

        if (data.password !== data.confirmPassword) {
            this.showError('비밀번호가 일치하지 않습니다.');
            return false;
        }

        if (!data.agreeTerms || !data.agreePrivacy) {
            this.showError('필수 약관에 동의해주세요.');
            return false;
        }

        if (this.registeredUsers.some(user => user.email === data.email)) {
            this.showError('이미 가입된 이메일입니다.');
            return false;
        }

        return true;
    }

    registerUser(data) {
        const newUser = {
            id: Date.now(),
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            birth: data.birth,
            agreeMarketing: data.agreeMarketing,
            registeredAt: new Date().toISOString()
        };

        this.registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));

        this.showSuccess('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');

        setTimeout(() => {
            window.location.href = `login.html?email=${encodeURIComponent(data.email)}`;
        }, 2000);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
}

const registerManager = new RegisterManager();

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