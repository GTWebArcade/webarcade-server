// imports
const AWS = require('aws-sdk');
const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const fs = require('fs');

// load additional environment variables (ex: database and storage bucket passwords) from .env file
env.config();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_BUCKET_SECRET
})

const filename = 'README.md'
const fileContent = fs.readFileSync(filename)

const params = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: `${filename}.jpg`,
  Body: fileContent
}

s3.upload(params, (err, data) => {
  if (err) {
    console.error(err);
    reject(err)
  }
  resolve(data.Location)
})

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
