import React from 'react';
import ImagesContainer from 'containers/ImagesContainer.jsx';
import { loadImages } from 'actions/images.js';

const ImagesView = () => (
  <ImagesContainer />
);

ImagesView.fetchData = ({ dispatch }) => dispatch(loadImages());

export default ImagesView;
