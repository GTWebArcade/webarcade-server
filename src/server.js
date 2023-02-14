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

const db = require('./models');

db.mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB.', err);
    process.exit();
  });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'WebArcade server.' });
});

// app.post('/api/auth/signin', (req, res) => {
//   const username = req?.body?.username;
//   const password = req?.body?.password;
//   console.log('username: ', username);
//   console.log('password: ', password);
//   res.json({ message: 'Error logging in.' });
// });

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
