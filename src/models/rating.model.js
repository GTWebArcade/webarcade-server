const mongoose = require('mongoose');

const Rating = mongoose.model(
  'Rating',
  new mongoose.Schema({
    user: String,
    gameId: String,
    ratingScore: String,
    ratingMessage: String,
    createdAt: String,
    updatedAt: String,
  }),
);

module.exports = Rating;
