# CHANGELOG

All notable changes to Black Ops Archive. Follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) conventions.

---

## [Unreleased]

### Planned
- Agency filter tabs (CIA / MI6 / Mossad / NSA / FBI)
- Era filter (Cold War / Vietnam / Reagan Era / Post-9/11 / Modern)
- Related operations sidebar on article pages
- Site-wide search
- Interactive timeline view
- FOIA document viewer (inline PDF embeds from nsarchive.gwu.edu)

---

## [0.3.0] — 2026-03-16

### Added
- **Status system** — every operation now carries a `status` field: `confirmed`, `alleged`, or `disputed`
- **Agency field** — `agency: string[]` on every article (CIA, MI6, Mossad, FBI, NSA, Joint Chiefs, etc.)
- **Archive filter tabs** — All / Confirmed / Alleged / Disputed — pure server-rendered HTML + vanilla JS, no hydration issues
- **Color-coded map markers** — green = confirmed, red = alleged, amber = disputed
- **Marker clustering** — overlapping DC-area pins now cluster into a styled count badge via `react-leaflet-cluster`; spiders on click to show individual pins
- **Redesigned map popups** — dark-themed popups with status badge, truncated summary, "READ FILE →" CTA
- **Status badge on article pages** — CONFIRMED / ALLEGED / DISPUTED badge in the article header alongside DECLASSIFIED stamp
- **Agency display on article pages** — agency line rendered below era/country in article header
- **Archive stats line** — "X confirmed · Y alleged · Z total operations" count under the Archive heading

### Content Added
- **Operation Mockingbird** (confirmed) — CIA media infiltration program, Church Committee findings
- **Operation Ajax** (confirmed) — CIA/MI6 1953 Iran coup, full story with Kermit Roosevelt, legacy for 1979 revolution
- **Operation Northwoods** (confirmed) — Joint Chiefs false-flag proposal, signed documents, Kennedy's rejection
- **JFK CIA Theory** (alleged) — George Joannides/DRE connection, withheld documents, HSCA findings

### Fixed
- Removed conflicting legacy `src/content/config.ts` (Astro 4 schema) which was silently overriding the Astro 5 `src/content.config.ts` and causing the collection to return empty at runtime
- Cleared stale `.astro` build cache
- Replaced React island on archive page with pure Astro + vanilla JS to eliminate flash-of-missing-content hydration bug

### Updated
- **MKUltra article** — replaced placeholder stub with full article body covering methods, the Frank Olson case, exposure, and confirmed status

---

## [0.2.0] — 2026-03-14

### Added
- Interactive Leaflet map on homepage (react-leaflet, CartoDB dark tiles)
- Map pins pulled from content collection with title/summary popups
- "Active Intel" pin counter overlay on map
- Archive listing page (`/archive`) with era, country, title, summary per article
- Dynamic article pages (`/articles/[...id]`) with MDX rendering, sources list
- NavBar with "Classified" status dot animation
- RSS feed at `/rss.xml`
- Sitemap via `@astrojs/sitemap`
- Content schema with Zod validation: title, date, era, country, category, lat, lng, summary, sources
- Cloudflare Pages deploy via Cloudflare adapter

### Content Added
- **Operation MKUltra** — initial stub article

---

## [0.1.0] — 2026-03-14

### Added
- Astro 5 project scaffolding
- React 19 integration
- Tailwind CSS 4 with custom theme (terminal-black, classified-green, classified-red, terminal-grey)
- Russo One + IBM Plex Mono font pair
- Global scanline + grain overlay effects via CSS
- BaseLayout with Leaflet CSS import
- Cloudflare D1 + Workers config (wrangler.json)
