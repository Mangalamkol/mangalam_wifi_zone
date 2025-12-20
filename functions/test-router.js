const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    status: "OK",
    message: "API working"
  });
});

module.exports = router;
