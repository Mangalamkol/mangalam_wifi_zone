import Coupon from '../models/Coupon.js';
import Transaction from '../models/Transaction.js';
import Plan from '../models/Plan.js';

const recoverCoupon = async (req, res) => {
  try {
    const { payment_id } = req.body;
    if (!payment_id) {
      return res.status(400).json({ message: 'Payment ID is required' });
    }

    // Find the transaction associated with the payment ID
    const transaction = await Transaction.findOne({
      $or: [{ payment_id }, { razorpay_payment_id: payment_id }],
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }

    // Find the coupon using the transaction's internal ID
    const coupon = await Coupon.findOne({ transactionId: transaction._id }).populate('planId');

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found for this transaction.' });
    }

    res.json({
        code: coupon.code,
        expiresAt: coupon.expiresAt,
        planName: coupon.planId.name,
        deviceLimit: coupon.planId.deviceLimit
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while recovering the coupon.' });
  }
};

export default { recoverCoupon };
