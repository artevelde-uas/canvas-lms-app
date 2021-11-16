import api from './services/api';
import auth from './services/auth';
import dom from './services/dom';
import elementReady from './services/dom/element-ready';
import i18n from './services/i18n/old';
import messages from './services/messages';
import router, { handlePath } from './services/router';
import pluginsList from './plugins/plugins-list';
import theme from './theme';

// DEPRECATED
import { createServiceManager, addService } from './services';
import { addAppListener } from './services/router';


// DEPRECATED
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


/**
 * Registers a plug-in
 * 
 * @param {function} plugin The plugin to register
 * @param {object} options The options to pass to the plugin
 * @param {boolean} options.classicPlugin Indicates if the plug-in is a classic one that needs the services injected
 */
function addPlugin(plugin, options = { classicPlugin: false }) {
    // DEPRECATED
    var serviceManager = createServiceManager();

    if (options.classicPlugin) {
        console.warn('DEPRECATED: Classic plug-in support will be removed in the future');

        try {
            switch (typeof plugin) {
                case 'function':
                    // Run the plugin with services and the provided options
                    plugin(serviceManager, options);
                    break;

                case 'object':
                    // DEPRECATED: Invoke init method of object plug-ins
                    plugin.init(serviceManager, options);
                    break;
            }
        } catch (ex) {
            console.error(ex.toString());
        }

        return;
    }

    try {
        // Run the plugin with the provided options
        const info = plugin(options);

        // Store the plugin data
        plugins.set(plugin, { info, options });
    } catch (err) {
        console.error(err.toString());
    }
}

/**
 * Starts the application and runs each registered plug-in
 */
function run() {
    var path = window.location.pathname + window.location.search;
    // Get the current path with the query string

    // Don't run inside iframes
    if (window !== window.top) return;

    // Show each registered plug-in on the Profile settings page
    const pluginsInfo = Array.from(plugins.values()).map(value => value.info);
    pluginsList({ plugins: pluginsInfo });

    // Let the router handle the current path
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
