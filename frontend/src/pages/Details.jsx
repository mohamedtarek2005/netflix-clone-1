import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EpisodeList from '../components/EpisodeList';
import { useAuth } from '../context/AuthContext';

// One page handles both movies and shows, branching on the :type param —
// per the plan, this avoids two near-duplicate pages.
export default function Details() {
  const { type, id } = useParams(); // type: 'movie' | 'show'
  const { user } = useAuth();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [watchlistEntryId, setWatchlistEntryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    const itemPromise = type === 'movie' ? api.get(`/movies/${id}`) : api.get(`/shows/${id}`);
    const episodesPromise = type === 'show' ? api.get(`/shows/${id}/episodes`) : Promise.resolve(null);
    const watchlistPromise = user ? api.get('/watchlist') : Promise.resolve({ items: [] });

    Promise.all([itemPromise, episodesPromise, watchlistPromise])
      .then(([itemData, episodeData, watchlistData]) => {
        setItem(type === 'movie' ? itemData.movie : itemData.show);
        if (episodeData) setEpisodes(episodeData.episodes);

        const match = watchlistData.items.find((w) =>
          type === 'movie' ? w.movieId === Number(id) : w.showId === Number(id)
        );
        setInWatchlist(Boolean(match));
        setWatchlistEntryId(match ? match.id : null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [type, id, user]);

  async function toggleWatchlist() {
    if (!user) return navigate('/login');

    if (inWatchlist) {
      await api.delete(`/watchlist/${watchlistEntryId}`);
      setInWatchlist(false);
      setWatchlistEntryId(null);
    } else {
      const body = type === 'movie' ? { movieId: Number(id) } : { showId: Number(id) };
      const data = await api.post('/watchlist', body);
      setInWatchlist(true);
      setWatchlistEntryId(data.item.id);
    }
  }

  if (loading) return <Loading />;
  if (error) return <div className="page container"><ErrorMessage message={error} /></div>;
  if (!item) return <div className="page container">Not found.</div>;

  return (
    <div>
      <div style={{ height: '45vh', backgroundImage: `url(${item.backdrop})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="container" style={{ marginTop: -60, position: 'relative' }}>
        <h1>{item.title}</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {item.releaseYear} · ★ {item.rating} {item.duration ? `· ${item.duration} min` : ''}
        </p>
        <p style={{ maxWidth: 640 }}>{item.description}</p>
        <div style={{ display: 'flex', gap: 12, margin: '20px 0' }}>
          {type === 'movie' && (
            <Button onClick={() => navigate(`/watch/movie/${id}`)}>▶ Play</Button>
          )}
          <Button variant="secondary" onClick={toggleWatchlist}>
            {inWatchlist ? '✓ In My List' : '+ Add to My List'}
          </Button>
        </div>

        {type === 'show' && episodes.length > 0 && (
          <>
            <h2>Episodes</h2>
            <EpisodeList showId={id} episodes={episodes} />
          </>
        )}
      </div>
    </div>
  );
}
