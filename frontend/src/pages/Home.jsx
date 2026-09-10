import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.get('/movies'), api.get('/shows')])
      .then(([movieData, showData]) => {
        setMovies(movieData.movies);
        setShows(showData.shows);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="page container"><ErrorMessage message={error} /></div>;

  const featured = movies[0];
  const trending = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10);
  const popularShows = [...shows].sort((a, b) => b.rating - a.rating).slice(0, 10);

  return (
    <div>
      <Hero
        item={featured}
        onPlay={() => navigate(`/watch/movie/${featured.id}`)}
        onDetails={() => navigate(`/details/movie/${featured.id}`)}
      />
      <div className="container">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="Popular Movies" movies={movies.slice(0, 10)} />
        {/* Reusing MovieRow's card layout for shows too — same visual shape */}
        <MovieRow title="Popular TV Shows" movies={popularShows} type="show" />
      </div>
    </div>
  );
}
