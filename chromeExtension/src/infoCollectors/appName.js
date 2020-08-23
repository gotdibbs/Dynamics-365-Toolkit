async function getInfo(appState) {
    const xrm = appState.context.Xrm;

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

function isVisible(appState) {
    return appState.majorVersion > 8;
}

export default {
    getInfo,
    isVisible,
    key: 'app-name',
    label: 'App Name'
};