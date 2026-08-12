# Content review

**Status: proposal only. No copy has been changed.**

Every "After" block below is a suggestion awaiting approval. Nothing in `src/`,
`index.html` or any other source file was modified by the commit that added this
document — see [Verification](#verification) at the end.

Reviewed 2026-08-12 against `main` at `982d1c5`. Line numbers refer to that
commit.

Copy lives in five places, and it is worth knowing all five before reading on:

| Source | What it holds |
| --- | --- |
| `src/constants/index.js` | `HERO_CONTENT`, `ABOUT_TEXT`, `METRICS`, `EXPERIENCES`, `PROJECTS`, `CONTACT` |
| `src/components/About.jsx:4-9` | the `HIGHLIGHTS` fact card (copy, not layout) |
| `src/components/Hero.jsx:47,57` | the role line and the location/degree line |
| `src/components/Contact.jsx:43-45` | the "open to conversations" paragraph |
| `index.html:55-104` | `<title>`, `description`, `og:*`, `twitter:*`, JSON-LD |

---

## Summary of findings

| # | Finding | Severity | Decision needed from you? |
| --- | --- | --- | --- |
| 1 | Voice shifts third → first person mid-paragraph in `HERO_CONTENT` | Medium | No — one clear fix |
| 2 | Five figures repeat across 2–4 locations each | Medium | Yes — pick the owners |
| 3 | Experience entry 1 runs ~one figure per 8 words | Medium | No — mechanical split |
| 4 | "so no settlement event is silently dropped" is an unhedged absolute | High | Yes — depends on a fact only you know |
| 5 | Metric label says "production systems", prose says "production financial infrastructure" | Low | No |
| 6 | WhatsApp link is a +91 India number; the site positions Hong Kong throughout | Low | Yes — explicitly your call |
| 7 | Hardhat and ethers.js render the identical Ethereum glyph | Low | Yes — pick a remedy |

Finding 4 is the only one I would call urgent. It is the single sentence on the
page most likely to be challenged in an interview, and it is challengeable on
its wording alone.

---

## 1. Voice shift in `HERO_CONTENT`

`src/constants/index.js:28`. The paragraph opens in résumé third person — a
subjectless noun phrase — then switches to first person at the second sentence
and stays there.

**Before**

> Senior full stack engineer with 5 years building production financial
> infrastructure in Hong Kong. **I built** Dualmint's equipment-financing
> marketplace end to end — the TypeScript/Node.js backend, the Next.js clients,
> and the settlement layer that routes verified machine revenue to investors.
> Promoted to senior in 2025; **I now lead** a team of 5 and own backend and
> infrastructure.

The rest of the site is consistently first person (`ABOUT_TEXT`,
`PROJECTS[0].description`, the Contact paragraph), so first person is the
established voice and the opening fragment is the outlier.

**After** — first person from the first word:

> I'm a senior full stack engineer in Hong Kong, building production financial
> infrastructure. I built Dualmint's equipment-financing marketplace end to end
> — the TypeScript/Node.js backend, the Next.js clients, and the settlement
> layer that routes verified machine revenue to investors. I was promoted to
> senior in 2025 and now lead a team of 5, owning backend and infrastructure.

Note this rewrite also drops the "5 years" digit, per finding 2. If you reject
finding 2, restore it as "…in Hong Kong, with 5 years building production
financial infrastructure."

**Alternative, if you prefer the third-person opener** — keep it, but hold it
for the whole paragraph:

> Senior full stack engineer with 5 years building production financial
> infrastructure in Hong Kong. Built Dualmint's equipment-financing marketplace
> end to end — the TypeScript/Node.js backend, the Next.js clients, and the
> settlement layer that routes verified machine revenue to investors. Promoted
> to senior in 2025; now leads a team of 5 and owns backend and infrastructure.

I recommend the first. The third-person version reads as a CV summary pasted
onto a personal site, and it clashes with the `<h1>` immediately above it, which
is your own name.

One consequence to be aware of: the hero paragraph is prerendered into
`dist/index.html` (RENDER-002) and is what a search snippet may draw from. A
first-person opener is fine there; it just means the visible page and the
`<meta name="description">` — which is third person and stays that way — no
longer share an opening phrase. That is normal and not a problem.

---

## 2. Metric repetition

Five figures each appear in 2–4 separate on-page locations. A reader scrolling
top to bottom meets the same small set of numbers repeatedly, which makes the
page feel padded rather than substantiated.

### Where each figure appears today

**"5 years" / "five years" — 3 on-page + 3 in meta**

| Location | Text |
| --- | --- |
| `HERO_CONTENT` (`constants/index.js:28`) | "with 5 years building production financial infrastructure" |
| `METRICS[0]` (`:37`) | value `"5"`, label "Years building production systems" |
| `ABOUT_TEXT` ¶1 (`:30`) | "where I've spent the last five years building the systems that move real money" |
| `index.html:58` | `<meta name="description">` |
| `index.html:71` | `og:description` |
| `index.html:95` | `twitter:description` |

The hero prose and the `METRICS` tile both sit inside `<section id="hero">`, so
two of those three land in the same viewport.

**"8,700+ payout cycles … 100% on-time" — 3 places, two of them verbatim**

| Location | Text |
| --- | --- |
| `METRICS[2]` (`:39`) | `"8,700+"` / "Payout cycles, 100% on-time" |
| `ABOUT_TEXT` ¶2 (`:32`) | "8,700+ payout cycles across 14+ consecutive months at 100% on-time" |
| `EXPERIENCES[0]` bullet 2 (`:67`) | "8,700+ payout cycles across 14+ consecutive months at 100% on-time" |

Those last two are **byte-identical substrings** — verified, the exact string
occurs twice in `constants/index.js`. Not a paraphrase; the same clause pasted
twice.

**"9.1/10 Hacken audit" — 3 places**

| Location | Text |
| --- | --- |
| `METRICS[3]` (`:40`) | `"9.1/10"` / "Hacken smart contract audit score" |
| `EXPERIENCES[1]` bullet 2 (`:89`) | "Wrote the Solidity settlement contracts, audited 9.1/10 by Hacken." |
| `PROJECTS[0].description` (`:120`) | "including the Solidity contracts audited 9.1/10 by Hacken" |

**"team of 5" — 4 places, three of them near-identical**

| Location | Text |
| --- | --- |
| `HERO_CONTENT` (`:28`) | "I now lead a team of 5 and own backend and infrastructure" |
| `ABOUT_TEXT` ¶3 (`:34`) | "as much time on architecture and mentoring my team of 5" |
| `HIGHLIGHTS` (`About.jsx:6`) | "A team of 5, owning backend and infrastructure" |
| `EXPERIENCES[0]` bullet 7 (`:72`) | "Lead a team of 5, owning backend and infrastructure direction." |

Three of the four pair the count with "backend and infrastructure" in almost the
same words. This is the most repetitive figure on the page.

**"1,500+ assets" — 2 places**

| Location | Text |
| --- | --- |
| `METRICS[1]` (`:38`) | `"1,500+"` / "Physical assets originated on-platform" |
| `EXPERIENCES[0]` bullet 1 (`:66`) | "marketplace of 1,500+ originated physical assets" |

### Proposed ownership rule

The `METRICS` grid is an **index**, not prose — its entire job is to hold
headline figures. So the rule I would apply is:

> A headline figure appears at most twice: once in the `METRICS` tile, and once
> in the single prose location that supplies the mechanism behind it. Everywhere
> else, the claim survives without the number.

Applied:

| Figure | Metrics tile | Prose owner | Drop the number from |
| --- | --- | --- | --- |
| 5 years | keep | *(none — the tile alone)* | `HERO_CONTENT`, `ABOUT_TEXT` ¶1 |
| 8,700+ / 100% / 14+ months | keep | `EXPERIENCES[0]` bullet 2 — the only place that explains the 2-of-3 verification that makes it mean anything | `ABOUT_TEXT` ¶2 |
| 9.1/10 Hacken | keep | `EXPERIENCES[1]` bullet 2 — where the contracts were actually written | `PROJECTS[0].description` |
| team of 5 | *(not a tile)* | `HIGHLIGHTS` "Leading" row — an at-a-glance fact card is exactly the right home | `HERO_CONTENT`, `ABOUT_TEXT` ¶3, `EXPERIENCES[0]` bullet 7 |
| 1,500+ | keep | `EXPERIENCES[0]` bullet 1 | *(already compliant — no change)* |

"5 years" gets no prose owner because it is a fact with no mechanism; it is pure
index material. `EXPERIENCES[0]` bullet 7 loses the count but keeps the
responsibility, because a résumé bullet that says only what the highlight card
already says is dead weight either way.

### Before / after for each drop

**`HERO_CONTENT`** — see finding 1; the recommended rewrite already drops "5
years" and re-phrases the team line:

> …I was promoted to senior in 2025 and now lead the backend and infrastructure
> team.

**`ABOUT_TEXT` ¶1**

Before:

> I'm a full stack engineer based in Hong Kong, where I've spent the last five
> years building the systems that move real money.

After:

> I'm a full stack engineer based in Hong Kong, building the systems that move
> real money.

**`ABOUT_TEXT` ¶2** — the figure moves out, the principle stays. This is the
paragraph that suffers most from restating a number the reader already met two
sections up:

Before:

> Most of what I do is unglamorous by design. Payouts have to land on time every
> month, so I build for verification and recovery first — multi-source
> reconciliation, crash-safe ledgers, deep test coverage, and infrastructure
> that behaves the same in every environment. **The result is 8,700+ payout
> cycles across 14+ consecutive months at 100% on-time.**

After:

> Most of what I do is unglamorous by design. Payouts have to land on time every
> month, so I build for verification and recovery first — multi-source
> reconciliation, crash-safe ledgers, deep test coverage, and infrastructure
> that behaves the same in every environment. **Nothing about that is visible
> when it works, which is the point.**

**`ABOUT_TEXT` ¶3**

Before:

> These days I spend as much time on architecture and mentoring my team of 5 as
> I do writing code.

After:

> These days I spend as much time on architecture and mentoring as I do writing
> code.

**`PROJECTS[0].description`**

Before:

> …and the settlement layer that routes verified machine revenue to investors —
> including the Solidity contracts audited 9.1/10 by Hacken.

After:

> …and the settlement layer that routes verified machine revenue to investors,
> down to the Solidity settlement contracts.

**`EXPERIENCES[0]` bullet 7**

Before:

> Lead a team of 5, owning backend and infrastructure direction.

After:

> Set backend and infrastructure direction, and run the hiring and code review
> that keeps it consistent.

Only accept that last one if it is true — I am proposing the shape, not
asserting the facts.

### A second reason to de-duplicate

"5 years" ages. Today (2026-08-12) it is accurate on the internship-inclusive
reading — Apr 2021 to now is 5 years 4 months — and just short on the
Dualmint-only reading, since Sep 2021 to now is 4 years 11 months. Either way it
becomes "6 years" around Q3 2027, and right now that edit has to be made in
**six** places. After the change above, four (the tile plus the three meta
tags), and the three meta tags are adjacent lines in one file.

---

## 3. Number density in Experience entry 1

`EXPERIENCES[0]`, `src/constants/index.js:65-73`. Seven bullets, 177 words,
**20 discrete figures** — roughly one every 8–9 words:

1,500+ · 2-of-3 · ±10% · 8,700+ · 14+ · 100% · 8 · three · 5 · 4-tier ·
four-pillar · 20 · 156 · 94% · 32.6 · 205 · zero · 7 · 3 · 5

(21 if you count `2-of-3` as two figures. `AWS EC2` and `PM2` are product names
and are not counted.)

Individually each is a strong, specific claim. Read consecutively they stop
registering — the reader's eye skips the digits and the whole entry flattens
into noise. The fix is not to remove figures, it is to give the dense bullets
room.

**One correction to this item's premise.** The PRD says "bullet 6 is a 47-word
single sentence". As the copy stands today bullet 6 is **31 words** (251
characters), and the longest bullet in the entry is bullet 2 at 36 words. The
word count appears to be stale from an earlier draft. The substance holds
regardless: bullet 6 is one sentence, it does carry a four-item parenthetical,
and it bundles two unrelated pieces of work.

