import * as Fathom from 'fathom-client';

function getSupport() {
    window.open('https://github.com/gotdibbs/Dynamics-365-Toolkit/issues/new/choose', '_new');

    Fathom.trackGoal('GFT1EFPR', 0);
}

export default {
    action: getSupport,
    key: 'get-support',
    title: 'Get Support',
    description: 'Takes you to a form to submit an issue or request.',
    requiresForm: false
};