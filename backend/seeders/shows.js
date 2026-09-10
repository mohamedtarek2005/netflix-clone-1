const PLACEHOLDER_POSTER = 'https://placehold.co/300x450?text=Show';
const PLACEHOLDER_BACKDROP = 'https://placehold.co/1280x720?text=Show+Backdrop';

const titles = [
  'The Recursion', 'Harbor Lights', 'Deadline City', 'The Cartographers',
  'Static & Bone', 'Ember Street', 'The Last Signal', 'Northgate',
  'Crown of Ash', 'The Quiet Room', 'Saltwater', 'The Long Season'
];

const categories = ['Drama', 'Comedy', 'Action', 'Sci-Fi'];

const shows = titles.map((title, i) => ({
  title,
  description: `${title} follows an ensemble cast across a single unraveling season.`,
  poster: PLACEHOLDER_POSTER,
  backdrop: PLACEHOLDER_BACKDROP,
  rating: Math.round((6 + Math.random() * 3.9) * 10) / 10,
  releaseYear: 2017 + (i % 8),
  categories: [categories[i % categories.length]]
}));

module.exports = shows;