### Bullet 6 — split it

Before (31 words, one sentence):

> Standardized infrastructure across 7 repositories (agent-assisted code
> workflows, pre-commit hooks, lint-staged, strict TypeScript) and migrated the
> platform off serverless onto AWS EC2 with PM2 and health-checked GitHub
> Actions across 3 environments.

The "and" in the middle joins two achievements that have nothing to do with each
other — repo tooling, and a hosting migration. Split:

After (two bullets):

> Standardized tooling across 7 repositories: strict TypeScript, pre-commit
> hooks and lint-staged, plus agent-assisted code workflows.
>
> Migrated the platform off serverless onto AWS EC2 with PM2, deployed by
> health-checked GitHub Actions across 3 environments.

The parenthetical becomes the substance of its own bullet rather than an aside,
and the migration — the bigger of the two — stops being a subordinate clause.

### Bullet 2 — the densest one, worth a second look

Six figures in 36 words. Before:

> Built the revenue-distribution pipeline: a 2-of-3 verification model
> reconciling IoT telemetry, bank transaction data and operator reports within a
> ±10% tolerance before any payout clears — 8,700+ payout cycles across 14+
> consecutive months at 100% on-time.

After — same evidence, two sentences, "2-of-3" spelled out as the rule it
actually is:

> Built the revenue-distribution pipeline: no payout clears until two of three
> independent sources — IoT telemetry, bank transactions and operator reports —
> agree within a ±10% tolerance. 8,700+ cycles, 14 consecutive months, 100%
> on-time.

