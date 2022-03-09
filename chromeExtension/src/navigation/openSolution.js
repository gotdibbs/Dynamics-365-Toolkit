function navigate(state, actions) {
    actions.toggleOpenObjectModal({
        type: 'solution'
    });
}

function isVisible(state) {
    return state.majorVersion >= 8;
}

export default {
    navigate,
    isVisible,
    key: 'open-solution',
    title: 'Open Solution'
};