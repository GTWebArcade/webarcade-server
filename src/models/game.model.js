const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  gameDataUrls: Array,
  imageUrl: String,
  gameType: String,
  uploaderUserId: String,
  createdAt: String,
  updatedAt: String,
});
schema.index({ name: 'text' });

const Game = mongoose.model('Game', schema);

module.exports = Game;
