import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/Loading/Loading.jsx';
import { loadImages } from 'actions/images.js';

const LoadingComponent = Loadable({
  loader: () => import('./ImagesView.jsx'),
  loading(props) {
    return <Loading {...props} />;
  },
});

const View = () => (
  <LoadingComponent />
);

View.fetchData = ({ dispatch }) => dispatch(loadImages());

export default View;

