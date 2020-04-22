
/**
 * Observes the document for existing or added elements matching a selector
 *
 * @param {string} selector The CSS seletor to observe
 * @param {function} handler The handler to run for each added element
 */
function onElementAdded(selector, handler) {
    let currentElements = Array.from(document.querySelectorAll(selector));

    // Handle all existing elements
    currentElements.forEach(element => {
        handler(element);
    });

    // Observe the page for any new elements that are added
    new MutationObserver(mutationRecords => {
        if (mutationRecords.some(mutation => (mutation.type === 'childList' && mutation.addedNodes.length > 0))) {
            let elements = Array.from(document.querySelectorAll(selector));
            let addedElements = elements.filter(element => !currentElements.includes(element));

            // Handle all new elements
            addedElements.forEach(element => {
                handler(element);
            });

            // Update the element list
            currentElements = Array.from(elements);
        }
    }).observe(document, {
        childList: true,
        subtree: true
    });
}

/**
 * Observes the document for removed elements matching a selector
 *
 * @param {string} selector The CSS seletor to observe
 * @param {function} handler The handler to run for each removed element
 */
function onElementRemoved(selector, handler) {
    let currentElements = Array.from(document.querySelectorAll(selector));

    // Observe the page for any new elements that are removed
    new MutationObserver(mutationRecords => {
        if (mutationRecords.some(mutation => (mutation.type === 'childList' && mutation.removedNodes.length > 0))) {
            let elements = Array.from(document.querySelectorAll(selector));
            let removededElements = currentElements.filter(element => !elements.includes(element));

            // Handle all removed elements
            removededElements.forEach(element => {
                handler(element);
            });

            // Update the element list
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
