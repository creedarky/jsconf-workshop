
module.exports = (app, db) => {
  const { Images } = db.models;

  app.route('/images')
    .get((req, res) => {
      Images.findAll({ include: [{ all: true }] })
      .then(result => res.json(result))
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
    })
    .post(app.auth.authenticate(), (req, res) => {
      Images.create(req.body)
        .then(result => res.json(result))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    });

  app.route('/images/:id')
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
    .put(app.auth.authenticate(), async (req, res) => {
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
    .delete(app.auth.authenticate(), (req, res) => {
      Images.destroy({ where: {
        id: req.params.id,
      } })
      .then(() => res.sendStatus(204))
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
    });
};
