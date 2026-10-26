import styles from './index.module.css';


/**
 * Gets the corresponding class name and icon type of the given message type
 * 
 * @param {string} type The type of the message
 * @returns {object} The corresponding class name and icon type
 */
function getFlashInfo(type) {
    switch (type) {
        case 'info':
        case 'information':
        default:
            return {
                className: 'info',
                iconType: 'info'
            };
        case 'warning':
        case 'warn':
        case 'alert':
            return {
                className: 'warning',
                iconType: 'warning'
            };
        case 'error':
        case 'danger':
            return {
                className: 'error',
                iconType: 'warning'
            };
        case 'success':
            return {
                className: 'success',
                iconType: 'check'
            };
    }
}

/**
 * Gets the corresponding class name and icon type of the given notification type
 * 
 * @param {string} type The type of the notification
 * @returns {object} The corresponding class name and icon type
 */
function getNotificationInfo(type) {
    switch (type) {
        case 'info':
        case 'information':
        default:
            return {
                className: 'info',
                iconType: 'info'
            };
        case 'warning':
        case 'warn':
        case 'alert':
            return {
                className: 'alert',
                iconType: 'warning'
            };
        case 'error':
        case 'danger':
            return {
                className: 'danger',
                iconType: 'warning'
            };
        case 'question':
            return {
                className: 'info',
                iconType: 'question'
            };
    }
}

/**
 * Gets the corresponding class name and icon type of the given message type
 * 
 * @param {string} type The type of the message
 * @param {boolean} border Indicates if the icon should have a circular outline border around it
 * @returns {object} The corresponding class name and icon type
 */
function getMessageInfo(type, border = false) {
    switch (type) {
        case 'info':
        case 'information':
        default:
            return {
                className: styles.info,
                iconType: border ? 'info' : 'info-borderless'
            };
        case 'warning':
        case 'warn':
        case 'alert':
            return {
                className: styles.warning,
                iconType: border ? 'warning' : 'warning-borderless'
            };
    }
}

/**
 * Adds a flash message to the top of the page
 * 
 * @param {string} message The message text
 * @param {object} options The options for the message
 * @param {string} options.type The type of message (info, warning, error, success)
 * @param {string} options.hideAfter The time after which the message should disappear (CSS time value; e.g. '2s' or '1500ms')
 * @returns 
 */
export function addFlashMessage(message, { type = 'info', hideAfter = '5s' } = {}) {
    // Find the flash message container
    const container = document.getElementById('flash_message_holder');

    if (container === null) return;

    // Get the corresponding class name and icon type of the given message type
    const { className, iconType } = getFlashInfo(type);

    // Prepend the message to the container
    container.insertAdjacentHTML('afterbegin', `
        <li class="ic-flash-${className} ${styles.flashMessage} ${styles.hide}"
            ${hideAfter ? `style="animation-delay: ${hideAfter};"` : ''}>
            <div class="ic-flash__icon">
                <i class="icon-${iconType}"></i>
            </div>
            ${message}
            <button type="button" class="Button Button--icon-action close_link">
                <i class="icon-x"></i>
            </button>
        </li>
    `);

    // Remove the message after the hide animation
    container.firstElementChild.addEventListener('animationend', event => {
        event.target.remove();
    });
}

/**
 * Adds a notification message to the top of the main content
 * 
 * @param {string} title The notification title
 * @param {string} message The notification body
 * @param {object} options The options for the notification
 * @param {string} options.type The type of notification (info, warning, error, question)
 * @param {boolean} options.canClose Indicates if the notification can be closed by the user
 * @param {string} options.hideAfter The time after which the notification should disappear (CSS time value; e.g. '2s' or '1500ms')
 */
export function addNotification(title, message, { type = 'info', canClose = true, hideAfter = false } = {}) {
    // Find the flash notification container
    let container = document.getElementById(styles.contentMessageHolder);

    // Create the container if it is not found
    if (container === null) {
        const content = document.getElementById('content');

        if (content === null) return;

        content.insertAdjacentHTML('afterbegin', `
            <ul id="${styles.contentMessageHolder}">
            </ul>
        `);

        container = document.getElementById(styles.contentMessageHolder);
    }

    // Get the corresponding class name and icon type of the given notification type
    const { className, iconType } = getNotificationInfo(type);

    // Append the message to the container
    container.insertAdjacentHTML('beforeend', `
        <div class="ic-notification ic-notification--admin-created
                    ic-notification--${className} ${styles.notification} ${hideAfter ? styles.hide : ''}"
             ${hideAfter ? `style="animation-delay: ${hideAfter};"` : ''}>
            <div class="ic-notification__icon">
                <i class="icon-${iconType}"></i>
            </div>
            <div class="notification_account_content">
                <div class="ic-notification__content">
                    <div class="ic-notification__message">
                        <h4 class="ic-notification__title">
                            ${title}
                        </h4>
                        <span class="notification_message">
                            ${message}
                        </span>
                    </div>
                    <div class="ic-notification__actions">
                        ${canClose ? `
                            <a href="#" class="Button Button--icon-action" title="Remove">
                                <i class="icon-x"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `);

    // Remove the message after the hide animation
    if (hideAfter) {
        container.lastElementChild.addEventListener('animationend', event => {
            event.target.remove();
        });
    }

    // Handle click on the close button
    if (canClose) {
        container.lastElementChild.addEventListener('click', event => {
            const button = event.target.closest('.Button--icon-action');

            if (button === null) return;

            event.preventDefault();

            event.target.closest('.ic-notification').remove();
        });
    }
}

/**
 * Adds a message to the given container
 * 
 * @param {string} message The message body
 * @param {HTMLElement} options.container The container element to which the message will be added
 * @param {object} options The options for the message
 * @param {string} options.type The type of message (info, warning)
 * @param {string} options.append Indicates if the message should be appended to the container (true) or prepended (false)
 * @returns
 */
export function addMessage(message, container, { type = 'info', append = false } = {}) {
    const position = append ? 'beforeend' : 'afterbegin';

    // Get the corresponding class name and icon type of the given notification type
    const { className, iconType } = getMessageInfo(type);

    // Add the message to the container
    container.insertAdjacentHTML(position, `
        <div dir="ltr" open="" class="${styles.message} ${className}">
            <div class="${styles.icon}">
                <i class="icon-${iconType}"></i>
            </div>
            <div class="${styles.content}">
                ${message}
            </div>
        </div>
    `);
}

export default {
    addFlashMessage,
    addNotification,
    addMessage
};
