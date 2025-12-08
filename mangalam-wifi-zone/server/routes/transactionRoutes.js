const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { auth, requireAdmin } = require('../middleware/authMiddleware');

// list transactions (admin)
router.get('/', auth, requireAdmin, transactionController.listTransactions);

// get single transaction
router.get('/:id', auth, transactionController.getTransaction);

// refund (admin)
router.post('/:id/refund', auth, requireAdmin, transactionController.refundTransaction);

module.exports = router;
