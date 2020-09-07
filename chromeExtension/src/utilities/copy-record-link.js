import * as Fathom from 'fathom-client';

function copyRecordLink() {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;
    var id = xrm.Page.data.entity.getId(),
        entityName = xrm.Page.data.entity.getEntityName(),
        url = xrm.Page.context.getClientUrl();
    if (!id) {
        return alert('Failed to find id on this form. Is this a create form?');
    }

    url = [url, '/main.aspx?', 'etn=', entityName, '&id=', id, '&pagetype=entityrecord'].join('');

    var input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);

    input.select();
    document.execCommand('copy');
    input.remove();

    alert('Copied! Note: you can perform this action on the Info tab too!');

    Fathom.trackGoal('6AOAXPCL', 0);
}

export default {
    action: copyRecordLink,
    key: 'copy-record-link',
    title: 'Copy Record Link',
    description: 'Copies a link to the current record to your clipboard.',
    requiresForm: true
};
