const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.loginAdmin);
router.get('/users', adminController.getUsers);
router.get('/transactions', adminController.getTransactions);
router.get('/plans', adminController.getPlans);
router.post('/plans', adminController.addPlan);
router.get('/coupons', adminController.getCoupons);
router.post('/coupons', adminController.addCoupon);

module.exports = router;