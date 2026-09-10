// Placeholder/demo data only — titles are original, not real licensed
// content, and poster/backdrop/video fields point at generic placeholder
// media so the app has something to render without any copyright concern.
const PLACEHOLDER_POSTER = 'https://placehold.co/300x450?text=Movie';
const PLACEHOLDER_BACKDROP = 'https://placehold.co/1280x720?text=Movie+Backdrop';
const PLACEHOLDER_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

const titles = [
  'Crimson Horizon', 'Silent Circuit', 'The Last Ember', 'Glass Frontier',
  'Midnight Cartographer', 'Echoes of Tomorrow', 'The Paper Kingdom',
  'Static Bloom', 'Iron Season', 'The Long Descent', 'Velvet Static',
  'Northbound', 'The Quiet Machine', 'Salt and Signal', 'Amber Protocol',
  'The Hollow Choir', 'Nightshade City', 'Rift Runner', 'The Painted Sky',
  'Cinder Line', 'Blue Static', 'The Wandering Hour', 'Fractured Light',
  'The Undertow', 'Ashfall'
];

const categories = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Documentary'];

const movies = titles.map((title, i) => ({
  title,
  description: `${title} is a story about ambition, loss, and reinvention.`,
  poster: PLACEHOLDER_POSTER,
  backdrop: PLACEHOLDER_BACKDROP,
  video: PLACEHOLDER_VIDEO,
  rating: Math.round((6 + Math.random() * 3.9) * 10) / 10,
  releaseYear: 2015 + (i % 10),
  duration: 85 + (i % 6) * 10,
  categories: [categories[i % categories.length], categories[(i + 2) % categories.length]]
}));

module.exports = movies;
