const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

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

const User = require('./models/user');
const Order = require('./models/order');

// Đăng ký tài khoản
app.post('/register', async (req, res) => {
  try {
    const { name, loginInfo, password } = req.body;
    const existingUser = await User.findOne({ loginInfo });
    if (existingUser) {
      return res.status(400).json({ message: 'Tài khoản này đã được dùng' });
    }
    const newUser = new User({ name, loginInfo, password });
    await newUser.save();
    console.log('User vừa đăng ký: ', newUser);
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Đăng ký không hành công!' });
  }
});

// function gửi email xác thực
const sendVerificationEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hoanganhnguyen221299@gmail.com',
      pass: 'mnkp clke fkjg kulj',
    },
  });

  const mailOption = {
    from: 'Gas Hien Phat',
    to: email,
    subject: 'Xac minh dia chi Mail',
    text: `Ma xac minh cua ban la: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
};

// Xác minh email
app.post('/verify-email', async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    sendVerificationEmail(email, otp);
    return res.status(200).json({ otp: otp });
  } catch (error) {
    console.log(error);
  }
});

// Xác minh số điện thoại
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);

app.post('/verify', async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  // const ttl = 2 * 60 * 1000;
  // let expires = Date.now();
  // expires += ttl;
  // const data = `${phone}.${otp}.${expires}`;
  // const hash = crypto
  //   .createHmac('sha256', verifySid)
  //   .update(data)
  //   .digest('hex');
  // const fullHash = `${hash}.${expires}`;
  client.messages
    .create({
      body: `Mã OTP của bạn là: ${otp}`,
      from: twilioNumber,
      to: `+84${phone}`,
    })
    .then(() => {
      res
        .status(200)
        .json({ phone: phone, message: 'Gửi OTP thành công!', otp: otp });
    })
    .catch((err) => {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    });
});

// Đăng nhập
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex');
  return secretKey;
};

const secretKey = generateSecretKey();

app.post('/login', async (req, res) => {
  try {
    const { loginInfo, password } = req.body;

    const user = await User.findOne({ loginInfo });
    if (!user) {
      return res.status(401).json({ message: 'Tài khoản không tồn tại!' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Mật khẩu sai!' });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Đăng nhập không thành công!' });
  }
});
