import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from 'configureStore.js';
import createHistory from 'history/createBrowserHistory';
import AppView from 'views/AppView.jsx';
import 'font-awesome/scss/font-awesome.scss';
import 'bulma/css/bulma.css';
import 'styles.scss';

const history = createHistory();

const store = configureStore(history);
const rootElement = document.getElementById('app');

function renderApp(AppComponent) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router><AppComponent /></Router>
      </Provider>
    </AppContainer>, rootElement);
}

renderApp(AppView);

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
