

export default function (root, selector, handler) {
    var promise = new Promise(function (resolve) {
        var element, observer;

        if (typeof root === 'string' && (typeof selector === 'function' || selector === undefined)) {
            handler = selector;
            selector = root;
            root = document.body;
        }

        element = document.querySelector(selector);

        if (element !== null) {
            resolve(element);
        } else {
            observer = new MutationObserver((mutationRecords, observer) => {
                if (mutationRecords.some(mutation => (mutation.type === 'childList' && mutation.addedNodes.length))) {
                    let element = document.querySelector(selector);

                    if (element !== null) {
                        observer.disconnect();
                        resolve(element);
                    }
                }
            });

            observer.observe(root, {
                childList: true,
                subtree: true
            });
        }
    });

    if (handler === undefined) {
        return promise;
    }

    promise.then(handler, function (event) {
        console.error(event.message);
    }).catch(function (ex) {
        throw ex;
    });
}
