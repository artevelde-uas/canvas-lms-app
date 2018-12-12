
var services = [];


function add(name, initializer) {
    services.push({ name, initializer });
}

function createLazyManager() {
    let sm = {};
    
    services.forEach(function lazyLoader({ name, initializer }) {
        Object.defineProperty(sm, name, {
            get: function () {
                let obj = initializer();
                
                Object.defineProperty(this, name, {
                    value: obj,
                    writable: false,
                    configurable: false
                });
                
                return obj;
            },
            configurable: true
        });
    });
    
    return sm;
}


export default {
    add,
    createLazyManager
}
