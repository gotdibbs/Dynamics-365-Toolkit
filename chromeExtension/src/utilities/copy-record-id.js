import * as Fathom from 'fathom-client';

function copyRecordId() {
    var id = window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.data.entity.getId();
    if (!id) {
        return alert('Failed to find id on this form. Is this a create form?');
    }

    var input = document.createElement('input');
    input.value = id;
    document.body.appendChild(input);

    input.select();
    document.execCommand('copy');
    input.remove();

    alert('Copied! Note: you can perform this action on the Info tab too!');

    Fathom.trackGoal('5TP4Q3GP', 0);
}

export default {
    action: copyRecordId,
    key: 'copy-record-id',
    title: 'Copy Record Id',
    description: 'Copies the unique identifier for the current record to your clipboard.',
    requiresForm: true
};
