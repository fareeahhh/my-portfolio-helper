const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // Personal Info
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },

    // Role & Status
    role: {
      type: String,
      enum: ["admin", "student", "faculty", "guest"],
      default: "student",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },

    // Visibility
    isPublic: { type: Boolean, default: true },

    // Education
    university: { type: String },
    department: { type: String },
    degree: { type: String },
    enrollmentYear: { type: Number },
    graduationYear: { type: Number },

    // Social / Contact
    bio: { type: String },
    phone: { type: String },
    location: { type: String },
    website: { type: String },
    social: {
      linkedin: { type: String },
      twitter: { type: String },
      github: { type: String },
      facebook: { type: String },
      instagram: { type: String },
    },

    // Media
    profileImage: {
      url: { type: String },
      publicId: { type: String },
    },
    coverImage: {
      url: { type: String },
      publicId: { type: String },
    },

    // Meta
    viewCount: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// 🔎 Search helper (case-insensitive search)
UserSchema.statics.searchUsers = function (term) {
  const regex = new RegExp(term, "i");
  return this.find({ isPublic: true, name: regex });
};

// 🌐 Public profiles only
UserSchema.statics.findPublicProfiles = function () {
  return this.find({ isPublic: true });
};

module.exports = mongoose.model("User", UserSchema);
