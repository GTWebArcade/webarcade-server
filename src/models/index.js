const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.game = require('./game.model');

module.exports = db;
