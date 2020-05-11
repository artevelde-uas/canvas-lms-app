import dom from './index';


export default function (root, selector, handler) {
    if (typeof root === 'string' && (typeof selector === 'function' || selector === undefined)) {
        handler = selector;
        selector = root;
        root = document.body;
    }

    let promise = dom.onElementReady(selector, { root });

    if (handler === undefined) {
        return promise;
    }

    promise.then(handler, function (event) {
        console.error(event.message);
    }).catch(function (ex) {
        throw ex;
    });
}
