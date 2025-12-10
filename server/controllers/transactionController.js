const Transaction = require('../models/Transaction');

exports.listTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.refundTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        // Placeholder for refund logic
        res.json({ message: `Refund for transaction ${id} processed (placeholder)` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
