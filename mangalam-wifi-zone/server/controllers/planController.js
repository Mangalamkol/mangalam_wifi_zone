const Plan = require("../models/Plan");

const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllPlans };
