function getSupport() {
    window.open('https://github.com/gotdibbs/Dynamics-365-Toolkit/issues/', '_new');
}

export default {
    action: getSupport,
    key: 'get-support',
    title: 'Get Support',
    description: 'Takes you to a form to submit an issue or request.',
    requiresForm: false
};