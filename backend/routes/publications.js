const express = require("express");
const router = express.Router();

// @desc    Test publications route
// @route   GET /api/publications/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Publications routes working!" });
});

// @desc    Get all publications for a user
// @route   GET /api/publications/user/:userId
// @access  Public
router.get("/user/:userId", (req, res) => {
  res.json({ message: "Get user publications - Coming soon!" });
});

// @desc    Get single publication
// @route   GET /api/publications/:id
// @access  Public
router.get("/:id", (req, res) => {
  res.json({ message: "Get single publication - Coming soon!" });
});

// @desc    Create new publication
// @route   POST /api/publications
// @access  Private
router.post("/", (req, res) => {
  res.json({ message: "Create publication - Coming soon!" });
});

// @desc    Update publication
// @route   PUT /api/publications/:id
// @access  Private
router.put("/:id", (req, res) => {
  res.json({ message: "Update publication - Coming soon!" });
});

// @desc    Delete publication
// @route   DELETE /api/publications/:id
// @access  Private
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete publication - Coming soon!" });
});

module.exports = router;
