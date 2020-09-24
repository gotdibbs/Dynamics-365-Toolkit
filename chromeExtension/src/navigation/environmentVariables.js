import Honeybadger from 'honeybadger-js';
import * as Fathom from 'fathom-client';

function navigate() {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    window.open([
        xrm.Page.context.getClientUrl(),
        '/main.aspx?pagetype=entitylist&etn=environmentvariabledefinition'
    ].join(''), '_blank');


    Fathom.trackGoal('A1HF26K2', 0);
}

export default {
    navigate: Honeybadger.wrap(navigate),
    isVisible: true,
    key: 'show-environment-variables',
    title: 'Show Environment Variables'
};