import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useScrollY, useParallax, useReveal } from '../hooks/useScrollFX';
import { showcase, genres, features, stats, faqs } from '../data/landingShowcase';
import PreviewCard from '../components/PreviewCard';
import GenrePanel from '../components/GenrePanel';

// Royalty-free action footage, Mixkit License (free for commercial/non-commercial
// use, no watermark, no attribution required) — https://mixkit.co/license/#videoFree
const HERO_VIDEO = 'https://assets.mixkit.co/videos/28422/28422-720.mp4';

function FeatureBlock({ feature, reversed }) {
  const { ref, visible } = useReveal(0.25);
  const { ref: imgRef, offset } = useParallax(0.08);
  return (
    <section ref={ref} className={`feature-block ${reversed ? 'feature-block-reversed' : ''} ${visible ? 'is-visible' : ''}`}>
      <div className="feature-block-image" ref={imgRef} style={{ transform: `translateY(${offset}px)` }}>
        <img src={feature.image} alt="" loading="lazy" />
      </div>
      <div className="feature-block-copy">
        <span className="feature-block-eyebrow">{feature.eyebrow}</span>
        <h2>{feature.title}</h2>
        <p>{feature.body}</p>
      </div>
    </section>
  );
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className={`faq-item ${open ? 'faq-item-open' : ''}`}>
      <button className="faq-question" onClick={onToggle} aria-expanded={open}>
        <span>{item.q}</span>
        <span className="faq-icon">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-answer" style={{ maxHeight: open ? '200px' : '0px' }}>
        <p>{item.a}</p>
      </div>
    </div>
  );
}

export default function Landing() {
  const { user } = useAuth();
  const scrollY = useScrollY();
  const [openFaq, setOpenFaq] = useState(0);

  const showcaseSection = useReveal(0.1);
  const genreSection = useReveal(0.1);
  const statsSection = useReveal(0.2);
  const faqSection = useReveal(0.1);
  const ctaSection = useReveal(0.2);

  return (
    <main className="landing">
      {/* HERO — layered video, gradient and orb drift at different speeds while you scroll */}
      <section className="landing-hero">
        <div className="landing-video-wrap" style={{ transform: `translateY(${scrollY * 0.35}px)` }}>
          <video className="landing-video" autoPlay muted loop playsInline poster="https://placehold.co/1920x1080/111/333?text=Stream" aria-hidden="true">
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        </div>
        <div className="landing-noise" />
        <div className="landing-gradient" style={{ transform: `translateY(${scrollY * 0.15}px)` }} />
        <div className="landing-orb" style={{ transform: `translate3d(0, ${scrollY * 0.5}px, 0)` }} />
        <div className="landing-hero-animation" aria-hidden="true">
          <img src="/netflix-intro.gif" alt="" />
        </div>
        <section className="landing-content" style={{ transform: `translateY(${scrollY * -0.12}px)`, opacity: Math.max(1 - scrollY / 600, 0) }}>
          <span className="eyebrow">STREAM WITHOUT LIMITS</span>
          <h1>Stories that stay<br /><span>with you.</span></h1>
          <p>Discover movies, series and unforgettable worlds in one beautifully simple streaming experience.</p>
          <div className="landing-actions">
            <Link className="landing-primary" to={user ? '/browse' : '/register'}>{user ? 'Browse now' : 'Start watching'} <span>→</span></Link>
            {!user && <Link className="landing-secondary" to="/login">Sign in</Link>}
          </div>
          <div className="landing-stats">
            <div><strong>4K</strong><span>Ultra HD</span></div>
            <div><strong>24/7</strong><span>Entertainment</span></div>
            <div><strong>∞</strong><span>Stories</span></div>
          </div>
        </section>
        <div className="landing-scroll"><span>Scroll to explore</span><i /></div>
      </section>

      {/* TRENDING SHOWCASE — hover a poster to preview it */}
      <section ref={showcaseSection.ref} className={`showcase-panel ${showcaseSection.visible ? 'is-visible' : ''}`}>
        <div className="section-head">
          <h2>Trending this week</h2>
          <p>Hover any title for a quick preview, movies and series both.</p>
        </div>
        <div className="showcase-row">
          {showcase.map((item) => <PreviewCard key={item.title} item={item} />)}
        </div>
      </section>

      {/* FEATURE DETAIL SECTIONS — parallax imagery, alternating layout */}
      {features.map((feature, i) => (
        <FeatureBlock key={feature.title} feature={feature} reversed={i % 2 === 1} />
      ))}

      {/* GENRE PANELS */}
      <section ref={genreSection.ref} className={`genre-panel ${genreSection.visible ? 'is-visible' : ''}`}>
        <div className="section-head">
          <h2>Find your next favorite</h2>
          <p>Six genres, thousands of nights in.</p>
        </div>
        <div className="genre-grid">
          {genres.map((genre) => <GenrePanel key={genre.name} genre={genre} />)}
        </div>
      </section>

      {/* STATS BANNER — classic fixed-background parallax */}
      <section ref={statsSection.ref} className={`stats-banner ${statsSection.visible ? 'is-visible' : ''}`}>
        <div className="stats-banner-overlay" />
        <div className="stats-banner-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stats-banner-item">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqSection.ref} className={`faq-panel ${faqSection.visible ? 'is-visible' : ''}`}>
        <div className="section-head">
          <h2>Frequently asked questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, i) => (
            <FaqItem key={item.q} item={item} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section ref={ctaSection.ref} className={`final-cta ${ctaSection.visible ? 'is-visible' : ''}`}>
        <h2>Ready to watch?</h2>
        <p>Create an account in under a minute and start streaming tonight.</p>
        <Link className="landing-primary" to={user ? '/browse' : '/register'}>{user ? 'Browse now' : 'Get started'} <span>→</span></Link>
      </section>
    </main>
  );
}
