import Route from 'route-parser';
import EventEmitter from 'events';

import routeMappings from './routes.json';


const emitter = new EventEmitter();

// Convert route mappings to actual Route objects
const routes = Object.fromEntries(Object.entries(routeMappings).map(([name, spec]) => ([name, new Route(spec)])));


function fireEvents(name, params) {
    var index = name.lastIndexOf('.');
    var baseName = name;

    emitter.emit(name, params, name);

    while (index >= 0) {
        baseName = baseName.substring(0, index);
        emitter.emit(baseName + '.*', params, name);
        index = baseName.lastIndexOf('.');
    }

    emitter.emit('*', params, name);
}

export function routeMatch(path) {
    var match;
    var [name] = Object.entries(routes).find(([, route]) => (match = route.match(path))) || [];

    if (name === undefined) return null;

    return {
        name,
        params: match
    };
}

export function handlePath(path) {
    var match = routeMatch(path);

    if (match === null) return;

    fireEvents(match.name, match.params);
}

function getUrl(name, params) {
    return routes[name].reverse(params);
}

function onRoute(name, handler) {
    let names = Array.isArray(name) ? name : name.trim().split(/\s*,\s*/);

    names.forEach(name => {
        var baseName = name.endsWith('.*') ? name.slice(0, -2) : name;

        if (name !== '*' && !Object.keys(routes).some(name => (name === baseName || name.startsWith(`${baseName}.`)))) {
            throw new TypeError(`Route '${name}' does not exist.`);
        }

        emitter.on(name, handler);
    });
}


export default {
    onRoute,
    getUrl,
    addListener
};
