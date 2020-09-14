import Honeybadger from 'honeybadger-js';

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