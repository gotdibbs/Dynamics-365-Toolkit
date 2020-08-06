function getSupport() {
    window.open('https://github.com/gotdibbs/Dynamics-CRM-Bookmarklets/issues/new', '_new');

    fathom && fathom('trackGoal', 'GFT1EFPR', 0);
}

export default {
    action: getSupport,
    key: 'get-support',
    title: 'Get Support',
    description: 'Takes you to a form to submit an issue or request.',
    requiresForm: false
};