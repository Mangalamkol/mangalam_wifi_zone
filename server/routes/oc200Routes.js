// server/routes/oc200Routes.js
const express = require('express');
const router = express.Router();
const oc200Controller = require('../controllers/oc200Controller');

// endpoints that talk to TP-Link Omada OC200 / controller APIs
router.post('/login', oc200Controller.loginToController);
router.post('/apply-coupon', oc200Controller.applyCouponToClient); // if you have integration
router.get('/status', oc200Controller.status);

module.exports = router;