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
        router.addRoute('/courses/:courseId', getRouteHandler('courses', 'course.home'));
        router.addRoute('/courses/:courseId/announcements', getRouteHandler('courses', 'course.announcements'));
        router.addRoute('/courses/:courseId/discussion_topics/new?is_announcement=true', getRouteHandler('courses', 'course.announcements.new'));
        router.addRoute('/courses/:courseId/discussion_topics', getRouteHandler('courses', 'course.discussions'));
        router.addRoute('/courses/:courseId/gradebook', getRouteHandler('courses', 'course.gradebook'));
        router.addRoute('/courses/:courseId/grades', getRouteHandler('courses', 'course.grades'));
        router.addRoute('/courses/:courseId/outcomes', getRouteHandler('courses', 'course.outcomes'));
        router.addRoute('/courses/:courseId/quizzes', getRouteHandler('courses', 'course.quizzes'));
        router.addRoute('/courses/:courseId/pages', getRouteHandler('courses', 'course.pages'));
        router.addRoute('/courses/:courseId/wiki', getRouteHandler('courses', 'course.pages.home'));
        router.addRoute('/courses/:courseId/pages/:pageSlug', getRouteHandler('courses', 'course.pages.view'));
        router.addRoute('/courses/:courseId/pages/:pageSlug/edit', getRouteHandler('courses', 'course.pages.edit'));
        router.addRoute('/courses/:courseId/pages/:pageSlug/revisions', getRouteHandler('courses', 'course.pages.revisions'));
        router.addRoute('/courses/:courseId/modules', getRouteHandler('courses', 'course.modules'));
        router.addRoute('/courses/:courseId/assignments/syllabus', getRouteHandler('courses', 'course.syllabus'));
        router.addRoute('/courses/:courseId/assignments', getRouteHandler('courses', 'course.assignments'));
        router.addRoute('/courses/:courseId/conferences', getRouteHandler('courses', 'course.conferences'));
        router.addRoute('/courses/:courseId/lti_collaborations', getRouteHandler('courses', 'course.collaborations'));
        router.addRoute('/courses/:courseId/users', getRouteHandler('courses', 'course.users'));
        router.addRoute('/courses/:courseId/settings', getRouteHandler('courses', 'course.settings'));
        router.addRoute('/courses/:courseId/statistics', getRouteHandler('courses', 'course.settings.statistics'));
        router.addRoute('/courses/:courseId/confirm_action?event=conclude', getRouteHandler('courses', 'course.settings.confirm-conclude'));
        router.addRoute('/courses/:courseId/confirm_action?event=delete', getRouteHandler('courses', 'course.settings.confirm-delete'));
        router.addRoute('/courses/:courseId/copy', getRouteHandler('courses', 'course.settings.copy'));
        router.addRoute('/courses/:courseId/content_migrations', getRouteHandler('courses', 'course.settings.import'));
        router.addRoute('/courses/:courseId/content_export', getRouteHandler('courses', 'course.settings.export'));
        router.addRoute('/courses/:courseId/external_tools/:toolId', getRouteHandler('courses', 'course.external-tool'));
    }
    
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
        elementReady(selector).then(handler);
    }
    
    addPlugin(plugin, options) {
        switch (typeof plugin) {
        case 'function':
            plugin(this, options);
            break;
        case 'object':
            plugin.init(this, options);
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
