const express = require('express');
const router = express.Router();
const { list, refund } = require('../controllers/transactionController');
const requireAdmin = require('../middleware/requireAdmin');

router.get('/', requireAdmin, list);
router.post('/:id/refund', requireAdmin, refund);

module.exports = router;
