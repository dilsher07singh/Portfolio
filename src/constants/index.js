import {
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { GITHUB_URL } from "./site";
import project1 from "../assets/optimized/project-1.webp";
import project2 from "../assets/optimized/project-2.webp";
import project3 from "../assets/optimized/project-3.webp";
// Emitted by scripts/optimize-images.mjs. Used for the width/height attributes
// so the browser can reserve the right box before the image loads; generated
// rather than hardcoded so it stays in step with the encode settings.
import dimensions from "../assets/optimized/dimensions.json";

// Re-exported so components have one import path for constants, while
// ./site.js stays importable by the Node build scripts.
export { GITHUB_USERNAME, GITHUB_URL } from "./site";

// The technology chip, shared by Experience.jsx and Projects.jsx. Both files
// carried a byte-identical copy of this string with a comment asking that they
// be kept in step; this is that single source. Tailwind scans this file, so the
// utilities are still emitted.
export const CHIP_CLASS =
  "rounded border border-purple-900/40 bg-purple-950/40 px-2 py-1 text-sm font-medium text-purple-300";

export const HERO_CONTENT = `Senior full stack engineer with 5 years building production financial infrastructure in Hong Kong. I built Dualmint's equipment-financing marketplace end to end — the TypeScript/Node.js backend, the Next.js clients, and the settlement layer that routes verified machine revenue to investors. Promoted to senior in 2025; I now lead a team of 5 and own backend and infrastructure.`;

export const ABOUT_TEXT = `I'm a full stack engineer based in Hong Kong, where I've spent the last five years building the systems that move real money. At Dualmint I own the backend and infrastructure behind an equipment-financing marketplace: a TypeScript/Express service layer on MongoDB and Redis, a revenue-distribution pipeline that reconciles IoT telemetry against bank data before anyone gets paid, and the on-chain settlement layer underneath it all.

Most of what I do is unglamorous by design. Payouts have to land on time every month, so I build for verification and recovery first — multi-source reconciliation, crash-safe ledgers, deep test coverage, and infrastructure that behaves the same in every environment. The result is 8,700+ payout cycles across 14+ consecutive months at 100% on-time.

I hold a BEng in Computer Engineering from HKUST and I'm a Hong Kong Permanent Resident. These days I spend as much time on architecture and mentoring my team of 5 as I do writing code.`;

export const METRICS = [
  { value: "5", label: "Years building production systems" },
  { value: "1,500+", label: "Physical assets originated on-platform" },
  { value: "8,700+", label: "Payout cycles, 100% on-time" },
  { value: "9.1/10", label: "Hacken smart contract audit score" },
];

export const TECHNOLOGIES = [
  { name: "TypeScript", icon: "typescript", color: "text-blue-400" },
  { name: "Node.js", icon: "node", color: "text-green-500" },
  { name: "Express", icon: "express", color: "text-neutral-300" },
  { name: "React", icon: "react", color: "text-cyan-400" },
  { name: "Next.js", icon: "next", color: "text-neutral-200" },
  { name: "Tailwind CSS", icon: "tailwind", color: "text-sky-400" },
  { name: "MongoDB", icon: "mongodb", color: "text-green-500" },
  { name: "Redis", icon: "redis", color: "text-red-500" },
  { name: "Vitest", icon: "vitest", color: "text-yellow-400" },
  { name: "GitHub Actions", icon: "githubactions", color: "text-blue-400" },
  { name: "AWS EC2", icon: "aws", color: "text-orange-400" },
  { name: "Solidity", icon: "solidity", color: "text-neutral-300" },
  { name: "Hardhat", icon: "hardhat", color: "text-yellow-500" },
  { name: "ethers.js", icon: "ethers", color: "text-indigo-400" },
];

export const EXPERIENCES = [
  {
    year: "Jan 2025 - Present",
    role: "Senior Full Stack Engineer",
    company: "Dualmint",
    description: [
      "Own the TypeScript/Express backend (MongoDB, Redis/BullMQ) behind an equipment-financing marketplace of 1,500+ originated physical assets, architected so new networks and asset classes launch as configuration rather than code.",
      "Built the revenue-distribution pipeline: a 2-of-3 verification model reconciling IoT telemetry, bank transaction data and operator reports within a ±10% tolerance before any payout clears — 8,700+ payout cycles across 14+ consecutive months at 100% on-time.",
      "Designed provider-agnostic on-chain event ingestion spanning 8 webhook endpoints, three data providers and 5 chains, with a 4-tier receipt-fetch fallback so no settlement event is silently dropped.",
      "Built the underwriting engine behind the vault backend — a four-pillar model scored across 20 features, covered by a 156-test suite at 94% statement coverage.",
      "Shipped an IoT device-provisioning pipeline on a crash-safe append-only ledger; a single 32.6-hour run registered 205 devices with zero collisions.",
      "Standardized infrastructure across 7 repositories (agent-assisted code workflows, pre-commit hooks, lint-staged, strict TypeScript) and migrated the platform off serverless onto AWS EC2 with PM2 and health-checked GitHub Actions across 3 environments.",
      "Lead a team of 5, owning backend and infrastructure direction.",
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Redis",
      "AWS EC2",
      "GitHub Actions",
    ],
  },
  {
    year: "Sep 2021 - Jan 2025",
    role: "Full Stack Engineer",
    company: "Dualmint",
    description: [
      "Built the Node.js/Express backend and MongoDB data layer with a 497-test suite reaching 100% coverage on data models, alongside the Next.js/React client.",
      "Wrote the Solidity settlement contracts, audited 9.1/10 by Hacken.",
      "Authored a cryptographic order-signing SDK on EIP-712 typed data with byte-for-byte serialization parity between client and contract, supporting three asset standards and royalty splits across 8 networks.",
      "Unified social login, external wallets and an embedded mini-app behind a single auth layer with KYC and card-payment checkout.",
    ],
    technologies: [
      "Solidity",
      "Node.js",
      "Next.js",
      "MongoDB",
      "ethers.js",
      "Hardhat",
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
    technologies: ["React", "React Native", "JavaScript", "REST APIs"],
  },
];

export const PROJECTS = [
  {
    title: "Dualmint Marketplace",
    image: project1,
    imageSize: dimensions["project-1.webp"],
    description:
      "An equipment-financing marketplace connecting investors to revenue-generating physical machines. I built the TypeScript/Express backend, the Next.js client and the settlement layer that routes verified machine revenue to investors — including the Solidity contracts audited 9.1/10 by Hacken.",
    technologies: [
      "TypeScript",
      "Node.js",
      "Next.js",
      "MongoDB",
      "Solidity",
      "AWS",
    ],
    link: "https://explore.dualmint.com/",
  },
  {
    title: "Ipseity Network",
    image: project3,
    imageSize: dimensions["project-3.webp"],
    description:
      "A decentralized platform where individuals keep full ownership of their personal data and share it with companies on their own terms, backed by homomorphic encryption so analysis never requires decryption. Built the web and React Native clients and the REST APIs behind them.",
    technologies: ["React", "React Native", "JavaScript", "REST APIs"],
    link: "https://www.ipseity.network/",
  },
  {
    title: "Real-Time Collaborative Editor",
    image: project2,
    imageSize: dimensions["project-2.webp"],
    description:
      "A Notion-style collaborative document editor with live multi-user presence, AI-assisted document translation and summarization, and edge-deployed serverless functions.",
    technologies: [
      "Next.js",
      "Cloudflare Workers",
      "Clerk",
      "Firestore",
      "Liveblocks",
    ],
    link: "https://notion-clone-youtube-six.vercel.app/",
  },
];

export const CONTACT = {
  address: "Hong Kong SAR",
  email: "dilsher07singh@gmail.com",
  whatsapp: "https://wa.me/919740071441",
};

// Consumed by Navbar.jsx (all five) and Contact.jsx (the subset it names).
// `Icon` is a component reference, not an element, so this stays a plain .js
// module. Each entry's label is used for both aria-label and title.
export const SOCIALS = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/dilsher07singh/",
    label: "Dilsher Singh on LinkedIn",
    Icon: FaLinkedin,
  },
  {
    id: "github",
    href: GITHUB_URL,
    label: "Dilsher Singh on GitHub",
    Icon: FaGithub,
  },
  {
    id: "whatsapp",
    href: CONTACT.whatsapp,
    label: "Message Dilsher Singh on WhatsApp",
    Icon: FaWhatsapp,
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/dilsher.07/",
    label: "Dilsher Singh on Instagram",
    Icon: FaInstagram,
  },
  {
    id: "youtube",
    href: "https://www.youtube.com/@dilsher07singh",
    label: "Dilsher Singh on YouTube",
    Icon: FaYoutube,
  },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  // Label matches the section heading and the #technologies anchor it targets.
  { label: "Technologies", href: "#technologies" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
