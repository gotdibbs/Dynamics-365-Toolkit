import Honeybadger from 'honeybadger-js';
import * as Fathom from 'fathom-client';

function navigate(state, actions) {
    actions.toggleOpenObjectModal({
        type: 'solution'
    });
}

function isVisible(state) {
    return state.majorVersion >= 8;
}

export default {
    navigate: Honeybadger.wrap(navigate),
    isVisible,
    key: 'open-solution',
    title: 'Open Solution'
};