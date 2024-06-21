const mongoose = require('mongoose');
const { Schema } = mongoose;

const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
});

const Brand = mongoose.model('Brand', BrandSchema);

module.exports = Brand;