The results now sit in their own sentence instead of trailing an em dash, which
is also what makes them safe to drop from `ABOUT_TEXT` in finding 2: this
becomes the one place that both states the number and earns it.

---

## 4. The unhedged absolute: "so no settlement event is silently dropped"

`EXPERIENCES[0]` bullet 3, `src/constants/index.js:68`. **This is the finding I
would act on first.**

Before:

> Designed provider-agnostic on-chain event ingestion spanning 8 webhook
> endpoints, three data providers and 5 chains, with a 4-tier receipt-fetch
> fallback **so no settlement event is silently dropped**.

The claim is a universal negative about a distributed system. A fallback chain
lowers the probability that any one provider's miss becomes your miss; it cannot
establish that no event is ever lost. All three providers can be down at once, a
chain can reorg past your last cursor, a webhook can be dropped before it
reaches any tier. An interviewer who works on this class of system will ask
"how do you know?", and the honest answer — "we haven't seen one" — is much
weaker than the sentence implies.

Note that "silently" is doing the real work. The defensible claim is about
**detection**, not about never missing.

**After, option A — mechanism-based.** Use this if a dead-letter/reconciliation
path genuinely exists:

> Designed provider-agnostic on-chain event ingestion across 5 chains, three
> data providers and 8 webhook endpoints. A 4-tier receipt-fetch fallback
> retries through each provider in turn, and anything that exhausts all four
> tiers is persisted and alerted on — so a miss surfaces as an alert instead of
> a silent gap.

