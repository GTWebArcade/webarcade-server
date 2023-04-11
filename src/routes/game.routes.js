const gameController = require('../controllers/game.controller');
const authJwt = require('../middlewares/authJwt');

module.exports = function addGameRoutes(app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/api/v1/games', [authJwt.verifyToken], gameController.getGames);
  app.get('/api/v1/game/:id', [authJwt.verifyToken], gameController.getGame);
  app.post('/api/v1/game/create-game', [authJwt.verifyToken], gameController.createGame);
};
