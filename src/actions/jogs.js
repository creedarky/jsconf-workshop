import api from 'api';
import { addError } from './errors';

export const ADD_JOG = 'JOGS/ADD_JOG';
export const SET_JOGS = 'JOGS/SET_JOGS';
export const OPEN_MODAL = 'JOGS/OPEN_MODAL';
export const CLOSE_MODAL = 'JOGS/CLOSE_MODAL';
export const REMOVE_JOG = 'JOGS/REMOVE_JOG';
export const UPDATE_JOG = 'JOGS/UPDATE_JOG';
export const SET_REPORT_DATA = 'JOGS/SET_REPORT_DATA';

function apiCreateJog(data, userData) {
  const params = { ...data, user_id: userData.id };
  return api.post('/jogs', params, {
    headers: {
      Authorization: `bearer ${userData.token}`,
    },
  });
}

function apiEditJog(data, userData) {
  return api.put(`/jogs/${data.id}`, data, {
    headers: {
      Authorization: `bearer ${userData.token}`,
    },
  });
}


function apiFetchJogs(userData) {
  return api.get('/jogs', {
    headers: {
      Authorization: `bearer ${userData.token}`,
    },
  });
}

function apiDeleteJog(id, userData) {
  return api.delete(`/jogs/${id}`, {
    headers: {
      Authorization: `bearer ${userData.token}`,
    },
  });
}
