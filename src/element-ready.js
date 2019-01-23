

export default function (selector, handler) {
    var promise = new Promise(function (resolve) {
        var element = document.querySelector(selector);
        var observer = new MutationObserver(function (mutation) {
            var nodes = Array.from(mutation.addedNodes || []);

            for (let node of nodes) {
                if (node instanceof Element && node.matches(selector)) {
                    observer.disconnect();

                    return resolve(node);
                }
            }
        });

        if (element !== null) {
            return resolve(element);
        }

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });

    promise.then(handler, function (event) {
        console.log(event.message);
    }).catch(function (ex) {
        throw ex;
    });
}
