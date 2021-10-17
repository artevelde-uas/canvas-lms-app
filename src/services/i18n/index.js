import i18n from 'i18next';


const language = document.documentElement.lang || window.navigator.language;

i18n.init({
    lng: language,
    fallbackLng: 'en',
    defaultNS: 'translations'
});


export function getTranslator(ns, translations) {
    Object.entries(translations).forEach(([language, resources]) => {
        i18n.addResources(language, ns, resources);
    });

    return i18n.getFixedT(language, ns);
}

export default i18n;
