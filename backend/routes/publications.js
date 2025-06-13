const express = require("express");
const router = express.Router();
const Publication = require("../models/Publication");

// ===============================
// @route   GET /api/publications/test
// @desc    Test route
// ===============================
router.get("/test", (req, res) => {
  res.json({ message: "✅ Publications route working!" });
});

// ===============================
// @route   POST /api/publications
// @desc    Create a publication
// ===============================
router.post("/", async (req, res) => {
  try {
    const pub = new Publication(req.body);
    const saved = await pub.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to create publication", details: err.message });
  }
});

// ===============================
// @route   GET /api/publications/user/:userId
// @desc    Get all publications for a user
// ===============================
router.get("/user/:userId", async (req, res) => {
  try {
    const pubs = await Publication.find({ user: req.params.userId }).sort({
      publicationDate: -1,
    });
    res.status(200).json(pubs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch publications" });
  }
});

// ===============================
// @route   PUT /api/publications/:id
// @desc    Update a publication
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated)
      return res.status(404).json({ error: "Publication not found" });
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to update publication", details: err.message });
  }
});

// ===============================
// @route   DELETE /api/publications/:id
// @desc    Delete a publication
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Publication.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Publication not found" });
    res.status(200).json({ message: "Publication deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete publication" });
  }
});

module.exports = router;
