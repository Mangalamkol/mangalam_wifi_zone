// server/routes/index.js
const express = require('express');
const apiRouter = express.Router();

const authRoutes = require('./authRoutes');
const planRoutes = require('./plans');
const couponRoutes = require('./coupons');
const voucherRoutes = require('./vouchers');
const userRoutes = require('./user');
const razorpayRoutes = require('./razorpayRoutes');
const transactionRoutes = require('./transactions');
const whatsappRoutes = require('./whatsappRoutes');
const oc200Routes = require('./oc200Routes');

apiRouter.use('/auth', authRoutes);
apiRouter.use('/plans', planRoutes);
apiRouter.use('/coupons', couponRoutes);
apiRouter.use('/vouchers', voucherRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/razorpay', razorpayRoutes);
apiRouter.use('/transactions', transactionRoutes);
apiRouter.use('/whatsapp', whatsappRoutes);
apiRouter.use('/oc200', oc200Routes);

module.exports = apiRouter;