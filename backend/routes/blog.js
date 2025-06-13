const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

// ===============================
// @route   GET /api/blog/test
// @desc    Test route
// ===============================
router.get("/test", (req, res) => {
  res.json({ message: "✅ Blog route working!" });
});

// ===============================
// @route   POST /api/blog
// @desc    Create a blog
// ===============================
router.post("/", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const saved = await blog.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to create blog", details: err.message });
  }
});

// ===============================
// @route   GET /api/blog/user/:userId
// @desc    Get all blogs by a user
// ===============================
router.get("/user/:userId", async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// ===============================
// @route   PUT /api/blog/:id
// @desc    Update a blog
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to update blog", details: err.message });
  }
});

// ===============================
// @route   DELETE /api/blog/:id
// @desc    Delete a blog
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = router;
