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
      name: {
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
      image: {
        type: String,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    houseNo: String,
    street: String,
    village: String,
    district: String,
    province: String,
    city: String,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
