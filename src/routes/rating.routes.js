/* eslint-disable no-unused-vars */
const ratingController = require('../controllers/rating.controller');
const authJwt = require('../middlewares/authJwt');

module.exports = function addRatingRoutes(app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/api/v1/rating/get-ratings/:gameId', ratingController.getRatings);
  app.post('/api/v1/rating/post-rating', ratingController.sendRating);
};
