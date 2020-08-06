import * as Fathom from 'fathom-client';

function copyRecordLink({ context: formContext }) {
    var id = formContext.Xrm.Page.data.entity.getId(),
        entityName = formContext.Xrm.Page.data.entity.getEntityName(),
        url = formContext.Xrm.Page.context.getClientUrl();
    if (!id) {
        return alert('Failed to find id on this form.');
    }

    url = [url, '/main.aspx?', 'etn=', entityName, '&id=', id, '&pagetype=entityrecord'].join('');

    if (window.clipboardData && window.clipboardData.setData('Text', url)) {
        return;
    } else {
        window.prompt('Copy to clipboard: Ctrl+C, Enter', url);
    }

    Fathom.trackGoal('6AOAXPCL', 0);
}

export default {
    action: copyRecordLink,
    key: 'copy-record-link',
    title: 'Copy Record Link',
    description: 'Copies a link to the current record to your clipboard.',
    requiresForm: true
};
