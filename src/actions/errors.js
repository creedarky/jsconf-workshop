export const ADD_ERROR = 'ERROR/ADD_ERROR';

export function addError(message) {
  return {
    type: ADD_ERROR,
    payload: message,
  };
}
