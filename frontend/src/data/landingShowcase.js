// Demo-only content for the logged-out landing page. Titles match the tone
// of the seeded catalog (backend/seeders) but are original, and all media
// points at generic placeholder assets — nothing licensed.
const poster = (label, tint) => `https://placehold.co/400x600/141414/${tint}?text=${encodeURIComponent(label)}`;
const DEMO_VIDEO = 'https://cdn-useast1.kapwing.com/static/templates/netflix-template-video-2e57878d.mp4';

export const showcase = [
  { title: 'Crimson Horizon', type: 'Movie', year: 2023, rating: 8.4, genre: 'Sci-Fi', poster: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1540468409i/42435716.jpg' },
  { title: 'The Recursion', type: 'Series', year: 2022, rating: 8.9, genre: 'Drama', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJWI63IzPN0D6Cjbt_VbMqlprXFHihtQcvVIyoJbFR49DmOOI2QJ2icog&s=10' },
  { title: 'Nightshade City', type: 'Movie', year: 2024, rating: 7.9, genre: 'Horror', poster: 'https://m.media-amazon.com/images/I/71eFZE1X1TL._AC_UF1000,1000_QL80_AIweblab1381794,T1_.jpg' },
  { title: 'Harbor Lights', type: 'Series', year: 2021, rating: 8.1, genre: 'Comedy', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn9J6zOS7jXFOcxVSDeJV66OBqignqdtD_9fsrrt87b6zhMh8Cp9VAVuoh&s=10' },
  { title: 'The Long Descent', type: 'Movie', year: 2023, rating: 8.6, genre: 'Action', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqG563c2aewnnzrYhiGrr-hSCZgmu1Hjx6MFzzcg9U6A&s=10' },
  { title: 'the city of ember', type: 'Series', year: 2020, rating: 7.7, genre: 'Action', poster: 'https://m.media-amazon.com/images/I/81UqGnY1s4L._AC_UF894,1000_QL80_.jpg' },
].map((item) => ({ ...item, video: DEMO_VIDEO }));

export const genres = [
  { name: 'Action', tint: '#e50914', blurb: 'Chases, heists and stunts that never cut away.' },
  { name: 'Drama', tint: '#4c6ef5', blurb: 'Character-driven stories built for a slow burn.' },
  { name: 'Sci-Fi', tint: '#339af0', blurb: 'Big ideas, stranger worlds, near futures.' },
  { name: 'Horror', tint: '#845ef7', blurb: 'Slow dread and the occasional jump.' },
  { name: 'Comedy', tint: '#ffa94d', blurb: 'Half-hours that are actually funny.' },
  { name: 'Documentary', tint: '#51cf66', blurb: 'Real stories, told with real craft.' }
];

export const features = [
  {
    eyebrow: 'Watch anywhere',
    title: 'Pick up exactly where you left off',
    body: 'Your progress follows you between phone, laptop and TV, so a paused episode on the train is waiting for you on the couch tonight.',
    image: 'https://placehold.co/1200x900/0d0d0d/e50914?text=Continue+Watching'
  },
  {
    eyebrow: 'Built for binging',
    title: 'Autoplay that respects your evening',
    body: 'Episodes queue themselves, previews play when you hover, and everything is organized by what you actually watch — not a generic front page.',
    image: 'https://placehold.co/1200x900/0d0d0d/339af0?text=Autoplay'
  },
  {
    eyebrow: 'One plan, one price',
    title: 'No surprise charges, cancel in a click',
    body: 'Every plan streams in full HD with no ads. Change plans or cancel from your profile at any time — nothing to call in for.',
    image: 'https://placehold.co/1200x900/0d0d0d/51cf66?text=Simple+Plans'
  }
];

export const stats = [
  { value: '35,000+', label: 'Titles to explore' },
  { value: '4K', label: 'Ultra HD streaming' },
  { value: '190+', label: 'Countries streaming' },
  { value: '0', label: 'Ads, ever' }
];

export const faqs = [
  { q: 'What is NETFLIX+?', a: 'NETFLIX+ is a streaming service delivering movies and series to any screen you own — phone, tablet, laptop or TV — for one monthly price.' },
  { q: 'How much does it cost?', a: 'Plans start low and scale with picture quality and how many screens stream at once. See exact pricing on the plans page after you sign up.' },
  { q: 'Where can I watch?', a: 'Anywhere you can open a browser or our app: at home, on the move, or on a smart TV. Your list and progress sync across every device automatically.' },
  { q: 'Can I cancel anytime?', a: 'Yes. There are no contracts and no cancellation fees — manage or cancel your plan online in two clicks whenever you want.' },
  { q: 'What can I watch?', a: 'A growing catalog of original movies and series across action, drama, comedy, horror, sci-fi and documentary, updated regularly.' }
];
