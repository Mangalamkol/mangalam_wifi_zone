const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  name: {type:String, required:true},
  price: {type:Number, required:true}, // in smallest unit (e.g., paise)
  durationMinutes: {type:Number, required:true}, // e.g., 60 for 1hr
  deviceLimit: {type:Number, default:1},
  visible: {type:Boolean, default:true},
  description: String
}, {timestamps:true});

module.exports = mongoose.model('Plan', PlanSchema);
