
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

    // Observe the given root element for any new elements that are added
    new MutationObserver((mutationRecords, observer) => {
        if (mutationRecords.some(mutation => (mutation.type === 'childList' && mutation.addedNodes.length > 0))) {
            const elements = Array.from(root.querySelectorAll(selector));
            const addedElements = elements.filter(element => !currentElements.includes(element));

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

    // Observe the given root element for any elements that are removed
    new MutationObserver((mutationRecords, observer) => {
        if (mutationRecords.some(mutation => (mutation.type === 'childList'))) {
            const elements = Array.from(root.querySelectorAll(selector));
            const removedElements = currentElements.filter(element => !elements.includes(element));

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
 * Observes changes to a given element's attributes
 * 
 * @param {HTMLElement} element The element to observe
 * @param {function} handler The handler to run on each change
 * @param {boolean} options.once If TRUE, the handler will fire only once
 * @param {boolean} options.oldValue If TRUE, the old value will also be returned
 * @param {Array|string} options.filter Only attributes provided in the array will be observed
 */
function onAttributeChange(element, handler, {
    once = false,
    oldValue = false,
    filter = []
} = {}) {
    // Convert filter to array if necessary
    if (!Array.isArray(filter)) {
        filter = Array.of(filter);
    }

    // Observe the given element for any changes in the text content
    new MutationObserver((mutationRecords, observer) => {
        mutationRecords.forEach(function (mutation) {
            // Only execute if one of the filtered attributes changed
            if (mutation.type !== 'attributes') return;
            if (!filter.includes(mutation.attributeName)) return;

            // Get the value from the element's attribute
            const value = mutation.target.getAttribute(mutation.attributeName);

            // Invoke the handler with the new (and optionally old) value
            if (oldValue) {
                handler(value, mutation.attributeName, mutation.oldValue);
            } else {
                handler(value, mutation.attributeName);
            }

            // Stop observing after first change
            if (once) {
                observer.disconnect();
            }
        });
    }).observe(element, {
        attributes: true,
        attributeFilter: filter,
        attributeOldValue: oldValue
    });
}

/**
 * Observes the element for existing or added CSS classes
 * 
 * @param {HTMLElement} element The element to observe
 * @param {function} handler The handler to run on each change
 * @param {Array} options.filter Only attributes provided in the array will be observed
 * @param {boolean} options.once If TRUE, the handler will fire only once
 */
 function onClassAdded(element, handler, {
    filter = [],
    once = false
} = {}) {
    // Convert filter to array if necessary
    if (!Array.isArray(filter)) {
        filter = Array.of(filter);
    }

    // Run handler for each existing class name
    filter.forEach(className => {
        if (element.classList.contains(className)) {
            handler(className);
        }
    });

    onAttributeChange(element, (value, attributeName, oldValue) => {
        const oldClasses = oldValue.split(' ');
        const newClasses = value.split(' ');

        // Run handler for each added class name
        filter.forEach(className => {
            if (!oldClasses.includes(className) && newClasses.includes(className)) {
                handler(className);
            }
        });
    }, {
        filter: 'class',
        once,
        oldValue: true
    });
}

/**
 * Observes the element for removed CSS classes
 * 
 * @param {HTMLElement} element The element to observe
 * @param {function} handler The handler to run on each change
 * @param {Array} options.filter Only attributes provided in the array will be observed
 * @param {boolean} options.once If TRUE, the handler will fire only once
 */
function onClassRemoved(element, handler, {
    filter = [],
    once = false
} = {}) {
    // Convert filter to array if necessary
    if (!Array.isArray(filter)) {
        filter = Array.of(filter);
    }

    onAttributeChange(element, (value, attributeName, oldValue) => {
        const oldClasses = oldValue.split(' ');
        const newClasses = value.split(' ');

        // Run handler for each removed class name
        filter.forEach(className => {
            if (oldClasses.includes(className) && !newClasses.includes(className)) {
                handler(className);
            }
        });
    }, {
        filter: 'class',
        once,
        oldValue: true
    });
}

/**
 * Observes changes to the text content of a given element
 * 
 * @param {HTMLElement} element The element to observe
 * @param {function} handler The handler to run on each change
 * @param {boolean} options.once If TRUE, the handler will fire only once
 * @param {boolean} options.oldValue If TRUE, the old value will also be returned
 */
function onTextContentChange(element, handler, {
    once = false,
    oldValue = false
} = {}) {
    // Store the current value
    let textContent = oldValue ? element.textContent : undefined;

    // Observe the given element for any changes in the text content
    new MutationObserver((mutationRecords, observer) => {
        // Invoke the handler with the new (and optionally old) value
        if (oldValue) {
            handler(element.textContent, textContent);
        } else {
            handler(element.textContent);
        }

        // Stop observing after first change
        if (once) {
            observer.disconnect();

            return;
        }

        // Store the new value
        if (oldValue) {
            textContent = element.textContent;
        }
    }).observe(element, {
        characterData: true,
        childList: true,
        subtree: true
    });
}

/**
 * Observes the document for the availability of one or more elements
 *
 * @param {string} selector The CSS selector to observe, or an array of selectors
 * @param {object} options The options
 * @param {ParentNode} options.root The root element to observe
 * @returns {Promise} A Promise that will be resolved when all elements are available
 */
function onElementReady(selector, { root = document } = {}) {
    // If an array of selectors is passed, return a Promise that will resolve all of them
    if (Array.isArray(selector)) {
        return Promise.all(selector.map(selector => onElementReady(selector, { root })));
    }

    // Return a Promise that will resolve when the first occurance becomes available
    return new Promise(resolve => {
        onElementAdded(selector, resolve, { root, once: true });
    });
}

export default {
    onElementAdded,
    onElementRemoved,
    onElementReady,
    onAttributeChange,
    onClassAdded,
    onClassRemoved,
    onTextContentChange
};
