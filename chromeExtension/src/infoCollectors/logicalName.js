async function getInfo(appState) {
    return appState.logicalName;
}

function isVisible(appState) {
    return appState.isForm;
}

export default {
    getInfo,
    isVisible,
    key: 'logical-name',
    label: 'Logical Name'
};