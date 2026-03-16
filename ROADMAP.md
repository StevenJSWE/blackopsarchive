# ROADMAP

Strategic direction and feature plan for Black Ops Archive.

> Scope: Intelligence agencies only — CIA, MI6, Mossad, NSA, FBI, GCHQ, KGB/FSB, BND, Joint Chiefs. No paranormal, no alien content, no unverified fringe. Documented history only.

---

## Phase 1 — Foundation ✅ (Complete)

- [x] Astro + React + Tailwind + Cloudflare setup
- [x] Leaflet map with content-driven pins
- [x] MDX content schema (title, era, country, lat/lng, sources)
- [x] Archive listing page
- [x] Individual article pages
- [x] Classified aesthetic (scanlines, grain, terminal green palette)
- [x] Status system (confirmed / alleged / disputed)
- [x] Agency field
- [x] Archive filter tabs
- [x] Color-coded map markers + clustering

---

## Phase 2 — Content Depth (Next 4–6 weeks)

### High priority articles
- [ ] JFK Files 2025 — What Was Released (URGENT — live SEO event, March 2025 National Archives release)
- [ ] Operation Paperclip — 1,500+ Nazi scientists recruited by OSS/CIA
- [ ] COINTELPRO — FBI domestic surveillance and political suppression
- [ ] The Church Committee — hub article linking all exposed programs
- [ ] Frank Olson — MKUltra death, 1994 exhumation, homicide evidence
- [ ] Operation Gladio — NATO shadow armies across 15 European countries
- [ ] Iran-Contra Affair — arms, Contras, and cocaine
- [ ] Mossad: Operation Wrath of God — post-Munich Olympic assassinations
- [ ] NSA PRISM — Snowden disclosures and what was confirmed

### Content infrastructure
- [ ] Agency index pages (`/agency/cia`, `/agency/mi6`, etc.)
- [ ] Era index pages (`/era/cold-war`, etc.)
- [ ] "Related operations" field in content schema + sidebar component
- [ ] Article word count target: 600–1,200 words minimum per operation
- [ ] Source quality standard: every claim must link to a primary source (FOIA doc, Senate report, court record, official acknowledgement)

---

## Phase 3 — Discovery & Navigation (Months 2–3)

### Filtering
- [ ] Agency filter on archive page (CIA / MI6 / Mossad / NSA / FBI / Other)
- [ ] Era filter (Cold War / Vietnam / Reagan Era / Post-9/11 / Modern)
- [ ] Category filter (Regime Change / Surveillance / Assassination / Propaganda / etc.)
- [ ] Combined filter state — URL-driven (`/archive?agency=cia&status=confirmed`)

### Map improvements
- [ ] Filter map pins by agency / status / era without leaving the map
- [ ] Map legend overlay (colour key for pin status)
- [ ] Pin clustering count breakdown by status

### Search
- [ ] Full-text search across all articles (Pagefind — static, zero infrastructure)
- [ ] Tag/keyword system in content schema

---

## Phase 4 — Visual Depth (Months 3–5)

### Timeline view
- [ ] Horizontal chronological timeline of all operations (`/timeline`)
- [ ] Filter timeline by agency/era
- [ ] Click operation to navigate to article

### Relationship graph
- [ ] D3.js force-directed graph showing connections between operations, agencies, people
- [ ] "Connected operations" panel on each article page
- [ ] Nodes: operations, agencies, individuals (Dulles, Helms, Roosevelt, etc.)
- [ ] Edges: "funded by", "exposed by", "led to", "part of"

### FOIA Document viewer
- [ ] Embed actual declassified PDF pages inline in articles (iframe or PDF.js)
- [ ] Link to NSA Electronic Briefing Books (nsarchive.gwu.edu) per operation
- [ ] "Primary Documents" section on each article page, separate from Sources

### Dossier Print
- [ ] "Print Dossier" button on each article
- [ ] Generates a print-formatted view styled as an actual declassified document
- [ ] Redaction bars, classification stamps, typewriter font — shareable as image/PDF

---

## Phase 5 — Community & Revenue (Months 4–8)

### Newsletter — "The Classified Dispatch"
- [ ] Weekly briefing: one new operation, one document drop, one "this week in intel history"
- [ ] Built on Resend (transactional email) or Buttondown
- [ ] Free tier + paid tier ($8/month via Stripe)
- [ ] Integrate subscribe form in site footer and article pages

