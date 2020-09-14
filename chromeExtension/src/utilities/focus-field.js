function focusField(state, actions) {
    actions.toggleOpenObjectModal({
        type: 'field'
    });
}

export default {
    action: focusField,
    key: 'focus-field',
    title: 'Focus Field',
    description: 'Sets focus to a specified field based on schema name.',
    requiresForm: true
};