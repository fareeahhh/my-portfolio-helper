const express = require("express");
const router = express.Router();
const Analytics = require("../models/Analytics");

// @desc    Test route
// @route   GET /api/analytics/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "✅ Analytics route working!" });
});

// @desc    Get all analytics entries for a user
// @route   GET /api/analytics/user/:userId
// @access  Public
router.get("/user/:userId", async (req, res) => {
  try {
    const data = await Analytics.find({ user: req.params.userId }).sort({
      timestamp: -1,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

// @desc    Log new analytics event
// @route   POST /api/analytics
// @access  Public
router.post("/", async (req, res) => {
  try {
    const record = new Analytics(req.body);
    const saved = await record.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to record analytics", details: error.message });
  }
});

// @desc    Delete an analytics record
// @route   DELETE /api/analytics/:id
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Analytics.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Analytics record not found" });
    res.status(200).json({ message: "Analytics record deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete analytics" });
  }
});

module.exports = router;
