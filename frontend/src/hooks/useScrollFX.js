import { useCallback, useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Tracks window scrollY, throttled to animation frames.
export function useScrollY() {
  const [y, setY] = useState(typeof window !== 'undefined' ? window.scrollY : 0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

// Gives an element a gentle vertical drift as it crosses the viewport,
// proportional to how far its center is from the viewport's center.
export function useParallax(speed = 0.15) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ticking = false;
    const measure = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        setOffset(center * speed);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(measure);
        ticking = true;
      }
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return { ref, offset };
}

// Fades/rises a section into place the first time it enters the viewport.
export function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// Pointer-driven 3D tilt. Writes CSS custom properties onto the element
// instead of re-rendering, so it stays smooth at 60fps.
export function useTilt(strength = 10) {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();

  const onMouseMove = useCallback(
    (e) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      el.style.setProperty('--tilt-x', `${((py - 0.5) * -strength).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${((px - 0.5) * strength).toFixed(2)}deg`);
      el.style.setProperty('--glow-x', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--glow-y', `${(py * 100).toFixed(1)}%`);
    },
    [strength, reduced]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
