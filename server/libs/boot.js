const http = require('http');

module.exports = (app, db) => {
  db.sequelize.sync().done(() => {
    http.createServer(app)
      .listen(app.get('port'), () => {
        // eslint-disable-next-line no-console
        console.log(`JSConf API - Port ${app.get('port')}`);
      });
  });
};

