const usersRoute = require('./users.js');

module.exports = (app, db, config) => {
  usersRoute(app, db, config);
};

