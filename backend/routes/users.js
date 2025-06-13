const express = require("express");
const router = express.Router();

// @desc    Test users route
// @route   GET /api/users/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Users routes working!" });
});

// @desc    Get user profile
// @route   GET /api/users/profile/:userId
// @access  Public
router.get("/profile/:userId", (req, res) => {
  res.json({ message: "Get user profile - Coming soon!" });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put("/profile", (req, res) => {
  res.json({ message: "Update user profile - Coming soon!" });
});

// @desc    Delete user account
// @route   DELETE /api/users/profile
// @access  Private
router.delete("/profile", (req, res) => {
  res.json({ message: "Delete user account - Coming soon!" });
});

// @desc    Get all public profiles
// @route   GET /api/users/public
// @access  Public
router.get("/public", (req, res) => {
  res.json({ message: "Get public profiles - Coming soon!" });
});

module.exports = router;
