
/**
 * Observes the document for existing or added elements matching a selector
 *
 * @param {string} selector The CSS seletor to observe
 * @param {function} handler The handler to run for each added element
 * @param {object} options The options
 * @param {boolean} options.once If TRUE, the handler will fire only once
 * @param {ParentNode} options.root The root element to observe
 * @param {boolean} options.subtree Whether the subtree will also be observed
 */
function onElementAdded(selector, handler, {
    once = false,
    root = document,
    subtree = true
} = {}) {
    let currentElements = Array.from(root.querySelectorAll(selector));

    // Stop if element found and 'once' option provided
    if (once && currentElements.length > 0) {
        handler(currentElements[0]);

        return;
    }

    // Handle all existing elements
    currentElements.forEach(element => {
        handler(element);
    });

    // Observe the page for any new elements that are added
    new MutationObserver((mutationRecords, observer) => {
        if (mutationRecords.some(mutation => (mutation.type === 'childList' && mutation.addedNodes.length > 0))) {
            let elements = Array.from(root.querySelectorAll(selector));
            let addedElements = elements.filter(element => !currentElements.includes(element));

            // Stop if element found and 'once' option provided
            if (once && addedElements.length > 0) {
                observer.disconnect();
                handler(addedElements[0]);

                return;
            }

            // Handle all new elements
            addedElements.forEach(element => {
                handler(element);
            });

            // Update the element list
            currentElements = elements;
        }
    }).observe(root, {
        childList: true,
        subtree
    });
}

/**
 * Observes the document for removed elements matching a selector
 *
 * @param {string} selector The CSS seletor to observe
 * @param {function} handler The handler to run for each removed element
 * @param {object} options The options
 * @param {boolean} options.once If TRUE, the handler will fire only once
 * @param {ParentNode} options.root The root element to observe
 * @param {boolean} options.subtree Whether the subtree will also be observed
 */
function onElementRemoved(selector, handler, {
    once = false,
    root = document,
    subtree = true
} = {}) {
    let currentElements = Array.from(root.querySelectorAll(selector));

    // Observe the page for any new elements that are removed
    new MutationObserver((mutationRecords, observer) => {
        if (mutationRecords.some(mutation => (mutation.type === 'childList'))) {
            let elements = Array.from(root.querySelectorAll(selector));
            let removedElements = currentElements.filter(element => !elements.includes(element));

            // Stop if element found and 'once' option provided
            if (once && removedElements.length > 0) {
                observer.disconnect();
                handler(removedElements[0]);

                return;
            }

            // Handle all removed elements
            removedElements.forEach(element => {
                handler(element);
            });

            // Update the element list
            currentElements = elements;
        }
    }).observe(root, {
        childList: true,
        subtree
    });
}

/**
 * Observes changes to the text content of a given element
 * 
 * @param {HTMLElement} element The element to observe
 * @param {function} handler The handler to run on each change
 */
function onTextContentChange(element, handler) {
    // Store the current value
    let textContent = element.textContent;

    // Observe ...
    new MutationObserver(() => {
        // Invoke the handler with the new and old values
        handler(element.textContent, textContent);

        // Store the new value
        textContent = element.textContent;
    }).observe(element, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
    });
}

/**
 * Observes the document for the availability of an element
 *
 * @param {string} selector The CSS seletor to observe
 * @param {object} options The options
 * @param {ParentNode} options.root The root element to observe
 * @returns {Promise} A Promise that will be resolved when the element is available
 */
function onElementReady(selector, { root = document } = {}) {
    return new Promise(resolve => {
        onElementAdded(selector, resolve, { root, once: true });
    });
}

export default {
    onElementAdded,
    onElementRemoved,
    onElementReady,
    onTextContentChange
};
