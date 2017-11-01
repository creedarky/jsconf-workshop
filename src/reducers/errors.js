import { ADD_ERROR } from 'actions/errors.js';
import { SIGN_OUT } from 'actions/user.js';

const defaultState = {
  error: null,
};

export default function count(state = defaultState, action) {
  switch (action.type) {
    case ADD_ERROR:
      return { error: { date: new Date(), message: action.payload } };
    case SIGN_OUT:
      return defaultState;
    default:
      return state;
  }
}
