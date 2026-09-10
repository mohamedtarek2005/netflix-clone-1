const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const Subscription = sequelize.define(
  'Subscription',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    plan: { type: DataTypes.ENUM('basic', 'premium'), allowNull: false },
    status: { type: DataTypes.ENUM('active', 'inactive', 'canceled'), defaultValue: 'inactive' },
    startDate: { type: DataTypes.DATE },
    endDate: { type: DataTypes.DATE }
  },
  { tableName: 'subscriptions' }
);

module.exports = Subscription;
