import Router from 'routes';
import EventEmitter from 'events';
import elementReady from 'element-ready-es5';


const router = new Router();
const emitter = new EventEmitter();


function getRouteHandler(app, name) {
    return function (params) {
        emitter.emit('application:' + app, { name: app });
        
        if (name === undefined) {
            name = app;
        }
        
        params.name = name;
        emitter.emit('route:' + name, params);
    };
}


export default new class {
    
    constructor() {
        this.initRouter();
    }
    
    initRouter() {
        router.addRoute('/', getRouteHandler('dashboard'));
        
        router.addRoute('/courses', getRouteHandler('courses'));
        router.addRoute('/courses/:id', getRouteHandler('courses', 'course.home'));
        router.addRoute('/courses/:id/announcements', getRouteHandler('courses', 'course.announcements'));
        router.addRoute('/courses/:id/discussion_topics/new?is_announcement=true', getRouteHandler('courses', 'course.announcements.new'));
        router.addRoute('/courses/:id/discussion_topics', getRouteHandler('courses', 'course.discussions'));
        router.addRoute('/courses/:id/gradebook', getRouteHandler('courses', 'course.gradebook'));
        router.addRoute('/courses/:id/users', getRouteHandler('courses', 'course.users'));
        router.addRoute('/courses/:id/settings', getRouteHandler('courses', 'course.settings'));
        router.addRoute('/courses/:id/statistics', getRouteHandler('courses', 'course.settings.statistics'));
        router.addRoute('/courses/:id/confirm_action?event=conclude', getRouteHandler('courses', 'course.settings.confirm-conclude'));
        router.addRoute('/courses/:id/confirm_action?event=delete', getRouteHandler('courses', 'course.settings.confirm-delete'));
        router.addRoute('/courses/:id/copy', getRouteHandler('courses', 'course.settings.copy'));
        router.addRoute('/courses/:id/content_migrations', getRouteHandler('courses', 'course.settings.import'));
        router.addRoute('/courses/:id/content_export', getRouteHandler('courses', 'course.settings.export'));
        router.addRoute('/courses/:id/external_tools/:toolId', getRouteHandler('courses', 'course.external-tool'));
    }
    
    addRouteListener(name, handler) {
        emitter.on('route:' + name, handler);
    }
    
    addAppListener(name, handler) {
        emitter.on('application:' + name, handler);
    }
    
    addReadyListener(selector, handler) {
        elementReady(selector).then(handler);
    }
    
    addPlugin(plugin) {
        switch (typeof plugin) {
        case 'function':
            plugin(this);
            break;
        case 'object':
            plugin.init(this);
            break;
        }
    }
    
    run() {
        let path = window.location.pathname + window.location.search;
        
        this.handle(path);
    }
    
    // DEPRECATED: use `run()`
    handle(path) {
        var match = router.match(path);
        
        if (match === undefined) return false;
        
        match.fn(match.params);
    }
    
}
