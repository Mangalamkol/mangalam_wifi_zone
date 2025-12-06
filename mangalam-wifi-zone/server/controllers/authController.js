const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.requestOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) return res.status(400).json({ error: "Mobile required" });

    const otp = generateOtp();
    const expires = new Date(Date.now() + 5 * 60 * 1000);

    let user = await User.findOne({ mobile });
    if (!user) user = new User({ mobile });

    user.otp = otp;
    user.otpExpires = expires;
    await user.save();

    console.log("OTP:", otp, "for mobile:", mobile);

    return res.json({ ok: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const user = await User.findOne({ mobile });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const token = jwt.sign(
      { mobile },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.json({ token, mobile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};