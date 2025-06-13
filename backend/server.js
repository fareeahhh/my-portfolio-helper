const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Import the models
const User = require("./models/User");
const Publication = require("./models/Publication");
const projectRoutes = require("./routes/projects");
const teachingRoutes = require("./routes/teaching");

const app = express();

// Security Middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Logging
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// MongoDB Connection (optional - will work without it for testing)
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.log("⚠️  MongoDB not connected:", err.message));
} else {
  console.log(
    "⚠️  No MONGODB_URI found in .env file - Running without database"
  );
}

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "🎓 Portfolio Helper API",
    status: "Server is running!",
    version: "1.0.0",
    docs: "Visit /api/health for health check",
    endpoints: {
      health: "GET /api/health",
      auth: "GET /api/auth/test",
      users: "GET /api/users/test",
      publications: "GET /api/publications/test",
      projects: "GET /api/projects/test",
    },
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Portfolio Helper API is running!",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ===============================
// AUTH ROUTES
// ===============================
app.get("/api/auth/test", (req, res) => {
  res.json({
    message: "Auth routes working!",
    endpoint: "/api/auth/test",
    methods: ["GET", "POST"],
  });
});

app.post("/api/auth/register", (req, res) => {
  res.json({
    message: "Register route - Coming soon!",
    endpoint: "/api/auth/register",
    method: "POST",
    expectedFields: ["name", "email", "password", "university"],
  });
});

app.post("/api/auth/login", (req, res) => {
  res.json({
    message: "Login route - Coming soon!",
    endpoint: "/api/auth/login",
    method: "POST",
    expectedFields: ["email", "password"],
  });
});

app.get("/api/auth/me", (req, res) => {
  res.json({
    message: "Get current user - Coming soon!",
    endpoint: "/api/auth/me",
    method: "GET",
    requiresAuth: true,
  });
});

app.post("/api/auth/logout", (req, res) => {
  res.json({
    message: "Logout route - Coming soon!",
    endpoint: "/api/auth/logout",
    method: "POST",
  });
});

// ===============================
// USERS ROUTES
// ===============================
app.get("/api/users/test", (req, res) => {
  res.json({
    message: "Users routes working!",
    endpoint: "/api/users/test",
  });
});

app.get("/api/users/profile/:userId", (req, res) => {
  res.json({
    message: "Get user profile - Coming soon!",
    userId: req.params.userId,
    endpoint: "/api/users/profile/:userId",
  });
});

app.put("/api/users/profile", (req, res) => {
  res.json({
    message: "Update user profile - Coming soon!",
    endpoint: "/api/users/profile",
    method: "PUT",
  });
});

app.delete("/api/users/profile", (req, res) => {
  res.json({
    message: "Delete user account - Coming soon!",
    endpoint: "/api/users/profile",
    method: "DELETE",
  });
});

app.get("/api/users/public", (req, res) => {
  res.json({
    message: "Get public profiles - Coming soon!",
    endpoint: "/api/users/public",
  });
});

// ===============================
// PUBLICATIONS ROUTES
// ===============================
app.get("/api/publications/test", (req, res) => {
  res.json({
    message: "Publications routes working!",
    endpoint: "/api/publications/test",
  });
});

app.get("/api/publications/user/:userId", (req, res) => {
  res.json({
    message: "Get user publications - Coming soon!",
    userId: req.params.userId,
    endpoint: "/api/publications/user/:userId",
  });
});

app.get("/api/publications/:id", (req, res) => {
  res.json({
    message: "Get single publication - Coming soon!",
    publicationId: req.params.id,
    endpoint: "/api/publications/:id",
  });
});

app.post("/api/publications", (req, res) => {
  res.json({
    message: "Create publication - Coming soon!",
    endpoint: "/api/publications",
    method: "POST",
  });
});

app.put("/api/publications/:id", (req, res) => {
  res.json({
    message: "Update publication - Coming soon!",
    publicationId: req.params.id,
    endpoint: "/api/publications/:id",
    method: "PUT",
  });
});

app.delete("/api/publications/:id", (req, res) => {
  res.json({
    message: "Delete publication - Coming soon!",
    publicationId: req.params.id,
    endpoint: "/api/publications/:id",
    method: "DELETE",
  });
});

// ===============================
// PROJECTS ROUTES
// ===============================s
app.use("/api/projects", projectRoutes);

