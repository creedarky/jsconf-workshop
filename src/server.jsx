import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter as Router } from 'react-router-dom';

import configureStore from 'configureStore.js';
import AppView from 'views/AppView.jsx';

export default function (props) {
  const store = configureStore();
  const markup = ReactDOMServer.renderToString(
    <Provider store={store}>
      <Router location={props.req.url} context={props.context} ><AppView /></Router>
    </Provider>,
  );

  return `
    <html>
      <head>
        <link href="/styles.scss" />      
      </head>
      <body>
          <div id="app">
            ${markup}          
          </div>
        <script src="/index.js" />
      </body>
    </html>
  `;
}

