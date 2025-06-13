const express = require("express");
const router = express.Router();
const Grant = require("../models/Grant");

// @desc    Test route
// @route   GET /api/grants/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "✅ Grants route working!" });
});

// @desc    Get all grants for a user
// @route   GET /api/grants/user/:userId
// @access  Public
router.get("/user/:userId", async (req, res) => {
  try {
    const grants = await Grant.find({ user: req.params.userId }).sort({
      startDate: -1,
    });
    res.status(200).json(grants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch grants" });
  }
});

// @desc    Get single grant
// @route   GET /api/grants/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const grant = await Grant.findById(req.params.id);
    if (!grant) return res.status(404).json({ error: "Grant not found" });
    res.status(200).json(grant);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch grant" });
  }
});

// @desc    Create a new grant
// @route   POST /api/grants
// @access  Private
router.post("/", async (req, res) => {
  try {
    const grant = new Grant(req.body);
    const saved = await grant.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to create grant", details: error.message });
  }
});

// @desc    Update a grant
// @route   PUT /api/grants/:id
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const updated = await Grant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Grant not found" });
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to update grant", details: error.message });
  }
});

// @desc    Delete a grant
// @route   DELETE /api/grants/:id
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Grant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Grant not found" });
    res.status(200).json({ message: "Grant deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete grant" });
  }
});

module.exports = router;
