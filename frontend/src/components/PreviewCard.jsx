import { useRef } from 'react';
import { useTilt } from '../hooks/useScrollFX';

export default function PreviewCard({ item }) {
  const videoRef = useRef(null);
  const { ref, onMouseMove, onMouseLeave } = useTilt(7);

  const play = () => videoRef.current?.play().catch(() => {});
  const stop = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <div
      ref={ref}
      className="preview-card"
      onMouseMove={onMouseMove}
      onMouseEnter={play}
      onMouseLeave={(e) => {
        onMouseLeave(e);
        stop();
      }}
    >
      <div className="preview-card-media">
        <img src={item.poster} alt={item.title} loading="lazy" />
        <video ref={videoRef} className="preview-card-video" src={item.video} muted loop playsInline preload="none" aria-hidden="true" />
        <div className="preview-card-shine" />
      </div>
      <div className="preview-card-info">
        <span className="preview-card-type">{item.type}</span>
        <strong>{item.title}</strong>
        <span className="preview-card-meta">{item.year} · ★ {item.rating} · {item.genre}</span>
      </div>
    </div>
  );
}
