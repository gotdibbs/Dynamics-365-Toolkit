async function getInfo(state) {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    return xrm.Page.context.getUserId();
}

export default {
    getInfo,
    isVisible: true,
    key: 'user-id',
    label: 'User Id'
};