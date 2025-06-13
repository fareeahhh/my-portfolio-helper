const express = require("express");
const router = express.Router();
const Teaching = require("../models/Teaching");

// @desc    Test route
// @route   GET /api/teaching/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "✅ Teaching route working!" });
});

// @desc    Get all teaching entries for a user
// @route   GET /api/teaching/user/:userId
// @access  Public
router.get("/user/:userId", async (req, res) => {
  try {
    const entries = await Teaching.find({ user: req.params.userId }).sort({
      year: -1,
    });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teaching entries" });
  }
});

// @desc    Get single teaching entry
// @route   GET /api/teaching/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const entry = await Teaching.findById(req.params.id);
    if (!entry)
      return res.status(404).json({ error: "Teaching entry not found" });
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teaching entry" });
  }
});

// @desc    Create new teaching entry
// @route   POST /api/teaching
// @access  Private
router.post("/", async (req, res) => {
  try {
    const teaching = new Teaching(req.body);
    const saved = await teaching.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({
        error: "Failed to create teaching entry",
        details: error.message,
      });
  }
});

// @desc    Update teaching entry
// @route   PUT /api/teaching/:id
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const updated = await Teaching.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ error: "Teaching entry not found" });
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(400)
      .json({
        error: "Failed to update teaching entry",
        details: error.message,
      });
  }
});

// @desc    Delete teaching entry
// @route   DELETE /api/teaching/:id
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Teaching.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Teaching entry not found" });
    res.status(200).json({ message: "Teaching entry deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete teaching entry" });
  }
});

module.exports = router;
