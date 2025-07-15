document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('language');
    const productCards = document.querySelectorAll('.product-card');
    const colorOptions = document.querySelectorAll('.color-option');

    languageSelector.addEventListener('change', function() {
        const selectedLanguage = this.value;
        updateLanguage(selectedLanguage);
    });

    function updateLanguage(lang) {
        const translations = {
            ko: {
                login: '로그인',
                cart: '장바구니',
                menClothing: '남성복',
                womenClothing: '여성복',
                sale: 'SALE',
                clearance: 'CLEARANCE',
                storeInfo: '매장안내',
                menBest: 'MEN BEST',
                womenBest: 'WOMEN BEST',
                customerService: '고객센터',
                companyInfo: '회사정보',
                socialMedia: '소셜미디어',
                serviceInfo: '이용안내'
            },
            en: {
                account: 'Account',
                cart: 'Cart',
                menClothing: "Men's Clothing",
                womenClothing: "Women's Clothing",
                sale: 'Sale',
                outlet: 'Outlet',
                storeLocator: 'Store Locator',
                menBest: "Men's Best Products",
                womenBest: "Women's Best Products",
                customerService: 'Customer Service',
                companyInfo: 'Company Info',
                socialMedia: 'Social Media',
                legalInfo: 'Legal Info'
            },
            ja: {
                account: 'アカウント',
                cart: 'カート',
                menClothing: 'メンズ服',
                womenClothing: 'レディース服',
                sale: 'セール',
                outlet: 'アウトレット',
                storeLocator: '店舗検索',
                menBest: 'メンズベスト商品',
                womenBest: 'レディースベスト商品',
                customerService: 'カスタマーサービス',
                companyInfo: '会社情報',
                socialMedia: 'ソーシャルメディア',
                legalInfo: '法的情報'
            }
        };

        if (translations[lang]) {
            document.querySelector('.login-link').textContent = translations[lang].login;
            document.querySelector('.cart-link').textContent = translations[lang].cart;
            
            const navLinks = document.querySelectorAll('.main-nav a');
            navLinks[0].textContent = translations[lang].menClothing;
            navLinks[1].textContent = translations[lang].womenClothing;
            navLinks[2].textContent = translations[lang].sale;
            navLinks[3].textContent = translations[lang].clearance;
            navLinks[4].textContent = translations[lang].storeInfo;
            
            const sectionHeaders = document.querySelectorAll('.section-header h2');
            sectionHeaders[0].textContent = translations[lang].menBest;
            sectionHeaders[1].textContent = translations[lang].womenBest;
            
            const footerHeadings = document.querySelectorAll('.footer-section h3');
            footerHeadings[0].textContent = translations[lang].customerService;
            footerHeadings[1].textContent = translations[lang].companyInfo;
            footerHeadings[2].textContent = translations[lang].socialMedia;
            footerHeadings[3].textContent = translations[lang].serviceInfo;
        }
    }

    productCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Product clicked:', this.querySelector('.product-title').textContent);
        });
    });

    colorOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const allOptionsInCard = this.parentElement.querySelectorAll('.color-option');
            allOptionsInCard.forEach(opt => opt.classList.remove('selected'));
            
            this.classList.add('selected');
            
            console.log('Color selected:', this.style.backgroundColor);
        });
    });

    let scrollPosition = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > scrollPosition && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        scrollPosition = currentScroll;
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});