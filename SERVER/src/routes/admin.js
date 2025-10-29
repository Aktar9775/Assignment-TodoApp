import express from "express";
import User from "../models/User.js";
import Todo from "../models/Todo.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeRole } from "../middleware/role.js";
import { body, param } from "express-validator";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();
router.use(authenticate, authorizeRole("admin"));

// GET /api/admin/users
router.get("/users", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// PATCH /api/admin/users/:id/role
router.patch("/users/:id/role",
  param("id").isMongoId(),
  body("role").isIn(["user","admin"]),
  handleValidation,
  async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.role = req.body.role;
    await user.save();
    res.json({ message: "Role updated", user: { id: user._id, role: user.role } });
  }
);

// GET /api/admin/todos
router.get("/todos", async (req, res) => {
  const todos = await Todo.find().populate("user", "username email");
  res.json(todos);
});

export default router;
