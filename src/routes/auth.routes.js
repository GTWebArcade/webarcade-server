const controller = require('../controllers/auth.controller');
const { verifySignUp } = require('../middlewares');

module.exports = function addAuthRoutes(app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post('/api/v1/auth/sign-in', controller.signin);
  app.post('/api/v1/auth/sign-up', verifySignUp.checkDuplicateUsernameOrEmail, controller.signup);
};
