
module.exports = (app, db) => {
  const { Votes } = db.models;

  app.route('/votes')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Votes.findAll({ include: [{ all: true, nested: true }] })
      .then(result => res.json(result))
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
    })
    .post((req, res) => {
      Votes.create(req.body)
        .then(result => res.json(result))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    });

  app.route('/votes/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Votes.findOne({
        where: {
          id: req.params.id,
        },
        include: [{ all: true, nested: true }],
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
        const vote = await Votes.findOne({ where: {
          id: req.params.id,
        } });
        const result = await vote.update(req.body);
        res.json(result);
      } catch (e) {
        res.status(412).json({ msg: e.message });
      }
    })
    .delete((req, res) => {
      Votes.destroy({ where: {
        id: req.params.id,
      } })
      .then(() => res.sendStatus(204))
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
    });
};
