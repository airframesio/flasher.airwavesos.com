# Airwaves Flasher Website

Marketing and download site for Airwaves Flasher, the desktop app used to
write, verify, and first-boot configure Airwaves OS images.

The site is a static Next.js export designed for Netlify. It is intentionally
small: one primary landing page, local assets, static screenshots, and direct
links to the Airwaves Flasher release page.

## What This Site Does

- Explains the Airwaves Flasher install workflow.
- Links users to the latest macOS, Windows, and Linux releases.
- Shows native app screenshots without browser framing.
- Points technical users to the Flasher source and Airwaves OS image releases.
- Tracks navigation and CTA events through Google Analytics.

## Tech Stack

- Next.js with `output: 'export'`
- React 18
- Static image optimization disabled for export compatibility
- Netlify static hosting from `out/`
- Google Analytics via `lib/gtag.js`

## Repository Layout

```text
components/
  ProductPreview.js   Interactive screenshot preview tabs
  SiteFooter.js       Footer links and product metadata
  SiteNav.js          Responsive navigation and theme toggle
lib/
  fonts.js            Next font configuration
  gtag.js             Google Analytics helpers
  useFx.js            Reveal and theme hooks
pages/
  _app.js             Global shell, fonts, analytics script
  _document.js        Initial theme bootstrap
  index.js            Landing page content and section data
public/
  screenshots/        Dark app screenshots used by ProductPreview
  screenshots/light/  Matching light-mode app screenshots
  airwaves.png        Site icon
  airwaves-flasher-og.png
styles/
  globals.css         Full visual system and responsive layout
netlify.toml          Static export deployment configuration
next.config.js        Next static export settings
```

## Local Development

Install dependencies:

```sh
npm install
```

Run the Next development server:

```sh
npm run dev
```

Build the static export:

```sh
npm run build
```

The exported site is written to `out/`.

Preview the production export locally:

```sh
npx serve out -l tcp://0.0.0.0:4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Deployment

Netlify builds the site with:

```sh
npm run build
```

and publishes:

```text
out/
```

`NETLIFY_NEXT_PLUGIN_SKIP=true` is set because this is a static export rather
than a server-rendered Next application. The redirect in `netlify.toml` sends
unknown paths back to `/index.html`.

## Updating Content

Most page content is data-driven inside `pages/index.js`:

- `STATS` controls the four highlight cells below the hero.
- `FEATURES` controls the feature grid.
- `STEPS` controls the workflow section.
- `DOWNLOADS` controls platform download cards.
- `LINKS` controls the source/resource links.

The release CTA currently points to:

```text
https://github.com/airframesio/airwaves-flasher/releases/latest
```

Update screenshots in `public/screenshots/` and `public/screenshots/light/`, then
keep the filenames aligned with `components/ProductPreview.js`. The preview
defaults to the current page theme and also exposes a small Light/Dark switch for
each preview instance.

## Verification Checklist

Before publishing, run:

```sh
npm run build
npm audit --omit=dev
```

For visual checks, serve `out/` locally and inspect at desktop and mobile widths.
The hero should show content on first paint, the screenshots should render as
native app screenshots, and all download/source CTAs should point to GitHub or
Airframes destinations.
