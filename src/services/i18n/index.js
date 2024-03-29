import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


// Get the current user language
const language = document.documentElement.lang || window.navigator.language;

// Add support for React
i18n.use(initReactI18next);

// Initialize with language
i18n.init({
    lng: language,
    fallbackLng: 'en',
    joinArrays: ' '
});

/**
 * Adds translations to the given namespace
 * 
 * @param {string} namespace The namespace to add the translations to
 * @param {object} translations The translations
 */
export function addTranslations(namespace, translations) {
    Object.entries(translations).forEach(([language, resources]) => {
        i18n.addResourceBundle(language, namespace, resources, true, true);
    });
}

/**
 * Gets a translator for the given namespace and prefix
 * 
 * @param {string} namespace The namespace to get the translator for
 * @param {string} prefix The prefix to get the translator for
 * @returns {function} A namespaced translator function
 */
export function getTranslator(namespace, prefix) {
    return i18n.getFixedT(language, namespace, prefix);
}

export default i18n;
