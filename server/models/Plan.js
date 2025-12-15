const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  validity: {
    type: Number, // in days
    required: true,
  },
  data: {
    type: String, // e.g., '1GB/day', 'Unlimited'
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);