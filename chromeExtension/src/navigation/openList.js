import Honeybadger from 'honeybadger-js';
import * as Fathom from 'fathom-client';

function navigate(state, actions) {
    actions.toggleOpenObjectModal({
        type: 'list'
    });
}

export default {
    navigate: Honeybadger.wrap(navigate),
    isVisible: true,
    key: 'open-record-list',
    title: 'Open Record List'
};