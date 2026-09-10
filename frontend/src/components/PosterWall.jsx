// A slowly drifting wall of poster art behind the hero — the classic
// streaming-service sign-up motif. Pure CSS animation, no video needed.
export default function PosterWall({ items, columns = 6, perColumn = 6 }) {
  const cols = Array.from({ length: columns }, (_, i) =>
    Array.from({ length: perColumn }, (_, j) => items[(i * 3 + j) % items.length])
  );

  return (
    <div className="poster-wall">
      {cols.map((col, i) => (
        <div key={i} className={`poster-wall-col ${i % 2 === 1 ? 'poster-wall-col-reverse' : ''}`}>
          {[...col, ...col].map((item, j) => (
            <div className="poster-wall-tile" key={`${item.title}-${j}`}>
              <img src={item.poster} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
