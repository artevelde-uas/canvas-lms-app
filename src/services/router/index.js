import Route from 'route-parser';
import EventEmitter from 'events';

import routeMappings from './routes.json';


const emitter = new EventEmitter();

// Convert route mappings to actual Route objects
const routes = Object.fromEntries(Object.entries(routeMappings).map(([name, spec]) => ([name, new Route(spec)])));


function fireEvents(name, params) {
    let index = name.lastIndexOf('.');
    let baseName = name;

    // Fire the event for the full route name
    emitter.emit(name, params, name);

    // Fire the event for each sub route with wildcard
    while (index >= 0) {
        baseName = baseName.substring(0, index);
        emitter.emit(baseName + '.*', params, name);
        index = baseName.lastIndexOf('.');
    }

    // Fire the global wildcard route event
    emitter.emit('*', params, name);
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
    const [name] = Object.entries(routes).find(([, route]) => (match = route.match(path))) || [];

    if (name === undefined) return null;

    return {
        name,
        params: match
    };
}

/**
 * Fires all route events for the given path
 * 
 * @param {string} path The path to fire the route events for
 */
export function handlePath(path) {
    const match = routeMatch(path);

    if (match === null) return;

    fireEvents(match.name, match.params);
}

/**
 * Gets the URL for the given route and parameters
 * 
 * @param {string} name The route name to get the URL for
 * @param {object} params The params to use for the URL
 * @returns {string} The URL for the given route, or FALSE if route can't be found
 */
function getUrl(name, params) {
    return routes[name].reverse(params);
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
        if (name !== '*' && !Object.keys(routes).some(name => (name === baseName || name.startsWith(`${baseName}.`)))) {
            throw new TypeError(`Route '${name}' does not exist.`);
        }

        emitter.on(name, handler);
    });
}


export default {
    onRoute,
    getUrl
};
