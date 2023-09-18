
export function createInfoButton(contents, options = {}) {
    const infoButton = document.createElement('button');
    const infoIcon = document.createElement('i');

    infoButton.className = 'Button Button--icon-action';
    infoIcon.className = 'icon-question';
    infoButton.append(infoIcon);

    const dialog = jQuery(contents).dialog({
        ...options,
        autoOpen: false,
        modal: true
    });

    infoButton.addEventListener('click', event => {
        dialog.dialog('open');
    });

    return infoButton;
}

export default {
    createInfoButton
};
