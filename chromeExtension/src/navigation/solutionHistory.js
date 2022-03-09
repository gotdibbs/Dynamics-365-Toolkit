import * as Fathom from 'fathom-client';

function navigate(state) {
    let xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    window.open([
        xrm.Page.context.getClientUrl(), '/main.aspx?pagetype=entitylist&etn=msdyn_solutionhistory'
    ].join(''), '_blank');

    Fathom.trackGoal('KKBGCEKG', 0);
}

export default {
    navigate,
    isVisible: true,
    key: 'solution-history',
    title: 'Solution History'
};