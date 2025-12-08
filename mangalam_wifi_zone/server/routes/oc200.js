const express = require('express');
const router = express.Router();
const oc200Controller = require('../controllers/oc200Controller');
const { requireAdmin } = require('../middleware/authMiddleware');

// OC200 integration endpoints
router.post('/login', oc200Controller.generateVoucherLogin); // map coupon -> OC200 login
router.post('/kick', requireAdmin, oc200Controller.kickUser); // kick user by mac/ip
router.get('/status', oc200Controller.status); // health/status for controller

module.exports = router;