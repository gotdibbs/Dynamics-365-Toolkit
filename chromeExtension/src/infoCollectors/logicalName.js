async function getInfo(state) {
    return state.logicalName;
}

function isVisible(state) {
    return state.isForm;
}

export default {
    getInfo,
    isVisible,
    key: 'logical-name',
    label: 'Logical Name'
};