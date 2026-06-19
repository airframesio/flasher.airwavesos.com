import Head from 'next/head';
import Image from 'next/image';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import ProductPreview from '../components/ProductPreview';
import { event } from '../lib/gtag';
import { useReveal } from '../lib/useFx';

const RELEASES = 'https://github.com/airframesio/airwaves-flasher/releases/latest';
const SOURCE = 'https://github.com/airframesio/airwaves-flasher';
const AIRWAVES_OS = 'https://github.com/airframesio/airwaves-os';
const SITE_URL = 'https://flasher.airwavesos.com';
const SOCIAL_IMAGE = `${SITE_URL}/airwaves-flasher-social.png`;

const STATS = [
  ['Catalog', 'Airwaves OS images and supported boards'],
  ['Verify', 'Download hash and read-back checks'],
  ['Configure', 'AWCFG first-boot settings'],
  ['Desktop', 'macOS, Windows, and Linux installers'],
];

const FEATURES = [
  {
    n: '01',
    name: 'Airwaves image catalog',
    desc: 'Browse Airwaves OS images by board, channel, version, release notes, and local files. Published images surface first, with the full Armbian board list still searchable.',
    signal: 'catalog.json + GitHub fallback',
  },
  {
    n: '02',
    name: 'Verified flashing',
    desc: 'The pipeline downloads, decompresses, writes, flushes, and reads back the image so a bad card or corrupted transfer fails visibly.',
    signal: 'download hash + read-back hash',
  },
  {
    n: '03',
    name: 'Storage guardrails',
    desc: 'The UI lists removable targets, hides system disks, and the elevated writer re-checks the selected device before touching it.',
    signal: 'safe target selection',
  },
  {
    n: '04',
    name: 'First boot preconfig',
    desc: 'Write hostname, Wi-Fi, timezone, SSH keys, and update channel into the AWCFG partition before the Airwaves OS device ever boots.',
    signal: 'airwaves-install.json',
  },
  {
    n: '05',
    name: 'Native desktop app',
    desc: 'Built with Tauri, Rust, and React for macOS, Windows, and Linux, using a small privileged helper only for the device-writing path.',
    signal: 'Tauri 2 + Rust helper',
  },
  {
    n: '06',
    name: 'Fast re-flashes',
    desc: 'Downloads can be cached for repeated installs, while local images remain available for lab builds, test releases, and offline desks.',
    signal: 'configurable cache',
  },
];

const STEPS = [
  ['Install the app', 'Download Airwaves Flasher for your desktop OS and launch it.'],
  ['Pick a board', 'Choose Raspberry Pi, x86, Rock 5B, Orange Pi 5, or another supported board from the catalog.'],
  ['Choose an image', 'Select stable, beta, dev, or a local Airwaves OS image file.'],
  ['Select storage', 'Insert an SD card or USB drive; the app keeps normal system disks out of the target list.'],
  ['Flash and verify', 'The flasher writes the image, verifies the device, adds first-boot config, and ejects when done.'],
];

const DOWNLOADS = [
  {
    platform: 'macOS',
    kind: '.dmg for Apple Silicon and Intel',
    detail: 'Tauri desktop app with the native elevated helper path.',
    href: RELEASES,
  },
  {
    platform: 'Windows',
    kind: '.msi / .exe installer',
    detail: 'UAC elevation is used only when the selected device is written.',
    href: RELEASES,
  },
  {
    platform: 'Linux',
    kind: 'AppImage and packages',
    detail: 'Uses pkexec, sudo, or doas depending on the system.',
    href: RELEASES,
  },
];

const LINKS = [
  {
    label: 'Airwaves Flasher source',
    desc: 'Desktop app source, release workflow, and implementation notes.',
    href: SOURCE,
  },
  {
    label: 'Airwaves OS images',
    desc: 'Operating system releases, image assets, update manifests, and docs.',
    href: AIRWAVES_OS,
  },
  {
    label: 'Airframes',
    desc: 'The open aviation and maritime data platform behind Airwaves OS.',
    href: 'https://airframes.io',
  },
];

