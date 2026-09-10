const { Movie, Category } = require('../model');

async function getAllMovies({ category } = {}) {
  const include = [{ model: Category, attributes: ['id', 'name'], through: { attributes: [] } }];

  if (category) {
    include[0].where = { name: category };
  }

  return Movie.findAll({ include, order: [['releaseYear', 'DESC']] });
}

async function getMovieById(id) {
  return Movie.findByPk(id, {
    include: [{ model: Category, attributes: ['id', 'name'], through: { attributes: [] } }]
  });
}

module.exports = { getAllMovies, getMovieById };
