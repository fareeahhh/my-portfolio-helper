const express = require("express");
const router = express.Router();

// @desc    Test grants route
// @route   GET /api/grants/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Grants routes working!" });
});

// SPECIFIC ROUTES FIRST

// @desc    Get all grants for a user
// @route   GET /api/grants/user/:userId
// @access  Public
router.get("/user/:userId", (req, res) => {
  res.json({ message: "Get grants - Coming soon!" });
});

// @desc    Get grants by status (active, completed, pending)
// @route   GET /api/grants/status/:userId/:status
// @access  Public
router.get("/status/:userId/:status", (req, res) => {
  res.json({ message: "Get grants by status - Coming soon!" });
});

// @desc    Get grants by funding agency
// @route   GET /api/grants/agency/:userId/:agency
// @access  Public
router.get("/agency/:userId/:agency", (req, res) => {
  res.json({ message: "Get grants by agency - Coming soon!" });
});

// PARAMETERIZED ROUTES LAST

// @desc    Get single grant
// @route   GET /api/grants/:id
// @access  Public
router.get("/:id", (req, res) => {
  res.json({ message: "Get single grant - Coming soon!" });
});

// POST, PUT, DELETE routes
// @desc    Add new grant
// @route   POST /api/grants
// @access  Private
router.post("/", (req, res) => {
  res.json({ message: "Add grant - Coming soon!" });
});

// @desc    Update grant
// @route   PUT /api/grants/:id
// @access  Private
router.put("/:id", (req, res) => {
  res.json({ message: "Update grant - Coming soon!" });
});

// @desc    Delete grant
// @route   DELETE /api/grants/:id
// @access  Private
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete grant - Coming soon!" });
});

// @desc    Add co-investigator to grant
// @route   POST /api/grants/:id/co-investigators
// @access  Private
router.post("/:id/co-investigators", (req, res) => {
  res.json({ message: "Add co-investigator - Coming soon!" });
});

module.exports = router;
