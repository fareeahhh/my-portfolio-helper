const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    projectType: {
      type: String,
      enum: ["research", "commercial", "academic"],
      default: "research",
    },
    startDate: { type: Date },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["ongoing", "completed", "paused"],
      default: "ongoing",
    },
    collaborators: [{ type: String }],
    principalInvestigator: { type: String },
    role: { type: String },
    amount: { type: Number },
    currency: { type: String },
    fundingSource: { type: String },
    relatedPublications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Publication" },
    ],
    achievements: [{ type: String }],
    projectUrl: { type: String },
    repositoryUrl: { type: String },
    demoUrl: { type: String },
    keywords: [{ type: String }],
    researchAreas: [{ type: String }],
    images: [{ type: String }],
    documents: [{ type: String }],
    isPublic: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
