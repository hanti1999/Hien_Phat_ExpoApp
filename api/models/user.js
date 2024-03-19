const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  addresses: [
    {
      name: String,
      houseNo: String,
      street: String,
      village: String,
      district: String,
      province: String,
      city: String,
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
