const gameController = require('../controllers/game.controller');

module.exports = function addGameRoutes(app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  // app.get('/api/v1/games', gameController.getGames);

  app.get('/api/v1/game/:id', gameController.getGame);
};
