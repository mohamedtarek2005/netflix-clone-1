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

  const [results, setResults] = useState({
    movies: [],
    shows: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const query = q.trim();

    if (!query) {
      setResults({
        movies: [],
        shows: [],
      });

      setLoading(false);
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    api
      .get(`/search?q=${encodeURIComponent(query)}`)
      .then((data) => {
        console.log('SEARCH DATA:', data);

        setResults({
          movies: data?.movies || [],
          shows: data?.shows || [],
        });
      })
      .catch((err) => {
        console.error('SEARCH ERROR:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [q]);

  return (
    <div className="page container">
      <h1>Results for "{q}"</h1>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : results.movies.length === 0 &&
        results.shows.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>
          No matches found.
        </p>
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