import api from 'api';
import { push } from 'react-router-redux';
import { addError } from './errors';

export const SIGN_IN_SUCCESS = 'USER/SIGN_IN_SUCCESS';
export const SIGN_OUT = 'USER/SIGN_OUT';


function apiSignIn(data) {
  return api.post('/sign-in', data);
}

function apiCreateAccount(data) {
  return api.post('/sign-up', data);
}

function getUserData(data) {
  return api.get('/user', data);
}

export function signInSuccess(userData) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: userData,
  };
}

export function completedSignOut() {
  return {
    type: SIGN_OUT,
  };
}

export function initSignIn(formData) {
  return async (dispatch) => {
    try {
      const signInResponse = await apiSignIn(formData);
      dispatch(signInSuccess(signInResponse.data));
      dispatch(push('/'));
    } catch (e) {
      dispatch(addError(`There was an error signing: ${e.message}`));
    }
  };
}

export function autoLogin() {
  return async (dispatch) => {
    try {
      const response = await getUserData();
      dispatch(signInSuccess(response.data));
      dispatch(push('/'));
    } catch (e) {
      dispatch(push('/sign-in'));
    }
  };
}

export function initCreateAccount(formData) {
  return async (dispatch) => {
    try {
      const createAccountResponse = await apiCreateAccount(formData);
      dispatch(signInSuccess(createAccountResponse.data));
      dispatch(push('/'));
    } catch (e) {
      dispatch(addError(`There was an error creating account: ${e.message}`));
    }
  };
}

function deleteCookie(name = 'jwt-token') {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export function signOut() {
  return (dispatch) => {
    deleteCookie();
    dispatch(completedSignOut());
  };
}
