const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Auth routes working!" });
});

router.post("/register", (req, res) => {
  res.json({ message: "Register route - Coming soon!" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login route - Coming soon!" });
});

router.get("/me", (req, res) => {
  res.json({ message: "Get current user - Coming soon!" });
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logout route - Coming soon!" });
});

module.exports = router;
