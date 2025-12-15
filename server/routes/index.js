const express = require('express');
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/admin", require("./adminRoutes"));
router.use("/hotspot", require("./hotspot"));

module.exports = router;