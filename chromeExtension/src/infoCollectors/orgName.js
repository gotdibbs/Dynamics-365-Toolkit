async function getInfo(state) {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    return xrm.Page.context.getOrgUniqueName();
}

export default {
    getInfo,
    isVisible: true,
    key: 'org-name',
    label: 'Organization Unique Name'
};