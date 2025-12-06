const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Plan = require('../models/Plan');
const Coupon = require('../models/Coupon');

const loginAdmin = (req, res) => {
    const { user, pass } = req.body;

    // Use environment variables for credentials in a real app
    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'password';

    if (user === adminUser && pass === adminPass) {
        const accessToken = jwt.sign(
            { "UserInfo": { "username": user } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        res.json({ accessToken });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate("user", "phone")
            .populate("plan", "name")
            .populate("coupon", "code");
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addPlan = async (req, res) => {
    try {
        const { key, name, price, durationMinutes, visible } = req.body;
        const newPlan = new Plan({ key, name, price, durationMinutes, visible });
        await newPlan.save();
        res.json(newPlan);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Plan with this key already exists." });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addCoupon = async (req, res) => {
    try {
        const { code, discount } = req.body;
        const newCoupon = new Coupon({ code, discount });
        await newCoupon.save();
        res.json(newCoupon);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { loginAdmin, getUsers, getTransactions, getPlans, addPlan, getCoupons, addCoupon };