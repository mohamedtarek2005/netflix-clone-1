const { sequelize } = require('../database/database');
const User = require('./User');
const Movie = require('./Movie');
const Show = require('./Show');
const Episode = require('./Episode');
const Category = require('./Category');
const WatchList = require('./WatchList');
const Subscription = require('./Subscription');
const Payment = require('./Payment');

// ------------------------------------------------------------------
// Associations — all defined in one place so relationships are easy
// to trace, instead of scattered across individual model files.
// ------------------------------------------------------------------

// Show → Episode (one-to-many)
Show.hasMany(Episode, { foreignKey: 'showId', onDelete: 'CASCADE' });
Episode.belongsTo(Show, { foreignKey: 'showId' });

// Movie / Show ↔ Category (many-to-many, through join tables)
Movie.belongsToMany(Category, { through: 'movie_categories', foreignKey: 'movieId' });
Category.belongsToMany(Movie, { through: 'movie_categories', foreignKey: 'categoryId' });

Show.belongsToMany(Category, { through: 'show_categories', foreignKey: 'showId' });
Category.belongsToMany(Show, { through: 'show_categories', foreignKey: 'categoryId' });

// User → WatchList (one-to-many); WatchList → Movie/Show (optional each)
User.hasMany(WatchList, { foreignKey: 'userId', onDelete: 'CASCADE' });
WatchList.belongsTo(User, { foreignKey: 'userId' });
WatchList.belongsTo(Movie, { foreignKey: 'movieId' });
WatchList.belongsTo(Show, { foreignKey: 'showId' });

// User → Subscription → Payment
User.hasMany(Subscription, { foreignKey: 'userId', onDelete: 'CASCADE' });
Subscription.belongsTo(User, { foreignKey: 'userId' });

Subscription.hasMany(Payment, { foreignKey: 'subscriptionId', onDelete: 'CASCADE' });
Payment.belongsTo(Subscription, { foreignKey: 'subscriptionId' });

User.hasMany(Payment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Payment.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Movie,
  Show,
  Episode,
  Category,
  WatchList,
  Subscription,
  Payment
};
