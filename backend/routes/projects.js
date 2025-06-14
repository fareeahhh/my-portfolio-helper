const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticate = require("../middleware/auth");
const Project = require("../models/Project"); // ✅ Correct model
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// ➕ Create Project
router.post("/", authenticate, async (req, res) => {
  try {
    const newProject = new Project({
      ...req.body,
      user: req.user.userId, // Attach user ID from token
    });
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(400).json({ error: err.message || "Failed to create project" });
  }
});

// 📥 Get All Projects for User
router.get("/", authenticate, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// 📝 Update Project
router.put("/:id", authenticate, async (req, res) => {
  try {
    const updated = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res
        .status(404)
        .json({ error: "Project not found or unauthorized" });
    }
    res.json(updated);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(400).json({ error: "Failed to update project" });
  }
});

// 🗑️ Delete Project
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ error: "Project not found or unauthorized" });
    }
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;
