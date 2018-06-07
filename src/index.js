import Router from 'routes';
import EventEmitter from 'events';
import elementReady from 'element-ready-es5';


const router = new Router();
const emitter = new EventEmitter();


function getEmitter(name) {
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
        router.addRoute('/', getEmitter('dashboard'));
        
        router.addRoute('/courses', getEmitter('courses'));
        router.addRoute('/courses/:id', getEmitter('course.home'));
        router.addRoute('/courses/:id/announcements', getEmitter('course.announcements'));
        router.addRoute('/courses/:id/discussion_topics/new?is_announcement=true', getEmitter('course.announcements.new'));
        router.addRoute('/courses/:id/discussion_topics', getEmitter('course.discussions'));
        router.addRoute('/courses/:id/gradebook', getEmitter('course.gradebook'));
        router.addRoute('/courses/:id/users', getEmitter('course.users'));
        router.addRoute('/courses/:id/settings', getEmitter('course.settings'));
        router.addRoute('/courses/:id/external_tools/:toolId', getEmitter('course.external-tool'));
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
