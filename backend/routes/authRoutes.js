const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { fullName, email, username, password } = req.body;

  console.log('📨 Register payload:', req.body);

  if (!fullName || !email || !username || !password) {
    console.log('❌ Missing fields');
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log('❌ User already exists');
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, username, password: hashedPassword });

    await newUser.save();

    console.log('✅ User registered');
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('💥 Register Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      username: user.username,
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
