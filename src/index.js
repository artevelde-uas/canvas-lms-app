import { createServiceManager, addService } from './services';
import api from './services/api';
import auth from './services/auth';
import dom from './services/dom';
import elementReady from './services/dom/element-ready';
import i18n from './services/i18n/old';
import messages from './services/messages';
import router, { handlePath, addAppListener } from './services/router';
import theme from './theme';


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


const plugins = new Map();


function addPlugin(plugin, options = { classicPlugin: false }) {
    var serviceManager = createServiceManager();

    if (options.classicPlugin) {
        console.warn('DEPRECATED: Classic plug-in support will be removed in the future');

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

        return;
    }

    try {
        const info = plugin(options);

        plugins.set(plugin, { info, options });
    } catch (err) {
        console.error(err.toString());
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

export {
    api,
    auth,
    dom,
    i18n,
    messages,
    router,
    theme
};

export default {
    addPlugin,
    run,
    handle
};
