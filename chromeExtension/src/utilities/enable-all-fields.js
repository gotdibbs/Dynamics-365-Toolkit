import * as Fathom from 'fathom-client';

function enableAllFields({ majorVersion }) {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    xrm.Page.ui.controls.forEach(function(c, i){
        if (c && c.setDisabled) {
            c.setDisabled(false);
        }
    });

    // Version 9+ should rely on an alreay set submit mode of dirty, and works even on disabled fields
    if (majorVersion < 9) {
        xrm.Page.data.entity.attributes.forEach(function(c, i){
            if (c && c.setSubmitMode) {
                c.setSubmitMode('always');
            }
        });
    }

    Fathom.trackGoal('WVP4ETTK', 0);
}

export default {
    action: enableAllFields,
    key: 'enable-all-fields',
    title: 'Unlock All Fields',
    description: 'Enables all fields on the current form, making them editable.',
    requiresForm: true
};