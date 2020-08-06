import * as Fathom from 'fathom-client';

function showAllFields({ context: formContext }) {
    formContext.Xrm.Page.ui.controls.forEach(function(c, i){
        c.setVisible(true);
    });

    formContext.Xrm.Page.ui.tabs.forEach(function(c, i){
        // Show the tab
        c.setVisible(true);

        // Expand the tab
        c.setDisplayState('expanded');

        // Show all the sections contained in the tab
        c.sections.forEach(function(sc, si){
            sc.setVisible(true);
        });
    });

    Fathom.trackGoal('UEAPFM1M', 0);
}

export default {
    action: showAllFields,
    key: 'show-all-fields',
    title: 'Show All Fields',
    description: 'Makes all fields, tabs, and sections on the form visible.',
    requiresForm: true
};