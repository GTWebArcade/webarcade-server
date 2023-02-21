const controller = require('../controllers/auth.controller');

module.exports = function addAuthRoutes(app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  // TODO: remove this first signin endpoint route (ensure the change is made on the frontend too)
  app.post('/api/auth/signin', controller.signin);
  app.post('/api/v1/auth/sign-in', controller.signin);
  app.post('/api/v1/auth/sign-up', controller.signup);
};
