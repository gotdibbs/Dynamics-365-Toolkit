function navigate(state, actions) {
    actions.toggleOpenObjectModal({
        type: 'record'
    });
}

export default {
    navigate,
    isVisible: true,
    key: 'open-record',
    title: 'Open Record'
};