// ===============================
// TEACHING ROUTES
// ===============================
app.use("/api/teaching", teachingRoutes);

// ===============================
// PRESENTATIONS ROUTES
// ===============================
app.get("/api/presentations/test", (req, res) => {
  res.json({
    message: "Presentations routes working!",
    endpoint: "/api/presentations/test",
  });
});

app.get("/api/presentations/user/:userId", (req, res) => {
  res.json({
    message: "Get presentations - Coming soon!",
    userId: req.params.userId,
    endpoint: "/api/presentations/user/:userId",
  });
});

// ===============================
// GRANTS ROUTES
// ===============================
app.get("/api/grants/test", (req, res) => {
  res.json({
    message: "Grants routes working!",
    endpoint: "/api/grants/test",
  });
});

app.get("/api/grants/user/:userId", (req, res) => {
  res.json({
    message: "Get grants - Coming soon!",
    userId: req.params.userId,
    endpoint: "/api/grants/user/:userId",
  });
});

// ===============================
// MEDIA ROUTES
// ===============================
app.get("/api/media/test", (req, res) => {
  res.json({
    message: "Media routes working!",
    endpoint: "/api/media/test",
  });
});

app.get("/api/media/user/:userId", (req, res) => {
  res.json({
    message: "Get media coverage - Coming soon!",
    userId: req.params.userId,
    endpoint: "/api/media/user/:userId",
  });
});

// ===============================
// GALLERY ROUTES
// ===============================
app.get("/api/gallery/test", (req, res) => {
  res.json({
    message: "Gallery routes working!",
    endpoint: "/api/gallery/test",
  });
});

app.get("/api/gallery/user/:userId", (req, res) => {
  res.json({
    message: "Get gallery images - Coming soon!",
    userId: req.params.userId,
    endpoint: "/api/gallery/user/:userId",
  });
});

// ===============================
// ANALYTICS ROUTES
// ===============================
app.get("/api/analytics/test", (req, res) => {
  res.json({
    message: "Analytics routes working!",
    endpoint: "/api/analytics/test",
  });
});

app.post("/api/analytics/track/view", (req, res) => {
  res.json({
    message: "Track portfolio view - Coming soon!",
    endpoint: "/api/analytics/track/view",
    method: "POST",
  });
});

// ===============================
// BLOG ROUTES
// ===============================
app.get("/api/blog/test", (req, res) => {
  res.json({
    message: "Blog routes working!",
    endpoint: "/api/blog/test",
  });
});

app.get("/api/blog/user/:userId", (req, res) => {
  res.json({
    message: "Get user blog posts - Coming soon!",
    userId: req.params.userId,
    endpoint: "/api/blog/user/:userId",
  });
});

