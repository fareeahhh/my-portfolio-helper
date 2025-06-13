const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Basic Info
    title: { type: String, required: true },
    mediaType: {
      type: String,
      enum: ["article", "interview", "podcast", "video"],
      default: "article",
    },

    // Source
    outlet: { type: String },
    publishDate: { type: Date },
    journalist: { type: String },
    url: { type: String },

    // Content
    description: { type: String },
    topics: [{ type: String }],
    quotes: [{ type: String }],

    // Media Files
    image: { url: String },
    video: { url: String },
    audio: { url: String },

    // Reach
    viewCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    impactScore: { type: Number, default: 0 },

    // Other
    language: { type: String },
    duration: { type: String },

    // Visibility
    isPublic: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", MediaSchema);
