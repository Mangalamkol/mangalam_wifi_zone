import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Map,
    of: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxDevices: {
    type: Number,
    required: true,
  },
});

const Plan = mongoose.model('Plan', planSchema);

export default Plan;
