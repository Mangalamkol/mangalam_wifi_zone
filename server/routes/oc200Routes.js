const router = require("express").Router();
const ctrl = require("../controllers/oc200Controller");

router.post("/login", ctrl.login);

module.exports = router;