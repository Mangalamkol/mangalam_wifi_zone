const express = require('express');
const router = express.Router();
const { loginUser, logoutUser, kickUser, getSessions, getApInfo, getApUserBreakdown, getApLoadGraph } =
  require('../controllers/oc200Controller');
const requireAdmin = require('../middleware/requireAdmin');

router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Admin Panel Tools
router.post('/kick-user', requireAdmin, kickUser);
router.get('/sessions', requireAdmin, getSessions);
router.get('/ap-info', requireAdmin, getApInfo);
router.get('/ap-users', requireAdmin, getApUserBreakdown);
router.get('/ap-load', requireAdmin, getApLoadGraph);

module.exports = router;
