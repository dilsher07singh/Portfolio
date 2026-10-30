import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { GITHUB_URL } from "./site";
import ipseityScreenshot from "../assets/optimized/project-3.webp";
// Emitted by scripts/optimize-images.mjs. Used for the width/height attributes
// so the browser can reserve the right box before the image loads; generated
// rather than hardcoded so it stays in step with the encode settings.
import dimensions from "../assets/optimized/dimensions.json";

// Re-exported so components have one import path for constants, while
// ./site.js stays importable by the Node build scripts and the API route.
export { GITHUB_USERNAME, GITHUB_URL } from "./site";

// Every fact in this file comes from docs/portfolio_brief.md. Do not add a
// figure, employer detail or technology that is not in the brief without
// checking with Dilsher first. The brief's voice rules apply here too: first
// person, no contractions, numbers over adjectives.

// The chip used by Skills.jsx and Work.jsx. Tailwind scans this file, so the
// utilities are still emitted.
export const CHIP_CLASS =
  "rounded border border-purple-900/40 bg-purple-950/40 px-2 py-1 text-sm font-medium text-purple-300";

export const HERO = {
  name: "Dilsher Singh",
  title: "Senior Full Stack Engineer",
  tagline: "I build LLM features and financial systems that have to be right every time.",
  subline:
    "TypeScript/Node.js and Python in Hong Kong. I shipped an LLM pipeline that turns legal documents into code-verified payout terms, and I own a settlement pipeline that has paid investors 13,800+ times over 18 consecutive months, 100% on time.",
  badges: [
    "Hong Kong Permanent Resident",
    "Team lead (5 engineers)",
    "LLM extraction in production",
  ],
};

// Deliberately not the 13,800+ payout figure: the hero sub-line already leads
// with it, and repeating it a few centimetres lower dilutes it. The 99% is a
// field accuracy figure for these 12 templates only; never round it to 100%.
export const METRICS = [
  {
    value: "99%",
    label: "Field accuracy on a human-verified eval, 12 document templates",
  },
  { value: "1,342", label: "Legal documents covered by the LLM extraction pipeline" },
  { value: "0", label: "Ledger-to-settlement discrepancies since April 2025" },
  { value: "10", label: "Repositories where I gate merges" },
];

export const ABOUT_TEXT = `I build LLM features for systems where a wrong number costs real money. In October 2026 I shipped one at Dualmint: a Python pipeline that extracts the legally committed yield terms from 1,342 asset provenance documents, verifies every quote against the source page in code, and has a person confirm the terms before our TypeScript backend checks each monthly payout against them. The model never decides a money value.

I have built the same equipment-financing marketplace since 2022: the Next.js client, the Node.js/Express backend and the settlement contracts, which Hacken audited at 9.1/10. I joined Ipseity Network as an intern in 2021 and as a full stack engineer in 2022. When Dualmint was formed in 2025 from the merger of five companies, I was assigned to lead its platform as Senior Full Stack Engineer. Today I own the TypeScript backend for 1,500+ financed assets, lead a team of five engineers and gate merges across 10 repositories.

Most of my work is about making money movement boring. Every payout is held until IoT telemetry, bank data and operator reports agree. A daily idempotent reconciliation job has found zero ledger-to-settlement discrepancies since April 2025, and event-log replay repaired 13 corrupted records without changing a single user balance.

Settlement runs onchain, so I also work in Solidity, EIP-712 signing and multi-chain infrastructure, including a Chainlink CRE workflow live on Solana mainnet backed by a US$90,000 Solana Foundation grant. I also designed the AI-assisted process my team ships through: coding agents working from PRDs and scoped backlog issues, with strict TypeScript, pre-commit checks and human review gating merges. Earlier, at Ipseity Network, I worked on privacy-preserving data products: a consent-based data marketplace and a React Native identity wallet.`;

