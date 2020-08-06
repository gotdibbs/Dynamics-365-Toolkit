async function getInfo(appState) {
    return appState.fullVersion;
}

export default {
    getInfo,
    isVisible: true,
    label: 'Dynamics Version'
};