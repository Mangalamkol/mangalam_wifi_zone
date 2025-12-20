import Plan from "../models/Plan.js";
import AuditLog from "../models/AuditLog.js";

export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlan = async (req, res) => {
  const { id, name, duration, price, maxDevices } = req.body;

  const plan = new Plan({
    id,
    name,
    duration,
    price,
    maxDevices,
  });

  try {
    const newPlan = await plan.save();
    const auditLog = new AuditLog({
      action: "CREATE_PLAN",
      payload: newPlan,
    });
    await auditLog.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
