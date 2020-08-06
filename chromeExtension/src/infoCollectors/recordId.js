async function getInfo(appState) {
    return appState.recordId;
}

function isVisible(appState) {
    return appState.isForm && appState.recordId;
}

export default {
    getInfo,
    isVisible,
    label: 'Record Id'
};