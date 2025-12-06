const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

router.get('/', planController.getVisiblePlans);
router.get('/all', planController.getAllPlans);
router.post('/', planController.createOrUpdatePlan);

module.exports = router;
