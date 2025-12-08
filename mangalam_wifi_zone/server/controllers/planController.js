const Plan = require('../models/Plan');

exports.listPlans = async (req, res) => {
  const plans = await Plan.find().sort({ price: 1 });
  res.json(plans);
};

exports.getPlan = async (req, res) => {
  const plan = await Plan.findById(req.params.id);
  res.json(plan);
};

exports.createPlan = async (req, res) => {
  const plan = await Plan.create(req.body);
  res.json(plan);
};

exports.updatePlan = async (req, res) => {
  const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(plan);
};

exports.deletePlan = async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};