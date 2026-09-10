const { Show, Category, Episode } = require('../model');

async function getAllShows({ category } = {}) {
  const include = [{ model: Category, attributes: ['id', 'name'], through: { attributes: [] } }];

  if (category) {
    include[0].where = { name: category };
  }

  return Show.findAll({ include, order: [['releaseYear', 'DESC']] });
}

async function getShowById(id) {
  return Show.findByPk(id, {
    include: [{ model: Category, attributes: ['id', 'name'], through: { attributes: [] } }]
  });
}

async function getEpisodesForShow(showId, { season } = {}) {
  const where = { showId };
  if (season) where.seasonNumber = season;

  return Episode.findAll({ where, order: [['seasonNumber', 'ASC'], ['episodeNumber', 'ASC']] });
}

module.exports = { getAllShows, getShowById, getEpisodesForShow };
