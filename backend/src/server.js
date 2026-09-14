require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { sequelize, connectDatabase } = require('./database/database');
require('./model');

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

// -----------------------------------------------------
// CORS
// -----------------------------------------------------

const allowedOrigins = [
  'http://localhost:5173',
  'https://netflix-clone-1-lac.vercel.app',
  process.env.CLIENT_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests like Postman / server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('Blocked by CORS:', origin);
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },

    credentials: true,

    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
  })
);

// -----------------------------------------------------
// Middleware
// -----------------------------------------------------

app.use(express.json());
app.use(cookieParser());

// -----------------------------------------------------
// Routes
// -----------------------------------------------------

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);

// -----------------------------------------------------
// 404
// -----------------------------------------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// -----------------------------------------------------
// Error handler
// -----------------------------------------------------

app.use(errorHandler);

// -----------------------------------------------------
// Start server
// -----------------------------------------------------

async function startServer() {
  try {
    await connectDatabase();

    await sequelize.sync();

    console.log('Database connected successfully');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;