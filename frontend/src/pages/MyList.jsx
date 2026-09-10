import { useEffect, useState } from 'react';
import { api } from '../api/client';
import MovieCard from '../components/MovieCard';
import ShowCard from '../components/ShowCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function MyList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/watchlist')
      .then((data) => setItems(data.items))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="page container">
      <h1>My List</h1>
      {error && <ErrorMessage message={error} />}
      {items.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>Nothing saved yet. Add movies or shows from their details page.</p>
      ) : (
        <div className="grid">
          {items.map((entry) =>
            entry.Movie ? (
              <MovieCard key={entry.id} movie={entry.Movie} />
            ) : entry.Show ? (
              <ShowCard key={entry.id} show={entry.Show} />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
