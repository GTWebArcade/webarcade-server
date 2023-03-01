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

exports.getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).send({ message: 'Game not found' });
    }
    res.status(200).send({ game });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
};
