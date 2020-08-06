import Honeybadger from 'honeybadger-js';
import * as Fathom from 'fathom-client';

function navigate(appState) {
    let xrm = appState.context.Xrm;

    let logicalName = window.prompt('Logical Name:');

    if (!logicalName) {
        return;
    }

    let id = window.prompt('ID (leave blank for new record):');

    window.open([
        xrm.Page.context.getClientUrl(), '/main.aspx?pagetype=entityrecord&etn=', logicalName, id ? '&id=' + id : ''
    ].join(''), '_blank');

    Fathom.trackGoal('7YHT3JKI', 0);
}

export default {
    navigate: Honeybadger.wrap(navigate),
    isVisible: true,
    title: 'Open Record'
};