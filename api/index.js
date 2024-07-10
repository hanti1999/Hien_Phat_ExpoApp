const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
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

const Notification = require('./models/notification');
const Category = require('./models/category');
const Product = require('./models/product');
const Review = require('./models/review');
const Order = require('./models/order');
const Brand = require('./models/brand');
const User = require('./models/user');

// // User controllers
// Đăng ký tài khoản
app.post('/register', async (req, res) => {
  try {
    const { name, password, address, phoneNumber } = req.body;
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'Tài khoản này đã được dùng' });
    }
    const newUser = new User({
      name,
      password,
      address,
      phoneNumber,
    });
    await newUser.save();
    console.log('User vừa đăng ký: ', newUser);
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Đăng ký không hành công!' });
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
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(401).json({ message: 'Tài khoản không tồn tại!' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Mật khẩu sai!' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
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

    const user = await User.findById(userId).populate(['orders', 'wishlist']);

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
    const { userId, name, phoneNumber, address, password } = req.body;

    const user = await User.findByIdAndUpdate(userId, {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      password: password,
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Cập nhật hồ sơ thất bại!' });
  }
});

// // Order controllers
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
      productId: item?.id,
      title: item?.title,
      quantity: item.quantity,
      price: item.price,
    }));

    // Cập nhật số lượng bán
    for (const product of products) {
      try {
        const updatedProduct = await Product.findByIdAndUpdate(
          product.productId,
          { $inc: { sold: product.quantity } }
        );

        if (updatedProduct) {
          console.log(
            `Đã cập nhật số lượng sản phẩm với ID ${product.productId}`
          );
        } else {
          console.log(`Không tìm thấy sản phẩm với ID ${product.productId}`);
        }
      } catch (error) {
        console.error(
          `Lỗi khi cập nhật sản phẩm với ID ${product.productId}: ${error.message}`
        );
      }
    }

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

// Lấy thông tin đơn hàng theo id khách
app.get('/orders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId });

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

    await Order.findByIdAndUpdate(orderId, { status: 'Đã hủy' });

    res.status(200).json({ message: 'Hủy thành công' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.patch('/order/:orderId/deliver', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await Order.findByIdAndUpdate(orderId, {
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

    const order = await Order.findByIdAndUpdate(orderId, { status: 'Đã giao' });

    await User.findByIdAndUpdate(order.user, {
      $inc: { points: order.points },
    });

    res.status(200).json({ message: 'Cập nhật trạng thái thành công!' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// // Notification controllers
app.post('/notification/create', async (req, res) => {
  try {
    const { title, content, image } = req?.body;

    const noti = new Notification({
      title: title,
      content: content,
      image: image,
    });

    await noti.save();
    res.status(200).json({ message: 'Tạo thông báo thành công!' });
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

// // Product controllers
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
    const products = await Product.find().populate([
      'category',
      'brand',
      'reviews',
    ]);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log('Lỗi get /product', error);
  }
});

// get products by category
app.get('/product/category/:categoryId', async (req, res) => {
  try {
    const categoryId = req?.params?.categoryId;
    const products = await Product.find({ category: categoryId }).populate([
      'category',
      'brand',
      'reviews',
    ]);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log('Lỗi get /product/:categoryId', error);
  }
});

// get products by brand
app.get('/product/brand/:brandId', async (req, res) => {
  try {
    const brandId = req?.params?.brandId;
    const products = await Product.find({ brand: brandId }).populate([
      'category',
      'brand',
      'reviews',
    ]);
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

// // Category controllers
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

// // Brand controllers
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

// // Review controllers
// Review
app.post('/review/create/:productId/:userId', async (req, res) => {
  try {
    const { productId, userId } = req.params;
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();

    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: savedReview._id },
    });

    const user = await User.findByIdAndUpdate(userId, {
      $push: { reviews: savedReview._id },
    });

    await Review.findByIdAndUpdate(savedReview._id, { name: user.name });

    res.status(200).json({ message: 'Gửi đánh giá thành công!' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// add wishlist
app.post('/wishlist/add/:productId/:userId', async (req, res) => {
  try {
    const { productId, userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, {
      $addToSet: { wishlist: productId },
    });

    if (user.wishlist.includes(productId)) {
      console.log('Sản phẩm đã tồn tại!');
      res.status(409).json({ message: 'Sản phẩm đã tồn tại!' });
    } else {
      res.status(200).json({ message: 'Thêm wishlist thành công!' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// remove from wishlist
app.delete('/wishlist/delete/:productId/:userId', async (req, res) => {
  try {
    const { productId, userId } = req.params;
    await User.findByIdAndUpdate(userId, {
      $pull: { wishlist: productId },
    });
    res.status(200).json({ message: 'Xóa wishlist thành công!' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// check wishlist
app.get('/wishlist/check/:productId/:userId', async (req, res) => {
  try {
    const { productId, userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    const isProductInWishlist = user.wishlist.includes(productId);

    res.status(200).json({ isProductInWishlist });
  } catch (error) {
    res.status(500).json({ error });
  }
});
