const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  note: String,
  products: [
    {
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'Chờ xác nhận',
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
