import services from './services';
import elementReady from './element-ready';
import router from './router';
import i18n from './i18n';
import api from './api';


services.add('addRouteListener', () => router.addListener.bind(router));
services.add('getRouteUrl', () => router.getUrl.bind(router));
services.add('addAppListener', () => addAppListener);
services.add('addReadyListener', () => elementReady);
services.add('i18n', () => i18n.createInstance());
services.add('api', () => api);


//DEPRECATED: use `addRouteListener()`
function addAppListener(name, handler) {
    var names = Array.isArray(name) ? name : name.split(/\s*,\s*/);

    names.forEach(function (name) {
        console.warn(`DEPRECATED: Use "addRouteListener('${name}.*', handler)" instead`);

        router.addListener(name + '.*', handler);
    });
}

function addPlugin(plugin, options = {}) {
    var sm = services.createLazyManager();

    try {
        switch (typeof plugin) {
        case 'function':
            plugin(sm, options);
            break;
        case 'object':
            plugin.init(sm, options);
            break;
        }
    } catch (ex) {
        console.error(ex.toString());
    }
}

function run() {
    var path = window.location.pathname + window.location.search;

    if (window !== window.top) return;

    router.handlePath(path);
}

// DEPRECATED: use `run()`
function handle(path) {
    console.warn('DEPRECATED: Use "run()" instead');

    run();
}


export default {
    addPlugin,
    run,
    handle
}
