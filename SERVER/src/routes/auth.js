import express from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { handleValidation } from "../middleware/validate.js";

dotenv.config();
const router = express.Router();

// Register
router.post("/register",
  body("email").isEmail(),
  body("username").isLength({ min: 3 }),
  body("password").isLength({ min: 8 }),
  handleValidation,
  async (req, res) => {
    try {
      const { email, username, password } = req.body;
      // check duplicates
      if (await User.findOne({ $or: [{ email }, { username }] })) {
        return res.status(400).json({ message: "Email or username already exists" });
      }
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
      const hashed = await bcrypt.hash(password, saltRounds);
      const user = await User.create({ email, username, password: hashed, role: "user" });
      res.status(201).json({ message: "User created", userId: user._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Login
router.post("/login",
  body("login").notEmpty(), // can be email or username
  body("password").notEmpty(),
  handleValidation,
  async (req, res) => {
    try {
      const { login, password } = req.body;
      // find by email or username
      const user = await User.findOne({ $or: [{ email: login }, { username: login }] });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ message: "Invalid credentials" });

      const payload = { id: user._id.toString(), role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

      res.json({ token, user: { id: user._id, email: user.email, username: user.username, role: user.role } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
