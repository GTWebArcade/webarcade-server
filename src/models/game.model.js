const mongoose = require('mongoose');

const Game = mongoose.model(
  'Game',
  new mongoose.Schema({
    name: String,
    description: String,
    gameType: String,
    dataUrl: String,
    loaderUrl: String,
    frameworkUrl: String,
    codeUrl: String,
    imageUrl: String,
    uploaderUserId: String,
    createdAt: Number,
    updatedAt: Number,
  }),
);

module.exports = Game;
