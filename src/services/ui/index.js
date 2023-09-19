
export function createQuestionIcon(contents, options = {}) {
    const infoLink = document.createElement('a');
    const infoIcon = document.createElement('i');
    const title = options.title ?? 'More info';

    infoLink.href = '#';
    infoIcon.className = 'icon-question';
    infoIcon.title = title;
    infoLink.append(infoIcon);

    const dialog = jQuery(contents).dialog({
        ...options,
        autoOpen: false,
        modal: true,
        title
    });

    infoLink.addEventListener('click', event => {
        event.preventDefault();
        dialog.dialog('open');
    });

    return infoLink;
}

export default {
    createQuestionIcon
};
