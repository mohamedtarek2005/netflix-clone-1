require('dotenv').config();
const { Sequelize } = require('sequelize');

// Single Sequelize connection, reused by every model.
// Reused pattern from D&P's 14/orms-special-stuff (sequelize.define style),
// adapted to read connection details from environment variables.
const sequelize = new Sequelize(
  process.env.DB_NAME || 'netflix_clone',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
);

async function connectDatabase() {
  await sequelize.authenticate();
  console.log('Database connection established.');
}

module.exports = { sequelize, connectDatabase };
