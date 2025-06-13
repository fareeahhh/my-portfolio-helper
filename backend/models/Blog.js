const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true },
    content: { type: String, required: true },
    image: {
      url: { type: String },
      publicId: { type: String },
    },

    tags: [{ type: String }],
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
