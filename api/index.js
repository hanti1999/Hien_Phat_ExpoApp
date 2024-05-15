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
    const { name, loginInfo, password, address } = req.body;
    const existingUser = await User.findOne({ loginInfo });
    if (existingUser) {
      return res.status(400).json({ message: 'Tài khoản này đã được dùng' });
    }
    const newUser = new User({ name, loginInfo, password, address });
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

    const token = jwt.sign(
      { userId: user._id, address: user.address, name: user.name },
      secretKey
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Đăng nhập không thành công!' });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      totalPrice,
      name,
      phoneNumber,
      note,
      shippingAddress,
      paymentMethod,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    //create a new Order
    const order = new Order({
      user: userId,
      name: name,
      phoneNumber: phoneNumber,
      note: note,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: 'Order created successfully!' });
  } catch (error) {
    console.log('error creating orders', error);
    res.status(500).json({ message: 'Error creating orders' });
  }
});

app.get('/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the user profile' });
  }
});

app.get('/orders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate('user');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
});
