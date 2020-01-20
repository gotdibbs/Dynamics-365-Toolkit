export default function enableAllFields({ context: formContext }) {
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

    fathom && fathom('trackGoal', 'WVP4ETTK', 0);
};