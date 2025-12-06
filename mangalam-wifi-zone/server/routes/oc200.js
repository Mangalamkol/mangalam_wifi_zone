const express = require('express');
const router = express.Router();
const oc200Controller = require('../controllers/oc200Controller');

router.post('/vouchers', oc200Controller.createVoucher);
router.post('/login', oc200Controller.customerLogin);
router.get("/sessions", oc200Controller.getSessions);

module.exports = router;