export default function Home() {
  useReveal();

  const track = (action, label, category = 'cta') => () =>
    event({ action, category, label, value: 1 });

  return (
    <>
      <Head>
        <title>Airwaves Flasher - Get Airwaves OS onto your device</title>
        <meta
          name="description"
          content="Download Airwaves Flasher, the open-source desktop app for writing, verifying, and first-boot configuring Airwaves OS images."
        />
        <meta property="og:title" content="Airwaves Flasher" />
        <meta
          property="og:description"
          content="Open-source like Airwaves OS. Flash Airwaves OS to SD cards and USB drives with image catalogs, verification, and first-boot configuration."
        />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={SOCIAL_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Airwaves Flasher" />
        <meta
          name="twitter:description"
          content="Open-source desktop app for flashing, verifying, and first-boot configuring Airwaves OS media."
        />
        <meta name="twitter:image" content={SOCIAL_IMAGE} />
      </Head>

      <SiteNav />

      <main id="top">
        <section className="hero">
          <div className="hero__grid container">
            <div className="hero__copy" data-reveal>
              <p className="hero__chip mono">
                <span className="dot dot--live" /> Open-source desktop installer for Airwaves OS
              </p>
              <h1 className="hero__title">Airwaves Flasher</h1>
              <p className="hero__sub">
                A focused imager for getting Airwaves OS onto SD cards and USB drives.
                Pick a board, choose an image, select storage, and write a verified
                device with first-boot settings already in place.
              </p>
              <div className="hero__cta">
                <a className="btn btn--primary" href="#download" onClick={track('download_click', 'hero')}>
                  Download latest <span className="btn__arrow" aria-hidden="true">&rarr;</span>
                </a>
                <a
                  className="btn btn--ghost"
                  href={SOURCE}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={track('source_click', 'hero', 'outbound_link')}
                >
                  View source
                </a>
              </div>
              <div className="hero__platforms mono" aria-label="Supported desktop platforms">
                <span>macOS</span>
                <span>Windows</span>
                <span>Linux</span>
              </div>
            </div>

            <div className="hero__preview" data-reveal style={{ '--d': '120ms' }}>
              <ProductPreview compact />
            </div>
          </div>
        </section>

        <section className="stats container" aria-label="Airwaves Flasher highlights">
          {STATS.map(([n, l], i) => (
            <div className="stats__item" key={l} data-reveal style={{ '--d': `${i * 70}ms` }}>
              <span className="stats__num mono">{n}</span>
              <span className="stats__label">{l}</span>
            </div>
          ))}
        </section>

        <section className="preview-section section" id="preview">
          <div className="container">
            <header className="section__head" data-reveal>
              <p className="section__ch mono">Preview</p>
              <h2 className="section__title">
                A direct path from image choice to verified media.
              </h2>
              <p className="section__lede">
                The app keeps the same guided flow people expect from modern imager
                tools, then adds the Airwaves catalog, safer target selection,
                verification, and first-boot configuration.
              </p>
            </header>
            <div data-reveal style={{ '--d': '90ms' }}>
              <ProductPreview />
            </div>
          </div>
        </section>

        <section className="features section" id="features">
          <div className="container">
            <header className="section__head" data-reveal>
              <p className="section__ch mono">Built for Airwaves OS</p>
              <h2 className="section__title">
                More than a generic image writer.
              </h2>
              <p className="section__lede">
                The app knows the Airwaves release flow, the board catalog, and the
                first-boot file Airwaves OS applies when the device starts.
              </p>
            </header>

            <div className="feature-grid">
              {FEATURES.map((feature, i) => (
                <article className="feature" key={feature.name} data-reveal style={{ '--d': `${(i % 3) * 70}ms` }}>
                  <span className="feature__n mono">{feature.n}</span>
                  <h3>{feature.name}</h3>
                  <p>{feature.desc}</p>
                  <span className="feature__signal mono">{feature.signal}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="workflow section" id="workflow">
          <div className="container workflow__grid">
            <div className="workflow__copy" data-reveal>
              <p className="section__ch mono">Workflow</p>
              <h2 className="section__title">
                Five steps to first boot.
              </h2>
              <p className="section__lede">
                No decompression commands, checksum juggling, or manual first-boot
                partition edits. The app handles the repetitive install work and
                leaves you with a configured Airwaves OS device.
              </p>
              <a
                className="btn btn--primary"
                href={RELEASES}
                target="_blank"
                rel="noopener noreferrer"
                onClick={track('releases_click', 'workflow', 'outbound_link')}
              >
                Open releases <span className="btn__arrow" aria-hidden="true">&rarr;</span>
              </a>
            </div>

            <ol className="workflow__steps">
              {STEPS.map(([title, desc], i) => (
                <li key={title} data-reveal style={{ '--d': `${i * 70}ms` }}>
                  <span className="workflow__num mono">Step {i + 1}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="download section" id="download">
          <div className="container">
            <header className="section__head download__head" data-reveal>
              <p className="section__ch mono">Download</p>
              <h2 className="section__title">
                Get Airwaves Flasher for your <em>desktop</em>.
              </h2>
              <p className="section__lede">
                Native installers are produced from the Tauri release workflow for
                macOS, Windows, and Linux. The same release page also carries source
                archives for reproducible builds.
              </p>
            </header>

            <div className="download__grid">
              {DOWNLOADS.map((item, i) => (
                <a
                  key={item.platform}
                  className="download-card"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-reveal
                  style={{ '--d': `${i * 80}ms` }}
                  onClick={track('download_platform', item.platform.toLowerCase(), 'outbound_link')}
                >
                  <span className="download-card__platform">{item.platform}</span>
                  <span className="download-card__kind mono">{item.kind}</span>
                  <span className="download-card__detail">{item.detail}</span>
                  <span className="download-card__action mono">View latest release</span>
                </a>
              ))}
            </div>

            <aside className="download__note" data-reveal>
              <div>
                <span className="download__noteLabel mono">Need an OS image?</span>
                <p>
                  Airwaves Flasher can fetch the published catalog automatically and can
                  fall back to Airwaves OS GitHub releases when the catalog is unavailable.
                </p>
              </div>
              <a
                className="btn btn--ghost"
                href={AIRWAVES_OS}
                target="_blank"
                rel="noopener noreferrer"
                onClick={track('os_images_click', 'download', 'outbound_link')}
              >
                Airwaves OS images
              </a>
            </aside>
          </div>
        </section>

        <section className="source section" id="source">
          <div className="container source__grid">
            <div className="source__brand" data-reveal>
              <Image src="/airframes-logo.svg" alt="Airframes" width={54} height={54} />
              <h2>
                Built by the Airwaves OS and Airframes team.
              </h2>
              <p>
                Airwaves Flasher is open-source, just like Airwaves OS. It is part
                of the Airwaves OS install path: open tooling for getting
                radio-focused operating system images onto real hardware with less
                terminal ceremony.
              </p>
            </div>

            <div className="source__links">
              {LINKS.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link"
                  data-reveal
                  style={{ '--d': `${i * 80}ms` }}
                  onClick={track('source_link_click', link.label, 'outbound_link')}
                >
                  <span>{link.label}</span>
                  <p>{link.desc}</p>
                  <strong className="mono">Open</strong>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
