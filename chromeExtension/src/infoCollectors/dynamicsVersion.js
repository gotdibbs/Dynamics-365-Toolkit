async function getInfo(appState) {
    return appState.fullVersion;
}

export default {
    getInfo,
    isVisible: true,
    key: 'dynamics-version',
    label: 'Dynamics Version'
};