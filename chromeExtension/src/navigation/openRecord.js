import Honeybadger from 'honeybadger-js';

function navigate(state, actions) {
    actions.toggleOpenObjectModal({
        type: 'record'
    });
}

export default {
    navigate: Honeybadger.wrap(navigate),
    isVisible: true,
    key: 'open-record',
    title: 'Open Record'
};