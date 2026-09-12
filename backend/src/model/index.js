const { sequelize } = require('../database/database');

const User = require('./User');
const Movie = require('./Movie');
const Show = require('./Show');
const Episode = require('./Episode');
const Category = require('./Category');
const WatchList = require('./WatchList');
const Subscription = require('./Subscription');
const Payment = require('./Payment');

// ======================================================
// SHOW → EPISODE
// One Show has many Episodes
// ======================================================

Show.hasMany(Episode, {
  foreignKey: 'showId',
  onDelete: 'CASCADE',
});

Episode.belongsTo(Show, {
  foreignKey: 'showId',
});

// ======================================================
// MOVIE ↔ CATEGORY
// Many-to-many
// ======================================================

Movie.belongsToMany(Category, {
  through: 'movie_categories',
  foreignKey: 'movieId',
});

Category.belongsToMany(Movie, {
  through: 'movie_categories',
  foreignKey: 'categoryId',
});

// ======================================================
// SHOW ↔ CATEGORY
// Many-to-many
// ======================================================

Show.belongsToMany(Category, {
  through: 'show_categories',
  foreignKey: 'showId',
});

Category.belongsToMany(Show, {
  through: 'show_categories',
  foreignKey: 'categoryId',
});

// ======================================================
// USER → WATCHLIST
// One User has many WatchList items
// ======================================================

User.hasMany(WatchList, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

WatchList.belongsTo(User, {
  foreignKey: 'userId',
});

// WatchList → Movie
WatchList.belongsTo(Movie, {
  foreignKey: 'movieId',
});

// WatchList → Show
WatchList.belongsTo(Show, {
  foreignKey: 'showId',
});

// ======================================================
// USER → SUBSCRIPTION
// One User has many Subscriptions
// ======================================================

User.hasMany(Subscription, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Subscription.belongsTo(User, {
  foreignKey: 'userId',
});

// ======================================================
// SUBSCRIPTION → PAYMENT
// One Subscription has many Payments
// ======================================================

Subscription.hasMany(Payment, {
  foreignKey: 'subscriptionId',
  onDelete: 'CASCADE',
});

Payment.belongsTo(Subscription, {
  foreignKey: 'subscriptionId',
});

// ======================================================
// USER → PAYMENT
// One User has many Payments
// ======================================================

User.hasMany(Payment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Payment.belongsTo(User, {
  foreignKey: 'userId',
});

// ======================================================
// EXPORT MODELS
// ======================================================

module.exports = {
  sequelize,
  User,
  Movie,
  Show,
  Episode,
  Category,
  WatchList,
  Subscription,
  Payment,
};