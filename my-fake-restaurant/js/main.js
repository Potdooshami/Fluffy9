document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Language Toggle
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('lang') || 'en'; // Default to English or saved pref

    // Initialize Language
    updateLanguage(currentLang);

    // Inject Footer
    loadFooter();

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'kr' : 'en';
            updateLanguage(currentLang);
            localStorage.setItem('lang', currentLang);
        });
    }

    function loadFooter() {
        const footerPlaceholder = document.getElementById('global-footer');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = `
                <footer>
                    <div class="container">
                        <p>&copy; 2026 Cloud Fluff 9. All rights theoretically reserved.</p>
                    </div>
                </footer>
            `;
        }
    }

    function updateLanguage(lang) {
        // Update text for all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update Toggle Button Text
        if (langToggle) {
            langToggle.textContent = lang === 'en' ? 'KR' : 'EN'; // Show opposite language to switch to, or current? User expects toggle to show current or target?
            // Usually toggle shows what it IS or what it WILL BE. 
            // Design choice: Button says "EN" or "KR" to indicate current or switch?
            // Let's make it show the Target language to switch TO.
            langToggle.textContent = lang === 'en' ? 'KR' : 'EN';
        }

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
});
