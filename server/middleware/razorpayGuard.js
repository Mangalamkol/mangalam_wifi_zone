module.exports = (req, res, next) => {
  if (process.env.RAZORPAY_KEY.includes("test")) {
    return res.status(403).json({
      error: "Test Razorpay key detected. LIVE blocked."
    });
  }
  next();
};