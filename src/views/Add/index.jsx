import React from 'react';
import Loadable from 'react-loadable';

const LoadingComponent = Loadable({
  loader: () => import('./AddImageView.jsx'),
  loading() {
    return <div>Loading...</div>;
  },
});

const View = () => (
  <LoadingComponent />
);

export default View;

