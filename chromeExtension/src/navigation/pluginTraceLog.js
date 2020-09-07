import Honeybadger from 'honeybadger-js';
import * as Fathom from 'fathom-client';

function navigate(state) {
    let xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    window.open([
        xrm.Page.context.getClientUrl(), '/main.aspx?pagetype=entitylist&etn=plugintracelog'
    ].join(''), '_blank');

    Fathom.trackGoal('RDVC8XF6', 0);
}

export default {
    navigate: Honeybadger.wrap(navigate),
    isVisible: true,
    key: 'plugin-trace-logs',
    title: 'Plugin Trace Logs'
};