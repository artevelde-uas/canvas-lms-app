import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';


function setTranslations(translations, fallbackLanguage = 'en') {
    var resources = {};

    Object.entries(translations).forEach(function ([key, value]) {
        resources[key] = { 'translation': value };
    });

    this.use(initReactI18next);
    this.init({
        lng: document.documentElement.lang || window.navigator.language,
        fallbackLng: fallbackLanguage,
        resources
    });
}

function translate(keys, options) {
    return this.t(keys, options);
}

function createInstance() {
    var i18n = i18next.createInstance();

    return {
        setTranslations: setTranslations.bind(i18n),
        translate: translate.bind(i18n)
    }
}


export default {
    createInstance
}
