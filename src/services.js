
var services = [];


function add(name, initializer) {
    services.push({ name, initializer });
}

function createLazyManager() {
    var sm = {};

    services.forEach(function ({ name, initializer }) {
        Object.defineProperty(sm, name, {
            get: function () {
                var obj = initializer();

                Object.defineProperty(this, name, {
                    value: obj
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
