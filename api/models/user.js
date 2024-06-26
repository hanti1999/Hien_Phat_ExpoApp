const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  loginInfo: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: String,
  password: {
    type: String,
    required: true,
  },
  address: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  points: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Review',
    },
  ],
  wishlist: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      unique: true,
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
