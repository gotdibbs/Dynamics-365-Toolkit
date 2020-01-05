try {
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
}
catch(er) {
    alert('Error occurred set focus to desired field. '+ er.message);
    Honeybadger && Honeybadger.notify && Honeybadger.notify(e, {
        action: 'focus-field',
        component: 'bookmarklets',
        context: { version: config.version }
    });
}