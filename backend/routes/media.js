const express = require("express");
const router = express.Router();

// @desc    Test media route
// @route   GET /api/media/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Media routes working!" });
});

// SPECIFIC ROUTES FIRST

// @desc    Get all media coverage for a user
// @route   GET /api/media/user/:userId
// @access  Public
router.get("/user/:userId", (req, res) => {
  res.json({ message: "Get media coverage - Coming soon!" });
});

// @desc    Get media by type (article, interview, podcast, video)
// @route   GET /api/media/type/:userId/:type
// @access  Public
router.get("/type/:userId/:type", (req, res) => {
  res.json({ message: "Get media by type - Coming soon!" });
});

// @desc    Get featured media
// @route   GET /api/media/featured/:userId
// @access  Public
router.get("/featured/:userId", (req, res) => {
  res.json({ message: "Get featured media - Coming soon!" });
});

// PARAMETERIZED ROUTES LAST

// @desc    Get single media item
// @route   GET /api/media/:id
// @access  Public
router.get("/:id", (req, res) => {
  res.json({ message: "Get single media item - Coming soon!" });
});

// POST, PUT, DELETE routes
// @desc    Add new media coverage
// @route   POST /api/media
// @access  Private
router.post("/", (req, res) => {
  res.json({ message: "Add media coverage - Coming soon!" });
});

// @desc    Update media coverage
// @route   PUT /api/media/:id
// @access  Private
router.put("/:id", (req, res) => {
  res.json({ message: "Update media coverage - Coming soon!" });
});

// @desc    Delete media coverage
// @route   DELETE /api/media/:id
// @access  Private
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete media coverage - Coming soon!" });
});

// @desc    Upload media files
// @route   POST /api/media/:id/files
// @access  Private
router.post("/:id/files", (req, res) => {
  res.json({ message: "Upload media files - Coming soon!" });
});

module.exports = router;
