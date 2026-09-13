import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import VideoPlayer from '../components/VideoPlayer';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Watch() {
  const { id, episodeId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    // If episodeId doesn't exist, the selected item is a movie.
    const load = !episodeId
      ? api.get(`/movies/${id}`).then((data) => {
          setTitle(data.movie.title);
          setVideoSrc(data.movie.video);
        })
      : api.get(`/shows/${id}/episodes`).then((data) => {
          const episode = data.episodes.find(
            (item) => String(item.id) === String(episodeId)
          );

          setTitle(episode ? episode.title : 'Episode');
          setVideoSrc(episode ? episode.video : null);
        });

    load
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, episodeId]);

  if (loading) {
    return <Loading label="Loading video..." />;
  }

  return (
    <div className="watch-page">
      <button
        type="button"
        className="watch-back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <VideoPlayer src={videoSrc} title={title} />
      )}

      <div className="watch-title">
        {title}
      </div>
    </div>
  );
}