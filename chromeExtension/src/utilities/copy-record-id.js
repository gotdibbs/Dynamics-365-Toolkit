import * as Fathom from 'fathom-client';

function copyRecordId({ context: formContext }) {
    var id = formContext.Xrm.Page.data.entity.getId();
    if (!id) {
        return alert('Failed to find id on this form.');
    }

    if (window.clipboardData && window.clipboardData.setData('Text', id)) {
        return;
    } else {
        window.prompt('Copy to clipboard: Ctrl+C, Enter', id);
    }

    Fathom.trackGoal('5TP4Q3GP', 0);
}

export default {
    action: copyRecordId,
    key: 'copy-record-id',
    title: 'Copy Record Id',
    description: 'Copies the unique identifier for the current record to your clipboard.',
    requiresForm: true
};
