const Coupon = require('../models/Coupon');

exports.create = async (req, res) => {
    try {
        const coupon = new Coupon(req.body);
        await coupon.save();
        res.json({ success: true, coupon });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json({ success: true, coupons });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        res.json({ success: true, coupon });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, coupon });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
