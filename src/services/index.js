
var services = [];


export function addService(name, service) {
    services.push({ name, service });
}

export function createServiceManager() {
    const serviceManager = {};

    services.forEach(function ({ name, service }) {
        Object.defineProperty(serviceManager, name, {
            value: (typeof service === 'function') ? service(serviceManager) : service,
            configurable: false
        });
    });

    return serviceManager;
}
