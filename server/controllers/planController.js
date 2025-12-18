import Plan from '../models/Plan.js';

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ active: true }).sort({ price: 1 });
    res.json(plans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a plan
// @route   POST /api/plans
// @access  Admin
export const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
