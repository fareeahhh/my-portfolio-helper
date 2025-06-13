const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

// Secret for JWT (use environment variable in production)s
const JWT_SECRET = process.env.JWT_SECRET;

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Registration failed", details: err.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & return JWT
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    const { password: pwd, ...userData } = user.toObject();
    res.status(200).json({ token, user: userData });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

// @route   POST /api/auth/logout
// @desc    Placeholder for logout (handled client-side by deleting token)
// @access  Public
router.post("/logout", (req, res) => {
  res
    .status(200)
    .json({ message: "User logged out (token removed on client)" });
});

module.exports = router;
