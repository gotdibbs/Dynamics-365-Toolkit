async function getInfo(state) {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    if (state.recordId) {
        return [
            xrm.Page.context.getClientUrl(),
            '/main.aspx?etn=', state.logicalName, '&id=', state.recordId, '&pagetype=entityrecord'
        ].join('');
    }
    else {
        return [
            xrm.Page.context.getClientUrl(),
            '/main.aspx?etn=', state.logicalName, '&pagetype=entityrecord'
        ].join('');
    }
}

function isVisible(state) {
    return state.isForm;
}

export default {
    getInfo,
    isVisible,
    key: 'record-url',
    label: 'Record URL'
};