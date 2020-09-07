import * as Fathom from 'fathom-client';

function enableAllFields() {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    xrm.Page.ui.controls.forEach(function(c, i){
        if (c && c.setDisabled) {
            c.setDisabled(false);
        }
    });

    xrm.Page.data.entity.attributes.forEach(function(c, i){
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