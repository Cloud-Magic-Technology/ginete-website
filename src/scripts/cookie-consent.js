(function () {
    var STORAGE_KEY = 'cookie-consent';
    var CONSENT_VERSION = 1;

    function getConsent() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            var data = JSON.parse(raw);
            if (data.version !== CONSENT_VERSION) return null;
            return data;
        } catch (e) {
            return null;
        }
    }

    function saveConsent(categories) {
        var data = {
            version: CONSENT_VERSION,
            timestamp: new Date().toISOString(),
            categories: categories
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function hideBanner() {
        var banner = document.getElementById('cookie-banner');
        if (banner) banner.hidden = true;
    }

    function showBanner() {
        var banner = document.getElementById('cookie-banner');
        if (banner) banner.hidden = false;
    }

    function init() {
        var consent = getConsent();
        if (consent) return; // Already consented

        showBanner();

        var acceptAll = document.getElementById('cookie-accept-all');
        var essentialOnly = document.getElementById('cookie-essential-only');
        var settingsToggle = document.getElementById('cookie-settings-toggle');
        var settingsPanel = document.getElementById('cookie-settings-panel');
        var saveSettings = document.getElementById('cookie-save-settings');

        if (acceptAll) {
            acceptAll.addEventListener('click', function () {
                saveConsent({ essential: true, functional: true });
                hideBanner();
            });
        }

        if (essentialOnly) {
            essentialOnly.addEventListener('click', function () {
                saveConsent({ essential: true, functional: false });
                hideBanner();
            });
        }

        if (settingsToggle && settingsPanel) {
            settingsToggle.addEventListener('click', function () {
                settingsPanel.hidden = !settingsPanel.hidden;
            });
        }

        if (saveSettings) {
            saveSettings.addEventListener('click', function () {
                var functional = document.getElementById('cookie-functional');
                saveConsent({
                    essential: true,
                    functional: functional ? functional.checked : false
                });
                hideBanner();
            });
        }
    }

    // Allow re-opening from footer link
    window.openCookieSettings = function () {
        localStorage.removeItem(STORAGE_KEY);
        showBanner();
        var settingsPanel = document.getElementById('cookie-settings-panel');
        if (settingsPanel) settingsPanel.hidden = false;
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
