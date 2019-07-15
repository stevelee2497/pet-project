import { combineReducers } from 'redux';
import authReducer from './authReducer';

const reducers = combineReducers({
  passport: authReducer
});

export default reducers;
