import * as ActionsTypes from './AppActionTypes';
import initialState from '../InitialState';

export default function globalReducer(state = initialState.global, action) {
    switch (action.type) {
        case ActionsTypes.SET_SHOW_SPINNER:
            {
                return {
                    ...state,
                    showSpinner: action.showSpinner
                };
            }

        default:
            return state;
    }
}