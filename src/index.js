import services from './services';
import elementReady from './element-ready';
import router, { handlePath } from './router';
import i18n from './i18n';
import api from '@artevelde-uas/canvas-lms-api';
import dom from './dom';
import auth from './auth';
import messages from './messages';


services.add('router', () => router);
services.add('addRouteListener', () => router.addListener.bind(router)); // DEPRECATED: use `router.addListener()`
services.add('getRouteUrl', () => router.getUrl.bind(router)); // DEPRECATED: use `router.getUrl()`
services.add('addAppListener', () => addAppListener); // DEPRECATED: use `router.addListener()`
services.add('addReadyListener', () => elementReady); // DEPRECATED: use `dom.onElementAdded()`
services.add('i18n', () => i18n.createInstance());
services.add('api', () => api);
services.add('dom', () => dom);
services.add('auth', () => auth);
services.add('messages', () => messages);


// DEPRECATED: use `addRouteListener()`
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

    handlePath(path);
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
};
