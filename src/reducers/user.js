import { SIGN_IN_SUCCESS, SIGN_OUT } from 'actions/user.js';

const defaultState = null;

export default function count(state = defaultState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...action.payload };
    case SIGN_OUT:
      return defaultState;
    default:
      return state;
  }
}
