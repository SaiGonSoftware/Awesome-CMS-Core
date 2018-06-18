import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import rootReducer from './Common/RootReducer';

export default function configureStore(initialState) {
    const middleware = [immutableStateInvariantMiddleware.default(), thunk];
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            window.devToolsExtension ? window.devToolsExtension() : devTools => devTools
        )
    );
}