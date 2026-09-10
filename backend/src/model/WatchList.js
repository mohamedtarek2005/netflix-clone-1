const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

// Exactly one of movieId / showId should be set. Enforced in
// service/watchlistService.js rather than a DB CHECK constraint, to keep
// the model simple (per the "don't over-engineer" rule) — see the
// createWatchListEntry validation.
const WatchList = sequelize.define(
  'WatchList',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    movieId: { type: DataTypes.INTEGER, allowNull: true },
    showId: { type: DataTypes.INTEGER, allowNull: true }
  },
  { tableName: 'watchlists' }
);

module.exports = WatchList;
