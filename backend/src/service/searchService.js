const { Op } = require('sequelize');
const { Movie, Show } = require('../model');

async function search(query) {
  const where = { title: { [Op.like]: `%${query}%` } };

  const [movies, shows] = await Promise.all([
    Movie.findAll({ where }),
    Show.findAll({ where })
  ]);

  return { movies, shows };
}

module.exports = { search };
