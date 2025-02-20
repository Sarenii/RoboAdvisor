require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');

// Import route files
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const adminRoutes = require('./routes/adminRoutes');
const marketDataRoutes = require('./routes/marketDataRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const profileRoutes = require('./routes/profileRoutes');
const reportRoutes = require('./routes/reportRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminAnalyticsRoutes = require('./routes/adminAnalyticsRoutes');

// Import maintenance service for updating portfolios
const { updateAllPortfolios } = require('./services/portfolioMaintenanceService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => console.log('MongoDB connected'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));

// Debug: log the types of imported routes to ensure they are functions (Express Router)
console.log('authRoutes type:', typeof authRoutes);
console.log('portfolioRoutes type:', typeof portfolioRoutes);
console.log('adminRoutes type:', typeof adminRoutes);
console.log('marketDataRoutes type:', typeof marketDataRoutes);
console.log('dashboardRoutes type:', typeof dashboardRoutes);
console.log('profileRoutes type:', typeof profileRoutes);
console.log('reportRoutes type:', typeof reportRoutes);
console.log('notificationRoutes type:', typeof notificationRoutes);
console.log('adminAnalyticsRoutes type:', typeof adminAnalyticsRoutes);

// Logging middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Use routes – each should be a middleware function (i.e. an Express Router)
app.use('/api/auth', authRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/market-data', marketDataRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin/analytics', adminAnalyticsRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('RoboAdvisor Backend is running.');
});

// Schedule cron job to update portfolio values every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  console.log('Running portfolio maintenance job...');
  try {
    await updateAllPortfolios();
    console.log('Portfolio maintenance job finished');
  } catch (err) {
    console.error('Portfolio maintenance job error:', err.message);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
