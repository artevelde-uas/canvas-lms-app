import Router from 'routes';
import EventEmitter from 'events';
import elementReady from 'element-ready-es5';


const router = new Router();
const emitter = new EventEmitter();


function getRouteHandler(name) {
    return function (params) {
        params.name = name;
        
        emitter.emit(name, params);
    };
}


export default class {
    
    constructor() {
        this.initRouter();
    }
    
    initRouter() {
        router.addRoute('/', getRouteHandler('dashboard'));
        
        router.addRoute('/courses', getRouteHandler('courses'));
        router.addRoute('/courses/:id', getRouteHandler('course.home'));
        router.addRoute('/courses/:id/announcements', getRouteHandler('course.announcements'));
        router.addRoute('/courses/:id/discussion_topics/new?is_announcement=true', getRouteHandler('course.announcements.new'));
        router.addRoute('/courses/:id/discussion_topics', getRouteHandler('course.discussions'));
        router.addRoute('/courses/:id/gradebook', getRouteHandler('course.gradebook'));
        router.addRoute('/courses/:id/users', getRouteHandler('course.users'));
        router.addRoute('/courses/:id/settings', getRouteHandler('course.settings'));
        router.addRoute('/courses/:id/external_tools/:toolId', getRouteHandler('course.external-tool'));
    }
    
    addRouteListener(name, handler) {
        emitter.on(name, handler);
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
