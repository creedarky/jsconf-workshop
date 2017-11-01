
module.exports = (app, db) => {
  const Images = db.models.Images;

  app.route('/images')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Images.findAll()
      .then(result => res.json(result))
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
    })
    .post((req, res) => {
      Images.create(req.body)
        .then(result => res.json(result))
        .catch((error) => {
          console.log(error);
          res.status(412).json({ msg: error.message });
        });
    });

  app.route('/jogs/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Images.findOne({ where: {
        id: req.params.id,
      } })
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
        const jog = await Images.findOne({ where: {
          id: req.params.id,
        } });
        const result = await jog.update(req.body);
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
