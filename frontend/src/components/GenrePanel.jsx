import { useTilt } from '../hooks/useScrollFX';

export default function GenrePanel({ genre }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(9);
  return (
    <div
      ref={ref}
      className="genre-tile"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ '--genre-tint': genre.tint }}
    >
      <strong>{genre.name}</strong>
      <span>{genre.blurb}</span>
    </div>
  );
}
