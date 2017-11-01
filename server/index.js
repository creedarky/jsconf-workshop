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

if (process.env.NODE_ENV === 'development') {
  seed(app, db);
}

boot(app, db);


// consign({ verbose: true, cwd: 'server' })
//   .include('libs/config.js')
//   .then('db.js')
//   .then('auth.js')
//   .then('libs/middlewares.js')
//   .then('routes')
//   .then('seed.js')
//   .then('libs/boot.js')
//   .into(app);

module.exports = app;
