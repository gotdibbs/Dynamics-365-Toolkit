async function getInfo(state) {
    return state.recordId;
}

function isVisible(state) {
    return state.isForm && state.recordId;
}

export default {
    getInfo,
    isVisible,
    key: 'record-id',
    label: 'Record Id'
};