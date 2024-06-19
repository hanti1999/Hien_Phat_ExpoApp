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
    subject: 'Xác minh địa chỉ Mail',
    text: `Mã xác minh của bạn là: ${otp}`,
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

// Xác minh số điện thoại với twilio
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioNumber = process.env.TWILIO_NUMBER;
// const client = require('twilio')(accountSid, authToken);

app.post('/verify', async (req, res) => {
  // const { phone } = req.body;
  // const otp = Math.floor(100000 + Math.random() * 900000);
  // client.messages
  //   .create({
  //     body: `Mã OTP của bạn là: ${otp}`,
  //     from: twilioNumber,
  //     to: `+84${phone}`,
  //   })
  //   .then(() => {
  //     res
  //       .status(200)
  //       .json({ phone: phone, message: 'Gửi OTP thành công!', otp: otp });
  //   })
  //   .catch((err) => {
  //     console.error(err.message);
  //     return res.status(500).json({ error: err.message });
  //   });
  try {
    const { phone } = req.body;
    const otp = 888888;
    return res.status(200).json({ otp: otp });
  } catch (error) {
    console.log(error);
  }
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
      {
        userId: user._id,
        address: user.address,
        name: user.name,
        phoneNumber: user?.phoneNumber,
      },
      secretKey
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Đăng nhập không thành công!' });
  }
});

// lấy thông tin khách hàng theo id
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

// cập nhật thông tin khách hàng
app.post('/profile/update', async (req, res) => {
  try {
    const { userId, name, phoneNumber, address } = req.body;

    const user = await User.findByIdAndUpdate(userId, {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Cập nhật hồ sơ thất bại!' });
  }
});

const Order = require('./models/order');
// Tạo đơn hàng
app.post('/order/create', async (req, res) => {
  try {
    const {
      userId,
      name,
      phoneNumber,
      note,
      cartItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
      cartPoints,
      usePoint,
    } = req.body;

    if (usePoint) {
      await User.findByIdAndUpdate(userId, { points: 0 });
    }

    // Tạo mảng chứa object sản phẩm
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
    }));

    const order = new Order({
      user: userId,
      name: name,
      phoneNumber: phoneNumber,
      note: note,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      points: cartPoints,
    });

    await order.save();

    await User.findByIdAndUpdate(userId, {
      $push: { orders: order._id },
    });

    res.status(200).json({ message: 'Order created successfully!' });
  } catch (error) {
    console.log('error creating orders', error);
    res.status(500).json({ message: 'Error creating orders' });
  }
});

// Thấy thông tin đơn hàng theo id khách
app.get('/orders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate('user');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Hủy đơn hàng
app.patch('/order/:orderId/cancel', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { newStatus } = req.body;

    const order = await Order.findByIdAndUpdate(orderId, { status: newStatus });

    res.status(200).json({ message: 'Hủy thành công' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.patch('/order/:orderId/deliver', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updateOrder = await Order.findByIdAndUpdate(orderId, {
      status: 'Đang giao',
    });
    res.status(200).json({ message: 'Cập nhật trạng thái thành công!' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.patch('/order/:orderId/delivered', async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);
    order.status = 'Đã giao';
    await order.save();

    const user = await User.findById(order.user);
    user.points += order.points;
    await user.save();

    res.status(200).json({ message: 'Cập nhật trạng thái thành công!' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

const Notification = require('./models/notification');
app.post('/notification/create', async (req, res) => {
  try {
    const { title, content, image } = req?.body;

    const noti = new Notification({
      title: title,
      content: content,
      image: image,
    });

    res.status(200).json({ message: 'Tạo thông báo thành công!' });
    await noti.save();
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.get('/notification', async (req, res) => {
  try {
    const notification = await Notification.find({});

    res.status(200).json({ notification });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

const Product = require('./models/product');
// Tìm kiếm sản phẩm
app.get('/product/search', async (req, res) => {
  try {
    const input = req.query.q;
    const products = await Product.find({
      title: new RegExp(input, 'i'),
    }).populate(['category', 'brand', 'reviews']);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log('Lỗi /product/search', error);
  }
});

app.get('/product', async (req, res) => {
  try {
    const product = await Product.find().populate([
      'category',
      'brand',
      'reviews',
    ]);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log('Lỗi get /product', error);
  }
});

// get products by category
app.get('/product/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req?.params;
    const products = await Product.find({ category: categoryId });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log('Lỗi get /product/:categoryId', error);
  }
});

// get products by brand
app.get('/product/:brandId', async (req, res) => {
  try {
    const { brandId } = req?.params;
    const products = await Product.find({ brand: brandId });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log('Lỗi get /product/:brandId', error);
  }
});

app.post('/product/add', async (req, res) => {
  try {
    const product = new Product(req?.body);
    await product.save();
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log('Lỗi /product/add', error);
  }
});

const Category = require('./models/category');
app.post('/category/add', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error });
    console.log('Lỗi /category/add', error);
  }
});

app.get('/category', async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error });
    console.log('Lỗi /category/get', error);
  }
});

const Brand = require('./models/brand');
app.post('/brand/add', async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(200).json({ brand });
  } catch (error) {
    res.status(500).json({ error });
    console.log('Lỗi /brand/add', error);
  }
});

app.get('/brand', async (req, res) => {
  try {
    const brand = await Brand.find();
    res.status(200).json({ brand });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//Review
const Review = require('./models/review');
app.post('/review/create/:productId/:userId', async (req, res) => {
  try {
    const { productId, userId } = req.params;
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();

    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: savedReview._id },
    });

    await User.findByIdAndUpdate(userId, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({ message: 'Gửi đánh giá thành công!' });
  } catch (error) {
    res.status(500).json({ error });
  }
});
