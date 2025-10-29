import express from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { handleValidation } from "../middleware/validate.js";

dotenv.config();
const router = express.Router();

// ==================== REGISTER ====================
router.post(
  "/register",
  body("email").isEmail(),
  body("username").isLength({ min: 3 }),
  body("password").isLength({ min: 8 }),
  handleValidation,
  async (req, res) => {
    try {
      const { email, username, password } = req.body;

      // Check duplicates
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email or username already exists" });
      }

      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
      const hashed = await bcrypt.hash(password, saltRounds);
      const user = await User.create({
        email,
        username,
        password: hashed,
        role: "user",
      });

      res.status(201).json({ message: "User created", userId: user._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ==================== LOGIN ====================
router.post(
  "/login",
  body("login").notEmpty().withMessage("Email or username is required"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidation,
  async (req, res) => {
    try {
      const { login, password } = req.body;

      // Find user by either email or username
      const user = await User.findOne({
        $or: [{ email: login }, { username: login }],
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const payload = { id: user._id, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      });

      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);


router.get("/auto-admin", async (req, res) => {
  try {
    const adminUser = await User.findOne({ role: "admin" });
    if (!adminUser) {
      return res.status(404).json({ message: "No admin found" });
    }

    // Create a token for this admin
    const token = jwt.sign({ id: adminUser._id, role: adminUser.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Admin found",
      user: {
        _id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
