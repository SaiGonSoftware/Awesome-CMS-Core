//main reducer for app
import { combineReducers } from 'redux';
import global from './AppReducer';

const rootReducer = combineReducers({
    global
});

export default rootReducer;