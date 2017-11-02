import { ADD_VOTE, IMAGES_LOADED } from 'actions/images.js';

const defaultState = [];

function mapImage(image) {
  const votes = image.votes || [];
  return {
    ...image,
    voteCount: votes.reduce((acc, i) => acc + i.value, 0),
  };
}

function updateImage(state, vote) {
  const index = state.findIndex(i => i.id === vote.image_id);
  if (index === -1) {
    return state;
  }
  const image = state[index];
  image.votes = image.votes || [];
  image.votes.push(vote);
  return [...state.slice(0, index), mapImage(image), ...state.slice(index + 1)];
}

export default function images(state = defaultState, action) {
  switch (action.type) {
    case IMAGES_LOADED:
      return action.payload.map(mapImage);
    case ADD_VOTE:
      return updateImage(state, action.payload);
    default:
      return state;
  }
}



