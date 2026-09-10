export default function Hero({ item, onPlay, onDetails }) {
  if (!item) return null;
  return <section className="home-hero" style={{ backgroundImage: `url(${item.backdrop})` }}>
    <div className="home-hero-overlay" /><div className="home-hero-content"><span className="eyebrow">FEATURED TONIGHT</span><h1>{item.title}</h1><div className="hero-meta"><span>★ {item.rating}</span><span>{item.releaseYear}</span><span>HD</span></div><p>{item.description}</p><div className="hero-actions"><button className="hero-play" onClick={onPlay}>▶ Play</button><button className="hero-info" onClick={onDetails}>ⓘ More info</button></div></div><div className="hero-fade" />
  </section>;
}
