import Coupon from '../models/Coupon.js';

const getCouponDetailsByTransactionId = async (transactionId) => {
    const coupon = await Coupon.findOne({ transactionId });
    if (!coupon) {
        return null;
    }

    return {
        code: `OC200-${coupon.code}`,
        expiresAt: coupon.expiresAt,
    };
};

const createVoucher = async (coupon) => {
    // In a real scenario, this function would interact with the OC200 device/API
    // For now, we will just log that the coupon is being "created"
    console.log(`Creating coupon on OC200 with code: ${coupon.code}`);
    // Simulate a successful creation
    return { success: true, couponId: `oc200-${coupon._id}` };
};

export {
    getCouponDetailsByTransactionId,
    createVoucher,
};
