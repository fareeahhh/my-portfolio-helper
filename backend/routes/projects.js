const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// @desc    Test route
// @route   GET /api/projects/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "✅ Projects route working!" });
});

// @desc    Get all projects for a user
// @route   GET /api/projects/user/:userId
// @access  Public
router.get("/user/:userId", async (req, res) => {
  try {
    const projects = await Project.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to create project", details: error.message });
  }
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Project not found" });
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to update project", details: error.message });
  }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Project not found" });
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;
