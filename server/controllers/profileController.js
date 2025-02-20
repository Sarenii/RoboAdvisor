// controllers/profileController.js
const User = require('../models/userModel');

// GET /api/profile - fetch the logged-in user's profile
exports.getProfile = async (req, res) => {
  try {
    // req.user is populated by protect middleware
    const user = await User.findById(req.user._id).select('-password -resetPasswordToken -resetPasswordExpires');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/profile - update the logged-in user's profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, goals, riskTolerance } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields only if provided
    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (goals !== undefined) user.goals = goals;
    if (riskTolerance !== undefined) user.riskTolerance = riskTolerance;

    await user.save();

    // Return updated user data (excluding password)
    const updatedUser = await User.findById(req.user._id).select('-password -resetPasswordToken -resetPasswordExpires');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
