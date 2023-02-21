// imports
const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const fs = require('fs');

// load additional environment variables (ex: database and storage bucket passwords) from .env file
env.config();

// example of how to upload a file to s3
{
  // import AWS
  // eslint-disable-next-line import/no-unresolved, global-require
  const AWS = require('aws-sdk');
  // create connection to our S3 storage bucket
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_BUCKET_SECRET,
  });
  // specify which file to upload to storage bucket and store the
  // data of that file in the fileContent variable
  const filename = 'README.md';
  const fileContent = fs.readFileSync(filename);
  // specify which path to upload our file to in the AWS S3 cloud storage bucket
  const awsFileSavePath = `web-arcade/${filename}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: awsFileSavePath,
    Body: fileContent,
  };
  /// upload the file to the storage bucket and check whether or not there was an error
  // eslint-disable-next-line no-unused-vars
  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file', err);
      return;
    }
    console.log(`Uploaded file to ${process.env.AWS_CLOUDFRONT_URL}/${awsFileSavePath}`);
  });
}

// db creation and connection
const db = require('./models');

db.mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

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
