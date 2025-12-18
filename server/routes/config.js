import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({
      error: "CONFIG EDIT DISABLED IN LIVE MODE"
    });
  }
  // Add your config update logic here
  res.json({ message: "Config updated successfully" });
});

export default router;