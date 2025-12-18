// server/controllers/razorpayController.js
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Transaction = require('../models/Transaction');
const Coupon = require('../models/Coupon');
const Plan = require('../models/Plan');
const { createVoucher } = require('../services/oc200Service');
const { notifyUser } = require('../services/notificationService');

const rz = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, planId, phone } = req.body;
    const order = await rz.orders.create({ amount: Math.round(amount), currency, receipt, notes: { planId, phone } });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
  hmac.update(order_id + '|' + payment_id);
  const digest = hmac.digest('hex');
  if (digest !== signature) return res.status(400).json({ ok: false });

  try {
    const order = await rz.orders.fetch(order_id);
    const planId = order.notes.planId;
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    const transaction = await Transaction.create({ order_id, payment_id, status: 'paid' });

    const voucher = await createVoucher({
      planName: plan.name,
      duration: plan.durationMinutes,
      deviceLimit: plan.deviceLimit,
    });

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + plan.durationMinutes);

    await Coupon.create({
      code: voucher.code,
      planId: plan._id,
      transactionId: transaction._id,
      expiresAt,
      source: 'OC200',
    });

    const userPhone = order.notes.phone;
    if (userPhone) {
        await notifyUser({
            phone: userPhone,
            template: 'payment_success_2',
            params: [voucher.code, expiresAt.toLocaleString(), plan.deviceLimit],
            smsText: `Your payment was successful.\n\nWiFi Coupon Code: ${voucher.code}\nValid Till: ${expiresAt.toLocaleString()}\nDevice Limit: ${plan.deviceLimit}\n\nThank you for choosing Mangalam WiFi Zone.\n\nNeed help? Reply HELP`,
            lang: 'en_US'
        });
    }

    // Admin Notification
    if (process.env.ADMIN_PHONE_NUMBER) {
        await notifyUser({
            phone: process.env.ADMIN_PHONE_NUMBER,
            template: 'new_sale_admin',
            params: {
                plan_name: plan.name,
                amount: `₹${order.amount / 100}`,
                transaction_id: payment_id
            },
            smsText: `🔔 New Sale\nPlan: ${plan.name}\nAmount: ₹${order.amount / 100}\nTransaction ID: ${payment_id}`
        });
    }


    res.json({ success: true, voucher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.refundPayment = async (req, res) => {
    // Placeholder for refund logic
    try {
        const { payment_id, amount } = req.body;
        // const refund = await rz.payments.refund(payment_id, { amount });
        // res.json(refund);
        res.json({ message: 'Refund placeholder' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.webhookHandler = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(req.body.toString());
    const digest = shasum.digest('hex');

    if (digest !== signature) {
      return res.status(400).json({ ok: false, message: 'Invalid signature' });
    }

    const payload = JSON.parse(req.body.toString());

    if (payload.event === 'payment.captured' || payload.event === 'payment.authorized') {
      const payment = payload.payload.payment.entity;
      const order = await rz.orders.fetch(payment.order_id);
      const planId = order.notes.planId;
      const plan = await Plan.findById(planId);

      if (plan) {
        const transaction = await Transaction.create({
          razorpay_order_id: payment.order_id,
          razorpay_payment_id: payment.id,
          amount: payment.amount,
          status: payment.status,
          raw: payment,
        });

        const voucher = await createVoucher({
          planName: plan.name,
          duration: plan.durationMinutes,
          deviceLimit: plan.deviceLimit,
        });

        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + plan.durationMinutes);

        await Coupon.create({
          code: voucher.code,
          planId: plan._id,
          transactionId: transaction._id,
          expiresAt,
          source: 'OC200',
        });
        
        const userPhone = order.notes.phone;
        if (userPhone) {
            await notifyUser({
                phone: userPhone,
                template: 'payment_success_2',
                params: [voucher.code, expiresAt.toLocaleString(), plan.deviceLimit],
                smsText: `Your payment was successful.\n\nWiFi Coupon Code: ${voucher.code}\nValid Till: ${expiresAt.toLocaleString()}\nDevice Limit: ${plan.deviceLimit}\n\nThank you for choosing Mangalam WiFi Zone.\n\nNeed help? Reply HELP`,
                lang: 'en_US'
            });
        }

        // Admin Notification
        if (process.env.ADMIN_PHONE_NUMBER) {
            await notifyUser({
                phone: process.env.ADMIN_PHONE_NUMBER,
                template: 'new_sale_admin',
                params: {
                    plan_name: plan.name,
                    amount: `₹${payment.amount / 100}`,
                    transaction_id: payment.id
                },
                smsText: `🔔 New Sale\nPlan: ${plan.name}\nAmount: ₹${payment.amount / 100}\nTransaction ID: ${payment.id}`
            });
        }
      }
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
