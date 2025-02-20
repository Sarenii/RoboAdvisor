const User = require('../models/userModel');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -resetPasswordToken -resetPasswordExpires');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, goals, riskTolerance } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (goals !== undefined) user.goals = goals;
    if (riskTolerance !== undefined) user.riskTolerance = riskTolerance;

    await user.save();
    const updatedUser = await User.findById(req.user._id).select('-password -resetPasswordToken -resetPasswordExpires');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
