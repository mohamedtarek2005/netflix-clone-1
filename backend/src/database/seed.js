require('dotenv').config();
const { sequelize, Movie, Show, Category } = require('../model');
const categoryNames = require('../../seeders/categories');
const movieSeeds = require('../../seeders/movies');
const showSeeds = require('../../seeders/shows');
const { buildEpisodesForShow } = require('../../seeders/episodes');
const { Episode } = require('../model');

async function seed() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true }); // clean slate for a repeatable demo dataset

  console.log('Seeding categories...');
  const categories = {};
  for (const name of categoryNames) {
    categories[name] = await Category.create({ name });
  }

  console.log('Seeding movies...');
  for (const m of movieSeeds) {
    const { categories: catNames, ...movieData } = m;
    const movie = await Movie.create(movieData);
    await movie.addCategories(catNames.map((name) => categories[name]));
  }

  console.log('Seeding shows + episodes...');
  for (const s of showSeeds) {
    const { categories: catNames, ...showData } = s;
    const show = await Show.create(showData);
    await show.addCategories(catNames.map((name) => categories[name]));
    const episodes = buildEpisodesForShow(show.id, show.title);
    await Episode.bulkCreate(episodes);
  }

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
