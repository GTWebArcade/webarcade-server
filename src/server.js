// imports
const express = require('express');
const cors = require('cors');
const env = require('dotenv');

// load additional environment variables (ex: database and storage bucket passwords) from .env file
env.config();

// create express app and configure it
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'WebArcade server.' });
});

// dummy database
const db = {
  lookUpUserByUsername: (username) => {
    if (username === 'deepak') {
      const userData = {
        username: 'deepak',
        password: 'password',
      };
      return userData;
    }
    return undefined;
  },
};

const hashPassword = (password) => password;

// dummy sign-in endpoint
app.post('/api/v1/sign-in', (req, res) => {
  const username = req?.body?.username; 
  const password = req?.body?.password; 
  const userData = db.lookUpUserByUsername(username);
  if (userData) {
      if (userData.password === hashPassword(password)) {
        res.json({ message: 'Success', accessToken: 'asdfasdfsadfdsfa' });
      } else {
        res.json({ message: 'Error loggin in. Invalid password.' });
      }
      return;
  } 
  res.json({ message: 'Error loggin in. User does not exist with this username.'});
});

// routes
require('./routes/auth.routes')(app);

// listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
