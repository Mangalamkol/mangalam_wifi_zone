import rateLimit from "express-rate-limit";

export default rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // প্রতি IP 100 request
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});