import Plan from "../models/plan.model.js";

export const getPlans = async (req, res) => {
  const plans = await Plan.find().lean();
  res.json(plans);
};

/**
 * POST /api/admin/plans
 */
export const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * PUT /api/admin/plans/:id
 */
export const updatePlan = async (req, res) => {
  const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(plan);
};

/**
 * DELETE /api/admin/plans/:id
 */
export const deletePlan = async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
