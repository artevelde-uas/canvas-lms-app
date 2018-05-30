import Router from 'routes';
import EventEmitter from 'events';


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
    }
    
    addRouteListener(name, handler) {
        emitter.on(name, handler);
    }
    
    handle(path) {
        var match = router.match(path);
        
        if (match === undefined) return false;
        
        match.fn(match.params);
    }
    
}
