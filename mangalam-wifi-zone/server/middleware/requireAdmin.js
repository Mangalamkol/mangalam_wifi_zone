const User = require('../models/User');

const requireAdmin = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: "Forbidden: requires admin privileges" });
};

module.exports = requireAdmin;
