import * as Fathom from 'fathom-client';

function toggleSchemaNames({ context: formContext }) {
    formContext.Xrm.Page.ui.controls.forEach(function (c, i) {
        if (!c.__label) {
            c.__label = c.getLabel();
            c.setLabel(c.getName());
        } else {
            c.setLabel(c.__label);
            c.__label = null;
        }
    });

    Fathom.trackGoal('EUBF1CHP', 0);
}

export default {
    action: toggleSchemaNames,
    key: 'toggle-schema-names',
    title: 'Toggle Schema Names',
    description: 'Switches between displaying the labels for all fields, and the schema names for those fields.',
    requiresForm: true
};
