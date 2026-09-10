import { Link } from 'react-router-dom';

export default function EpisodeList({ showId, episodes }) {
  const seasons = [...new Set(episodes.map((e) => e.seasonNumber))].sort((a, b) => a - b);

  return (
    <div>
      {seasons.map((season) => (
        <div key={season} style={{ marginBottom: 24 }}>
          <h3>Season {season}</h3>
          {episodes
            .filter((e) => e.seasonNumber === season)
            .map((ep) => (
              <Link
                key={ep.id}
                to={`/watch/show/${showId}/${ep.id}`}
                style={{
                  display: 'flex', justifyContent: 'space-between', padding: '12px 0',
                  borderBottom: '1px solid #333'
                }}
              >
                <span>Ep {ep.episodeNumber} — {ep.title}</span>
                <span style={{ color: 'var(--text-muted)' }}>{ep.duration} min</span>
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
}
