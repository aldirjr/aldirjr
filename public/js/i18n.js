// public/js/i18n.js

class I18n {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.translations = {};
        this.init();
    }

    detectLanguage() {
        // Check localStorage first
        const saved = localStorage.getItem('preferred-language');
        if (saved) return saved;

        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const lang = browserLang.split('-')[0]; // 'en-US' => 'en'

        // Supported languages
        const supported = ['en', 'pt', 'fr'];
        return supported.includes(lang) ? lang : 'en';
    }

    async init() {
        await this.loadTranslations(this.currentLang);
        this.updatePage();
        this.setupLanguageSwitcher();
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`/locales/${lang}.json`);
            this.translations = await response.json();
        } catch (error) {
            console.error(`Error loading translations for ${lang}:`, error);
            // Fallback to English
            if (lang !== 'en') {
                const response = await fetch('/locales/en.json');
                this.translations = await response.json();
            }
        }
    }

    t(key) {
        const keys = key.split('.');
        let value = this.translations;

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }

        return value || key;
    }

    updatePage() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;

        // Update page title if specified
        const titleKey = document.body.getAttribute('data-page-title');
        if (titleKey) {
            document.title = this.t(titleKey) + ' - Junior\'s World';
        }
    }

    async switchLanguage(lang) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        localStorage.setItem('preferred-language', lang);
        await this.loadTranslations(lang);
        this.updatePage();

        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });

        // Dispatch event for other components to update
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    setupLanguageSwitcher() {
        // Create language switcher if it doesn't exist
        const nav = document.querySelector('.navbar-nav');
        if (!nav || document.querySelector('.language-switcher')) return;

        const switcher = document.createElement('li');
        switcher.className = 'nav-item dropdown language-switcher';
        switcher.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" 
               data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-globe"></i> ${this.currentLang.toUpperCase()}
            </a>
            <ul class="dropdown-menu" aria-labelledby="languageDropdown">
                <li>
                    <a class="dropdown-item lang-btn ${this.currentLang === 'en' ? 'active' : ''}" 
                       href="#" data-lang="en">
                        🇺🇸 English
                    </a>
                </li>
                <li>
                    <a class="dropdown-item lang-btn ${this.currentLang === 'pt' ? 'active' : ''}" 
                       href="#" data-lang="pt">
                        🇧🇷 Português
                    </a>
                </li>
                <li>
                    <a class="dropdown-item lang-btn ${this.currentLang === 'fr' ? 'active' : ''}" 
                       href="#" data-lang="fr">
                        🇫🇷 Français
                    </a>
                </li>
            </ul>
        `;

        nav.appendChild(switcher);

        // Add click handlers
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.dataset.lang;
                this.switchLanguage(lang);
                
                // Update dropdown button text
                document.getElementById('languageDropdown').innerHTML = 
                    `<i class="fas fa-globe"></i> ${lang.toUpperCase()}`;
            });
        });
    }

    // Helper method to translate and format
    tf(key, replacements = {}) {
        let translation = this.t(key);
        
        Object.keys(replacements).forEach(key => {
            translation = translation.replace(`{${key}}`, replacements[key]);
        });
        
        return translation;
    }
}

// Initialize i18n
const i18n = new I18n();

// Export for use in other scripts
window.i18n = i18n;

// Example usage in HTML:
/*
<h1 data-i18n="home.welcome">Welcome to My World</h1>
<p data-i18n="home.subtitle">Developer • Traveler...</p>
<button data-i18n="common.save">Save</button>
<input type="text" data-i18n="common.search" placeholder="Search...">
*/

// Example usage in JavaScript:
/*
const welcomeText = i18n.t('home.welcome');
const formattedText = i18n.tf('welcome.user', { name: 'Junior' }); // "Welcome, Junior!"

// Listen for language changes
window.addEventListener('languageChanged', (e) => {
    console.log('Language changed to:', e.detail.lang);
    // Update dynamic content
});
*/

// CSS for language switcher
const i18nStyles = `
<style>
.language-switcher .dropdown-menu {
    min-width: 150px;
}

.language-switcher .lang-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
}

.language-switcher .lang-btn:hover {
    background: var(--light, #ecf0f1);
}

.language-switcher .lang-btn.active {
    background: var(--secondary, #27ae60);
    color: white;
}

.language-switcher .dropdown-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>
`;
