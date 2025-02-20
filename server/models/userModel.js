// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user', // 'admin', 'inactive', etc.
    },
    // Additional fields for profile
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    // Could be something like "Retire by 2030," "Save for a house," etc.
    goals: { type: String, default: '' },
    // Keep riskTolerance here if you want it as part of the user-level profile
    riskTolerance: { type: String, default: 'Moderate' },

    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

// Pre-save hook for hashing password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
