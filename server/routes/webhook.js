import express from 'express';
import crypto from 'crypto';
import Session from '../models/session.js';
import Device from '../models/device.js';
import Order from '../models/order.js';

const router = express.Router();

// Webhook endpoint for Razorpay
router.post('/razorpay', async (req, res) => {
    // 1. Webhook verification
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(req.rawBody);
    const digest = shasum.digest('hex');

    if (digest !== req.headers['x-razorpay-signature']) {
        return res.status(400).json({ msg: 'Invalid signature' });
    }

    // 2. Handle the event
    const event = req.body;
    if (event.event === 'payment.authorized') {
        const payment = event.payload.payment.entity;
        
        // 3. Create a session
        const newSession = new Session({
            paymentId: payment.id,
            // ... other session details
        });
        await newSession.save();

        // 4. Authorize MAC address (assuming this is an external API call)
        // You would need to make an API call to your OC200 API here
        // For example:
        // const macAddress = '...'; // Get the MAC address from the payment or order
        // await axios.post('https://oc200.api/authorize', { mac: macAddress });

        // 5. Track device in DB
        const newDevice = new Device({
            macAddress: '...', // The MAC address to track
            sessionId: newSession._id,
            // ... other device details
        });
        await newDevice.save();
    }

    res.json({ status: 'ok' });
});

export default router;
