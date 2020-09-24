import Honeybadger from 'honeybadger-js';
import * as Fathom from 'fathom-client';

function action(state, actions) {
    actions.toggleEntityDataModal();

    Fathom.trackGoal('69VJHGEK', 0);
}

export default {
    action: Honeybadger.wrap(action),
    key: 'show-entity-data',
    title: 'Show Entity Data',
    description: 'Shows the JSON data for the current record, as retrieved from the Web API.',
    requiresForm: true,
    retryCount: 0,
    minVersion: 9
};
