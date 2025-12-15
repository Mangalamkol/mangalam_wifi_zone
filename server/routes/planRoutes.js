// server/routes/planRoutes.js
const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const { auth, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', planController.listPlans);
router.get('/:id', planController.getPlan);
router.post('/', auth, requireAdmin, planController.createPlan);
router.put('/:id', auth, requireAdmin, planController.updatePlan);
router.delete('/:id', auth, requireAdmin, planController.deletePlan);

module.exports = router;
