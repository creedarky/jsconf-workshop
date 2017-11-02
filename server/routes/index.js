const express = require('express');
const usersRoute = require('./users.js');
const imagesRoutes = require('./images.js');
const votesRoutes = require('./votes.js');

module.exports = (app, db, config) => {

  const router = new express.Router();
  router.auth = app.auth;
  usersRoute(router, db, config);
  imagesRoutes(router, db, config);
  votesRoutes(router, db, config);
  app.use('/api', router);
};

