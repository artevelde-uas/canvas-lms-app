
const services = new Map();


export function addService(name, service) {
    services.set(name, service);
}

export function createServiceManager() {
    const serviceManager = {};

    services.forEach((service, name) => {
        serviceManager[name] = (typeof service === 'function') ? service(serviceManager) : service;
    });

    return Object.freeze(serviceManager);
}
