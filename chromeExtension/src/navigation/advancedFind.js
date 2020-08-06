import Honeybadger from 'honeybadger-js';
import * as Fathom from 'fathom-client';

function navigate(appState) {
    let xrm = appState.context.Xrm;

    window.open([
        xrm.Page.context.getClientUrl(), '/main.aspx?pagetype=advancedfind'
    ].join(''), '_blank');

    Fathom.trackGoal('DEE4P4OM', 0);
}

export default {
    navigate: Honeybadger.wrap(navigate),
    isVisible: true,
    title: 'Advanced Find'
};