import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import profileReducer from './Profile-reducer';
import dialogsReducer from './Dialogs-reducer';
import {
    combineReducers,
    compose,
    legacy_createStore as createStore,
} from 'redux';
import usersReducer from './Users-reducer';
import authReducer from './Auth-reducer';
import { reducer as formReducer } from 'redux-form';
import { thunk } from 'redux-thunk';
import appReducer from './App-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

const thunkMiddleware = thunk;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware))
);

window.store = store;

export default store;
