import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import formReducer from '../reducers/formReducer';
import productsReducer from '../reducers/productsReducer';
import cartReducer from '../reducers/cartReducer';
import menuReducer from '../reducers/menuReducer';
import historyReducer from '../reducers/historyReducer';

export default createStore(
    combineReducers({
        formReducer,
        productsReducer,
        cartReducer,
        menuReducer,
        historyReducer
    }),
    applyMiddleware(createLogger())
);