This is strictly stronger in an interview than the original, because it names
the thing that makes the claim checkable, and it keeps "silent" as the word it
disproves.

> **I cannot verify that this path exists** — the codebase is not in this repo.
> If there is no dead-letter store and no alert, option A is a worse problem
> than the sentence it replaces. Only use it if you can point at the code.

**After, option B — scope-limited.** Use this if the fallback is all there is:

> Designed provider-agnostic on-chain event ingestion across 5 chains, three
> data providers and 8 webhook endpoints, with a 4-tier receipt-fetch fallback
> that recovers events missed by any single provider.

Weaker as a headline, unimpeachable in a follow-up question, and still says the
interesting thing — that the design does not trust one provider.

Recommendation: **option A if the alerting exists, option B otherwise.** Do not
keep the current wording.

One related note while you are in this bullet: `four-pillar` (bullet 4) and
`4-tier` (bullet 3) are both spelled-out-vs-digit hybrids, and `three data
providers` in bullet 3 is spelled out while `8` and `5` beside it are digits.
Whichever wording you land on, pick one convention per bullet.

---

## 5. Metric label mismatch

`METRICS[0]`, `src/constants/index.js:37`.

| Surface | Phrase |
| --- | --- |
| `METRICS[0].label` | "Years building production **systems**" |
| `HERO_CONTENT` | "5 years building production **financial infrastructure**" |
| `index.html:58` / `:71` / `:95` | "5 years building production **financial infrastructure**" |

