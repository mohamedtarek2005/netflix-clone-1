const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

// Only ever stores an amount/status/reference — never raw card data.
const Payment = sequelize.define(
  'Payment',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    subscriptionId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'succeeded', 'failed'), defaultValue: 'pending' }
  },
  { tableName: 'payments' }
);

module.exports = Payment;
