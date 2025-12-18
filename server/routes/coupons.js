const router = require('express').Router();
const Coupon = require('../models/Coupon');

// Assign one unused coupon for a plan
router.post('/assign', async (req, res) => {
  const { planId } = req.body;

  const coupon = await Coupon.findOneAndUpdate(
    { planId, used: false },
    { used: true, assignedAt: new Date() },
    { new: true }
  );

  if (!coupon) return res.status(404).json({ message: 'No coupons available' });
  res.json(coupon);
});

module.exports = router;