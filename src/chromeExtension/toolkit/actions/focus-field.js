export default function focusFields({ context: formContext }) {
    var schemaName,
        field,
        section,
        tab;

    schemaName = window.prompt('Please enter the schema name of the field to copy below. For example: new_name.');
    field = formContext.Xrm.Page.getControl(schemaName);
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

    fathom && fathom('trackGoal', 'AWYB6DBW', 0);
};