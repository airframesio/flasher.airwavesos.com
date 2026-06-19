import { useEffect, useState } from 'react';

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    const show = (el) => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    };

    if (prefersReducedMotion()) {
      els.forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function useTheme() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'dark');
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onSystem = (e) => {
      let stored = null;
      try {
        stored = localStorage.getItem('aw-theme');
      } catch {}
      if (stored !== 'light' && stored !== 'dark') {
        const t = e.matches ? 'light' : 'dark';
        document.documentElement.dataset.theme = t;
        setTheme(t);
      }
    };

    mq.addEventListener('change', onSystem);
    return () => mq.removeEventListener('change', onSystem);
  }, []);

  useEffect(() => {
    if (!theme) return;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f8fafc' : '#090d13');
  }, [theme]);

  const toggle = () => {
    const t = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem('aw-theme', t);
    } catch {}
    setTheme(t);
  };

  return [theme, toggle];
}
