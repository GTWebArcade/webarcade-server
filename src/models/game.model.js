const mongoose = require('mongoose');

const Game = mongoose.model(
  'Game',
  new mongoose.Schema({
    name: String,
    gameDataUrls: Array,
    imageUrl: String,
    gameType: String,
    uploaderUserId: String,
    createdAt: String,
    updatedAt: String,
  }),
);

module.exports = Game;
