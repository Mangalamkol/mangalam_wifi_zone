import Plan from '../models/Plan.js';

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
export const getPlans = async (req, res) => {
  res.json([
    {
      id: "1h_10",
      name: "1 Hour Unlimited",
      durationHours: 1,
      price: 10,
      maxDevices: 1
    },
    {
      id: "2h_20",
      name: "2 Hours Unlimited",
      durationHours: 2,
      price: 20,
      maxDevices: 1
    },
    {
      id: "5h_30",
      name: "5 Hours Unlimited",
      durationHours: 5,
      price: 30,
      maxDevices: 1
    },
    {
      id: "24h_50",
      name: "24 Hours Unlimited",
      durationHours: 24,
      price: 50,
      maxDevices: 1
    },
    {
      id: "30d_100",
      name: "30 Days Unlimited",
      durationDays: 30,
      price: 100,
      maxDevices: 1
    },
    {
      id: "30d_300_5d",
      name: "30 Days Unlimited (5 Devices)",
      durationDays: 30,
      price: 300,
      maxDevices: 5
    }
  ]);
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
