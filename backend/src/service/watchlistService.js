const { WatchList, Movie, Show } = require('../model');
const { HttpError } = require('./authService');

async function getWatchlist(userId) {
  return WatchList.findAll({
    where: { userId },
    include: [{ model: Movie }, { model: Show }]
  });
}

async function addToWatchlist(userId, { movieId, showId }) {
  // Enforced here rather than a DB CHECK constraint, per the plan's
  // "service-layer validation" decision — exactly one of movieId/showId.
  const hasMovie = Boolean(movieId);
  const hasShow = Boolean(showId);

  if (hasMovie === hasShow) {
    throw new HttpError('Provide exactly one of movieId or showId', 400);
  }

  if (hasMovie) {
    const movie = await Movie.findByPk(movieId);
    if (!movie) throw new HttpError('Movie not found', 404);
  } else {
    const show = await Show.findByPk(showId);
    if (!show) throw new HttpError('Show not found', 404);
  }

  const existing = await WatchList.findOne({ where: { userId, movieId: movieId || null, showId: showId || null } });
  if (existing) return existing;

  return WatchList.create({ userId, movieId: movieId || null, showId: showId || null });
}

async function removeFromWatchlist(userId, entryId) {
  const entry = await WatchList.findOne({ where: { id: entryId, userId } });
  if (!entry) {
    throw new HttpError('Watchlist entry not found', 404);
  }
  await entry.destroy();
}

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };
