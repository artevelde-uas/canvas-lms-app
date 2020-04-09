
var services = [];


export function addService(name, initializer) {
    services.push({ name, initializer });
}

export function createServiceManager() {
    const serviceManager = {};

    services.forEach(function ({ name, initializer }) {
        Object.defineProperty(serviceManager, name, {
            value: initializer(serviceManager),
            configurable: false
        });
    });

    return serviceManager;
}
