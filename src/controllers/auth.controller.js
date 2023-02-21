const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const db = require('../models');

const User = db.user;

exports.signin = async (req, res) => {
  User.findOne({
    username: req?.body?.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res.status(404).send({ message: 'Username not included.' });
      return;
    }

    const validPass = bcrypt.compareSync(
      req?.body?.password,
      user?.password,
    );

    // const validPass = req?.body?.password === user?.password;

    if (!validPass) {
      res.status(401).send({
        accessToken: null,
        message: 'Incorrect Password!',
      });
      return;
    }

    const token = jwt.sign({ id: user?.id }, config?.secret, {
      expiresIn: 86400,
    });

    res.status(200).send({
      // eslint-disable-next-line no-underscore-dangle
      id: user?._id,
      username: user?.username,
      email: user?.email,
      accessToken: token,
      message: 'Successfully logged in.',
    });
  });
};

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    // email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: 'User was registered successfully!' });
  });
};
