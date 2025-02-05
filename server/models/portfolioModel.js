const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  symbol: String,
  shares: Number,
  price: Number,
});

const portfolioSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    riskTolerance: { type: String, default: 'Moderate' },
    // total value can be computed or stored, up to you
    value: { type: Number, default: 0 },
    assets: [assetSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
