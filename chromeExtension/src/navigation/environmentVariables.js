function navigate() {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    window.open([
        xrm.Page.context.getClientUrl(),
        '/main.aspx?pagetype=entitylist&etn=environmentvariabledefinition'
    ].join(''), '_blank');
}

function isVisible(state) {
    return state.majorVersion > 8;
}

export default {
    navigate,
    isVisible,
    key: 'show-environment-variables',
    title: 'Show Environment Variables'
};