import Honeybadger from 'honeybadger-js';

function navigate(appState) {
    let xrm = appState.context.Xrm;

    window.open([
        xrm.Page.context.getClientUrl(), '/tools/solution/import/SolutionImportWizard.aspx'
    ].join(''), '_blank');

    fathom('trackGoal', 'UGHZ7JZ7', 0);
}

export default {
    navigate: Honeybadger.wrap(navigate),
    isVisible: true,
    title: 'Import Solution'
};