const image = (path, size = 'w500') =>
  `https://image.tmdb.org/t/p/${size}${path}`;

const VIDEO =
  'https://cdn-useast1.kapwing.com/static/templates/netflix-template-video-2e57878d.mp4';

const movies = [
  [
    'Inception',
    '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    8.4,
    2010,
    148,
    ['Sci-Fi', 'Action'],
  ],
  [
    'The Dark Knight',
    '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    '/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
    9,
    2008,
    152,
    ['Action', 'Drama'],
  ],
  [
    'Interstellar',
    '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    8.7,
    2014,
    169,
    ['Sci-Fi', 'Drama'],
  ],
  [
    'Dune',
    '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    '/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg',
    8,
    2021,
    155,
    ['Sci-Fi', 'Drama'],
  ],
  [
    'The Matrix',
    '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    '/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
    8.2,
    1999,
    136,
    ['Sci-Fi', 'Action'],
  ],
  [
    'Oppenheimer',
    '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
    8.1,
    2023,
    181,
    ['Drama'],
  ],
  [
    'Spider-Man: Across the Spider-Verse',
    '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    '/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    8.4,
    2023,
    140,
    ['Action', 'Comedy'],
  ],
  [
    'Mad Max: Fury Road',
    '/hA2ple9q4qnwxp3hKVNhroipsir.jpg',
    '/nlCHUWjY9XWbuEUQauCBgnY8ymF.jpg',
    8.1,
    2015,
    121,
    ['Action', 'Sci-Fi'],
  ],
  [
    'Blade Runner 2049',
    '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
    '/ilRyazdMJwN05exqhwK4tMKBYZs.jpg',
    8,
    2017,
    164,
    ['Sci-Fi', 'Drama'],
  ],
  [
    'The Batman',
    '/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    '/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
    7.7,
    2022,
    176,
    ['Action', 'Drama'],
  ],
  [
    'Top Gun: Maverick',
    '/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
    '/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg',
    8.2,
    2022,
    131,
    ['Action', 'Drama'],
  ],
  [
    'Parasite',
    '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    '/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg',
    8.5,
    2019,
    132,
    ['Drama', 'Comedy'],
  ],
];

module.exports = movies.map(
  (
    [
      title,
      poster,
      backdrop,
      rating,
      releaseYear,
      duration,
      categories,
    ]
  ) => ({
    title,
    description: `Watch ${title}, a critically acclaimed cinematic story.`,
    poster: image(poster),
    backdrop: image(backdrop, 'original'),
    video: VIDEO,
    rating,
    releaseYear,
    duration,
    categories,
  })
);