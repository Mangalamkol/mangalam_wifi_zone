const Transaction = require('../models/Transaction');

exports.listTransactions = async (req, res) => {
  const tx = await Transaction.find().sort({ createdAt: -1 });
  res.json(tx);
};

exports.refundTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    await Transaction.findByIdAndUpdate(id, { status: "refunded" });
    res.json({ message: "Refund processed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};