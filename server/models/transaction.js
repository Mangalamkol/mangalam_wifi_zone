const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  razorpayOrderId: String,
  razorpayPaymentId: String,
  phone: String,
  amount: Number,
  status: {type:String, enum:['created','paid','failed'], default:'created'},
  coupon: {type: mongoose.Schema.Types.ObjectId, ref:'Coupon'},
  meta: {},
  note: String
},{timestamps:true});

module.exports = mongoose.model('Transaction', TransactionSchema);