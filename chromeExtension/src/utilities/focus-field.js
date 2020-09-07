import * as Fathom from 'fathom-client';

function focusField() {
    var schemaName,
        field,
        section,
        tab;

    schemaName = window.prompt('Please enter the schema name of the field to copy below. For example: new_name.');
    field = window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getControl(schemaName);
    if (!schemaName || !field) {
        return alert('Failed to find field on this form.');
    }

    section = field.getParent();
    if (section) {
        tab = section.getParent();
        if (tab) {
            tab.setVisible(true);
            tab.setDisplayState('expanded');
        }
        section.setVisible(true);
    }

    field.setFocus();

    Fathom.trackGoal('AWYB6DBW', 0);
}

export default {
    action: focusField,
    key: 'focus-field',
    title: 'Focus Field',
    description: 'Sets focus to a specified field based on schema name.',
    requiresForm: true
};