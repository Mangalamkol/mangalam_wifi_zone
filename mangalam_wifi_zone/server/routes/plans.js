const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const { requireAdmin } = require('../middleware/authMiddleware'); // optional

// public
router.get('/', planController.listPlans);
router.get('/:id', planController.getPlan);

// admin
router.post('/', requireAdmin, planController.createPlan);
router.put('/:id', requireAdmin, planController.updatePlan);
router.delete('/:id', requireAdmin, planController.deletePlan);

module.exports = router;