const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Image File Info
    url: { type: String, required: true },
    publicId: { type: String }, // For Cloudinary or similar
    fileName: { type: String },
    fileSize: { type: Number },

    // Details
    title: { type: String },
    description: { type: String },
    captureDate: { type: Date },

    // Categorization
    category: {
      type: String,
      enum: ["lab", "conference", "teaching", "awards", "other"],
      default: "lab",
    },

    // Event Info
    eventName: { type: String },
    location: { type: String },
    date: { type: Date },

    // People
    taggedPeople: [{ type: String }],
    collaborators: [{ type: String }],

    // Technical
    dimensions: { type: String }, // e.g. "1920x1080"
    format: { type: String }, // e.g. "jpg", "png"
    uploadDate: { type: Date, default: Date.now },

    // Visibility
    isPublic: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    albumId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", GallerySchema);
