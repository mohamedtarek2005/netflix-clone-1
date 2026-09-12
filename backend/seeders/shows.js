const image = (path, size = 'w500') =>
  `https://image.tmdb.org/t/p/${size}${path}`;

const shows = [
  [
    'Stranger Things',
    '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    8.6,
    2016,
    ['Sci-Fi', 'Drama'],
  ],
  [
    'Breaking Bad',
    '/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg',
    '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    9.5,
    2008,
    ['Drama'],
  ],
  [
    'Wednesday',
    '/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
    '/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg',
    8.1,
    2022,
    ['Comedy', 'Drama'],
  ],
  [
    'The Last of Us',
    '/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
    '/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
    8.7,
    2023,
    ['Drama', 'Action'],
  ],
  [
    'Money Heist',
    '/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    '/xGexTKCJDkl8hCoZJGrs5pTNkRx.jpg',
    8.2,
    2017,
    ['Action', 'Drama'],
  ],
  [
    'Dark',
    '/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
    '/75HgaphatW0PDI3XIHQWZUpbhn6.jpg',
    8.7,
    2017,
    ['Sci-Fi', 'Drama'],
  ],
  [
    'The Witcher',
    '/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg',
    '/foGkPxpw9h8zln81j63mix5B7m8.jpg',
    8,
    2019,
    ['Action', 'Drama'],
  ],
  [
    'Peaky Blinders',
    '/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg',
    '/wiE9doxiLwq3WCGamDIOb2PqBqc.jpg',
    8.8,
    2013,
    ['Drama'],
  ],
  [
    'The Boys',
    '/stTEycfG9928HYGEISBFaG1ngjM.jpg',
    '/mGVrXeIjyecj6TKmwPVpHlscEmw.jpg',
    8.7,
    2019,
    ['Action', 'Comedy'],
  ],
  [
    'Squid Game',
    '/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
    '/qw3J9cNeLioOLoR68WX7z79aCdK.jpg',
    8,
    2021,
    ['Drama', 'Action'],
  ],
  [
    'House of the Dragon',
    '/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
    '/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg',
    8.4,
    2022,
    ['Drama', 'Action'],
  ],
  [
    'Arcane',
    '/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg',
    '/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg',
    9,
    2021,
    ['Action', 'Sci-Fi'],
  ],
];

module.exports = shows.map(
  ([title, poster, backdrop, rating, releaseYear, categories]) => ({
    title,
    description: `${title} brings a gripping world and memorable characters.`,
    poster: image(poster),
    backdrop: image(backdrop, 'original'),
    rating,
    releaseYear,
    categories,
  })
);