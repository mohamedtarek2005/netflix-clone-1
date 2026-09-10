// Simple <video> wrapper — no adaptive streaming, no real CDN. Good enough
// to demonstrate the watch flow end-to-end with placeholder/test sources.
export default function VideoPlayer({ src, title }) {
  if (!src) return <div style={{ padding: 40, color: 'var(--text-muted)' }}>No video source available.</div>;

  return (
    <video
      key={src}
      controls
      autoPlay
      style={{ width: '100%', maxHeight: '80vh', background: '#000' }}
      aria-label={title}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
