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
  tagline: "I build financial systems that have to be right every time.",
  subline:
    "TypeScript/Node.js and React/Next.js in Hong Kong. I own a settlement pipeline that has paid investors 12,500+ times over 17 consecutive months, 100% on time.",
  badges: [
    "Hong Kong Permanent Resident",
    "Team lead (5 engineers)",
    "Hacken-audited settlement contracts (9.1/10)",
  ],
};

// Deliberately not the 12,500+ payout figure: the hero sub-line already leads
// with it, and repeating it a few centimetres lower dilutes it.
export const METRICS = [
  { value: "1,500+", label: "Financed assets on the backend I own" },
  { value: "0", label: "Ledger-to-settlement discrepancies since April 2025" },
  { value: "13", label: "Corrupted records repaired, zero balances changed" },
  { value: "10", label: "Repositories where I gate merges" },
];

export const ABOUT_TEXT = `I joined Dualmint in 2022 and shipped the first production version of its equipment-financing marketplace across the Next.js client, the Node.js/Express backend and the settlement contracts, which Hacken audited at 9.1/10. Since my promotion to senior in 2025, I own the TypeScript backend for 1,500+ financed assets, lead a team of five engineers and gate merges across 10 repositories.

Most of my work is about making money movement boring. Every payout is held until IoT telemetry, bank data and operator reports agree. A daily idempotent reconciliation job has found zero ledger-to-settlement discrepancies since April 2025, and event-log replay repaired 13 corrupted records without changing a single user balance.

Settlement runs onchain, so I also work in Solidity, EIP-712 signing and multi-chain infrastructure, including a Chainlink CRE workflow live on Solana mainnet backed by a US$90,000 Solana Foundation grant. I also designed the AI-assisted process my team ships through: coding agents working from PRDs and scoped backlog issues, with strict TypeScript, pre-commit checks and human review on every merge.`;

// "Selected work" in the brief's problem → constraints → design → result shape.
// The brief publishes 1, 2 and 4 first; 3 (rollback deploys) and 5 (onchain
// telemetry) are optional later additions. No internal repo names, client or
// investor names, or anything that reveals private infrastructure.
export const CASE_STUDIES = [
  {
    id: "payouts",
    title: "Payouts that wait for agreement",
    summary:
      "Investor payouts are held until three independent data sources agree, and a daily replay job checks the ledger against settlement.",
    result: "12,500+ payouts over 17 consecutive months, 100% on time",
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
      "12,500+ payout cycles over 17 consecutive months, 100% on time.",
      "Zero ledger-to-settlement discrepancies since April 2025.",
      "13 corrupted records repaired by event-log replay, with zero balances changed.",
    ],
  },
  {
    id: "migration",
    title: "Migrating a live platform without stopping trading",
    summary:
      "Staged upgrades of a revenue-carrying marketplace from Next.js 12, React 17 and web3.js to Next.js 15, React 19 and ethers v6.",
    result: "Zero trading interruption across the whole migration",
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
    results: ["Zero trading interruption across the whole migration."],
  },
  {
    id: "sdlc",
    title: "An AI-assisted SDLC a team actually uses",
    summary:
      "Coding agents work from PRDs and scoped backlog issues. Strict TypeScript, lint, pre-commit checks and human review gate every merge.",
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
      "A human reviews every merge.",
      "This is an engineering process, not an AI product.",
    ],
    results: [
      "Adopted by all 5 engineers across 10 repositories.",
      "Merge gatekeeper on 435 of 592 client merges.",
    ],
  },
];

// Kept on the site by decision (see the end of docs/portfolio_brief.md).
export const EARLIER_PROJECT = {
  title: "Ipseity Network",
  image: ipseityScreenshot,
  imageSize: dimensions["project-3.webp"],
  description:
    "A decentralized platform where individuals keep full ownership of their personal data and share it with companies on their own terms, backed by homomorphic encryption so analysis never requires decryption. I built the web and React Native clients and the REST APIs behind them.",
  technologies: ["React", "React Native", "JavaScript", "REST APIs"],
  link: "https://www.ipseity.network/",
};

export const EXPERIENCES = [
  {
    year: "Jan 2025 - Present",
    role: "Senior Full Stack Engineer",
    company: "Dualmint",
    location: "Hong Kong",
    description: [
      "Own the TypeScript backend for 1,500+ financed assets and the settlement pipeline that pays investors.",
      "Lead a team of five engineers and gate merges across 10 repositories.",
      "Designed the AI-assisted process the team ships through, with human review on every merge.",
      "Onchain work includes a Chainlink CRE workflow live on Solana mainnet, backed by a US$90,000 Solana Foundation grant.",
    ],
  },
  {
    year: "Jun 2022 - Jan 2025",
    role: "Full Stack Engineer",
    company: "Dualmint",
    location: "Hong Kong",
    description: [
      "Shipped the first production version of the equipment-financing marketplace across the Next.js client, the Node.js/Express backend and the settlement contracts.",
      "The settlement contracts were audited at 9.1/10 by Hacken.",
    ],
  },
  {
    year: "Apr 2021 - Sep 2021",
    role: "Software Engineer Intern",
    company: "Ipseity Network",
    description: [
      "Built React and React Native interfaces for a data-analysis platform built on homomorphic encryption, letting companies compute over user data without ever decrypting it.",
      "Designed and implemented the RESTful APIs backing both the web and mobile clients.",
    ],
  },
];

export const EDUCATION = {
  year: "2018 - 2022",
  degree: "BEng Computer Engineering",
  school: "Hong Kong University of Science and Technology",
};

export const SKILLS = [
  {
    group: "Backend",
    items: [
      "TypeScript",
      "Node.js",
      "Express",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
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
      "PM2",
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
