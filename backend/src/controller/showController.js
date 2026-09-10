const showService = require('../service/showService');
const { success, failure } = require('../utils/apiResponse');

async function getAllShows(req, res, next) {
  try {
    const { category } = req.query;
    const shows = await showService.getAllShows({ category });
    return success(res, { shows });
  } catch (err) {
    next(err);
  }
}

async function getShowById(req, res, next) {
  try {
    const show = await showService.getShowById(req.params.id);
    if (!show) return failure(res, 'Show not found', 404);
    return success(res, { show });
  } catch (err) {
    next(err);
  }
}

async function getEpisodes(req, res, next) {
  try {
    const { season } = req.query;
    const episodes = await showService.getEpisodesForShow(req.params.id, { season });
    return success(res, { episodes });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllShows, getShowById, getEpisodes };
