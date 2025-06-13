const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// =========================
// @route   GET /api/users/test
// @desc    Test route
// =========================
router.get("/test", (req, res) => {
  res.json({ message: "✅ Users route working!" });
});

// =========================
// @route   POST /api/users/register
// @desc    Register new user
// =========================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Registration failed", details: err.message });
  }
});

// =========================
// @route   POST /api/users/login
// @desc    Login user and return token
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "2h",
    });
    const { password: pwd, ...userData } = user.toObject();

    res.status(200).json({ token, user: userData });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

// =========================
// @route   POST /api/users/logout
// @desc    Logout placeholder
// =========================
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out (client-side token removed)" });
});

// =========================
// @route   GET /api/users/profile/:userId
// @desc    Get user profile by ID
// =========================
router.get("/profile/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// =========================
// @route   PUT /api/users/profile/:userId
// @desc    Update user profile
// =========================
router.put("/profile/:userId", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updated) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to update profile", details: err.message });
  }
});

// =========================
// @route   DELETE /api/users/profile/:userId
// @desc    Delete user account
// =========================
router.delete("/profile/:userId", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.userId);
    if (!deleted) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// =========================
// @route   GET /api/users/public
// @desc    Get all public profiles
// =========================
router.get("/public", async (req, res) => {
  try {
    const users = await User.find({ isPublic: true }).select(
      "name email university department role profileImage"
    );
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to load public users" });
  }
});

module.exports = router;
