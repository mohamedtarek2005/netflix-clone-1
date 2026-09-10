import { useEffect, useState } from 'react';
import { api } from '../api/client';
import MovieGrid from '../components/MovieGrid';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const CATEGORIES = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Documentary'];

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const query = category === 'All' ? '' : `?category=${encodeURIComponent(category)}`;
    api
      .get(`/movies${query}`)
      .then((data) => setMovies(data.movies))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="page container">
      <h1>Movies</h1>
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
      {loading ? <Loading /> : error ? <ErrorMessage message={error} /> : <MovieGrid movies={movies} />}
    </div>
  );
}
