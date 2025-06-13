const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't include password in queries by default
    },

    // Academic Profile Information
    title: {
      type: String,
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
      // e.g., "Professor", "PhD Student", "Research Fellow"
    },
    currentPosition: {
      type: String,
      trim: true,
      maxlength: [200, "Current position cannot exceed 200 characters"],
    },
    university: {
      type: String,
      trim: true,
      maxlength: [200, "University name cannot exceed 200 characters"],
    },
    department: {
      type: String,
      trim: true,
      maxlength: [200, "Department name cannot exceed 200 characters"],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [2000, "Bio cannot exceed 2000 characters"],
    },

    // Contact Information
    phone: {
      type: String,
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    website: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/.+/,
        "Please provide a valid website URL starting with http:// or https://",
      ],
    },
    office: {
      type: String,
      trim: true,
      maxlength: [200, "Office location cannot exceed 200 characters"],
    },

    // Academic/Professional Links
    socialLinks: {
      linkedin: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/(www\.)?linkedin\.com\/.+/,
          "Please provide a valid LinkedIn URL",
        ],
      },
      orcid: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/orcid\.org\/.+/,
          "Please provide a valid ORCID URL",
        ],
      },
      researchGate: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/(www\.)?researchgate\.net\/.+/,
          "Please provide a valid ResearchGate URL",
        ],
      },
      googleScholar: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/scholar\.google\.com\/.+/,
          "Please provide a valid Google Scholar URL",
        ],
      },
      twitter: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+/,
          "Please provide a valid Twitter/X URL",
        ],
      },
    },

    // Profile Image
    profileImage: {
      url: {
        type: String,
        default: null,
      },
      publicId: {
        type: String,
        default: null,
      },
    },

    // CV/Resume
    cv: {
      url: {
        type: String,
        default: null,
      },
      publicId: {
        type: String,
        default: null,
      },
      fileName: {
        type: String,
        default: null,
      },
    },

    // Research Interests and Keywords
    researchInterests: [
      {
        type: String,
        trim: true,
        maxlength: [100, "Research interest cannot exceed 100 characters"],
      },
    ],
    keywords: [
      {
        type: String,
        trim: true,
        maxlength: [50, "Keyword cannot exceed 50 characters"],
      },
    ],

    // Education Background
    education: [
      {
        degree: {
          type: String,
          required: true,
          trim: true,
        },
        field: {
          type: String,
          required: true,
          trim: true,
        },
        institution: {
          type: String,
          required: true,
          trim: true,
        },
        year: {
          type: Number,
          min: 1900,
          max: new Date().getFullYear() + 10,
        },
        description: {
          type: String,
          trim: true,
          maxlength: [
            500,
            "Education description cannot exceed 500 characters",
          ],
        },
      },
    ],

    // Privacy Settings
    privacy: {
      profileVisibility: {
        type: String,
        enum: ["public", "private", "university-only"],
        default: "public",
      },
      showEmail: {
        type: Boolean,
        default: false,
      },
      showPhone: {
        type: Boolean,
        default: false,
      },
      sectionsVisibility: {
        publications: {
          type: Boolean,
          default: true,
        },
        projects: {
          type: Boolean,
          default: true,
        },
        teaching: {
          type: Boolean,
          default: true,
        },
        presentations: {
          type: Boolean,
          default: true,
        },
        grants: {
          type: Boolean,
          default: true,
        },
        media: {
          type: Boolean,
          default: true,
        },
        gallery: {
          type: Boolean,
          default: true,
        },
        blog: {
          type: Boolean,
          default: true,
        },
      },
    },

    // Account Status and Verification
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },

    // Reset Password
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // Email Verification
    emailVerificationToken: String,
    emailVerificationExpire: Date,

    // Profile Completion Tracking
    profileCompleteness: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Last Activity
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    lastProfileUpdate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for profile URL slug
UserSchema.virtual("profileSlug").get(function () {
  return this.name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-");
});

// Virtual for full profile completeness calculation
UserSchema.virtual("calculatedCompleteness").get(function () {
  let completeness = 0;
  const fields = [
    "name",
    "email",
    "title",
    "currentPosition",
    "university",
    "department",
    "bio",
    "researchInterests",
  ];

  fields.forEach((field) => {
    if (this[field] && this[field].length > 0) {
      completeness += 12.5; // 100 / 8 fields
    }
  });

  return Math.round(completeness);
});

// Index for search functionality
UserSchema.index({
  name: "text",
  currentPosition: "text",
  university: "text",
  department: "text",
  researchInterests: "text",
  keywords: "text",
});

// Index for efficient queries
UserSchema.index({ email: 1 });
UserSchema.index({ university: 1 });
UserSchema.index({ department: 1 });
UserSchema.index({ "privacy.profileVisibility": 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
UserSchema.pre("save", async function (next) {
  // Only hash password if it's been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to update profile completeness
UserSchema.pre("save", function (next) {
  this.profileCompleteness = this.calculatedCompleteness;
  this.lastProfileUpdate = new Date();
  next();
});

// Instance method to check password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Instance method to generate password reset token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = require("crypto").randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = require("crypto")
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire time (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Instance method to generate email verification token
UserSchema.methods.getEmailVerificationToken = function () {
  // Generate token
  const verificationToken = require("crypto").randomBytes(20).toString("hex");

  // Hash token and set to emailVerificationToken field
  this.emailVerificationToken = require("crypto")
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  // Set expire time (24 hours)
  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;

  return verificationToken;
};

// Static method to find public profiles
UserSchema.statics.findPublicProfiles = function (filters = {}) {
  return this.find({
    "privacy.profileVisibility": "public",
    isActive: true,
    ...filters,
  }).select("-password -resetPasswordToken -emailVerificationToken");
};

// Static method to search users
UserSchema.statics.searchUsers = function (searchTerm, filters = {}) {
  return this.find({
    $text: { $search: searchTerm },
    "privacy.profileVisibility": "public",
    isActive: true,
    ...filters,
  }).select("-password -resetPasswordToken -emailVerificationToken");
};

module.exports = mongoose.model("User", UserSchema);
