import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/Loading/Loading.jsx';

const LoadingComponent = Loadable({
  loader: () => import('./SignInView.jsx'),
  loading(props) {
    return <Loading {...props} />;
  },
});

const View = () => (
  <LoadingComponent />
);

export default View;