// "Selected work" in the brief's problem → constraints → design → result shape.
// No internal repo names, client or investor names, template identifiers,
// yield values, or anything that reveals private infrastructure. A section
// given as a string renders as a paragraph, an array as a bullet list;
// `evals`, `limits` and `tags` are optional.
export const CASE_STUDIES = [
  {
    id: "llm-extraction",
    title: "LLM extraction that never decides a money value",
    summary:
      "A Python pipeline extracts the committed yield terms from legal PDFs with every quote verified in code. A person confirms them, and the TypeScript backend checks each payout against them.",
    result:
      "1,342 documents through 12 templates, 99% field accuracy on a human-verified eval. Shipped October 2026.",
    problem:
      "Every financed asset on Dualmint comes with provenance documents that state, in legal language, the yield an investor is promised. Payouts were checked against values in our database, not against what those documents actually committed to.",
    constraints: [
      "The documents are PDFs in a dozen layouts, some scanned and some inconsistent with themselves.",
      "A model can misread a number or invent one, and a payout check built on a wrong number is worse than no check at all.",
    ],
    design: [
      "I grouped the 1,342 documents into 12 templates by fingerprinting their layout, so the model extracts once per template plus two spot-checks, not once per document. The whole build cost about US$8 in API calls.",
      "Every extracted value must come with a page and a quote. Code checks that the quote exists on that page and contains the value, and rejects anything that fails. Output is validated against a schema before it goes anywhere.",
      "When a document states two different values for the same term, neither the model nor the code picks one. The field stays empty and every mention goes to a person.",
      "An admin reviews and confirms each template's terms in a review screen. Confirmed terms are never edited in place; a changed document goes back through intake as new provenance. Ingest is idempotent, so re-running the pipeline never creates duplicates.",
      "On every monthly yield deposit, the TypeScript backend compares the payout with the confirmed terms and reports the result, match or not.",
    ],
    evals:
      "I labelled gold answers for all 12 templates and checked them field by field. The first run scored 90%, and most of the mismatches turned out to be mistakes in my own labels, not the model. After fixing the labels and narrowing one over-broad rule, the pipeline reached 99% field accuracy on the human-verified eval set.",
    results:
      "Shipped to production in late October 2026. All 12 templates are confirmed, and the first payouts it checked all matched the confirmed terms.",
    limits:
      "The 99% figure holds for these 12 templates. Quote verification proves a quote exists, not that it is the right clause, which is why a person confirms every template before any payout is checked against it. The model never decides a money value.",
    tags: [
      "Python",
      "Anthropic API",
      "Pydantic",
      "structured extraction",
      "LLM evals",
      "TypeScript",
      "Node.js",
    ],
  },
  {
    id: "payouts",
    title: "Payouts that wait for agreement",
    summary:
      "Investor payouts are held until three independent data sources agree, and a daily replay job checks the ledger against settlement.",
    result: "13,800+ payouts over 18 consecutive months, 100% on time",
    problem:
      "Investors are paid from the revenue operators earn with financed machines. Every cycle has to pay out on time, and no cycle can pay out on bad data.",
    constraints: [
      "Revenue is reported by three independent sources: IoT telemetry, bank data and operator reports. They can disagree.",
      "A payout is money. Once it has gone out, it cannot be clawed back casually.",
    ],
    design: [
      "Three-way reconciliation gates every payout. Nothing is paid until telemetry, bank data and operator reports agree.",
      "A daily idempotent job replays the previous 24 hours of settlement events against the ingested records and emails an audit report.",
      "The job sorts discrepancies into three classes and fixes only the actionable one automatically.",
      "It never lowers a balance automatically, because that would destroy authoritative data. It logs the case and a human decides.",
      "Corrupted records are repaired by replaying the event log, with the pre-repair state verified first.",
    ],
    results: [
      "13,800+ payout cycles over 18 consecutive months, 100% on time.",
      "Zero ledger-to-settlement discrepancies since April 2025.",
      "13 corrupted records repaired by event-log replay, with zero balances changed.",
    ],
  },
  {
    id: "sdlc",
    title: "An AI-assisted SDLC a team actually uses",
    summary:
      "Coding agents work from PRDs and scoped backlog issues. Strict TypeScript, lint, pre-commit checks and human review gating merges.",
    result: "Adopted by all 5 engineers across 10 repositories",
    problem:
      "Coding agents can produce a lot of code quickly. The goal was to get that speed without lowering the quality bar on systems that move money.",
    constraints: [
      "It had to work for the whole team, not for one person.",
      "It could not weaken review. Every change still has to be understood by a human before it merges.",
    ],
    design: [
      "Work starts as a PRD and is broken into scoped backlog issues, so an agent always has a clear, bounded task.",
      "Each repository carries its own agent scaffolding, AGENTS.md and agent skills, describing how that codebase is built and checked.",
      "Agent-generated code passes the same gates as any other code: strict TypeScript, lint and pre-commit checks.",
      "Human review gating merges.",
      "This is an engineering process, not an AI product.",
    ],
    results: [
      "Adopted by all 5 engineers across 10 repositories.",
      "Merge gatekeeper on 435 of 592 client merges.",
    ],
  },
  {
    id: "migration",
    title: "Migrating a live platform without stopping trading",
    summary:
      "Staged upgrades of a revenue-carrying marketplace from Next.js 12, React 17 and web3.js to Next.js 15, React 19 and ethers v6.",
    result:
      "Next.js 12 → 15, React 17 → 19 and web3.js → ethers v6 on a live, revenue-carrying platform",
    problem:
      "The marketplace carries revenue, and it was running on aging versions: Next.js 12, React 17 and web3.js.",
    constraints: [
      "Trading could not stop. Every step had to ship to the live platform without interrupting it.",
      "Three major upgrades in one combined release would have been hard to reason about and hard to reverse.",
    ],
    design: [
      "The work was staged as separate upgrades: Next.js 12 to 15, React 17 to 19, and web3.js to ethers v6.",
      "Each stage shipped on its own, so a regression could only come from the one change that had just landed.",
      "One upgrade was deliberately rolled back when shipping safety warranted it, then redone later. Waiting a cycle on an upgrade is cheap; interrupting a live market is not.",
    ],
    results: [
      "Next.js 12 → 15, React 17 → 19 and web3.js → ethers v6 on a live, revenue-carrying platform.",
    ],
  },
];

