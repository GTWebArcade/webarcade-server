const db = require('../models');

const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  if (!req?.body?.username) {
    res.status(400).send({ message: 'Username is empty!' });
    return;
  }

  if (!req?.body?.email) {
    res.status(400).send({ message: 'Email is empty!' });
    return;
  }

  if (!req?.body?.password) {
    res.status(400).send({ message: 'Password is empty!' });
    return;
  }

  if (!req?.body?.cpassword) {
    res.status(400).send({ message: 'Confirm Password is empty!' });
    return;
  }

  if (req?.body?.password !== req?.body?.cpassword) {
    res.status(400).send({ message: 'Passwords do not match!' });
    return;
  }

  User.findOne({
    username: req?.body?.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: 'Username is already in use!' });
      return;
    }

    User.findOne({
      email: req?.body?.email,
    // eslint-disable-next-line no-shadow
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: 'Email is already in use!' });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
