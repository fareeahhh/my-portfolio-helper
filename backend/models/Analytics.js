const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Targeted resource (optional)
    resourceType: {
      type: String,
      enum: [
        "project",
        "publication",
        "presentation",
        "teaching",
        "grant",
        "media",
        "gallery",
      ],
    },
    resourceId: { type: mongoose.Schema.Types.ObjectId },

    // Metrics
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },

    // Session details
    country: { type: String },
    city: { type: String },
    device: { type: String },
    referrer: { type: String },

    // Timestamps
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analytics", AnalyticsSchema);