Four of the five surfaces agree; the tile is the outlier, and it is the weaker
phrase — "production systems" could describe almost any backend job, while
"financial infrastructure" is the specific thing that makes the rest of the page
credible. The tile is also the most-read of the five, being large type above the
fold.

**Before:** `Years building production systems`

**After:** `Years building financial infrastructure`

Why not the exact hero phrase, "Years building production financial
infrastructure"? Length. The four labels currently run 4, 4, 4 and 5 words, and
the grid is `lg:grid-cols-4` — six words would make this the longest label by
some margin and risks wrapping to an extra line on desktop, which would leave
one tile taller than its three neighbours. Five words keeps it in family while
recovering the word that matters. If you prefer exact parity with the hero,
that is fine too — just check the tile heights at ≥1024px afterwards, since it
is a layout question, not a copy one.

---

## 6. WhatsApp is a +91 India number

`CONTACT.whatsapp`, `src/constants/index.js:160`:
`https://wa.me/919740071441` → country code 91, i.e. **+91 97400 71441**, an
Indian mobile number.

The site positions Hong Kong throughout: `CONTACT.address` is "Hong Kong SAR",
`ABOUT_TEXT` ¶3 says "Hong Kong Permanent Resident", `HIGHLIGHTS` says "Hong
Kong · Permanent Resident", the `<title>` ends "…, Hong Kong", and the JSON-LD
`PostalAddress` is `addressCountry: "HK"`. A recruiter screening for work rights
reads the one piece of contact data they can decode, and it says India.

**This is explicitly your call, and the severity is lower than it first looks.**

`Contact.jsx:78-90` renders the WhatsApp entry as an **icon only** — the anchor's
visible content is `<Icon aria-hidden="true" />`, with the number appearing only
inside the `href`. So the digits are never displayed as text; they show in the
browser status bar on hover, in the DOM, and in the WhatsApp app once the link
opens. The same is true of the navbar's copy of the link. That is a real
mitigation, though not a hiding place — anyone who hovers sees it.

Options, in the order I would consider them:

1. **Leave it.** It is a working number, WhatsApp is country-agnostic, plenty of
   HK residents keep an Indian number, and the digits are not rendered. Zero
   work. Accepts a small risk that a hovering recruiter reads it as a
   contradiction.
2. **Swap to a Hong Kong number** if you have one on WhatsApp. Removes the
   ambiguity entirely; a one-value change in `constants/index.js`.
3. **Keep the link but not in the Contact section.** Remove `"whatsapp"` from
   `CONTACT_SOCIAL_IDS` (`Contact.jsx:8`) so the three prominent reach-out
   channels are email, LinkedIn and GitHub, and WhatsApp stays in the navbar
   only. Reduces exposure without dropping the channel.
4. **Drop WhatsApp entirely.** Cleanest signal, loses a channel you presumably
   want.

I lean to 2 if such a number exists, 1 if it does not. Option 3 is a reasonable
middle if you want the channel but not next to "Hong Kong SAR", which is
literally the line above it in the rendered section.

