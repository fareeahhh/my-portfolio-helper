const express = require("express");
const router = express.Router();
const Presentation = require("../models/Presentation");

// @desc    Test route
// @route   GET /api/presentations/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "✅ Presentations route working!" });
});

// @desc    Get all presentations for a user
// @route   GET /api/presentations/user/:userId
// @access  Public
router.get("/user/:userId", async (req, res) => {
  try {
    const presentations = await Presentation.find({
      user: req.params.userId,
    }).sort({ date: -1 });
    res.status(200).json(presentations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch presentations" });
  }
});

// @desc    Get single presentation
// @route   GET /api/presentations/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const presentation = await Presentation.findById(req.params.id);
    if (!presentation)
      return res.status(404).json({ error: "Presentation not found" });
    res.status(200).json(presentation);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch presentation" });
  }
});

// @desc    Create new presentation
// @route   POST /api/presentations
// @access  Private
router.post("/", async (req, res) => {
  try {
    const presentation = new Presentation(req.body);
    const saved = await presentation.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to create presentation", details: error.message });
  }
});

// @desc    Update presentation
// @route   PUT /api/presentations/:id
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const updated = await Presentation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated)
      return res.status(404).json({ error: "Presentation not found" });
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to update presentation", details: error.message });
  }
});

// @desc    Delete presentation
// @route   DELETE /api/presentations/:id
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Presentation.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Presentation not found" });
    res.status(200).json({ message: "Presentation deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete presentation" });
  }
});

module.exports = router;
