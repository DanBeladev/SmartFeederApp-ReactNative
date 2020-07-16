import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import usersReducer from './reducers/usersReducer';
import dogReducer from './reducers/dogReducer';

export default createStore(
  combineReducers({ user: usersReducer, dog: dogReducer }),
  {},
  // applyMiddleware(logger)
);
