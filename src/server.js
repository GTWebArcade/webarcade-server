/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const fs = require('fs');
const multer = require('multer');

const memStorage = multer.memoryStorage();
const upload = multer({ storage: memStorage });

// load additional environment variables (ex: database and storage bucket passwords) from .env file
env.config();

// example of how to upload a file to s3
// import AWS
// eslint-disable-next-line import/no-unresolved, global-require
const AWS = require('aws-sdk');
// create connection to our S3 storage bucket
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_BUCKET_SECRET,
});

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

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'WebArcade server.' });
});

app.post('/api/v1/file-upload', upload.single('gamedata'), (req, res) => {
  if (req?.file && req?.file?.buffer && req?.file?.originalname) {
    // specify which path to upload our file to in the AWS S3 cloud storage bucket
    const fileName = Date.now().toString() + req.file.originalname;
    console.log(fileName);
    const awsFileSavePath = `web-arcade/${fileName}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: awsFileSavePath,
      Body: req.file.buffer,
    };
    s3.upload(params, (err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(`Uploaded file to ${process.env.AWS_CLOUDFRONT_URL}/${awsFileSavePath}`);
      res.json({ FileURL: `${process.env.AWS_CLOUDFRONT_URL}/${awsFileSavePath}` });
    });
  } else {
    res.status(404).send({ message: 'No file provided.' });
  }
});

// routes
require('./routes/auth.routes')(app);
require('./routes/game.routes')(app);
require('./routes/user.routes')(app);
require('./routes/rating.routes')(app);

// listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
