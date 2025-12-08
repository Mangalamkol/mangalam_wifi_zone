const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/plans', require('./plans'));
router.use('/coupons', require('./coupons'));
router.use('/razor', require('./razor'));
router.use('/oc200', require('./oc200'));
router.use('/whatsapp', require('./whatsapp'));
router.use('/transactions', require('./transactions'));

module.exports = router;