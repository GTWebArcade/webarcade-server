const ratingController = require('../controllers/rating.controller');

module.exports = function addRatingRoutes(app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/api/v1/rating/get-rating', ratingController.getRatings);
  app.get('/api/v1/rating/post-rating', ratingController.sendRating);
};
