const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Public
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('coupon').sort({createdAt: -1});
        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get transaction by ID
// @route   GET /api/transactions/:id
// @access  Public
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('coupon');

        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }

        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Transaction not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Create a transaction
// @route   POST /api/transactions
// @access  Private
exports.createTransaction = async (req, res) => {
    const { phone, amount, razorpayOrderId, razorpayPaymentId, status, meta, coupon } = req.body;

    try {
        const newTransaction = new Transaction({
            phone,
            amount,
            razorpayOrderId,
            razorpayPaymentId,
            status,
            meta,
            coupon
        });

        const transaction = await newTransaction.save();
        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
exports.updateTransaction = async (req, res) => {
    const { phone, amount, razorpayOrderId, razorpayPaymentId, status, meta, coupon } = req.body;

    const transactionFields = {};
    if (phone) transactionFields.phone = phone;
    if (amount) transactionFields.amount = amount;
    if (razorpayOrderId) transactionFields.razorpayOrderId = razorpayOrderId;
    if (razorpayPaymentId) transactionFields.razorpayPaymentId = razorpayPaymentId;
    if (status) transactionFields.status = status;
    if (meta) transactionFields.meta = meta;
    if (coupon) transactionFields.coupon = coupon;

    try {
        let transaction = await Transaction.findById(req.params.id);

        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

        transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { $set: transactionFields },
            { new: true }
        );

        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }

        await transaction.remove();

        res.json({ msg: 'Transaction removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Transaction not found' });
        }
        res.status(500).send('Server Error');
    }
};