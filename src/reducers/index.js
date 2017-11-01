import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import count from './count.js';
import user from './user.js';
import errors from './errors.js';


const rootReducer = combineReducers({
  user,
  count,
  errors,
  router: routerReducer,
});

export default rootReducer;
