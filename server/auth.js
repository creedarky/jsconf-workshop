const passport = require('passport');
const { Strategy } = require('passport-jwt');

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies['jwt-token'];
  }
  return null;
};

module.exports = (app, db, config) => {
  const Users = db.models.Users;
  const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: cookieExtractor,
  };
  const strategy = new Strategy(params, (payload, done) => {
    Users.findById(payload.id)
      .then((user) => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email,
            role: user.role,
          });
        }
        return done(null, false);
      })
      .catch(error => done(error, null));
  });
  passport.use(strategy);
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', config.jwtSession),
  };
};

