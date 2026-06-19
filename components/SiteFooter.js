import Image from 'next/image';
import Link from 'next/link';
import { event } from '../lib/gtag';

export default function SiteFooter() {
  const track = (label, category = 'navigation') => () =>
    event({ action: 'footer_click', category, label, value: 1 });

  return (
    <footer className="footer">
      <div className="footer__grid container">
        <div className="footer__brand">
          <div className="footer__logo">
            <Image src="/airwaves.png" alt="Airwaves Flasher" width={32} height={32} />
            <span>Airwaves Flasher</span>
          </div>
          <p className="mono">Flash, verify, boot.</p>
          <p className="footer__fineMono mono">AIRWAVES OS INSTALLER / ALL PLATFORMS</p>
        </div>

        <nav className="footer__col" aria-label="Product">
          <h4 className="mono">Product</h4>
          <a href="#preview" onClick={track('preview')}>Preview</a>
          <a href="#features" onClick={track('features')}>Features</a>
          <a href="#workflow" onClick={track('workflow')}>Workflow</a>
          <a href="#download" onClick={track('download')}>Download</a>
        </nav>

        <nav className="footer__col" aria-label="Resources">
          <h4 className="mono">Resources</h4>
          <a href="https://www.airwavesos.com" target="_blank" rel="noopener noreferrer" onClick={track('airwaves_os', 'outbound_link')}>Airwaves OS</a>
          <a href="https://github.com/airframesio/airwaves-os-flasher/releases/latest" target="_blank" rel="noopener noreferrer" onClick={track('releases', 'outbound_link')}>Releases</a>
          <a href="https://github.com/airframesio/airwaves-os-flasher" target="_blank" rel="noopener noreferrer" onClick={track('source', 'outbound_link')}>Source</a>
          <a href="https://github.com/airframesio/airwaves-os" target="_blank" rel="noopener noreferrer" onClick={track('airwaves_os_repo', 'outbound_link')}>OS images</a>
        </nav>

        <nav className="footer__col" aria-label="Connect">
          <h4 className="mono">Connect</h4>
          <a href="https://airframes.io" target="_blank" rel="noopener noreferrer" onClick={track('airframes', 'outbound_link')}>Airframes</a>
          <a href="https://github.com/airframesio" target="_blank" rel="noopener noreferrer" onClick={track('github_org', 'outbound_link')}>GitHub</a>
          <a href="mailto:info@airwavesos.com" onClick={track('contact', 'lead_generation')}>Contact</a>
        </nav>
      </div>

      <div className="footer__bottom container mono">
        <span>&copy; {new Date().getFullYear()} Airframes / Airwaves OS Flasher is MIT licensed</span>
        <span>Open source desktop installer</span>
      </div>
    </footer>
  );
}
