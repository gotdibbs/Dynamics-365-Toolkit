import * as Fathom from 'fathom-client';

function showRecordProperties() {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    var id, typeCode;

    if (window.Mscrm && window.Mscrm.RibbonActions && window.Mscrm.RibbonActions.openFormProperties) {
        id = xrm.Page.data.entity.getId();
        typeCode = xrm.Page.context.getQueryStringParameters().etc;

        if (!typeCode) {
            return alert('Could not locate the current record type.');
        }

        window.Mscrm.RibbonActions.openFormProperties(id, typeCode);
    } else {
        alert('This action is not supported in the current version of Dynamics CRM.');
    }

    Fathom.trackGoal('8EHBNIHL', 0);
}

export default {
    action: showRecordProperties,
    key: 'show-record-properties',
    title: 'Show Record Properties',
    description: 'Displays a summary of permissions and ownership for the current record.',
    requiresForm: true,
    maxVersion: 8
};
