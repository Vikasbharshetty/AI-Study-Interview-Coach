import express from "express";
import User from "../models/User.js";
import Activity from "../models/Activity.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/users", async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json({ users });
});

router.get("/activity", async (req, res) => {
  const activity = await Activity.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(100);

  res.json({ activity });
});

export default router;
