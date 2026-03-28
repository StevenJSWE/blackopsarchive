# Skill: Black Ops Archive — Article Writer

Use this skill whenever writing a new article for blackopsarchive.com.

---

## Trigger conditions

Use this skill when the user asks to:
- Write / create / draft an article for the archive
- "Write me an article on Operation X"
- "Add [operation name] to the archive"
- "Draft the COINTELPRO article"

---

## Pre-flight checks

Before writing, confirm or infer:

1. **Operation name** — exact historical name
2. **Status** — `confirmed` / `alleged` / `disputed` (see criteria below)
3. **Agency** — which intelligence agencies were involved
4. **Era** — Cold War / Post-WWII / Vietnam / Reagan Era / Post-9/11 / Modern / WWII
5. **Country** — countries where the operation took place (not the agency's home country)
6. **Primary location** — lat/lng for the map pin (capital city of primary country is fine)
7. **Category tags** — 2–4 from: Mind Control, Human Experimentation, Regime Change, Assassination, Surveillance, Propaganda, Domestic Operations, Covert Action, Psyops, Financial Operations, Narcotics, False Flag

Read `CLAUDE.md` (project root) if you need to refresh on conventions.

---

## Status criteria

| Status | Criteria |
|---|---|
| `confirmed` | Official government/agency acknowledgement, Senate/parliamentary hearing, declassified FOIA documents, court records |
| `alleged` | Credible investigative journalism, whistleblower testimony, circumstantial documentary evidence — no official confirmation |
| `disputed` | Official denials exist alongside credible evidence; conflicting documents; contested interpretation of confirmed facts |

---

## Article structure

Write articles as MDX files to `src/content/articles/[slug].mdx`.

### Frontmatter template

```mdx
---
title: "Operation [Name]"
date: YYYY-MM-DD
era: "Cold War"
country: ["United States"]
agency: ["CIA"]
category: ["Regime Change", "Covert Action"]
status: "confirmed"
lat: 0.0
lng: 0.0
summary: "One sentence, ~20 words. No spoilers — describe what it is, not the conclusion."
sources:
  - label: "Source Title — Year"
    url: "https://..."
---
```

### Body sections (use H2 headings)

All articles should include:

1. **## Overview** — What was it, when, who ran it, why. 2–3 paragraphs.
2. **## Background / Context** — What preceded it, what problem it was supposed to solve, geopolitical context.
3. **## Methods / Operations** — What actually happened. Specific, detailed, concrete. Use bullet lists for multiple sub-operations or tactics.
4. **## Key Figures** — Named individuals with their roles. Director, field operatives, political backers.
5. **## Exposure** — How it became known. Whistleblower, journalist, Senate hearing, FOIA, foreign government. When.
6. **## Consequences / Aftermath** — Prosecutions (or lack of), policy changes, ongoing effects.
7. **## Status** — 1–2 sentences summarising current confirmed/alleged/disputed state. Bold the status word.

Optional sections (add where relevant):
- **## The [Person] Case** — individual victim/agent deep-dives (e.g. Frank Olson in MKUltra)
- **## Documents** — if notable FOIA docs exist, list them here
- **## Legacy** — if the operation shaped doctrine, law, or subsequent ops

---

## Writing standards

- **Voice:** Factual, dry, authoritative. No sensationalism. Write like a briefing document, not a thriller.
- **Length:** 700–1,400 words in the body (not counting frontmatter)
- **Sourcing:** Every specific claim (dates, names, numbers, methods) must be traceable to a named primary source in the `sources` array. Inline source references as parenthetical e.g. *(Church Committee Report, 1977)*.
- **Links:** Use `[text](url)` for inline links to primary docs where they add direct value.
- **No speculation** beyond what sources explicitly state. Use "allegedly", "according to [source]", "documents suggest" when the evidence is less than conclusive.
- **Headings:** H2 only (`##`) for main sections. H3 (`###`) for sub-sections only if genuinely needed.
- **Lists:** Use sparingly — only for enumerated methods, personnel, or operations. Not for general prose.
- **Tone markers to avoid:** "shocking", "horrifying", "unbelievable", "conspiracy", "cover-up" — let the facts carry the weight.

---

## Source hierarchy (preferred sources)

1. CIA FOIA Reading Room — https://www.cia.gov/readingroom/
2. National Security Archive (GWU) — https://nsarchive.gwu.edu
3. Senate Intelligence Committee reports — https://www.intelligence.senate.gov
4. Church Committee Final Report — https://www.intelligence.senate.gov/sites/default/files/94755_II.pdf
5. NARA declassified records — https://www.archives.gov/research/intelligence
6. Inspector General reports
7. Court records / DOJ filings
8. Verified investigative journalism (NYT, Washington Post, The Guardian, New Yorker)

---

## File naming

- Slug = kebab-case operation name
- Examples: `operation-gladio.mdx`, `cointelpro.mdx`, `iran-contra.mdx`, `nsa-prism.mdx`
- File goes in: `src/content/articles/`

---

## Output format

Write the complete MDX file including frontmatter. Do not include ```mdx code fences in the final file — write raw MDX only.

After writing, confirm:
- [ ] Frontmatter complete and valid (all required fields present)
- [ ] Summary is ≤ 25 words
- [ ] At least 2 primary sources in sources array
- [ ] lat/lng are accurate for the operation's primary country
- [ ] status matches the evidence level
- [ ] Word count is 700+ words in the body

---

## Example output structure

```
---
title: "Operation Gladio"
date: 1990-11-26
era: "Cold War"
country: ["Italy", "Belgium", "France", "West Germany"]
agency: ["CIA", "NATO"]
category: ["Covert Action", "False Flag", "Domestic Operations"]
status: "confirmed"
lat: 41.9028
lng: 12.4964
summary: "NATO's secret Cold War stay-behind network across 15 European countries, linked to political violence and terrorism."
sources:
  - label: "Italian Parliamentary Commission on Terrorism, 2000"
    url: "https://..."
  - label: "CIA History Staff — Gladio References"
    url: "https://..."
---

## Overview

...
```
