import i18next from 'i18next';


function setTranslations(translations) {
    var resources = {};
    
    Object.entries(translations).forEach(function ([key, value]) {
        resources[key] = { 'translation': value };
    });
    
    this.init({
        lng: document.documentElement.lang,
        fallbackLng: 'en',
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
