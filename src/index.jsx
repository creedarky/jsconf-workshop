import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import Loadable from 'react-loadable';
import configureStore from 'configureStore.js';
import createHistory from 'history/createBrowserHistory';
import AppView from 'views/AppView.jsx';
import 'styles.scss';


const history = createHistory();

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__;

const store = configureStore(history, initialState);
const rootElement = document.getElementById('app');


function renderApp(AppComponent) {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <Router><AppComponent /></Router>
      </Provider>
    </AppContainer>, rootElement);
}

Loadable.preloadReady().then(() => renderApp(AppView));

if (module.hot) {
  module.hot.accept('views/AppView.jsx', () => {
    // eslint-disable-next-line global-require
    const UpdatedApp = require('views/AppView.jsx').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <Router>
            <UpdatedApp />
          </Router>
        </Provider>
      </AppContainer>,
      document.getElementById('app'),
    );
  });
}
