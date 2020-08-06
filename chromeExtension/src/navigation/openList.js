import Honeybadger from 'honeybadger-js';

function navigate(appState) {
    let xrm = appState.context.Xrm;

    let logicalName = window.prompt('Logical Name:');

    if (!logicalName) {
        return;
    }

    window.open([
        xrm.Page.context.getClientUrl(), '/main.aspx?pagetype=entitylist&etn=', logicalName
    ].join(''), '_blank');

    fathom('trackGoal', 'IJGSMM1T', 0);
}

export default {
    navigate: Honeybadger.wrap(navigate),
    isVisible: true,
    title: 'Open Record List'
};