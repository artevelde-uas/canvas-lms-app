import api from './services/api';
import auth from './services/auth';
import dom from './services/dom';
import i18n from './services/i18n/old';
import messages from './services/messages';
import router, { handlePath } from './services/router';
import theme from './theme';

// DEPRECATED
import { createServiceManager, addService } from './services';


// DEPRECATED
addService('api', api);
addService('auth', auth);
addService('dom', dom);
addService('i18n', () => i18n.createInstance());
addService('messages', messages);
addService('router', router);


const plugins = new Map();


/**
 * Registers a plug-in
 * 
 * @param {function} plugin The plugin to register
 * @param {object} options The options to pass to the plugin
 * @param {boolean} [options.classicPlugin] Indicates if the plug-in is a classic one that needs the services injected
 */
export function addPlugin(plugin, options = { classicPlugin: false }) {
    // DEPRECATED
    var serviceManager = createServiceManager();
    
    // DEPRECATED
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
export function run() {
    var path = window.location.pathname + window.location.search;
    // Get the current path with the query string

    // Don't run inside iframes
    if (window !== window.top) return;
        

    // Let the router handle the current path
    handlePath(path);
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
    run
};
