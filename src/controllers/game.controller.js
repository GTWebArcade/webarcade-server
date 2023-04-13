/* eslint-disable consistent-return */
const db = require('../models');

const Game = db.game;

exports.getGames = async (req, res) => {
  const nameQueryParam = req?.query?.name;
  // const typeQeuryParam = req?.query?.type;
  if (nameQueryParam) {
    // mongoDB code
    // Game.find({ name: nameQueryParam }).exec((err, games) => {
    Game.find({ $text: { $search: nameQueryParam } })
      // .skip(20)
      // .limit(10)
      .exec((err, games) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.status(200).send({ games });
      });
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

exports.createGame = async (req, res) => {
  const game = new Game({
    name: req?.body?.name,
    description: req?.body?.description,
    gameType: req?.body?.gameType,
    dataUrl: req?.body?.dataUrl,
    loaderUrl: req?.body?.loaderUrl,
    frameworkUrl: req?.body?.frameworkUrl,
    codeUrl: req?.body?.codeUrl,
    imageUrl: req?.body?.imageUrl,
    uploaderUserId: req?.userId,
    createdAt: req?.body?.createdAt,
    updatedAt: req?.body?.updatedAt,
  });

  game.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: 'Game was added successfully!' });
  });
};

exports.getGame = async (req, res) => {
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
