import * as ActionsTypes from './LoginActionTypes';

export default function loginReducer(state = [], action) {
    switch (action.type) {
        case ActionsTypes.LOGIN:
            {
                return {
                    ...state,
                    userName: action.userName,
                    password: action.password
                };
            }

        case ActionsTypes.LOGIN_FAIL:
            {
                return {
                    ...state,
                    errorMsg: action.errorMsg
                }
            }

        default:
            return state;
    }
}