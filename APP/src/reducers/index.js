import { combineReducers } from 'redux';
import authReducer from './authReducer';
import bookReducer from './bookReducer';

const reducers = combineReducers({
  passport: authReducer,
  library: bookReducer
});

export default reducers;
