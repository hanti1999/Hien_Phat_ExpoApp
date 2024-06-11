const mongoose = require('mongoose');
const { Schema } = mongoose;

const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Brand = mongoose.model('Brand', BrandSchema);

module.exports = Brand;
