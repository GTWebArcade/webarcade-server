const mongoose = require('mongoose');

const Rating = mongoose.model(
  'Rating',
  new mongoose.Schema({
    user: String,
    gameId: String,
    ratingScore: Number,
    ratingMessage: String,
    createdAt: Number,
    updatedAt: Number,
  }),
);

module.exports = Rating;
