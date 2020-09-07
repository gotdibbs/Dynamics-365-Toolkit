async function getInfo(state) {
    return state?.fullVersion;
}

export default {
    getInfo,
    isVisible: true,
    key: 'dynamics-version',
    label: 'Dynamics Version'
};