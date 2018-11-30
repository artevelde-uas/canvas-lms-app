import Router from 'routes';
import EventEmitter from 'events';
import elementReady from 'element-is-ready';

import router from './router';

const emitter = new EventEmitter();


function fireRouteEvent(match) {
    let name = match.name;
    // TODO: don't add name to params (could conflict with 'name' parameter)
    let params = {
        name: match.name,
        ...match.params
    };
    let index;
    
    emitter.emit('route:' + match.name, params);
    
    do {
        emitter.emit('route:' + name + '.*', params);
        
        index = name.lastIndexOf('.');
        name = name.substring(0, index);
    } while (index >= 0);
}

function fireAppEvent(match) {
    let name = match.name;
    let app = name.substring(0, name.indexOf('.')) || name;
    
    // TODO: fix route names from 'course.' to 'courses.'
    // TODO: deprecate 'application' events
    if (app === 'course') {
        app = 'courses';
    }
    
    emitter.emit('application:' + app, { name: app });
}

function addRouteListener(name, handler) {
    let names = Array.isArray(name) ? name : name.split(/\s*,\s*/);
    
    names.forEach(function (name) {
        emitter.on('route:' + name, handler);
    });
}

function addAppListener(name, handler) {
    let names = Array.isArray(name) ? name : name.split(/\s*,\s*/);
    
    names.forEach(function (name) {
        emitter.on('application:' + name, handler);
    });
}

function addReadyListener(selector, handler) {
    elementReady(selector).then(handler, function (event) {
        console.log(event.message);
    }).catch(function (ex) {
        throw ex;
    });
}

function addPlugin(plugin, options) {
    let services = {
        addRouteListener,
        addAppListener,
        addReadyListener
    };
    
    try {
        switch (typeof plugin) {
        case 'function':
            plugin(services, options);
            break;
        case 'object':
            plugin.init(services, options);
            break;
        }
    } catch (ex) {
        console.error(ex.message);
    }
}

function run() {
    let path = window.location.pathname + window.location.search;
    
    if (window !== window.top) return;
    
    this.handle(path);
}

// DEPRECATED: use `run()`
function handle(path) {
    let match = router.match(path);
    
    if (match === undefined) return false;
    
    fireRouteEvent(match);
    fireAppEvent(match); 
}


export default {
    addPlugin,
    run,
    handle
}
