require('babel-polyfill');
const express = require('express');
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
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development'

if (isDev) {
  seed(app, db);
  // eslint-disable-next-line global-require
  app.use(require('./webpack'));
} else {
  // eslint-disable-next-line global-require
  app.use(require('./static'));
}

boot(app, db);

module.exports = app;
