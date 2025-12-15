const express = require('express');
const router = express.Router();
const { getAllPlans, getPlanById, createPlan, updatePlan, deletePlan } = require('../controllers/plansController');

// GET all plans
router.get('/', getAllPlans);

// GET plan by ID
router.get('/:id', getPlanById);

// POST create a new plan
router.post('/', createPlan);

// PUT update a plan
router.put('/:id', updatePlan);

// DELETE a plan
router.delete('/:id', deletePlan);

module.exports = router;