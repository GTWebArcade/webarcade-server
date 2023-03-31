const db = require('../models');

const Rating = db.rating;

exports.sendRating = (req, res) => {
  const rating = new Rating({
    user: req?.body?.user,
    gameId: req?.body?.gameId,
    ratingScore: req?.body?.ratingScore,
    ratingMessage: req?.body?.ratingMessage,
    createdAt: req?.body?.createdAt,
    updatedAt: req?.body?.updatedAt,
  });

  rating.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: 'Rating was posted successfully!' });
  });
};

exports.getRatings = async (req, res) => {
  Rating.find({
    gameId: req?.body?.id,
  }).exec((err, ratings) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({ ratings });
  });
};
