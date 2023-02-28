const mongoose = require('mongoose');

const Game = mongoose.model(
  'Game',
  new mongoose.Schema({
    name: String,
    gameUrl: String,
    imageUrl: String,
  }),
);

module.exports = Game;
