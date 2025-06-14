const express = require("express");
const router = express.Router();
const Publication = require("../models/Publication");
const authenticate = require("../middleware/auth"); // Make sure this is used

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
router.post("/", authenticate, async (req, res) => {
  try {
    const newPub = new Publication({
      ...req.body,
      user: req.user.userId, // 🔥 Attach the authenticated user's ID
    });

    await newPub.save();
    res.status(201).json(newPub);
  } catch (err) {
    console.error("Failed to create publication:", err);
    res
      .status(400)
      .json({ error: "Failed to create publication", details: err.message });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const pubs = await Publication.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(pubs);
  } catch (err) {
    console.error("Failed to fetch publications:", err);
    res.status(500).json({ error: "Could not load publications" });
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
