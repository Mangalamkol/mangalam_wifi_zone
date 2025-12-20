import Plan from '../models/Plan.js';

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({});
    const formattedPlans = plans.map(plan => {
      const planObject = plan.toObject();
      if (planObject.duration.hours) {
        planObject.durationHours = planObject.duration.hours;
      } else if (planObject.duration.days) {
        planObject.durationDays = planObject.duration.days;
      }
      delete planObject.duration;
      delete planObject._id;
      delete planObject.__v;
      return planObject;
    });
    res.json(formattedPlans);
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
    const { durationHours, durationDays, ...rest } = req.body;
    const duration = {};
    if (durationHours) {
      duration.hours = durationHours;
    } else if (durationDays) {
      duration.days = durationDays;
    }

    const planData = { ...rest, duration };

    const plan = await Plan.create(planData);

    const planObject = plan.toObject();
    if (planObject.duration.hours) {
      planObject.durationHours = planObject.duration.hours;
    } else if (planObject.duration.days) {
      planObject.durationDays = planObject.duration.days;
    }
    delete planObject.duration;
    delete planObject._id;
    delete planObject.__v;

    res.status(201).json(planObject);
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Plan with this ID already exists' });
    }
    res.status(500).send('Server Error');
  }
};
