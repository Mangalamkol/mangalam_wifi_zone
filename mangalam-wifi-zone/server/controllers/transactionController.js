const Transaction = require("../models/Transaction");

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("user", "phone")
      .populate("plan", "name")
      .populate("coupon", "code");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllTransactions };
