const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, select: false },
  name: { type: String },
  email: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  otp: { type: String },
  otpExpires: { type: Date },
  isOtpVerified: { type: Boolean, default: false },
}, { timestamps: true });

userSchema.virtual('password').set(function (value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});

userSchema.methods.verifyPassword = function (password) {
  return this.passwordHash ? bcrypt.compare(password, this.passwordHash) : false;
};

userSchema.methods.generateJwt = function () {
  return jwt.sign(
    { id: this._id, phone: this.phone, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
