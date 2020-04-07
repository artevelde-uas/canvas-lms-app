
function onElementAdded(selector, handler) {
    let currentElements = Array.from(document.querySelectorAll(selector));

    currentElements.forEach(element => {
        handler(element);
    });


    new MutationObserver(mutationRecords => {
        if (mutationRecords.some(mutation => (mutation.type === 'childList' && mutation.addedNodes.length > 0))) {
            let elements = Array.from(document.querySelectorAll(selector));
            let addedElements = elements.filter(element => !currentElements.includes(element));

            addedElements.forEach(element => {
                handler(element);
            });

            currentElements = Array.from(elements);
        }
    }).observe(document, {
        childList: true,
        subtree: true
    });
}

function onElementRemoved(selector, handler) {
    let currentElements = Array.from(document.querySelectorAll(selector));

    new MutationObserver(mutationRecords => {
        if (mutationRecords.some(mutation => (mutation.type === 'childList' && mutation.removedNodes.length > 0))) {
            let elements = Array.from(document.querySelectorAll(selector));
            let removededElements = currentElements.filter(element => !elements.includes(element));

            removededElements.forEach(element => {
                handler(element);
            });

            currentElements = Array.from(elements);
        }
    }).observe(document, {
        childList: true,
        subtree: true
    });
}

export default {
    onElementAdded,
    onElementRemoved
};
