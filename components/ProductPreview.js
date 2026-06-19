import { useEffect, useState } from 'react';
import Image from 'next/image';
import { event } from '../lib/gtag';

const SCREENS = [
  {
    id: 'image',
    label: 'Image',
    title: 'Pick the right Airwaves OS image',
    note: 'Search boards, channels, versions, and local files from one catalog.',
    img: {
      dark: '/screenshots/choose-image.png',
      light: '/screenshots/light/choose-image.png',
    },
  },
  {
    id: 'storage',
    label: 'Storage',
    title: 'Choose removable media safely',
    note: 'System drives stay out of the normal target list before the helper writes.',
    img: {
      dark: '/screenshots/choose-storage.png',
      light: '/screenshots/light/choose-storage.png',
    },
  },
  {
    id: 'customize',
    label: 'Customize',
    title: 'Preload first boot settings',
    note: 'Hostname, Wi-Fi, SSH keys, timezone, and update channel can be written up front.',
    img: {
      dark: '/screenshots/customize.png',
      light: '/screenshots/light/customize.png',
    },
  },
  {
    id: 'write',
    label: 'Write',
    title: 'Write and verify in one pass',
    note: 'Download, decompress, flash, read back, verify, configure, and eject.',
    img: {
      dark: '/screenshots/writing.png',
      light: '/screenshots/light/writing.png',
    },
  },
];

export default function ProductPreview({ compact = false }) {
  const [active, setActive] = useState(0);
  const [siteTone, setSiteTone] = useState('dark');
  const [toneOverride, setToneOverride] = useState(null);
  const screen = SCREENS[active];
  const tone = toneOverride || siteTone;

  const select = (i) => {
    setActive(i);
    event({ action: 'preview_tab', category: 'engagement', label: SCREENS[i].id, value: 1 });
  };

  const selectTone = (nextTone) => {
    setToneOverride(nextTone);
    event({ action: 'preview_theme', category: 'engagement', label: nextTone, value: 1 });
  };

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setSiteTone(root.dataset.theme === 'light' ? 'light' : 'dark');
    read();

    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`preview ${compact ? 'preview--compact' : ''}`}>
      <div className="preview__media">
        <Image
          key={`${screen.id}-${tone}`}
          src={screen.img[tone]}
          alt={`Airwaves Flasher ${screen.label.toLowerCase()} screen`}
          fill
          sizes={compact ? '(max-width: 900px) 100vw, 44vw' : '(max-width: 900px) 100vw, 68vw'}
          priority={compact}
        />
      </div>
      <div className="preview__bar">
        <div className="preview__copy">
          <strong>{screen.title}</strong>
          <span>{screen.note}</span>
        </div>
        <div className="preview__actions">
          <div className="preview__theme" aria-label="Screenshot color mode">
            <button
              type="button"
              aria-pressed={tone === 'light'}
              className={tone === 'light' ? 'is-active' : undefined}
              onClick={() => selectTone('light')}
            >
              Light
            </button>
            <button
              type="button"
              aria-pressed={tone === 'dark'}
              className={tone === 'dark' ? 'is-active' : undefined}
              onClick={() => selectTone('dark')}
            >
              Dark
            </button>
          </div>
          <div className="preview__tabs" role="tablist" aria-label="Product preview screens">
            {SCREENS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={i === active ? 'is-active' : undefined}
                onClick={() => select(i)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
