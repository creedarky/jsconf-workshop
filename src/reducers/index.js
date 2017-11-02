import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import images from './images.js';
import user from './user.js';
import errors from './errors.js';


const rootReducer = combineReducers({
  user,
  images,
  errors,
  router: routerReducer,
});

export default rootReducer;
