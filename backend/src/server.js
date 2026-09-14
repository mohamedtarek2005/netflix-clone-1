require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { sequelize, connectDatabase } = require('./database/database');
require('./model'); // registers all models + associations

const errorHandler = require('./middleware/errorHandler');

const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const showRoutes = require('./routes/showRoutes');
const searchRoutes = require('./routes/searchRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const userRoutes = require('./routes/userRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

const PORT = process.env.PORT || 4000;

// ------------------------------------------------------------------
// Global middleware
// ------------------------------------------------------------------

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ------------------------------------------------------------------
// Routes
// ------------------------------------------------------------------

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Centralized error handler
app.use(errorHandler);

// ------------------------------------------------------------------
// Database initialization
// ------------------------------------------------------------------

async function initDatabase() {
  try {
    await connectDatabase();
    await sequelize.sync();

    console.log('Database connected');
  } catch (error) {
    console.error('Failed to connect database:', error.message);
  }
}

initDatabase();

// Run a normal server only when starting locally with Node.
// On Vercel, the Express app is exported instead.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;