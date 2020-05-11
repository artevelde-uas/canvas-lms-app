import { createServiceManager, addService } from './services';
import api from '@artevelde-uas/canvas-lms-api';
import auth from './services/auth';
import dom from './services/dom';
import elementReady from './services/dom/element-ready';
import i18n from './services/i18n';
import messages from './services/messages';
import router, { handlePath, addAppListener } from './services/router';


addService('api', api);
addService('auth', auth);
addService('dom', dom);
addService('i18n', () => i18n.createInstance());
addService('messages', messages);
addService('router', router);
addService('addRouteListener', () => router.addListener.bind(router)); // DEPRECATED: use `router.addListener()`
addService('getRouteUrl', () => router.getUrl.bind(router)); // DEPRECATED: use `router.getUrl()`
addService('addAppListener', () => addAppListener); // DEPRECATED: use `router.addListener()`
addService('addReadyListener', () => elementReady); // DEPRECATED: use `dom.onElementAdded()`


function addPlugin(plugin, options = {}) {
    var serviceManager = createServiceManager();

    try {
        switch (typeof plugin) {
            case 'function':
                plugin(serviceManager, options);
                break;
            case 'object':
                plugin.init(serviceManager, options);
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
