import Router from 'routes';
import EventEmitter from 'events';
import elementReady from 'element-is-ready';

import router from './router';

const emitter = new EventEmitter();


function fireRouteEvent(match) {
    let params = {
        name: match.name,
        ...match.params
    };
    
    emitter.emit('route:' + match.name, params);
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


export default new class {
    
    addRouteListener(name, handler) {
        let names = Array.isArray(name) ? name : name.split(/\s*,\s*/);
        
        names.forEach(function (name) {
            emitter.on('route:' + name, handler);
        });
    }
    
    addAppListener(name, handler) {
        let names = Array.isArray(name) ? name : name.split(/\s*,\s*/);
        
        names.forEach(function (name) {
            emitter.on('application:' + name, handler);
        });
    }
    
    addReadyListener(selector, handler) {
        elementReady(selector).then(handler, function (event) {
            console.log(event.message);
        }).catch(function (ex) {
            throw ex;
        });
    }
    
    addPlugin(plugin, options) {
        try {
            switch (typeof plugin) {
            case 'function':
                plugin(this, options);
                break;
            case 'object':
                plugin.init(this, options);
                break;
            }
        } catch (ex) {
            console.error(ex.message);
        }
    }
    
    run() {
        let path = window.location.pathname + window.location.search;
        
        if (window !== window.top) return;
        
        this.handle(path);
    }
    
    // DEPRECATED: use `run()`
    handle(path) {
        let match = router.match(path);
        
        if (match === undefined) return false;
        
        fireRouteEvent(match);
        fireAppEvent(match); 
    }
    
}
