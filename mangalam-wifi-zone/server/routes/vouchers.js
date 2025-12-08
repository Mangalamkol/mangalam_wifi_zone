const express = require('express');
const router = express.Router();

// Placeholder for voucher controller functions
const voucherController = {
  getVouchers: (req, res) => res.json([]),
  createVoucher: (req, res) => res.json({}),
};

router.get('/', voucherController.getVouchers);
router.post('/', voucherController.createVoucher);

module.exports = router;
