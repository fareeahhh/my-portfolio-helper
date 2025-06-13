const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Import the models
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const publicationRoutes = require("./routes/publications");
const projectRoutes = require("./routes/projects");
const teachingRoutes = require("./routes/teaching");
const presentationRoutes = require("./routes/presentations");
const grantRoutes = require("./routes/grants");
const mediaRoutes = require("./routes/media");
const galleryRoutes = require("./routes/gallery");
const analyticsRoutes = require("./routes/analytics");
const blogRoutes = require("./routes/blog");

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
// app.use("/api/auth", authRoutes);

// ===============================
// USERS ROUTES
// ===============================
app.use("/api/users", userRoutes);

// ===============================
// PUBLICATIONS ROUTES
// ===============================
app.use("/api/publications", publicationRoutes);

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
app.use("/api/presentations", presentationRoutes);

// ===============================
// GRANTS ROUTES
// ===============================
app.use("/api/grants", grantRoutes);

// ===============================
// MEDIA ROUTES
// ===============================
app.use("/api/media", mediaRoutes);

// ===============================
// GALLERY ROUTES
// ===============================
app.use("/api/gallery", galleryRoutes);

// ===============================
// ANALYTICS ROUTES
// ===============================
app.use("/api/analytics", analyticsRoutes);

// ===============================
// BLOG ROUTES
// ===============================
app.use("/api/blog", blogRoutes);

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
  // console.log(`   🔐 Auth:        http://localhost:${PORT}/api/auth/test`);
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
