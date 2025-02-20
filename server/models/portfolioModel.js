// models/Portfolio.js
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  shares: { type: Number, required: true },
  price: { type: Number, required: true },
});

const portfolioSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    investmentAmount: { type: Number, required: true },
    riskTolerance: { type: String, default: 'Moderate' },
    allocationType: { type: String, enum: ['automated', 'manual'], default: 'automated' },
    value: { type: Number, default: 0 },
    assets: [assetSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
