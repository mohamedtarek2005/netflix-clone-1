const posterFor = (seed) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/400/600`;

const backdropFor = (seed) =>
  `https://picsum.photos/seed/${encodeURIComponent(
    seed
  )}-wide/1280/720`;

const titles = [
  'The Recursion',
  'Harbor Lights',
  'Deadline City',
  'The Cartographers',
  'Static & Bone',
  'Ember Street',
  'The Last Signal',
  'Northgate',
  'Crown of Ash',
  'The Quiet Room',
  'Saltwater',
  'The Long Season',
];

const categories = [
  'Drama',
  'Comedy',
  'Action',
  'Sci-Fi',
];

const shows = titles.map((title, i) => ({
  title,

  description: `${title} follows an ensemble cast across a single unraveling season.`,

  poster: posterFor(`show-${i}-${title}`),

  backdrop: backdropFor(`show-${i}-${title}`),

  rating: Math.round((6 + Math.random() * 3.9) * 10) / 10,

  releaseYear: 2017 + (i % 8),

  category: categories[i % categories.length],
}));

module.exports = shows;