# portfolio_brief.md — content brief for dilshersingh.com

Prepared 2026-10-12 from the job-search project. Every fact here is confirmed
and already public on the resume or LinkedIn. This file is safe to commit to the
website repo. Do not add anything that is not in this file without asking
Dilsher.

## Goal

Recruiters and hiring managers at Hong Kong fintechs, payment companies, virtual
banks, trading firms and crypto exchanges land here from the resume or LinkedIn.
In under a minute they should see: senior full stack engineer, financial-grade
reliability, end-to-end ownership, team lead with a real AI-assisted engineering
process, and onchain settlement depth. Then they should find one or two case
studies that prove it.

One site serves both tracks. Lead with reliability and ownership; web3 is depth,
not identity.

## Voice

- Plain, confident, engineer to engineer. First person.
- No contractions in site copy ("I am", "I do not").
- Never use: passionate, results-driven, synergy, leveraged, spearheaded,
  rockstar, ninja, "AI engineer", "GenAI", "LLM expert".
- Avoid em-dash-heavy cadence and triple adjectives. Numbers over adjectives.

## Hero

- Name: Dilsher Singh
- Title: Senior Full Stack Engineer
- One line: I build financial systems that have to be right every time.
- Sub-line: TypeScript/Node.js and React/Next.js in Hong Kong. I own a
  settlement pipeline that has paid investors 12,500+ times over 17 consecutive
  months, 100% on time.
- Badges or small facts: Hong Kong Permanent Resident · Team lead (5 engineers)
  · Hacken-audited settlement contracts (9.1/10)
