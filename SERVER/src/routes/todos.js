import express from "express";
import { body, param } from "express-validator";
import Todo from "../models/Todo.js";
import { authenticate } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

// All routes protected
router.use(authenticate);

// GET /api/todos
router.get("/", async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const todos = await Todo.find().populate("user", "username email");
      return res.json(todos);
    }
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/todos
router.post("/",
  body("title").isLength({ min: 1, max: 100 }),
  body("description").optional().isLength({ max: 500 }),
  body("category").isIn(["Urgent","Non-Urgent"]),
  handleValidation,
  async (req, res) => {
    try {
      const { title, description, dueDate, category } = req.body;
      const todo = await Todo.create({
        title, description, dueDate: dueDate || null, category, user: req.user.id
      });
      res.status(201).json(todo);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/todos/:id
router.put("/:id",
  param("id").isMongoId(),
  body("title").optional().isLength({ max: 100 }),
  body("description").optional().isLength({ max: 500 }),
  handleValidation,
  async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) return res.status(404).json({ message: "Todo not found" });

      // authorization: user can modify own todos; admin can modify any
      if (req.user.role !== "admin" && todo.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      Object.assign(todo, req.body);
      await todo.save();
      res.json(todo);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// DELETE /api/todos/:id
router.delete("/:id", param("id").isMongoId(), handleValidation, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (req.user.role !== "admin" && todo.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await todo.remove();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