// ===============================
// TEST ROUTES - USER MODEL
// ===============================
app.post("/api/test/create-user", async (req, res) => {
  try {
    const testUser = new User({
      name: "Dr. John Smith",
      email: "john.smith@university.edu",
      password: "password123",
      title: "Professor",
      currentPosition: "Professor of Computer Science",
      university: "Tech University",
      department: "Computer Science",
      bio: "Research focused on AI and machine learning.",
      researchInterests: [
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
      ],
    });

    const savedUser = await testUser.save();

    res.json({
      success: true,
      message: "Test user created successfully!",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        title: savedUser.title,
        university: savedUser.university,
        profileCompleteness: savedUser.profileCompleteness,
        createdAt: savedUser.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
});

app.get("/api/test/get-users", async (req, res) => {
  try {
    const users = await User.find({}).select("-password").limit(10);

    res.json({
      success: true,
      count: users.length,
      users: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
});

app.delete("/api/test/clear-users", async (req, res) => {
  try {
    const result = await User.deleteMany({});

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} users`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error clearing users",
      error: error.message,
    });
  }
});

// ===============================
// TEST ROUTES - PUBLICATION MODEL
// ===============================
app.post("/api/test/create-publication", async (req, res) => {
  try {
    // First, get a user to associate the publication with
    const user = await User.findOne({});
    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "No user found. Create a user first using /api/test/create-user",
      });
    }

    const testPublication = new Publication({
      user: user._id,
      title: "Machine Learning Applications in Academic Portfolio Management",
      authors: [
        {
          name: user.name,
          isMainAuthor: true,
          affiliation: user.university,
          email: user.email,
        },
        {
          name: "Dr. Jane Doe",
          isMainAuthor: false,
          affiliation: "Research University",
        },
      ],
      abstract:
        "This paper explores the innovative applications of machine learning techniques in managing and optimizing academic portfolios. We propose a novel framework that leverages artificial intelligence to enhance research visibility and collaboration opportunities.",
      publicationType: "journal-article",
      venue: {
        name: "Journal of Academic Technology",
        type: "journal",
        issn: "1234-5678",
      },
      publicationDate: {
        year: 2024,
        month: 3,
        day: 15,
      },
      volumeInfo: {
        volume: "42",
        issue: "3",
        pages: {
          start: "123",
          end: "145",
        },
      },
      doi: "10.1234/jat.2024.03.123",
      urls: {
        publication: "https://example-journal.com/article/123",
        pdf: "https://example-journal.com/article/123/pdf",
      },
      keywords: [
        "machine learning",
        "academic portfolios",
        "artificial intelligence",
        "research management",
      ],
      researchAreas: ["Computer Science", "Educational Technology"],
      status: "published",
      citations: {
        count: 15,
      },
      metrics: {
        downloads: 250,
        views: 1200,
      },
      isFeatured: true,
    });

    const savedPublication = await testPublication.save();
    const populatedPublication = await Publication.findById(
      savedPublication._id
    ).populate("user", "name title university");

    res.json({
      success: true,
      message: "Test publication created successfully!",
      publication: {
        id: populatedPublication._id,
        title: populatedPublication.title,
        authors: populatedPublication.authors,
        user: populatedPublication.user,
        publicationType: populatedPublication.publicationType,
        venue: populatedPublication.venue,
        year: populatedPublication.publicationDate.year,
        citations: populatedPublication.citations.count,
        formattedCitation: populatedPublication.formattedCitation,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating publication",
      error: error.message,
    });
  }
});

app.get("/api/test/get-publications", async (req, res) => {
  try {
    const publications = await Publication.find({})
      .populate("user", "name title university profileImage")
      .sort({ "publicationDate.year": -1 })
      .limit(10);

    res.json({
      success: true,
      count: publications.length,
      publications: publications,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching publications",
      error: error.message,
    });
  }
});

app.get("/api/test/get-publications/:userId", async (req, res) => {
  try {
    const publications = await Publication.findByUser(req.params.userId);

    res.json({
      success: true,
      count: publications.length,
      publications: publications,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching user publications",
      error: error.message,
    });
  }
});

app.delete("/api/test/clear-publications", async (req, res) => {
  try {
    const result = await Publication.deleteMany({});

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} publications`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error clearing publications",
      error: error.message,
    });
  }
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    requestedRoute: req.originalUrl,
    availableRoutes: [
      "GET /",
      "GET /api/health",
      "GET /api/auth/test",
      "GET /api/users/test",
      "GET /api/publications/test",
      "GET /api/projects/test",
    ],
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error occurred:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio Helper API Server`);
  console.log(`📍 Running on: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
  console.log(`\n📋 Quick Test URLs:`);
  console.log(`   🏠 Root:        http://localhost:${PORT}/`);
  console.log(`   ❤️  Health:      http://localhost:${PORT}/api/health`);
  console.log(`   🔐 Auth:        http://localhost:${PORT}/api/auth/test`);
  console.log(`   👥 Users:       http://localhost:${PORT}/api/users/test`);
  console.log(
    `   📚 Publications: http://localhost:${PORT}/api/publications/test`
  );
  console.log(`   🔬 Projects:    http://localhost:${PORT}/api/projects/test`);
  console.log(`   🎓 Teaching:    http://localhost:${PORT}/api/teaching/test`);
  console.log(
    `   🎤 Presentations: http://localhost:${PORT}/api/presentations/test`
  );
  console.log(`   💰 Grants:      http://localhost:${PORT}/api/grants/test`);
  console.log(`   📺 Media:       http://localhost:${PORT}/api/media/test`);
  console.log(`   🖼️  Gallery:     http://localhost:${PORT}/api/gallery/test`);
  console.log(`   📊 Analytics:   http://localhost:${PORT}/api/analytics/test`);
  console.log(`   📝 Blog:        http://localhost:${PORT}/api/blog/test`);
  console.log(`\n✨ Server is ready for development!`);
});

module.exports = app;
