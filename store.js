import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import usersReducer from './reducers/usersReducer';

export default createStore(combineReducers({user:usersReducer}),{}, applyMiddleware(logger));