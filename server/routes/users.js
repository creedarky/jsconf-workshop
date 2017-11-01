const jwt = require('jwt-simple');

const omit = (keys, obj) =>
  Object.entries(obj)
    .filter(([key]) => !keys.includes(key))
    .reduce((acc, [key, value]) => Object.assign({}, acc, {
      [key]: value,
    }), {});

module.exports = (app, db, config) => {
  const Users = db.models.Users;

  function getUserResponse(user) {
    const token = jwt.encode({ id: user.id }, config.jwtSecret);
    return {
      user: omit(['password'], user.toJSON()),
      token,
    };
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
        const response = getUserResponse(user);
        res.cookie('jwt-token', response.token);
        res.json(response.user);
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
            const response = getUserResponse(user);
            res.cookie('jwt-token', response.token);
            res.json(response.user);
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
