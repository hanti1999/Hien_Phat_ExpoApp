const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: String,
  comment: String,
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 5,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
