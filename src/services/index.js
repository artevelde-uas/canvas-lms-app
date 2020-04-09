
var services = [];


export function addService(name, service) {
    services.push({ name, service });
}

export function createServiceManager() {
    const serviceManager = {};

    services.forEach(function ({ name, service }) {
        serviceManager[name] = (typeof service === 'function') ? service(serviceManager) : service;
    });

    return Object.freeze(serviceManager);
}
