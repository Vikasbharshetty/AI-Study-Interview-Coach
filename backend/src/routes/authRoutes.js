import express from "express";
import User from "../models/User.js";
import Activity from "../models/Activity.js";
import { createToken } from "../utils/tokens.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  const user = await User.create({ name, email, password });
  await Activity.create({ user: user._id, action: "REGISTER", details: "New user registered" });

  res.status(201).json({
    token: createToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  await Activity.create({ user: user._id, action: "LOGIN", details: "User logged in" });

  res.json({
    token: createToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

export default router;
