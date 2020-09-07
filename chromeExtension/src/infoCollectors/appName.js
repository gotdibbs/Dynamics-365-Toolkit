async function getInfo(state) {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    let context = null;

    if (xrm && xrm.getGlobalContext) {
        context = xrm.getGlobalContext();
    }
    else if (xrm && xrm.Utility.getGlobalContext) {
        context = xrm.Utility.getGlobalContext();
    }

    if (context && context.getCurrentAppName) {
        return await context.getCurrentAppName();
    }
    else {
        return 'N/A';
    }
}

function isVisible(state) {
    return state.majorVersion > 8;
}

export default {
    getInfo,
    isVisible,
    key: 'app-name',
    label: 'App Name'
};