const Coupon = require('../models/Coupon');
const { parsePdf } = require('../utils/pdfParser');

const uploadCouponsPdf = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
        const codes = await parsePdf(req.file.path);
        const { planKey, maxDevices } = req.body;

        const coupons = codes.map(code => ({
            code,
            planKey,
            maxDevices,
            status: 'active',
        }));

        const result = await Coupon.insertMany(coupons, { ordered: false });
        res.json({ imported: result.length });

    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key errors during insertMany
            return res.status(400).json({ message: "Some coupon codes already exist.", imported: error.result.nInserted });
        }
        res.status(500).json({ message: 'Error processing PDF file.' });
    }
};

const checkCoupon = async (req, res) => {
    try {
        const { code } = req.params;
        const coupon = await Coupon.findOne({ code, status: 'active' });

        if (coupon) {
            res.json({ valid: true, coupon });
        } else {
            res.json({ valid: false, message: 'Coupon not found or is inactive.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { uploadCouponsPdf, checkCoupon };