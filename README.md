# ████████╗ BLACKOPSARCHIVE.COM ████████╗

### _Declassified. Documented. Interactive._

> An open-source intelligence archive covering covert operations by the CIA, MI6, KGB/FSB, Mossad, NSA, and GCHQ — built as a map-first interactive experience backed by primary sources.

**[blackopsarchive.com](https://blackopsarchive.com)** · [Report an Issue](https://github.com/StevenJSWE/map_project/issues)

---

## ░░ What This Is

Declassified intelligence history is scattered across FOIA databases, Senate committee reports, academic PDFs, and archive.gov. Nobody has built a proper interactive home for it.

**blackopsarchive.com** is that home.

- 🗺️ **Map-first navigation** — the globe is the UI, not a blog feed. Every operation is pinned to a location. Explore by geography.
- 📄 **Primary sources only** — every claim links to a FOIA document, Senate report, or court record. No unverified theories.
- 🏛️ **Intelligence agencies only** — CIA, MI6, KGB/FSB, Mossad, NSA, GCHQ. Tight scope, strong brand.
- 🔍 **Original research** — local AI/NLP pipeline for entity extraction and relationship graphing across thousands of declassified documents.

> _"Documented facts are already stranger than fiction."_

---

## ░░ Stack

| Layer               | Technology                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Framework           | [Astro](https://astro.build) — content-first, ships zero JS by default                           |
| Hosting             | [Cloudflare Pages](https://developers.cloudflare.com/pages) — global CDN, free tier, edge-native |
| Database _(future)_ | [Cloudflare D1](https://developers.cloudflare.com/d1) — SQLite at the edge                       |
| Map                 | [Leaflet.js](https://leafletjs.com) + OpenStreetMap — no API key, no limits                      |
| Content             | MDX + Astro Content Collections — version-controlled, schema-validated                           |
| Styling             | Tailwind CSS                                                                                     |
| AI Pipeline         | Python · LlamaIndex · ChromaDB · Ollama (`llama3.1:8b`) · HuggingFace embeddings                 |
| Visualisation       | Pyvis · Plotly · _(D3.js on roadmap)_                                                            |

Everything runs locally. No cloud AI APIs. No vendor lock-in.

---

## ░░ Project Structure

```
blackopsarchive/
├── public/                     # Static assets (favicon, images)
├── src/
│   ├── components/
│   │   ├── Map.jsx             # Leaflet map (React island)
│   │   ├── ArticleCard.astro
│   │   └── NavBar.astro
│   ├── content/
│   │   ├── config.ts           # Content collection schema
│   │   └── articles/           # MDX article files
│   │       └── mkcultra.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ArticleLayout.astro
│   └── pages/
│       ├── index.astro         # Homepage — full-screen map
│       ├── archive.astro       # Article index
│       └── articles/
│           └── [...slug].astro # Dynamic article routing
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## ░░ Article Schema

Every article is an `.mdx` file with validated frontmatter:

```yaml
---
title: "Operation MKUltra"
slug: "mkcultra"
date: 2026-03-10
era: "Cold War"
country: ["United States"]
category: ["Mind Control", "Human Experimentation"]
lat: 38.9072
lng: -77.0369
summary: "The CIA's covert program testing mind control on unwitting subjects, 1953–1973."
sources:
  - label: "Church Committee Report, 1975"
    url: "https://..."
  - label: "FOIA Document: CIA MORI ID 17395"
    url: "https://..."
---
```

`lat`/`lng` pins the operation to the map. No database required at build time — Astro passes article data to the Leaflet React island as props.

---

## ░░ Content Scope

| ✅ In                                    | ❌ Out                            |
| ---------------------------------------- | --------------------------------- |
| CIA covert operations                    | General military history          |
| KGB/FSB espionage                        | Political opinion/commentary      |
| Mossad operations                        | Unverified conspiracy theories    |
| NSA/GCHQ surveillance programs           | Celebrity or crime content        |
| Intelligence failures (Bay of Pigs etc.) | Anything without a primary source |
| FOIA-documented programs                 |                                   |
| Defector accounts (sourced)              |                                   |

---

## ░░ Launch Stories

| #   | Operation                 | Theme                                     |
| --- | ------------------------- | ----------------------------------------- |
| 1   | **MKUltra**               | CIA mind control & human experimentation  |
| 2   | **Operation Mockingbird** | CIA manipulation of the press             |
| 3   | **Operation Gladio**      | NATO stay-behind networks, false flag ops |

Pipeline: Iran-Contra → COINTELPRO → Church Committee → Vault 7 → Snowden docs.

---

## ░░ AI Research Pipeline

A companion local AI pipeline (`/pipeline`) for original research across the FOIA corpus:

```
Raw FOIA docs (.txt)
      ↓
OCR cleaning + chunking
      ↓
LlamaIndex + HuggingFace embeddings → ChromaDB (persistent local vector store)
      ↓
Ollama (llama3.1:8b) — document Q&A, entity extraction
      ↓
NetworkX relationship graph → Pyvis interactive visualisation
```

**What it surfaces:**

- Personnel appearing across multiple unrelated programs
- Front organisations funding operations across decades
- Timeline anomalies between official dates and document metadata
- Geographic clustering of covert activity

All processing happens locally. Nothing leaves the machine.

---

## ░░ Getting Started

```bash
# Clone
git clone https://github.com/StevenJSWE/map_project.git
cd map_project

# Install
npm install

# Dev server
npm run dev

# Build
npm run build
```

Deploys automatically to Cloudflare Pages on push to `main`.

---

## ░░ Adding a New Article

1. Create `src/content/articles/your-slug.mdx`
2. Fill in all frontmatter fields (see schema above)
3. Get coordinates: right-click → _Copy coordinates_ on Google Maps
4. Write content below the closing `---`
5. `npm run dev` — verify it appears on map and archive
6. Push to `main` → Cloudflare auto-deploys

**Rule: never publish without at least one primary source linked.**

---

## ░░ Roadmap

- [ ] Phase 2 — Content foundation: MKUltra article, archive page, article layout
- [ ] Phase 3 — Map: Leaflet integration, pins, popups, article routing
- [ ] Phase 4 — Polish: mobile responsive, OG tags, favicon, launch
- [ ] AI pipeline: entity extraction on Church Committee report as PoC
- [ ] D3.js relationship graph embedded in articles
- [ ] Cloudflare D1 + Workers for view counts
- [ ] Email newsletter (Buttondown)
- [ ] FOIA PDF viewer embedded in articles

---

## ░░ Design Language

```
Background:    #0a0a0a   near-black
Primary text:  #e5e5e5   off-white
Accent:        #39ff14   phosphor green  (headers, highlights, active states)
Danger:        #cc0000   red             (classified stamps, category tags)
Borders:       #4a4a4a   muted grey

Headings:      Russo One / Bebas Neue   — military stencil
Body:          IBM Plex Mono            — terminal/document
Labels:        ALL CAPS · tracking-widest
```

Aesthetic reference: CoD Black Ops UI × The Intercept × ICIJ document portals.

---

## ░░ License

MIT. Primary source documents (FOIA, Senate reports, court records) are US government works and are in the public domain.

---

<div align="center">

`// CLASSIFIED UNTIL DECLASSIFIED //`

Built by [Steven Baird](https://stevenbaird.dev) · Glasgow, Scotland

</div>
