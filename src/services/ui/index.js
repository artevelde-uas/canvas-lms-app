
export function createInfoButton(contents, options = {}) {
    const infoButton = document.createElement('button');
    const infoIcon = document.createElement('i');
    const title = options.title ?? 'More info';

    infoButton.className = 'Button Button--icon-action';
    infoIcon.className = 'icon-question';
    infoIcon.title = title;
    infoButton.append(infoIcon);

    const dialog = jQuery(contents).dialog({
        ...options,
        autoOpen: false,
        modal: true,
        title
    });

    infoButton.addEventListener('click', event => {
        dialog.dialog('open');
    });

    return infoButton;
}

export default {
    createInfoButton
};
