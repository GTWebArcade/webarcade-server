const controller = require('../controllers/auth.controller');

module.exports = function addAuthRoutes(app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  // app.post(
  //   '/api/auth/signup',
  //   [],
  //   controller.signin,
  // );

  app.post('/api/auth/signin', controller.signin);
};
