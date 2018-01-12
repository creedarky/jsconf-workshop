require('babel-polyfill');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const clientConfig = require('../webpack.client.config.js');
const serverConfig = require('../webpack.server.config.js');
const initConfig = require('./libs/config.js');
const startDB = require('./db.js');
const seed = require('./seed.js');
const middlewares = require('./libs/middlewares.js');
const initAuth = require('./auth.js');
const initRoutes = require('./routes');
const boot = require('./libs/boot');

const app = express();
const config = initConfig();
const db = startDB(app, config);

app.auth = initAuth(app, db, config);

middlewares(app);

initRoutes(app, db, config);

if (process.env.NODE_ENV === 'development') {
  seed(app, db);
}
// Instance webpack and give the compilers (Configs)
const compiler = webpack([clientConfig, serverConfig]);

compiler.apply(new FriendlyErrorsWebpackPlugin()); // Just to show better messages and erros

app.use(webpackDevMiddleware(compiler, {
  serverSideRender: true,
}));

app.use(
  webpackHotMiddleware(
    compiler.compilers.find(c => c.name === 'client'),
    {
      log: () => {},
    },
  ),
);

app.use(webpackHotServerMiddleware(compiler));

boot(app, db);

module.exports = app;
