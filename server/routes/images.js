
module.exports = (app, db) => {
  const { Images } = db.models;

  app.route('/images')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Images.findAll({ include: [{ all: true }] })
      .then(result => res.json(result))
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
    })
    .post((req, res) => {
      Images.create(req.body)
        .then(result => res.json(result))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    });

  app.route('/images/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Images.findOne({
        where: {
          id: req.params.id,
        },
        include: [{ all: true }],
      })
      .then((result) => {
        if (result) {
          res.json(result);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
    })
    .put(async (req, res) => {
      try {
        const vote = await Images.findOne({ where: {
          id: req.params.id,
        } });
        const result = await vote.update(req.body);
        res.json(result);
      } catch (e) {
        res.status(412).json({ msg: e.message });
      }
    })
    .delete((req, res) => {
      Images.destroy({ where: {
        id: req.params.id,
      } })
      .then(() => res.sendStatus(204))
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
    });
};
