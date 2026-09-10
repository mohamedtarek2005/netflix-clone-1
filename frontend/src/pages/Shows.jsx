import { useEffect, useState } from 'react';
import { api } from '../api/client';
import ShowGrid from '../components/ShowGrid';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const CATEGORIES = ['All', 'Drama', 'Comedy', 'Action', 'Sci-Fi'];

export default function Shows() {
  const [shows, setShows] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const query = category === 'All' ? '' : `?category=${encodeURIComponent(category)}`;
    api
      .get(`/shows${query}`)
      .then((data) => setShows(data.shows))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="page container">
      <h1>TV Shows</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              padding: '6px 14px', borderRadius: 20, border: '1px solid #555',
              background: category === c ? 'var(--accent)' : 'transparent', color: '#fff'
            }}
          >
            {c}
          </button>
        ))}
      </div>
      {loading ? <Loading /> : error ? <ErrorMessage message={error} /> : <ShowGrid shows={shows} />}
    </div>
  );
}
