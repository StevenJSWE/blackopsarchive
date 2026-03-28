# Black Ops Archive — Claude Context

Intelligence operations archive site. Scope: CIA, MI6, Mossad, NSA, FBI, GCHQ, KGB/FSB, BND, Joint Chiefs. No paranormal, no alien content, no unverified fringe. Documented history only.

**Live site:** https://blackopsarchive.com
**Stack:** Astro 5 + React + Tailwind v4 + Cloudflare Pages
**Owner:** Steven Baird (SWE, JPMC) — personal project

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Astro 5 (`output: static`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Components | React islands (`client:only="react"`) |
| Map | Leaflet + react-leaflet + react-leaflet-cluster |
| Content | Astro Content Collections (MDX) |
| Hosting | Cloudflare Pages (via `@astrojs/cloudflare` adapter) |
| Fonts | Russo One (headings), IBM Plex Mono (body/UI) |

---

## Design System

**Palette:**
- `#0a0a0a` — terminal black (background)
- `#39ff14` — phosphor green (primary accent, confirmed status)
- `#cc0000` — classified red (secondary accent, alleged status, stamps)
- `#f59e0b` — amber (disputed status)
- `#e5e5e5` — light (primary text)
- `#707070` — mid grey (secondary text)
- `#4a4a4a` — dim grey (tertiary text / borders)
- `#1e1e1e` — terminal grey (subtle borders / dividers)

**Typography:**
- Headings: `Russo One` (`font-stencil`)
- Body/UI: `IBM Plex Mono` (`font-mono`)

**Atmosphere:**
- `.scanlines` — fixed CSS repeating-gradient overlay
- `.grain` — animated SVG noise overlay
- `.crt-glow` — radial edge vignette with phosphor tint
- `.blink` — CSS step-start blink animation
- `.stamp-classified` — rotated red border stamp

**Status system:**
- `confirmed` → phosphor green `#39ff14` — CIA/Senate acknowledgement, FOIA docs
- `alleged` → classified red `#cc0000` — credible reporting, no official confirmation
- `disputed` → amber `#f59e0b` — conflicting official records / contested evidence

---

## Project Structure

```
src/
  components/
    NavBar.astro        # Sticky nav, active-link detection via currentPath prop
    Map.jsx             # Leaflet map (React island, client:only)
    BaseHead.astro      # (legacy — unused, BaseLayout handles meta)
    Footer.astro        # (stub — not yet in use)
  content/
    articles/           # MDX files — one per operation
  layouts/
    BaseLayout.astro    # HTML shell, SEO meta, OG tags, overlays
  pages/
    index.astro         # Map page (full-screen Leaflet)
    archive.astro       # Filterable article list
    articles/[...id].astro  # Individual article page
    rss.xml.js          # RSS feed
  styles/
    global.css          # Tailwind @theme tokens + all global CSS
  content.config.ts     # Zod schema for articles collection
```

---

## Content Schema (articles)

```ts
{
  title:    string           // Full operation name, e.g. "Operation MKUltra"
  date:     Date             // ISO date — use date of primary event / exposure
  era:      string           // "Cold War" | "Post-WWII" | "Vietnam" | "Reagan Era" | "Post-9/11" | "Modern" | "WWII"
  country:  string[]         // Countries of operation (not agency country)
  agency:   string[]         // e.g. ["CIA"] | ["CIA", "NSA"] | ["Mossad"]
  category: string[]         // e.g. ["Mind Control", "Human Experimentation"]
  status:   "confirmed" | "alleged" | "disputed"
  lat:      number           // Pin location for map
  lng:      number
  summary:  string           // One sentence, ~20 words. Used in cards and meta description.
  sources:  { label: string; url: string }[]  // Primary sources only
}
```

**Content standards:**
- 600–1,200 words minimum per article
- Every factual claim must be attributable to a primary source (FOIA doc, Senate report, court record, official acknowledgement, mainstream investigative journalism)
- No speculation beyond what sources support
- `status: "confirmed"` requires official governmental/agency acknowledgement
- Link to actual documents where possible (nsarchive.gwu.edu, CIA FOIA reading room, intelligence.senate.gov)

---

## Dev Commands

```bash
npm run dev        # Astro dev server (localhost:4321)
npm run build      # Production build
npm run preview    # Build + Wrangler local preview (Cloudflare Workers)
npm run deploy     # Deploy to Cloudflare Pages via Wrangler
npm run check      # Build + tsc + wrangler dry-run
```

---

## Key Conventions

- **NavBar:** Pass `currentPath={Astro.url.pathname}` for active-link highlighting
- **BaseLayout:** Always pass `description` on article/archive pages for SEO
- **Tailwind tokens:** Use `text-classified-green`, `text-classified-red`, `bg-terminal-black`, `text-dim`, `text-mid`, `text-light` — defined in `global.css @theme`
- **React islands:** Use `client:only="react"` for Leaflet (SSR incompatible)
- **Article filenames:** kebab-case slug, e.g. `operation-gladio.mdx` → URL `/articles/operation-gladio`
- **Fonts in React components:** Reference as string `'IBM Plex Mono', monospace` (not Tailwind class — React inline styles only)

---

## Roadmap Summary

| Phase | Status | Focus |
|---|---|---|
| 1 | ✅ Done | Astro setup, map, archive, content schema, aesthetic |
| 2 | 🔄 Active | New articles, agency index pages, related operations |
| 3 | ⏳ Next | URL-driven filters, Pagefind search, map filter overlays |
| 4 | ⏳ Planned | Timeline, D3 relationship graph, FOIA doc viewer |
| 5 | ⏳ Planned | Newsletter, membership tiers, merch, affiliates |

Full roadmap: `ROADMAP.md`

---

## SEO Priority Targets

- `operation mkultra documents`
- `operation mockingbird cia`
- `jfk files declassified 2025`
- `operation northwoods documents`
- `cia confirmed conspiracies`
- `declassified cia operations list`
