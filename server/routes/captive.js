const express = require('express');
const router = express.Router();
const oc = require('../controllers/oc200Controller');

router.post('/login', oc.login);

module.exports = router;