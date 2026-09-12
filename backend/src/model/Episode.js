const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const Episode = sequelize.define(
  'Episode',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    showId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    seasonNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    episodeNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    video: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'episodes',
    timestamps: true,
  }
);

module.exports = Episode;
