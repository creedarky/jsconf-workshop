import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter as Router, matchPath } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import axios from 'axios';

import configureStore from 'configureStore.js';
import AppView from 'views/AppView.jsx';
import Html from 'components/Html/Html.jsx';
import routes from 'routes.js';


const API_URL = process.env.API_URL;
const authApi = req => (
  axios.get(`${API_URL}/user`, {
    headers: {
      Cookie: req.headers.cookie,
    },
  })
    .then(r => r.data)
    .catch(() => null)
);


function getCssByChunkName(name, { assetsByChunkName }) {
  let assets = assetsByChunkName[name];
  if (!Array.isArray(assets)) {
    assets = [assets];
  }
  return assets.find(asset => /\.css$/.test(asset));
}

function getJsByChunkName(name, { assetsByChunkName }) {
  let assets = assetsByChunkName[name];
  if (!Array.isArray(assets)) {
    assets = [assets];
  }
  return assets.find(asset => /\.js$/.test(asset));
}

export default async function ({ req, res, context, clientStats }) {
  const history = createMemoryHistory({
    initialEntries: [req.url],
  });
  const user = await authApi(req);
  const store = configureStore(history, { user });

  ReactDOMServer.renderToString(
    <Provider store={store}>
      <Router location={req.url} context={context} ><AppView /></Router>
    </Provider>,
  );

  if (context.url) {
    return res.redirect(context.url);
  }

  const promises = routes.reduce((matches, route) => {
    const match = matchPath(req.url, route);
    if (match) {
      matches.push(
        route.component.fetchData ?
          route.component.fetchData({ match, dispatch: store.dispatch }) : Promise.resolve(null),
      );
    }
    return matches;
  }, []);

  await Promise.all(promises);

  // We need to wait for the promise to complete to dispatch the actions
  const markup = ReactDOMServer.renderToString(
    <Provider store={store}>
      <Router location={req.url} context={{}} ><AppView /></Router>
    </Provider>,
  );

  const css = getCssByChunkName('index', clientStats);
  const scripts = getJsByChunkName('index', clientStats);

  return ReactDOMServer.renderToStaticMarkup(
    <Html css={css} scripts={[scripts]} initialState={store.getState()} markup={markup} />,
  );
}