---

## 7. Hardhat and ethers.js render the identical icon

`src/components/Technologies.jsx:34-35`:

```js
hardhat: SiEthereum,
ethers:  SiEthereum,
```

Confirmed against the installed dependency: **react-icons 5.3.0 has no
`SiHardhat`** — zero matches in `react-icons/si`. The existing comment at
`Technologies.jsx:19-20` already documents the stand-in, so this is a known
compromise rather than an oversight.

Why it reads badly on screen: the two entries are **adjacent** in `TECHNOLOGIES`
(`constants/index.js:56-57`, positions 13 and 14 of 14), so they render side by
side at the end of the grid — the duplication is maximally visible. Worse, they
carry different colours (`text-yellow-500` and `text-indigo-400`), so it is the
same glyph in two colours, which reads as a bug rather than a deliberate choice.
Every other chip in the grid has a distinct mark.

> **Trap for whoever implements this:** react-icons *does* ship `PiHardHat`,
> `PiHardHatFill`, `LiaHardHatSolid` and friends. Those are **construction
> helmets**, not the Hardhat framework logo. Dropping one of those into a
> developer-tools grid is worse than the current state.

Options:

1. **Drop Hardhat from `TECHNOLOGIES`.** My recommendation. It is a build tool
   sitting in a grid otherwise dominated by languages, runtimes and services,
   and the skill is not lost — Hardhat still appears as a chip on
   `EXPERIENCES[1].technologies` (`constants/index.js:99`). The grid goes to 13
   entries and every mark is distinct. ethers.js keeps `SiEthereum`, which is
   fair: it *is* an Ethereum library.
2. **Custom inline SVG** of the Hardhat mark. Most faithful, and the only option
   that keeps the entry with a correct icon. Costs a new asset, and the Hardhat
   logo is Nomic Foundation's trademark — worth a glance at their brand terms
   before shipping it on a commercial-adjacent site.
3. **Text-only chip.** `Technologies.jsx:67-69` already guards with
   `{Icon ? <Icon … /> : null}`, so setting `icon: null` on the Hardhat entry
   degrades cleanly with **no component change at all** — a one-word data edit.
   The downside is a chip visibly lighter than its 13 neighbours, which trades
   one oddity for another. Good as a stopgap, not as the destination.

Note this one is a change to `TECHNOLOGIES`, which is closer to configuration
than to prose — but it is still copy in the sense that matters here, so it is
proposed and not applied like everything else in this document.

---

## Things I noticed that are not in scope

Recorded so they are not rediscovered; **no action proposed**, and none of these
are content defects.

- `HIGHLIGHTS` gives the degree as "BEng Computer Engineering, HKUST
  (2018–2022)" while `Hero.jsx:57` renders "Hong Kong · BEng Computer
  Engineering, HKUST". The duplication is harmless — different surfaces, one
  carries dates — but note the 2022 graduation sits alongside a Sep 2021
  full-time start. That is ordinary (final-year employment) and needs no
  explanation on the page; it is only worth knowing that an attentive reader can
  see it.
- `PROJECTS[2]` links to
  `https://notion-clone-youtube-six.vercel.app/`. The URL says "notion-clone-
  youtube", i.e. a tutorial build, next to a description that reads as original
  work. Not a copy problem — the description makes no originality claim — but it
  is the one visible link on the page whose hostname undercuts its own card.
  Renaming the Vercel project would fix it without touching any copy.
- The Contact paragraph (`Contact.jsx:43-45`) is the only body copy outside
  `src/constants/`. If a future item centralizes copy, that is the straggler.

---

## Verification

CONTENT-001 step 8 requires proof that this item changed no source.

```
$ git diff --name-only src/ | wc -l
0
$ git show --stat HEAD -- src/ index.html | wc -l
0
```

The commit carrying this document touches `docs/content-review.md`,
`plans/prd.json` and `progress.txt` only. Every rewrite above is inert until you
approve it.
