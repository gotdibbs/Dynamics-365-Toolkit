async function getInfo(appState) {
    const xrm = appState.context.Xrm;

    return xrm.Page.context.getUserId();
}

export default {
    getInfo,
    isVisible: true,
    label: 'User Id'
};