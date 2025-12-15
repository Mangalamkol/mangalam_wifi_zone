const { verify } = require("../utils/jwt");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const data = verify(token);
    req.admin = data;
    next();
  } catch (e) {
    return res.status(403).json({ message: "Invalid token" });
  }
};