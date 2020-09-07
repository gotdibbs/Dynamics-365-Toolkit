import types from './actionTypes';

export const useActions = (state, dispatch) => ({
    setDynamicsState: data => dispatch({ type: types.SET_DYNAMICS_STATE, payload: data }),
    toggleOpenObjectModal: data => dispatch({ type: types.TOGGLE_OPEN_OBJECT_MODAL, payload: data }),
    toggleExpanded: data => dispatch({ type: types.TOGGLE_EXPANDED, payload: data })
});