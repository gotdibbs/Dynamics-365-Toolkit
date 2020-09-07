import types from './actionTypes';

const initialState = {
    isExpanded: true,
    isOpenObjectModalOpen: false,
    openObjectModalData: null,
    fullVersion: null,
    isForm: false,
    recordId: null,
    logicalName: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_DYNAMICS_STATE:
            return {
                ...state,
                ...action.payload
            };
        case types.TOGGLE_OPEN_OBJECT_MODAL:
            return {
                ...state,
                isOpenObjectModalOpen: !state.isOpenObjectModalOpen,
                openObjectModalData: action.payload,
                // Toggle us to expanded based on the opposite of the new open state of the modal
                isExpanded: !!state.isOpenObjectModalOpen
            };
        case types.TOGGLE_EXPANDED:
            return {
                ...state,
                isExpanded: !state.isExpanded
            };
        default:
            return state;
    }
};

export { types, reducer, initialState };