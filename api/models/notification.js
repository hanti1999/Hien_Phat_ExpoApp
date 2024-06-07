const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: String,
  content: [{ type: String }],
  image: [{ type: String }],
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
