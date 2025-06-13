const mongoose = require("mongoose");

const PresentationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Basic Info
    title: { type: String, required: true },
    abstract: { type: String },
    presentationType: {
      type: String,
      enum: ["keynote", "conference", "workshop", "seminar", "other"],
      default: "conference",
    },

    // Event Info
    eventName: { type: String },
    eventType: { type: String },
    location: { type: String },
    date: { type: Date },

    // Details
    duration: { type: String },
    audience: { type: String },
    slidesUrl: { type: String },
    videoUrl: { type: String },

    // Recognition
    isInvited: { type: Boolean, default: false },
    isKeynote: { type: Boolean, default: false },
    awards: [{ type: String }],

    // Media
    materials: {
      slides: { url: String },
      video: { url: String },
      poster: { url: String },
    },

    // Audience
    attendeeCount: { type: Number },
    feedbackScore: { type: Number, min: 0, max: 5 },

    // Content
    topics: [{ type: String }],
    keywords: [{ type: String }],

    // Visibility
    isPublic: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Presentation", PresentationSchema);
