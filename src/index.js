import Router from 'routes';
import EventEmitter from 'events';
import elementReady from 'element-ready-es5';


const router = new Router();
const emitter = new EventEmitter();


function getRouteHandler(app, name) {
    return function (params) {
        params.name = name;

        if (app !== undefined) {
            emitter.emit('application:' + app, { name: app });
        }
        
        emitter.emit('route:' + name, params);
    };
}


export default new class {
    
    constructor() {
        this.initRouter();
    }
    
    initRouter() {
        router.addRoute('/', getRouteHandler('dashboard', 'dashboard'));
        
        router.addRoute('/courses', getRouteHandler('courses', 'courses'));
        router.addRoute('/courses/:id', getRouteHandler('courses', 'course.home'));
        router.addRoute('/courses/:id/announcements', getRouteHandler('courses', 'course.announcements'));
        router.addRoute('/courses/:id/discussion_topics/new?is_announcement=true', getRouteHandler('courses', 'course.announcements.new'));
        router.addRoute('/courses/:id/discussion_topics', getRouteHandler('courses', 'course.discussions'));
        router.addRoute('/courses/:id/gradebook', getRouteHandler('courses', 'course.gradebook'));
        router.addRoute('/courses/:id/users', getRouteHandler('courses', 'course.users'));
        router.addRoute('/courses/:id/settings', getRouteHandler('courses', 'course.settings'));
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
        plugin.init(this);
    }
    
    handle(path) {
        var match = router.match(path);
        
        if (match === undefined) return false;
        
        match.fn(match.params);
    }
    
}
