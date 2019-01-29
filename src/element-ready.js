

export default function (root, selector, handler) {
    var promise = new Promise(function (resolve) {
        var element, observer;
        
        if (typeof root === 'string' && typeof selector === 'function') {
            handler = selector;
            selector = root;
            root = document.body;
        }
        
        element = document.querySelector(selector);
        
        if (element !== null) {
            return resolve(element);
        }
        
        observer = new MutationObserver(function (mutation) {
            var nodes = Array.from(mutation.addedNodes || []);
            
            for (let node of nodes) {
                if (node instanceof Element && node.matches(selector)) {
                    observer.disconnect();
                    
                    return resolve(node);
                }
            }
        });
        
        observer.observe(root, {
            childList: true,
            subtree: true
        });
    });
    
    if (handler === undefined) {
        return promise;
    }
    
    promise.then(handler, function (event) {
        console.log(event.message);
    }).catch(function (ex) {
        throw ex;
    });
}
