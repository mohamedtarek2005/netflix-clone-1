const watchlistService = require('../service/watchlistService');
const { success } = require('../utils/apiResponse');

async function getWatchlist(req, res, next) {
  try {
    const items = await watchlistService.getWatchlist(req.userId);
    return success(res, { items });
  } catch (err) {
    next(err);
  }
}

async function addToWatchlist(req, res, next) {
  try {
    const { movieId, showId } = req.body;
    const item = await watchlistService.addToWatchlist(req.userId, { movieId, showId });
    return success(res, { item }, 201);
  } catch (err) {
    next(err);
  }
}

async function removeFromWatchlist(req, res, next) {
  try {
    await watchlistService.removeFromWatchlist(req.userId, req.params.id);
    return success(res, { message: 'Removed from watchlist' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };
