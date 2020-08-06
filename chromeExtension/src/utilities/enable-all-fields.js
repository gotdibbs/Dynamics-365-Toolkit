import * as Fathom from 'fathom-client';

function enableAllFields({ context: formContext }) {
    formContext.Xrm.Page.ui.controls.forEach(function(c, i){
        if (c && c.setDisabled) {
            c.setDisabled(false);
        }
    });

    formContext.Xrm.Page.data.entity.attributes.forEach(function(c, i){
        if (c && c.setSubmitMode) {
            c.setSubmitMode('always');
        }
    });

    Fathom.trackGoal('WVP4ETTK', 0);
}

export default {
    action: enableAllFields,
    key: 'enable-all-fields',
    title: 'Unlock All Fields',
    description: 'Enables all fields on the current form, making them editable.',
    requiresForm: true
};