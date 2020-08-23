import Honeybadger from 'honeybadger-js';
import * as Fathom from 'fathom-client';

function navigate(appState) {
    let xrm = appState.context.Xrm;

    window.open([
        xrm.Page.context.getClientUrl(), '/main.aspx?pagetype=entitylist&etn=msdyn_solutionhistory'
    ].join(''), '_blank');

    Fathom.trackGoal('KKBGCEKG', 0);
}

export default {
    navigate: Honeybadger.wrap(navigate),
    isVisible: true,
    key: 'solution-history',
    title: 'Solution History'
};