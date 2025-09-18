import Route from 'route-parser';
import EventEmitter from 'events';

import routeMappings from './routes.json';


const routeEmitter = new EventEmitter();
const paramsEmitter = new EventEmitter();

// Convert route mappings to actual Route objects
const routes = new Map(Object.entries(routeMappings).map(([name, spec]) => ([name, new Route(spec)])));


/**
 * Adds a new route to the Router service
 * 
 * @param {string} name The route name
 * @param {*} spec The route spec
 */
export function addRoute(name, spec) {
    routes.set(name, new Route(spec));
}

function fireEvents(name, params) {
    // Fire the event for the full route name
    routeEmitter.emit(name, params, name);

    let index = name.lastIndexOf('.');
    let baseName = name;

    // Fire the event for each sub route with wildcard
    while (index >= 0) {
        baseName = baseName.substring(0, index);
        routeEmitter.emit(baseName + '.*', params, name);
        index = baseName.lastIndexOf('.');
    }

    // Fire the global wildcard route event
    routeEmitter.emit('*', params, name);
}

/**
 * Looks up the name and parameters of the matched route of the given path
 * 
 * @param {string} path The path to match
 * @returns {string} The route that matches the given path
 */
export function routeMatch(path) {
    // Strip trailing slash
    path = path.replace(/\/$/, '');

    let match;
    const [name] = Array.from(routes).find(([, route]) => (match = route.match(path))) || [];

    if (name === undefined) return null;

    return {
        name,
        params: match
    };
}

function getPath() {
    // Replace the module ID in the URL hash with slash notation
    {
        const path = window.location.pathname + window.location.hash;
        const match = path.match(/\/courses\/\d+\/modules#module_(?<moduleId>\d+)$/);

        if (match !== null) {
            const url = `${window.location.pathname}/${match.groups.moduleId}`;

            history.replaceState(null, '', url);
        }
    }

    // return the current path with the query string
    return window.location.pathname + window.location.search;
}

/**
 * Fires all route events for the given path
 * 
 * @param {string} path (@deprecated) The path to fire the route events for
 */
export function handlePath(path) {
    const fixedPath = (path === undefined) ? getPath() : path;
    const match = routeMatch(fixedPath);

    if (match === null) return;

    // Fix the parameters to remove any '&' characters
    // This is a workaround for the fact that the route parser doesn't support '&' in parameters
    // and will match the first part of the parameter as the value
    const fixedParams = Object.fromEntries(Object.entries(match.params).map(([key, value]) => ([
        key,
        (value.indexOf('&') > -1)
            ? value.substring(0, value.indexOf('&'))
            : value
    ])));

    fireEvents(match.name, fixedParams);

    window.addEventListener('popstate', () => {
        // Mix current parameters with history state
        const params = {
            ...getParams(),
            ...history.state
        };

        // Fire 'params' event with new parameters
        paramsEmitter.emit('params', params);
    });
}

/**
 * Gets the URL for the given route and parameters
 * 
 * @param {string} name The route name to get the URL for
 * @param {object} params The params to use for the URL
 * @returns {string} The URL for the given route, or FALSE if route can't be found
 */
function getUrl(name, params) {
    return routes.get(name).reverse(params);
}

/**
 * Gets the parameters for the current route
 * 
 * @returns {object} The current params
 */
function getParams() {
    // Get the route from the current path
    const route = routeMatch(window.location.pathname + window.location.search);

    // Get the search parameters from the current path
    const searchParams = Object.fromEntries((new URLSearchParams(window.location.search)).entries());

    // Return combined parameters
    return {
        ...route?.params,
        ...searchParams
    };
}

/**
 * Pushes a new parameter state to the history
 * 
 * @param {object} params The parameters to push to the history
 * @returns {boolean} TRUE if the new parameters were is pushed to the history, FALSE otherwise
 */
function pushParams(newParams) {
    // Get the route from the current path
    const path = window.location.pathname + window.location.search;
    const { name, params: oldParams } = routeMatch(path);

    // Mix old parameters with new ones
    const params = {
        ...oldParams,
        ...newParams
    };

    // Create route URL with new parameters
    const url = getUrl(name, params);

    // Do nothing if URL remains unchanged
    if (path === url) return false;

    // Push the parameter state to the history
    history.pushState(params, '', url);

    // Fire 'params' event with new parameters
    paramsEmitter.emit('params', params);

    return true;
}

/**
 * Subscribe for parameter changes on the current route
 * 
 * @param {function} handler The handler to run on each parameter change
 */
function onParams(handler) {
    paramsEmitter.on('params', handler);
}

/**
 * Invokes the given handler for each match found
 * 
 * @param {string|Array} name The route name(s) to match (comma seperated list or an array)
 * @param {function} handler The handler to fire when a match is found
 */
function onRoute(name, handler) {
    // Convert the given string to an array
    const names = Array.isArray(name) ? name : name.trim().split(/\s*,\s*/);

    // Adds a listener for each given route name
    names.forEach(name => {
        // Remove the wildcard from the route name
        const baseName = name.endsWith('.*') ? name.slice(0, -2) : name;

        // Throw an error if the route name isn't found
        if (name !== '*' && !Array.from(routes.keys()).some(name => (name === baseName || name.startsWith(`${baseName}.`)))) {
            throw new TypeError(`Route '${name}' does not exist.`);
        }

        routeEmitter.on(name, handler);
    });
}


export default {
    onRoute,
    getUrl,
    getParams,
    pushParams,
    onParams
};
