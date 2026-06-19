import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { event } from '../lib/gtag';
import { useTheme } from '../lib/useFx';

const LINKS = [
  ['#preview', 'Preview'],
  ['#features', 'Features'],
  ['#workflow', 'Workflow'],
  ['#download', 'Download'],
  ['#source', 'Source'],
];

const SPY_IDS = ['preview', 'features', 'workflow', 'download', 'source'];

function ThemeIcon() {
  return (
    <>
      <svg className="icon-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <svg className="icon-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </>
  );
}

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let raf = 0;
    let ticking = false;
    const update = () => {
      ticking = false;
      let current = '';
      for (const id of SPY_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 180 && r.bottom >= 180) {
          current = id;
          break;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const nav = (label) => {
    setOpen(false);
    event({ action: 'nav_click', category: 'navigation', label, value: 1 });
  };

  const onTheme = () => {
    toggleTheme();
    event({
      action: 'theme_toggle',
      category: 'engagement',
      label: theme === 'light' ? 'dark' : 'light',
      value: 1,
    });
  };

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <Link href="/" className="nav__brand" onClick={() => nav('home')}>
          <Image src="/airwaves.png" alt="" width={28} height={28} priority />
          <span>Airwaves&nbsp;Flasher</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={href === `#${active}` ? 'is-active' : undefined}
              onClick={() => nav(label.toLowerCase())}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="nav__meta">
          <span className="nav__badge mono">macOS / Windows / Linux</span>
          <button
            type="button"
            className="nav__theme"
            onClick={onTheme}
            aria-label="Toggle light or dark theme"
            title="Toggle theme"
          >
            <ThemeIcon />
          </button>
          <a className="btn btn--small" href="#download" onClick={() => nav('download_cta')}>
            Download
          </a>
        </div>

        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="menu__inner">
          <p className="menu__eyebrow mono">Airwaves OS Flasher</p>
          {LINKS.map(([href, label], i) => (
            <a
              key={href}
              href={href}
              className="menu__link"
              style={{ '--d': `${i * 60}ms` }}
              onClick={() => nav(label.toLowerCase())}
            >
              <span className="mono">0{i + 1}</span>
              {label}
            </a>
          ))}
          <div className="menu__foot mono">
            <span>macOS</span>
            <button type="button" className="menu__theme" onClick={onTheme}>
              day / night
            </button>
            <span>Windows / Linux</span>
          </div>
        </div>
      </div>
    </>
  );
}
