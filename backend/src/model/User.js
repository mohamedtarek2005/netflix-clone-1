const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

// Adapted from D&P 14/orms-special-stuff/models/users.js (sequelize.define
// style), extended with the fields our app actually needs. Password is
// always stored hashed — see utils/password.js.
const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false }
  },
  { tableName: 'users' }
);

module.exports = User;
