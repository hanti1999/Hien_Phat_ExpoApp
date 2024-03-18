const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

// database connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB database connected');
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, () => {
  connect();
  console.log('Server is running on port:', port);
});
