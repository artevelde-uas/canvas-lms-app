import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const language = document.documentElement.lang || window.navigator.language;

i18n.use(initReactI18next);
i18n.init({
    lng: language,
    fallbackLng: 'en'
});


export function addTranslations(ns, translations) {
    Object.entries(translations).forEach(([language, resources]) => {
        i18n.addResourceBundle(language, ns, resources, true, true);
    });
}

export function getTranslator(ns, prefix) {
    return i18n.getFixedT(language, ns, prefix);
}

export default i18n;
