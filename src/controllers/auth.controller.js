const bcrypt = require('bcryptjs');
const db = require('../models');

const User = db.user;

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
