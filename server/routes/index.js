const usersRoute = require('./users.js');
const imagesRoutes = require('./images.js');
const votesRoutes = require('./votes.js');

module.exports = (app, db, config) => {
  usersRoute(app, db, config);
  imagesRoutes(app, db, config);
  votesRoutes(app, db, config);
};

