async function getInfo(appState) {
    const xrm = appState.context.Xrm;

    return xrm.Page.context.getOrgUniqueName();
}

export default {
    getInfo,
    isVisible: true,
    key: 'org-name',
    label: 'Organization Unique Name'
};