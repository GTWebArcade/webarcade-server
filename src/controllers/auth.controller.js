const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const db = require('../models');

const User = db.user;

exports.signin = async (req, res) => {
  console.log(req?.body?.password);
  User.findOne({
    username: req?.body?.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res.status(404).send({ message: 'Username not included.' });
    }

    console.log(user);

    const validPass = bcrypt.compareSync(
      req?.body?.password,
      user?.password,
    );

    if (!validPass) {
      res.status(401).send({
        accessToken: null,
        message: 'Incorrect Password!',
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });

    res.status(200).send({
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
      message: 'Successfully logged in.',
    });
  });
};
