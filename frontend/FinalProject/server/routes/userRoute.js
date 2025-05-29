const express = require('express');
const router = express.Router();
const User = require('../models/User'); // You’ll create a User model!

// Create user
router.post('/add', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.send('User added!');
});

// Get all users
router.get('/all', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
