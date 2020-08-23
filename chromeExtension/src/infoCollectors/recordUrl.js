async function getInfo(appState) {
    const xrm = appState.context.Xrm;

    if (appState.recordId) {
        return [
            xrm.Page.context.getClientUrl(),
            '/main.aspx?etn=', appState.logicalName, '&id=', appState.recordId, '&pagetype=entityrecord'
        ].join('');
    }
    else {
        return [
            xrm.Page.context.getClientUrl(),
            '/main.aspx?etn=', appState.logicalName, '&pagetype=entityrecord'
        ].join('');
    }
}

function isVisible(appState) {
    return appState.isForm;
}

export default {
    getInfo,
    isVisible,
    key: 'record-url',
    label: 'Record URL'
};