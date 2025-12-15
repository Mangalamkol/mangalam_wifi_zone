const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
  email: {type:String, unique:true, required:true},
  passwordHash: {type:String, required:true},
  name: String,
  role: {type:String, default:'admin'}
}, {timestamps:true});

AdminSchema.methods.verifyPassword = function(password){
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('Admin', AdminSchema);