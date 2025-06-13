const mongoose = require("mongoose");

const PublicationSchema = new mongoose.Schema(
  {
    // Reference to the user who owns this publication
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    // Basic Publication Information
    title: {
      type: String,
      required: [true, "Publication title is required"],
      trim: true,
      maxlength: [500, "Title cannot exceed 500 characters"],
    },

    // Authors (can include the user and co-authors)
    authors: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        isMainAuthor: {
          type: Boolean,
          default: false,
        },
        affiliation: {
          type: String,
          trim: true,
        },
        email: {
          type: String,
          trim: true,
          lowercase: true,
        },
      },
    ],

    // Publication Details
    abstract: {
      type: String,
      trim: true,
      maxlength: [5000, "Abstract cannot exceed 5000 characters"],
    },

    publicationType: {
      type: String,
      required: [true, "Publication type is required"],
      enum: [
        "journal-article",
        "conference-paper",
        "book",
        "book-chapter",
        "thesis",
        "preprint",
        "technical-report",
        "patent",
        "poster",
        "working-paper",
        "editorial",
        "review",
        "other",
      ],
    },

    // Journal/Conference Information
    venue: {
      name: {
        type: String,
        trim: true,
        maxlength: [300, "Venue name cannot exceed 300 characters"],
      },
      type: {
        type: String,
        enum: [
          "journal",
          "conference",
          "workshop",
          "symposium",
          "book",
          "other",
        ],
        default: "journal",
      },
      issn: {
        type: String,
        trim: true,
      },
      isbn: {
        type: String,
        trim: true,
      },
    },

    // Publication Date Information
    publicationDate: {
      year: {
        type: Number,
        required: [true, "Publication year is required"],
        min: 1900,
        max: new Date().getFullYear() + 5,
      },
      month: {
        type: Number,
        min: 1,
        max: 12,
      },
      day: {
        type: Number,
        min: 1,
        max: 31,
      },
    },

    // Volume, Issue, Page Information
    volumeInfo: {
      volume: {
        type: String,
        trim: true,
      },
      issue: {
        type: String,
        trim: true,
      },
      pages: {
        start: {
          type: String,
          trim: true,
        },
        end: {
          type: String,
          trim: true,
        },
      },
      articleNumber: {
        type: String,
        trim: true,
      },
    },

    // Digital Object Identifier and Links
    doi: {
      type: String,
      trim: true,
      match: [/^10\.\d+\/.+/, "Please provide a valid DOI"],
    },

    urls: {
      publication: {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, "Please provide a valid URL"],
      },
      pdf: {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, "Please provide a valid URL"],
      },
      arxiv: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/arxiv\.org\/.+/,
          "Please provide a valid arXiv URL",
        ],
      },
      googleScholar: {
        type: String,
        trim: true,
      },
      researchGate: {
        type: String,
        trim: true,
      },
    },

    // File Attachments
    files: [
      {
        fileName: {
          type: String,
          required: true,
        },
        fileType: {
          type: String,
          enum: ["pdf", "doc", "docx", "ppt", "pptx", "other"],
          default: "pdf",
        },
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String, // For Cloudinary
        },
        size: {
          type: Number, // File size in bytes
        },
        uploadDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Keywords and Tags
    keywords: [
      {
        type: String,
        trim: true,
        maxlength: [50, "Keyword cannot exceed 50 characters"],
      },
    ],

    tags: [
      {
        type: String,
        trim: true,
        maxlength: [30, "Tag cannot exceed 30 characters"],
      },
    ],

    // Research Areas/Fields
    researchAreas: [
      {
        type: String,
        trim: true,
        maxlength: [100, "Research area cannot exceed 100 characters"],
      },
    ],

    // Citation Information
    citations: {
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
      hIndex: {
        type: Number,
        default: 0,
        min: 0,
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    },

    // Impact and Metrics
    metrics: {
      downloads: {
        type: Number,
        default: 0,
        min: 0,
      },
      views: {
        type: Number,
        default: 0,
        min: 0,
      },
      impactFactor: {
        type: Number,
        min: 0,
      },
      quartile: {
        type: String,
        enum: ["Q1", "Q2", "Q3", "Q4"],
      },
    },

    // Awards and Recognition
    awards: [
      {
        name: {
          type: String,
          trim: true,
        },
        organization: {
          type: String,
          trim: true,
        },
        year: {
          type: Number,
          min: 1900,
          max: new Date().getFullYear() + 5,
        },
        description: {
          type: String,
          trim: true,
          maxlength: [500, "Award description cannot exceed 500 characters"],
        },
      },
    ],

    // Funding Information
    funding: [
      {
        grantNumber: {
          type: String,
          trim: true,
        },
        agency: {
          type: String,
          trim: true,
        },
        amount: {
          type: Number,
          min: 0,
        },
        currency: {
          type: String,
          default: "USD",
          maxlength: 3,
        },
      },
    ],

    // Publication Status
    status: {
      type: String,
      enum: [
        "published",
        "accepted",
        "under-review",
        "draft",
        "rejected",
        "withdrawn",
      ],
      default: "published",
    },

    // Visibility Settings
    visibility: {
      type: String,
      enum: ["public", "private", "university-only"],
      default: "public",
    },

    // Featured Publication (for highlighting on profile)
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Open Access Information
    openAccess: {
      isOpenAccess: {
        type: Boolean,
        default: false,
      },
      license: {
        type: String,
        enum: [
          "CC-BY",
          "CC-BY-SA",
          "CC-BY-NC",
          "CC-BY-NC-SA",
          "CC-BY-ND",
          "CC-BY-NC-ND",
          "other",
        ],
        default: null,
      },
    },

    // Notes and Additional Information
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },

    // External IDs
    externalIds: {
      pubmedId: {
        type: String,
        trim: true,
      },
      scopusId: {
        type: String,
        trim: true,
      },
      wosId: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for formatted citation
PublicationSchema.virtual("formattedCitation").get(function () {
  const authors = this.authors.map((author) => author.name).join(", ");
  const year = this.publicationDate.year;
  const title = this.title;
  const venue = this.venue.name || "Unknown Venue";

  return `${authors} (${year}). ${title}. ${venue}.`;
});

// Virtual for short title (for display purposes)
PublicationSchema.virtual("shortTitle").get(function () {
  return this.title.length > 100
    ? this.title.substring(0, 100) + "..."
    : this.title;
});

// Virtual for publication age
PublicationSchema.virtual("publicationAge").get(function () {
  const currentYear = new Date().getFullYear();
  return currentYear - this.publicationDate.year;
});

// Indexes for efficient queries
PublicationSchema.index({ user: 1 });
PublicationSchema.index({ "publicationDate.year": -1 });
PublicationSchema.index({ publicationType: 1 });
PublicationSchema.index({ status: 1 });
PublicationSchema.index({ visibility: 1 });
PublicationSchema.index({ isFeatured: 1 });
PublicationSchema.index({ doi: 1 });

// Text index for search functionality
PublicationSchema.index({
  title: "text",
  abstract: "text",
  "authors.name": "text",
  keywords: "text",
  "venue.name": "text",
  researchAreas: "text",
});

// Compound indexes
PublicationSchema.index({ user: 1, "publicationDate.year": -1 });
PublicationSchema.index({ user: 1, visibility: 1 });
PublicationSchema.index({ user: 1, isFeatured: 1 });

// Pre-save middleware to set main author
PublicationSchema.pre("save", async function (next) {
  // If no main author is set, make the first author the main author
  if (
    this.authors.length > 0 &&
    !this.authors.some((author) => author.isMainAuthor)
  ) {
    this.authors[0].isMainAuthor = true;
  }

  // Update metrics last updated time if citations changed
  if (this.isModified("citations.count")) {
    this.citations.lastUpdated = new Date();
  }

  next();
});

// Static method to find public publications
PublicationSchema.statics.findPublicPublications = function (filters = {}) {
  return this.find({
    visibility: "public",
    status: "published",
    ...filters,
  }).populate("user", "name title university profileImage");
};

// Static method to find publications by user
PublicationSchema.statics.findByUser = function (
  userId,
  includePrivate = false
) {
  const query = { user: userId };

  if (!includePrivate) {
    query.visibility = "public";
    query.status = "published";
  }

  return this.find(query).sort({ "publicationDate.year": -1, createdAt: -1 });
};

// Static method to search publications
PublicationSchema.statics.searchPublications = function (
  searchTerm,
  filters = {}
) {
  return this.find({
    $text: { $search: searchTerm },
    visibility: "public",
    status: "published",
    ...filters,
  }).populate("user", "name title university");
};

// Static method to get featured publications
PublicationSchema.statics.getFeaturedPublications = function (limit = 10) {
  return this.find({
    isFeatured: true,
    visibility: "public",
    status: "published",
  })
    .populate("user", "name title university profileImage")
    .sort({ "publicationDate.year": -1 })
    .limit(limit);
};

// Static method to get publication statistics
PublicationSchema.statics.getPublicationStats = function (userId) {
  return this.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalPublications: { $sum: 1 },
        totalCitations: { $sum: "$citations.count" },
        publicationsByType: {
          $push: {
            type: "$publicationType",
            year: "$publicationDate.year",
          },
        },
        publicationsByYear: {
          $push: {
            year: "$publicationDate.year",
            count: 1,
          },
        },
      },
    },
  ]);
};

module.exports = mongoose.model("Publication", PublicationSchema);
