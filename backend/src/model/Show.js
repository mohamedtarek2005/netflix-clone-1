const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const Show = sequelize.define(
  'Show',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    poster: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    backdrop: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'shows',
    timestamps: true,
  }
);

module.exports = Show;