const express = require("express");
const router = express.Router();
const Media = require("../models/Media");

// @desc    Test route
// @route   GET /api/media/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "✅ Media route working!" });
});

// @desc    Get all media entries for a user
// @route   GET /api/media/user/:userId
// @access  Public
router.get("/user/:userId", async (req, res) => {
  try {
    const mediaItems = await Media.find({ user: req.params.userId }).sort({
      publishDate: -1,
    });
    res.status(200).json(mediaItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch media entries" });
  }
});

// @desc    Get single media item
// @route   GET /api/media/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const item = await Media.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Media item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch media item" });
  }
});

// @desc    Create new media item
// @route   POST /api/media
// @access  Private
router.post("/", async (req, res) => {
  try {
    const media = new Media(req.body);
    const saved = await media.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to create media item", details: error.message });
  }
});

// @desc    Update media item
// @route   PUT /api/media/:id
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const updated = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ error: "Media item not found" });
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to update media item", details: error.message });
  }
});

// @desc    Delete media item
// @route   DELETE /api/media/:id
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Media.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Media item not found" });
    res.status(200).json({ message: "Media item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete media item" });
  }
});

module.exports = router;
