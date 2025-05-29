const express = require("express");
const router = express.Router();

// @desc    Test blog route
// @route   GET /api/blog/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Blog routes working!" });
});

// SPECIFIC ROUTES FIRST (before parameterized routes)

// @desc    Get all blog posts for a user
// @route   GET /api/blog/user/:userId
// @access  Public
router.get("/user/:userId", (req, res) => {
  res.json({ message: "Get user blog posts - Coming soon!" });
});

// @desc    Get published blog posts
// @route   GET /api/blog/published/:userId
// @access  Public
router.get("/published/:userId", (req, res) => {
  res.json({ message: "Get published blog posts - Coming soon!" });
});

// @desc    Get draft blog posts
// @route   GET /api/blog/drafts/:userId
// @access  Private (owner only)
router.get("/drafts/:userId", (req, res) => {
  res.json({ message: "Get draft blog posts - Coming soon!" });
});

// @desc    Get blog posts by category/tag
// @route   GET /api/blog/category/:userId/:category
// @access  Public
router.get("/category/:userId/:category", (req, res) => {
  res.json({ message: "Get blog posts by category - Coming soon!" });
});

// PARAMETERIZED ROUTES LAST

// @desc    Get single blog post
// @route   GET /api/blog/:id
// @access  Public
router.get("/:id", (req, res) => {
  res.json({ message: "Get single blog post - Coming soon!" });
});

// POST, PUT, DELETE routes
// @desc    Create new blog post
// @route   POST /api/blog
// @access  Private
router.post("/", (req, res) => {
  res.json({ message: "Create blog post - Coming soon!" });
});

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private
router.put("/:id", (req, res) => {
  res.json({ message: "Update blog post - Coming soon!" });
});

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete blog post - Coming soon!" });
});

// @desc    Add comment to blog post
// @route   POST /api/blog/:id/comments
// @access  Public
router.post("/:id/comments", (req, res) => {
  res.json({ message: "Add comment - Coming soon!" });
});

// @desc    Like/Unlike blog post
// @route   POST /api/blog/:id/like
// @access  Public
router.post("/:id/like", (req, res) => {
  res.json({ message: "Like/Unlike blog post - Coming soon!" });
});

module.exports = router;
