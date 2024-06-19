const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  oldPrice: Number,
  price: Number,
  image: String,
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  carouselImages: [{ type: String }],
  features: [{ type: String }],
  description: [{ type: String }],
  inStock: {
    type: Boolean,
    default: true,
  },
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
