function navigate(state) {
    let xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    window.open([
        xrm.Page.context.getClientUrl(), '/main.aspx?pagetype=entitylist&etn=msdyn_solutionhistory'
    ].join(''), '_blank');
}

export default {
    navigate,
    isVisible: true,
    key: 'solution-history',
    title: 'Solution History'
};