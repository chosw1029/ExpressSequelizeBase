const models = require('../models');

exports.getIllust = async (req, res, next) => {
  models.illust
    .findAll()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};
