import api from 'api';
import { addError } from './errors';

export const ADD_VOTE = 'IMAGE/ADD_VOTE';
export const IMAGES_LOADED = 'IMAGE/IMAGES_LOADED';
export const ADD_IMAGE = 'IMAGE/ADD_IMAGE';

function apiVoteImage(isUp, imageId, userId) {
  const params = { image_id: imageId, user_id: userId, value: isUp ? 1 : -1 };
  return api.post('/votes', params);
}

function apiFetchImages() {
  return api.get('/images');
}


function apiAddImage(url) {
  return api.post('/images', { url });
}


function voteSuccess(payload) {
  return {
    type: ADD_VOTE,
    payload,
  };
}

function addedImage(payload) {
  return {
    type: ADD_IMAGE,
    payload,
  };
}

function imagesLoaded(payload) {
  return {
    type: IMAGES_LOADED,
    payload,
  };
}


export function vote(imageId, isUp) {
  return async (dispatch, getState) => {
    try {
      const { user } = getState();
      const voteResponse = await apiVoteImage(isUp, imageId, user.id);
      dispatch(voteSuccess(voteResponse.data));
    } catch (e) {
      dispatch(addError(`There was an error voting: ${e.message}`));
    }
  };
}

export function loadImages() {
  return async (dispatch) => {
    try {
      const imagesResponse = await apiFetchImages();
      dispatch(imagesLoaded(imagesResponse.data));
    } catch (e) {
      dispatch(addError(`There was an error loading images: ${e.message}`));
    }
  };
}

export function addImage(url) {
  return async (dispatch) => {
    try {
      const imagesResponse = await apiAddImage(url);
      dispatch(addedImage(imagesResponse.data));
    } catch (e) {
      dispatch(addError(`There was an error adding images: ${e.message}`));
    }
  };
}
