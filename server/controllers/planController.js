// server/controllers/planController.js
const Plan = require('../models/Plan');

exports.listPlans = async (req, res) => {
  const plans = await Plan.find({ visible: true }).sort({ price: 1 });
  res.json(plans);
};

exports.getPlan = async (req, res) => {
  const plan = await Plan.findById(req.params.id);
  if (!plan) return res.status(404).json({ message: 'Not found' });
  res.json(plan);
};

exports.createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePlan = async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
