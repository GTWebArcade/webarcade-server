/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
// imports
const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const fs = require('fs');

// load additional environment variables (ex: database and storage bucket passwords) from .env file
env.config();

// example of how to upload a file to s3
{
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_BUCKET_SECRET,
  });
  const filename = 'README.md';
  const fileContent = fs.readFileSync(filename);
  const awsFileSavePath = `web-arcade/${filename}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: awsFileSavePath,
    Body: fileContent,
  };
  // eslint-disable-next-line no-unused-vars
  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file', err);
    }
    console.log(`Uploaded file to ${process.env.AWS_CLOUDFRONT_URL}/${awsFileSavePath}`);
  });
}

// create express app and configure it
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'WebArcade server.' });
});

// routes
require('./routes/auth.routes')(app);

// listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
