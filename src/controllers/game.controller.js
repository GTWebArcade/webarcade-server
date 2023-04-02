/* eslint-disable consistent-return */
const db = require('../models');

const Game = db.game;

exports.getGames = async (req, res) => {
  const nameQeuryParam = req?.query?.name;
  // const typeQeuryParam = req?.query?.type;
  if (nameQeuryParam) {
    // mongoDB code
    Game.find({ name: nameQeuryParam }).exec((err, games) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send({ games });
    });
  // } else if (typeQeuryParam) {
  //   Game.find({ type: typeQeuryParam }).exec((err, games) => {
  //     if (err) {
  //       res.status(500).send({ message: err });
  //       return;
  //     }

  //     res.status(200).send({ games });
  //   });
  } else {
    Game.find({}).exec((err, games) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send({ games });
    });
  }
};

exports.getGame = async (req, res) => {
// res.status(200).send('hello');
//   console.log('yo');
//   console.log(req.params);
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      res.status(404).send({ message: 'Game not found' });
      return;
    }
    res.status(200).send({ game });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
};
