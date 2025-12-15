const router = require("express").Router();

router.use("/plans", require("./planRoutes"));
router.use("/vouchers", require("./voucherRoutes"));
router.use("/transactions", require("./transactions"));
router.use("/oc200", require("./oc200Routes"));
router.use("/activity-log", require("./activityLog"));

module.exports = router;