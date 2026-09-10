import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import MovieGrid from '../components/MovieGrid';
import ShowGrid from '../components/ShowGrid';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';

  const [results, setResults] = useState({ movies: [], shows: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!q) {
      setResults({ movies: [], shows: [] });
      setLoading(false);
      return;
    }
    setLoading(true);
    api
      .get(`/search?q=${encodeURIComponent(q)}`)
      .then(setResults)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="page container">
      <h1>Results for "{q}"</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : results.movies.length === 0 && results.shows.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No matches found.</p>
      ) : (
        <>
          {results.movies.length > 0 && (
            <>
              <h2>Movies</h2>
              <MovieGrid movies={results.movies} />
            </>
          )}
          {results.shows.length > 0 && (
            <>
              <h2 style={{ marginTop: 32 }}>TV Shows</h2>
              <ShowGrid shows={results.shows} />
            </>
          )}
        </>
      )}
    </div>
  );
}
