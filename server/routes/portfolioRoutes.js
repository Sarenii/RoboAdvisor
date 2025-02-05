const express = require('express');
const router = express.Router();
const {
  getAllPortfolios,
  createPortfolio,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

// All routes require auth
router.use(protect);

router.get('/', getAllPortfolios);
router.post('/', createPortfolio);

router.get('/:id', getPortfolioById);
router.put('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);

module.exports = router;
