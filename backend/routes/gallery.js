const express = require("express");
const router = express.Router();

// @desc    Test gallery route
// @route   GET /api/gallery/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Gallery routes working!" });
});

// SPECIFIC ROUTES FIRST

// @desc    Get all gallery images for a user
// @route   GET /api/gallery/user/:userId
// @access  Public
router.get("/user/:userId", (req, res) => {
  res.json({ message: "Get gallery images - Coming soon!" });
});

// @desc    Get images by category
// @route   GET /api/gallery/category/:userId/:category
// @access  Public
router.get("/category/:userId/:category", (req, res) => {
  res.json({ message: "Get images by category - Coming soon!" });
});

// @desc    Upload multiple images
// @route   POST /api/gallery/batch
// @access  Private
router.post("/batch", (req, res) => {
  res.json({ message: "Upload multiple images - Coming soon!" });
});

// @desc    Get featured images
// @route   GET /api/gallery/featured/:userId
// @access  Public
router.get("/featured/:userId", (req, res) => {
  res.json({ message: "Get featured images - Coming soon!" });
});

// PARAMETERIZED ROUTES LAST

// @desc    Get single gallery image
// @route   GET /api/gallery/:id
// @access  Public
router.get("/:id", (req, res) => {
  res.json({ message: "Get single gallery image - Coming soon!" });
});

// POST, PUT, DELETE routes
// @desc    Upload new image
// @route   POST /api/gallery
// @access  Private
router.post("/", (req, res) => {
  res.json({ message: "Upload image - Coming soon!" });
});

// @desc    Update image details
// @route   PUT /api/gallery/:id
// @access  Private
router.put("/:id", (req, res) => {
  res.json({ message: "Update image details - Coming soon!" });
});

// @desc    Delete image
// @route   DELETE /api/gallery/:id
// @access  Private
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete image - Coming soon!" });
});

module.exports = router;
