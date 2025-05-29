const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

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
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
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
// ===============================
app.get("/api/projects/test", (req, res) => {
  res.json({
    message: "Projects routes working!",
    endpoint: "/api/projects/test",
  });
});

app.get("/api/projects/user/:userId", (req, res) => {
  res.json({
    message: "Get user projects - Coming soon!",
    userId: req.params.userId,
    endpoint: "/api/projects/user/:userId",
  });
});

app.get("/api/projects/:id", (req, res) => {
  res.json({
    message: "Get single project - Coming soon!",
    projectId: req.params.id,
    endpoint: "/api/projects/:id",
  });
});

app.post("/api/projects", (req, res) => {
  res.json({
    message: "Create project - Coming soon!",
    endpoint: "/api/projects",
    method: "POST",
  });
});

app.put("/api/projects/:id", (req, res) => {
  res.json({
    message: "Update project - Coming soon!",
    projectId: req.params.id,
    endpoint: "/api/projects/:id",
    method: "PUT",
  });
});

app.delete("/api/projects/:id", (req, res) => {
  res.json({
    message: "Delete project - Coming soon!",
    projectId: req.params.id,
    endpoint: "/api/projects/:id",
    method: "DELETE",
  });
});

// ===============================
// TEACHING ROUTES
// ===============================
app.get("/api/teaching/test", (req, res) => {
  res.json({
    message: "Teaching routes working!",
    endpoint: "/api/teaching/test",
  });
});

app.get("/api/teaching/user/:userId", (req, res) => {
  res.json({
    message: "Get teaching experience - Coming soon!",
    userId: req.params.userId,
    endpoint: "/api/teaching/user/:userId",
  });
});

app.post("/api/teaching", (req, res) => {
  res.json({
    message: "Add teaching experience - Coming soon!",
    endpoint: "/api/teaching",
    method: "POST",
  });
});

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
