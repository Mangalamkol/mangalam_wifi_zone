const Plan = require('../models/Plan');

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
exports.getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get plan by ID
// @route   GET /api/plans/:id
// @access  Public
exports.getPlanById = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ msg: 'Plan not found' });
        }

        res.json(plan);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Plan not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Create a plan
// @route   POST /api/plans
// @access  Private/Admin
exports.createPlan = async (req, res) => {
    const { name, price, durationHours, deviceLimit } = req.body;

    try {
        const newPlan = new Plan({
            name,
            price,
            durationHours,
            deviceLimit
        });

        const plan = await newPlan.save();
        res.json(plan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a plan
// @route   PUT /api/plans/:id
// @access  Private/Admin
exports.updatePlan = async (req, res) => {
    const { name, price, durationHours, deviceLimit } = req.body;

    // Build plan object
    const planFields = {};
    if (name) planFields.name = name;
    if (price) planFields.price = price;
    if (durationHours) planFields.durationHours = durationHours;
    if (deviceLimit) planFields.deviceLimit = deviceLimit;

    try {
        let plan = await Plan.findById(req.params.id);

        if (!plan) return res.status(404).json({ msg: 'Plan not found' });

        plan = await Plan.findByIdAndUpdate(
            req.params.id,
            { $set: planFields },
            { new: true }
        );

        res.json(plan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Delete a plan
// @route   DELETE /api/plans/:id
// @access  Private/Admin
exports.deletePlan = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ msg: 'Plan not found' });
        }

        await plan.remove();

        res.json({ msg: 'Plan removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Plan not found' });
        }
        res.status(500).send('Server Error');
    }
};