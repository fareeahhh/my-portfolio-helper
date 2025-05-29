const express = require("express");
const router = express.Router();

// @desc    Test projects route
// @route   GET /api/projects/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Projects routes working!" });
});

// @desc    Get all projects for a user
// @route   GET /api/projects/user/:userId
// @access  Public
router.get("/user/:userId", (req, res) => {
  res.json({ message: "Get user projects - Coming soon!" });
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
router.get("/:id", (req, res) => {
  res.json({ message: "Get single project - Coming soon!" });
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
router.post("/", (req, res) => {
  res.json({ message: "Create project - Coming soon!" });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
router.put("/:id", (req, res) => {
  res.json({ message: "Update project - Coming soon!" });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete project - Coming soon!" });
});

// @desc    Add collaborator to project
// @route   POST /api/projects/:id/collaborators
// @access  Private
router.post("/:id/collaborators", (req, res) => {
  res.json({ message: "Add collaborator - Coming soon!" });
});

// @desc    Remove collaborator from project
// @route   DELETE /api/projects/:id/collaborators/:collaboratorId
// @access  Private
router.delete("/:id/collaborators/:collaboratorId", (req, res) => {
  res.json({ message: "Remove collaborator - Coming soon!" });
});

module.exports = router;
