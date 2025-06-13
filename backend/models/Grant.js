const mongoose = require("mongoose");

const GrantSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Core Info
    title: { type: String, required: true },
    grantNumber: { type: String },
    fundingAgency: { type: String },
    amount: { type: Number },
    currency: { type: String, default: "USD" },
    status: {
      type: String,
      enum: ["active", "completed", "pending", "rejected"],
      default: "pending",
    },

    // Timeline
    startDate: { type: Date },
    endDate: { type: Date },

    // Role and Collaborators
    principalInvestigator: { type: String },
    coInvestigators: [{ type: String }],
    role: { type: String },

    // Project details
    description: { type: String },
    objectives: [{ type: String }],
    outcomes: [{ type: String }],
    keywords: [{ type: String }],
    researchAreas: [{ type: String }],
    projectUrl: { type: String },

    // Attachments
    documents: [{ url: String }],
    reports: [{ title: String, url: String }],

    // Visibility
    isPublic: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grant", GrantSchema);
