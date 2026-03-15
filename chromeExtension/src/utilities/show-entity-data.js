function action(state, actions) {
    actions.toggleEntityDataModal();
}

export default {
    action,
    key: 'show-entity-data',
    title: 'Show Entity Data',
    description: 'Shows the JSON data for the current record, as retrieved from the Web API.',
    requiresForm: true,
    retryCount: 0,
    minVersion: 9
};