// Kept on the site by decision (see the end of docs/portfolio_brief.md).
export const EARLIER_PROJECT = {
  title: "Ipseity Network",
  image: ipseityScreenshot,
  imageSize: dimensions["project-3.webp"],
  description:
    "A consent-based data marketplace: businesses run surveys and data collections, and people choose what to share and are rewarded for it. I built the reward escrow contracts, the inWallet identity wallet in React Native, and pay-per-use billing for the Virtual Clean Room.",
  technologies: [
    "React",
    "React Native (Expo)",
    "Node.js",
    "Solidity",
    "libsodium",
  ],
  link: "https://www.ipseity.network/",
};

export const EXPERIENCES = [
  {
    year: "Jan 2025 - Present",
    role: "Senior Full Stack Engineer",
    company: "Dualmint",
    location: "Hong Kong",
    description: [
      "Shipped the first production version of the marketplace across client, backend and settlement contracts, audited at 9.1/10 by Hacken.",
      "Built and shipped an LLM extraction pipeline (Python, Anthropic API) that turns legal provenance PDFs into cited, code-verified yield terms; the TypeScript backend checks each payout against them.",
      "Own the TypeScript backend for 1,500+ financed assets and the settlement pipeline that pays investors.",
      "Lead a team of five engineers and gate merges across 10 repositories.",
      "Designed the AI-assisted process the team ships through, with human review gating merges.",
      "Onchain work includes a Chainlink CRE workflow live on Solana mainnet, backed by a US$90,000 Solana Foundation grant.",
    ],
  },
  {
    year: "Jun 2022 - Jan 2025",
    role: "Full Stack Engineer",
    company: "Ipseity Network",
    location: "Hong Kong",
    description: [
      "Built the reward escrow: a platform token plus a clone factory that creates one escrow contract per data request to hold its reward pool.",
      "Built the inWallet identity wallet in Expo / React Native for iOS, Android and web, with passwordless login and onchain rewards.",
      "Upgraded the wallet from Expo SDK 43 to 47 (React Native 0.64 → 0.70, React 17 → 18) by stepping through SDK 45 after direct jumps failed. Merged two branches that had diverged for nine months.",
      "Added pay-per-use billing to the Virtual Clean Room, where companies find overlaps between their encrypted datasets without sharing raw data.",
    ],
  },
  {
    year: "Apr 2021 - Sep 2021",
    role: "Software Engineer Intern",
    company: "Ipseity Network",
    description: [],
  },
];

export const EDUCATION = {
  year: "2018 - 2022",
  degree: "BEng Computer Engineering",
  school: "Hong Kong University of Science and Technology",
};

export const SKILLS = [
  {
    group: "AI / LLM",
    items: [
      "Python",
      "Anthropic API",
      "Structured extraction",
      "LLM evals",
      "Pydantic",
      "pytest",
      "LangChain",
      "LangGraph",
      "RAG",
      "Vercel AI SDK",
    ],
  },
  {
    group: "Backend",
    items: [
      "TypeScript",
      "Node.js",
      "Express",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Stripe",
      "Webhooks",
      "Redis/BullMQ",
      "Vitest",
    ],
  },
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "React Native (Expo)",
      "Tailwind CSS",
      "TanStack Query",
      "Zod",
      "Recharts",
    ],
  },
  {
    group: "Infra",
    items: [
      "AWS (EC2, SES, CloudWatch)",
      "Docker",
      "GitHub Actions",
      "Sentry",
      "Datadog",
    ],
  },
  {
    group: "Onchain",
    items: [
      "Solidity",
      "Hardhat",
      "Foundry",
      "OpenZeppelin",
      "ethers.js",
      "viem",
      "EIP-712",
      "Chainlink CRE",
      "Solana Anchor",
      "IPFS",
      "libsodium/NaCl",
    ],
  },
  {
    group: "Engineering process",
    items: ["Claude Code", "Agentic coding with human review", "TDD"],
  },
];

export const CONTACT = {
  address: "Hong Kong SAR",
  email: "dilsher07singh@gmail.com",
};

// The brief's calls to action, minus the resume PDF (deliberately not on the
// site). Consumed by Navbar.jsx, Hero.jsx and Contact.jsx. `Icon` is a
// component reference, not an element, so this stays a plain .js module. Each
// entry's label is used for both aria-label and title.
export const SOCIALS = [
  {
    id: "email",
    href: `mailto:${CONTACT.email}`,
    text: "Email",
    label: "Email Dilsher Singh",
    Icon: FaEnvelope,
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/dilsher07singh/",
    text: "LinkedIn",
    label: "Dilsher Singh on LinkedIn",
    Icon: FaLinkedin,
  },
  {
    id: "github",
    href: GITHUB_URL,
    text: "GitHub",
    label: "Dilsher Singh on GitHub",
    Icon: FaGithub,
  },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
