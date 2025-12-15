const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: {type:String, required:true, index:true},
  plan: {type: mongoose.Schema.Types.ObjectId, ref:'Plan'},
  isExpired: {type:Boolean, default:false},
  assignedTo: { 
    phone: String, 
    deviceList: [String]
  },
  expiresAt: Date,
  devicesUsed: [String]
},{timestamps:true});

module.exports = mongoose.model('Coupon', CouponSchema);