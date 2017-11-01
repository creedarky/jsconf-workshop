const R = require('ramda');
const jwt = require('jwt-simple');

module.exports = (app, db, config) => {
  const Users = db.models.Users;

  function getUserResponse(user) {
    const token = jwt.encode({ id: user.id }, config.jwtSecret);
    return R.compose(R.assoc('token', token), R.omit(['password']))(user.toJSON());
  }

  app.route('/user')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Users.findById(req.user.id, {
        attributes: ['id', 'name', 'email'],
      })
      .then(result => res.json(result))
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
    });


  app.post('/sign-up', (req, res) => {
    Users.create(req.body)
      .then((user) => {
        res.json(getUserResponse(user));
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  });

  app.post('/sign-in', (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      Users.findOne({ where: { email } })
        .then((user) => {
          if (Users.isPassword(user.password, password)) {
            res.json(getUserResponse(user));
          } else {
            res.sendStatus(401);
          }
        })
        .catch(() => res.sendStatus(401));
    } else {
      res.sendStatus(401);
    }
  });
};
