const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  description: String,
  gameType: String,
  unityDataUrl: String,
  unityLoaderUrl: String,
  unityFrameworkUrl: String,
  unityCodeUrl: String,
  imageUrl: String,
  uploaderUserId: String,
  createdAt: String,
  updatedAt: String,
});
schema.index({ name: 'text' });

const Game = mongoose.model('Game', schema);

module.exports = Game;
