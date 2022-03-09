function navigate(state, actions) {
    actions.toggleOpenObjectModal({
        type: 'list'
    });
}

export default {
    navigate,
    isVisible: true,
    key: 'open-record-list',
    title: 'Open Record List'
};