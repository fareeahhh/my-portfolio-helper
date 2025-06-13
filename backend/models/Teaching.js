const mongoose = require("mongoose");

const TeachingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Course Info
    courseTitle: { type: String, required: true },
    courseCode: { type: String },
    semester: { type: String },
    year: { type: Number },

    // Details
    level: { type: String, enum: ["undergraduate", "graduate"] },
    credits: { type: Number },
    enrollment: { type: Number },

    // Institution
    university: { type: String },
    department: { type: String },

    // Materials
    syllabus: { url: String },
    slides: [{ url: String }],
    assignments: [{ url: String }],

    // Evaluation
    studentRatings: { type: Number, min: 0, max: 5 },
    feedback: [{ type: String }],

    // Content
    description: { type: String },
    learningObjectives: [{ type: String }],
    topics: [{ type: String }],

    // Files
    materials: [{ type: { type: String }, title: String, url: String }],

    // Visibility
    isPublic: { type: Boolean, default: true },
    showRatings: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teaching", TeachingSchema);
