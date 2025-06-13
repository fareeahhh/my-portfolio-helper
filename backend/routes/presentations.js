const express = require("express");
const router = express.Router();

// @desc    Test presentations route
// @route   GET /api/presentations/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Presentations routes working!" });
});

// SPECIFIC ROUTES FIRST

// @desc    Get all presentations for a user
// @route   GET /api/presentations/user/:userId
// @access  Public
router.get("/user/:userId", (req, res) => {
  res.json({ message: "Get presentations - Coming soon!" });
});

// @desc    Get presentations by type (keynote, workshop, conference)
// @route   GET /api/presentations/type/:userId/:type
// @access  Public
router.get("/type/:userId/:type", (req, res) => {
  res.json({ message: "Get presentations by type - Coming soon!" });
});

// PARAMETERIZED ROUTES LAST

// @desc    Get single presentation
// @route   GET /api/presentations/:id
// @access  Public
router.get("/:id", (req, res) => {
  res.json({ message: "Get single presentation - Coming soon!" });
});

// POST, PUT, DELETE routes
// @desc    Add new presentation
// @route   POST /api/presentations
// @access  Private
router.post("/", (req, res) => {
  res.json({ message: "Add presentation - Coming soon!" });
});

// @desc    Update presentation
// @route   PUT /api/presentations/:id
// @access  Private
router.put("/:id", (req, res) => {
  res.json({ message: "Update presentation - Coming soon!" });
});

// @desc    Delete presentation
// @route   DELETE /api/presentations/:id
// @access  Private
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete presentation - Coming soon!" });
});

// @desc    Upload presentation materials
// @route   POST /api/presentations/:id/materials
// @access  Private
router.post("/:id/materials", (req, res) => {
  res.json({ message: "Upload presentation materials - Coming soon!" });
});

module.exports = router;
