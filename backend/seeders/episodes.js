const PLACEHOLDER_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

// Called by database/seed.js with the real showId after shows are created.
function buildEpisodesForShow(showId, showTitle, seasons = 2, episodesPerSeason = 6) {
  const episodes = [];
  for (let season = 1; season <= seasons; season++) {
    for (let ep = 1; ep <= episodesPerSeason; ep++) {
      episodes.push({
        showId,
        seasonNumber: season,
        episodeNumber: ep,
        title: `${showTitle} — S${season}E${ep}`,
        description: `Episode ${ep} of season ${season}.`,
        video: PLACEHOLDER_VIDEO,
        duration: 40 + (ep % 3) * 5
      });
    }
  }
  return episodes;
}

module.exports = { buildEpisodesForShow };
