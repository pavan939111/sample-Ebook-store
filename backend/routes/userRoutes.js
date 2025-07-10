const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      fullName: user.fullName,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
