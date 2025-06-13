const mongoose = require("mongoose");

const PublicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true },
    abstract: { type: String },
    authors: [{ type: String }],
    journal: { type: String },
    volume: { type: String },
    issue: { type: String },
    pages: { type: String },
    publisher: { type: String },
    publicationDate: { type: Date },
    doi: { type: String },
    url: { type: String },

    type: {
      type: String,
      enum: ["journal", "conference", "book", "thesis", "report"],
      default: "journal",
    },

    keywords: [{ type: String }],
    citations: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Publication", PublicationSchema);
