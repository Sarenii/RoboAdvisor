const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    // Only admin can access, check done in adminOnly middleware
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // You could set a user.isActive = false
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Example of "deactivating"
    user.role = 'inactive'; 
    await user.save();
    res.json({ message: 'User deactivated', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.promoteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.role = 'admin';
    await user.save();
    res.json({ message: 'User promoted to admin', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
