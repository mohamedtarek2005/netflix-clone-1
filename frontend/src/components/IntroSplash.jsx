import { useEffect, useState } from 'react';

// Plays the Netflix-style intro animation once per browser session, then
// fades out on its own. Skippable with a click/tap in case the gif runs
// long. Set SESSION_KEY differently (or remove the sessionStorage check)
// if you want it to replay on every visit instead of just the first.
const SESSION_KEY = 'netflixIntroPlayed';
const AUTO_DISMISS_MS = 2600;
const FADE_MS = 400;

export default function IntroSplash() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(SESSION_KEY));
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const fadeTimer = setTimeout(() => setFading(true), AUTO_DISMISS_MS);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, AUTO_DISMISS_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, FADE_MS);
  };

  return (
    <div className={`intro-splash ${fading ? 'intro-splash-fading' : ''}`} onClick={dismiss} role="presentation">
      <img src="/netflix-intro.gif" alt="Netflix animation" className="intro-splash-gif" />
    </div>
  );
}
