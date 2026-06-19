import { useState } from 'react';
import Image from 'next/image';
import { event } from '../lib/gtag';

const SCREENS = [
  {
    id: 'image',
    label: 'Image',
    title: 'Pick the right Airwaves OS image',
    note: 'Search boards, channels, versions, and local files from one catalog.',
    img: '/screenshots/choose-image.png',
  },
  {
    id: 'storage',
    label: 'Storage',
    title: 'Choose removable media safely',
    note: 'System drives stay out of the normal target list before the helper writes.',
    img: '/screenshots/choose-storage.png',
  },
  {
    id: 'customize',
    label: 'Customize',
    title: 'Preload first boot settings',
    note: 'Hostname, Wi-Fi, SSH keys, timezone, and update channel can be written up front.',
    img: '/screenshots/customize.png',
  },
  {
    id: 'write',
    label: 'Write',
    title: 'Write and verify in one pass',
    note: 'Download, decompress, flash, read back, verify, configure, and eject.',
    img: '/screenshots/writing.png',
  },
];

export default function ProductPreview({ compact = false }) {
  const [active, setActive] = useState(0);
  const screen = SCREENS[active];

  const select = (i) => {
    setActive(i);
    event({ action: 'preview_tab', category: 'engagement', label: SCREENS[i].id, value: 1 });
  };

  return (
    <div className={`preview ${compact ? 'preview--compact' : ''}`}>
      <div className="preview__media">
        <Image
          src={screen.img}
          alt={`Airwaves OS Flasher ${screen.label.toLowerCase()} screen`}
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
  );
}