### Membership tiers
- [ ] Analyst ($5/month) — Discord access, weekly dispatch
- [ ] Handler ($15/month) — early access to new articles, vote on next operation
- [ ] Station Chief ($50/month) — credited in articles, monthly Q&A

### Merchandise
- [ ] Print-on-demand via Printful or Fourthwall
- [ ] Priority products: dossier art prints, enamel pins (CONFIRMED / ALLEGED / EYES ONLY), stickers, mugs
- [ ] Physical "Operation [X] Briefing Book" — aged-paper art prints of key operations

### Affiliate integrations
- [ ] ProtonMail / Proton VPN affiliate
- [ ] Mullvad VPN affiliate
- [ ] Amazon affiliate links on "Further Reading" book recommendations per article
- [ ] "Stay Dark" footer block with privacy tool recommendations

---

## Phase 6 — Platform Maturity (Year 2)

### User accounts
- [ ] Cloudflare D1 + Workers for user data
- [ ] Bookmarking / save operations
- [ ] Reading history
- [ ] Custom watchlists ("alert me when new documents about Operation X are released")

### Community contributions
- [ ] Submission form for researchers to propose new operations
- [ ] Moderation workflow
- [ ] Contributor credits system

### API
- [ ] Public REST API for the archive (`/api/operations`, `/api/operations/:slug`)
- [ ] Paid API tier for developers / researchers (rate-limited free + paid)
- [ ] JSON schema documentation

### AI pipeline
- [ ] Local LlamaIndex + ChromaDB + Ollama entity extraction
- [ ] Automatic "related operations" suggestions
- [ ] Entity graph auto-population from article content
- [ ] Semantic search ("find operations similar to MKUltra")

---

## Monetisation Sequence

| Stage | Trigger | Revenue Stream |
|---|---|---|
| Now | — | Amazon book affiliates on all articles |
| Now | — | ProtonMail / VPN affiliates |
| 1,000 readers/mo | — | Newsletter (free tier, build list) |
| 5,000 readers/mo | — | Newsletter paid tier ($8/mo) |
| 10,000 readers/mo | — | Patreon tiers live |
| 10,000 readers/mo | — | Merch store (Printful/Fourthwall) |
| 25,000 readers/mo | — | Sponsored newsletter editions |
| 50,000+ readers/mo | — | Online course ("Reading Declassified Documents") |
| Established brand | — | Speaking, consulting, media licensing |

---

## Content Backlog (Operations to Cover)

### Confirmed — High Priority
| Operation | Agency | Era |
|---|---|---|
| Operation Paperclip | OSS/CIA | Post-WWII |
| COINTELPRO | FBI | Cold War |
| Operation Gladio | CIA/NATO | Cold War |
| Iran-Contra | CIA | Reagan Era |
| Church Committee Assassination Plots | CIA | Cold War |
| Operation Chaos (MH-CHAOS) | CIA | Cold War/Vietnam |
| NSA PRISM | NSA | Modern |
| Abu Zubaydah / Black Sites | CIA | War on Terror |
| Operation PBSuccess (Guatemala) | CIA | Cold War |

### Confirmed — Medium Priority
| Operation | Agency | Era |
|---|---|---|
| Operation Wrath of God | Mossad | 1970s |
| Operation Entebbe | Mossad | 1970s |
| Operation Anthropoid (Heydrich assassination) | SOE/OSS | WWII |
| GCHQ Tempora (mass surveillance) | GCHQ/NSA | Modern |
| Stuxnet | NSA/Unit 8200 | Modern |
| Operation Merlin | CIA | 2000s |
| Frank Olson | CIA/MKUltra | Cold War |

### Alleged — For Coverage
| Operation | Agency | Era |
|---|---|---|
| CIA-Contra crack cocaine trafficking | CIA | Reagan Era |
| 9/11 CIA foreknowledge | CIA | 2001 |
| Ongoing Operation Mockingbird (post-Church) | CIA | Modern |
| Gary Webb's death | — | Modern |

---

## SEO Priority Targets

- `operation mkutra documents` — high volume, evergreen
- `operation mockingbird cia` — high volume, perennial
- `jfk files declassified 2025` — peak search volume NOW (March 2025 release)
- `operation northwoods documents` — moderate volume, strong informational intent
- `cia confirmed conspiracies` — navigational, medium volume
- `declassified cia operations list` — list-style SERP, high click-through
- `mossad confirmed operations` — lower volume, lower competition
- `mi6 covert operations` — lower volume, lower competition
