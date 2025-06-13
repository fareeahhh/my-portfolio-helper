const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");

// @desc    Test route
// @route   GET /api/gallery/test
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "✅ Gallery route working!" });
});

// @desc    Get all images for a user
// @route   GET /api/gallery/user/:userId
// @access  Public
router.get("/user/:userId", async (req, res) => {
  try {
    const images = await Gallery.find({ user: req.params.userId }).sort({
      uploadDate: -1,
    });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gallery images" });
  }
});

// @desc    Get single image
// @route   GET /api/gallery/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

// @desc    Upload new image
// @route   POST /api/gallery
// @access  Private
router.post("/", async (req, res) => {
  try {
    const image = new Gallery(req.body);
    const saved = await image.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to upload image", details: error.message });
  }
});

// @desc    Update image
// @route   PUT /api/gallery/:id
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const updated = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Image not found" });
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to update image", details: error.message });
  }
});

// @desc    Delete image
// @route   DELETE /api/gallery/:id
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Image not found" });
    res.status(200).json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete image" });
  }
});

module.exports = router;
