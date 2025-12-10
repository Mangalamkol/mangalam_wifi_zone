const express = require('express');
const router = express.Router();
const { listPlans, createPlan, updatePlan, deletePlan } = require('../controllers/planController');
const requireAdmin = require('../middleware/requireAdmin');

router.get('/', listPlans);
router.post('/', requireAdmin, createPlan);
router.put('/:id', requireAdmin, updatePlan);
router.delete('/:id', requireAdmin, deletePlan);

module.exports = router;