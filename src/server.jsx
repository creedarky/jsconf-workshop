import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import axios from 'axios';

import configureStore from 'configureStore.js';
import AppView from 'views/AppView.jsx';
import Html from 'components/Html/Html.jsx';

const authApi = req => (
  axios.get('http://localhost:3000/api/user', {
    headers: {
      Cookie: req.headers.cookie,
    },
  })
    .then(r => r.data)
    .catch(() => null)
);

export default async function ({ req, context }) {
  const history = createMemoryHistory({
    initialEntries: [req.url],
  });
  const user = await authApi(req);
  const store = configureStore(history, { user });

  // We need to wait for the promise to complete to dispatch the actions
  const markup = ReactDOMServer.renderToString(
    <Provider store={store}>
      <Router location={req.url} context={context} ><AppView /></Router>
    </Provider>,
  );

  // console.log('###', context);
  return ReactDOMServer.renderToStaticMarkup(
    <Html css="index.css" scripts={['index.js']} initialState={store.getState()} markup={markup} />,
  );
}

