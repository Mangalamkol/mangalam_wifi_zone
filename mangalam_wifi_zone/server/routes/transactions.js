const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionController');
const { requireAdmin } = require('../middleware/authMiddleware');

router.get('/', requireAdmin, transactionsController.listTransactions);
router.get('/:id', requireAdmin, transactionsController.getTransaction);
router.post('/:id/refund', requireAdmin, transactionsController.refundTransaction);

module.exports = router;