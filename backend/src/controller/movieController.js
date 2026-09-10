const movieService = require('../service/movieService');
const { success, failure } = require('../utils/apiResponse');

async function getAllMovies(req, res, next) {
  try {
    const { category } = req.query;
    const movies = await movieService.getAllMovies({ category });
    return success(res, { movies });
  } catch (err) {
    next(err);
  }
}

async function getMovieById(req, res, next) {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) return failure(res, 'Movie not found', 404);
    return success(res, { movie });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllMovies, getMovieById };
