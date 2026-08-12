import Reveal from "./Reveal";
import {
  SiTypescript,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiRedis,
  SiVitest,
  SiGithubactions,
  SiAmazonec2,
  SiSolidity,
  SiEthereum,
} from "react-icons/si";
import { RiReactjsLine } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { TECHNOLOGIES } from "../constants";

// Keyed by the `icon` field in TECHNOLOGIES. Note react-icons v5 has no
// SiHardhat or SiAmazonaws — SiEthereum and SiAmazonec2 stand in for those.
const ICONS = {
  typescript: SiTypescript,
  node: FaNodeJs,
  express: SiExpress,
  react: RiReactjsLine,
  next: SiNextdotjs,
  tailwind: SiTailwindcss,
  mongodb: SiMongodb,
  redis: SiRedis,
  vitest: SiVitest,
  githubactions: SiGithubactions,
  aws: SiAmazonec2,
  solidity: SiSolidity,
  hardhat: SiEthereum,
  ethers: SiEthereum,
};

const Technologies = () => {
  return (
    <section
      id="technologies"
      aria-labelledby="technologies-heading"
      className="scroll-mt-24 border-b border-neutral-700 pb-24"
    >
      <Reveal
        as="h2"
        id="technologies-heading"
        duration={0.6}
        className="my-20 text-center text-4xl"
      >
        Technologies
      </Reveal>

      <Reveal
        as="ul"
        from="fade"
        duration={0.8}
        className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3"
      >
        {TECHNOLOGIES.map((tech) => {
          const Icon = ICONS[tech.icon];
          return (
            <li
              key={tech.name}
              className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/40 px-4 py-3 transition-colors hover:border-purple-600/60"
            >
              {Icon ? (
                <Icon className={`text-2xl ${tech.color}`} aria-hidden="true" />
              ) : null}
              <span className="text-sm text-neutral-300">{tech.name}</span>
            </li>
          );
        })}
      </Reveal>
    </section>
  );
};

export default Technologies;