- Calls to action: Email (dilsher07singh@gmail.com), LinkedIn
  (https://linkedin.com/in/dilsher07singh), GitHub
  (https://github.com/dilsher07singh), Resume (PDF download, filename
  Dilsher_Singh_Resume.pdf; Dilsher supplies the file)

## About (3 short paragraphs)

I joined Dualmint in 2022 and shipped the first production version of its
equipment-financing marketplace across the Next.js client, the Node.js/Express
backend and the settlement contracts, which Hacken audited at 9.1/10. Since my
promotion to senior in 2025, I own the TypeScript backend for 1,500+ financed
assets, lead a team of five engineers and gate merges across 10 repositories.

Most of my work is about making money movement boring. Every payout is held
until IoT telemetry, bank data and operator reports agree. A daily idempotent
reconciliation job has found zero ledger-to-settlement discrepancies since April
2025, and event-log replay repaired 13 corrupted records without changing a
single user balance.

Settlement runs onchain, so I also work in Solidity, EIP-712 signing and
multi-chain infrastructure, including a Chainlink CRE workflow live on Solana
mainnet backed by a US$90,000 Solana Foundation grant. I also designed the
AI-assisted process my team ships through: coding agents working from PRDs and
scoped backlog issues, with strict TypeScript, pre-commit checks and human
review on every merge.

## Experience (short)

- Senior Full Stack Engineer, Dualmint, Hong Kong, Jan 2025 – Present
- Full Stack Engineer, Dualmint, Hong Kong, Jun 2022 – Jan 2025
- BEng Computer Engineering, Hong Kong University of Science and Technology,
  2018 – 2022

Keep experience brief on the site; the resume carries the detail. Link the
resume PDF.

## Selected work (problem → constraints → design → result)

Label the section "Selected work", not "Case studies" (a design-portfolio term).
Publish 1, 2 and 4 first; 3 and 5 are optional later additions. Each is a short
page or expandable card of 200–350 words, with a 2-line summary and the result
number visible without clicking. No code from Dualmint repos, no internal repo
names, no client or investor names, no architecture diagrams that reveal private
infrastructure. Describe the design at the level a senior interviewer would
discuss on a whiteboard.

### 1. Payouts that wait for agreement (lead case study, both tracks)

- Problem: pay investors from operator revenue on time, every cycle, without
  ever paying out on bad data.
- Constraints: three independent sources (IoT telemetry, bank data, operator
  reports) that can disagree; payouts are money and cannot be clawed back
  casually.
- Design: three-way reconciliation gates every payout; a daily idempotent job
  replays the prior 24 hours of settlement events against ingested records,
  emails an audit report, sorts discrepancies into three classes and auto-fixes
  only the actionable one. Principle: never lower a balance automatically,
  because that destroys authoritative data; log it and let a human decide.
- Result: 12,500+ payout cycles over 17 consecutive months, 100% on time; zero
  ledger-to-settlement discrepancies since April 2025; 13 corrupted records
  repaired by event-log replay with pre-state verification and zero balances
  changed.

### 2. Migrating a live platform without stopping trading (fintech)

- Problem: a revenue-carrying marketplace on aging versions (Next.js 12,
  React 17, web3.js).
- Design: staged upgrades Next.js 12 → 15, React 17 → 19, web3.js → ethers v6;
  one upgrade deliberately rolled back when shipping safety warranted it, then
  redone later.
- Result: zero trading interruption across the whole migration.

### 3. Deploys that roll themselves back (platform/infra)

- Problem: a production outage taught the team that deploys need a safety net.
- Design: three environments; health-gated releases; automatic rollback on a
  failed health check; liveness-only health endpoint so a slow dependency never
  blocks the gate.
- Result: proven by deliberately pushing a commit that crashes on boot and
  watching the rollback happen.
- Note: do not describe the outage itself in detail on the site; keep it to
  "after an incident".

### 4. An AI-assisted SDLC a team actually uses (leadership)

- Problem: get the speed of coding agents without lowering the quality bar.
- Design: PRD-driven specs and per-repo agent scaffolding (AGENTS.md, agent
  skills), agent-generated code gated by strict TypeScript, lint and pre-commit
  checks, and human review on every merge.
- Result: adopted by all 5 engineers across 10 repositories; merge gatekeeper on
  435 of 592 client merges.
- Framing: this is an engineering process, not an AI product.

### 5. Onchain settlement and telemetry commitments (web3, optional)

- Chainlink CRE workflow live on mainnet, committing IPFS-pinned telemetry to a
  Solana Anchor receiver every 30 seconds: 2,880 DON-verified writes per day at
  a constant 84-byte commitment. Backed by a US$90,000 Solana Foundation grant.
- Settlement contracts audited at 9.1/10 by Hacken; vault driven to 97.6%
  statement coverage across 523 tests.

## Skills section

- Backend: TypeScript, Node.js, Express, REST APIs, PostgreSQL, MongoDB,
  Webhooks, Redis/BullMQ, Vitest
- Frontend: React, Next.js, Tailwind CSS, TanStack Query, Zod, Recharts
- Infra: AWS (EC2, SES, CloudWatch), PM2, Docker, GitHub Actions, Sentry,
  Datadog
- Onchain: Solidity, Hardhat, Foundry, OpenZeppelin, ethers.js, viem, EIP-712,
  Chainlink CRE, Solana Anchor
- Engineering process: Claude Code, agentic coding with human review, TDD

## Never claim (binding)

- Any production LLM or AI product feature. The AI credential is the AI-assisted
  SDLC.
- LangChain, LangGraph, RAG or Vercel AI SDK as production work. They may appear
  only on a clearly labelled personal project once that repo is public.
- Production Python, C++ or Kubernetes.
- TypeScript on the marketplace client (the client is JavaScript).
- "2-of-3" reconciliation; settlement reconciliation is three-way.
- CI-gated tests (quality gates run in pre-commit hooks; the only CI gate is a
  static-analysis gate on the vault).
- An audit of the token or exchange contracts; ERC-2981 royalties.

## Never publish

- Salary, notice period, languages, or job-search status. No "open to work"
  banner.
- Security incident details (admin-key compromise, outage timelines), internal
  repo names, investor names, underwriting weights or formulas.
- Anything from the private job-search files other than this brief.

## Technical checklist

- Mobile-first; fast (no heavy animation on the hero).
- Real page title and meta description; Open Graph image with name and title.
- Resume PDF linked and downloadable.
- All external links use full https:// URLs.
- Run a Lighthouse pass and keep the results JSON.

## Decisions since the brief (2026-10-12)

- Ipseity Network stays on the site (internship and project), even though the
  brief's experience list does not include it.
- No resume PDF on the website. The Resume call to action and the "link the
  resume PDF" items above are deliberately not implemented.
- The GitHub Contributions section stays, fetched at build time by
  scripts/fetch-github.mjs as before (no serverless function).
- The AI collaborative editor (Notion-style) is shown as a clearly labelled
  personal project. Its AI features are personal-project work, not a
  production AI claim.
