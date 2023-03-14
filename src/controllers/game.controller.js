const db = require('../models');

const Game = db.game;

exports.getGames = async (req, res) => {
  Game.find({}).exec((err, games) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({ games });
  });
};

exports.createGame = async (req, res) => {
  Game.find({}).exec((err, games) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({ games });
  });
};
