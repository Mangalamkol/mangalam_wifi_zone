import fs from "fs";

const fixes = {
  "server/routes/plan.routes.js": `
import express from "express";
import { getPlans } from "../controllers/planController.js";
const router = express.Router();
router.get("/", getPlans);
export default router;
`,

  "server/routes/admin.routes.js": `
import express from "express";
import { login } from "../controllers/authController.js";
import { adminAuth } from "../middleware/adminAuth.js";
const router = express.Router();
router.post("/auth/login", login);
export default router;
`
};

Object.entries(fixes).forEach(([file, content]) => {
  if (!fs.existsSync(file)) {
    fs.mkdirSync(file.split("/").slice(0, -1).join("/"), { recursive: true });
    fs.writeFileSync(file, content.trim());
    console.log("FIXED:", file);
  }
});

console.log("AUTO REPAIR COMPLETED");