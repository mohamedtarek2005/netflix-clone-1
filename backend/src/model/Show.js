const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const Show = sequelize.define(
  'Show',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    poster: { type: DataTypes.STRING },
    backdrop: { type: DataTypes.STRING },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    releaseYear: { type: DataTypes.INTEGER }
  },
  { tableName: 'shows' }
);

module.exports = Show;
