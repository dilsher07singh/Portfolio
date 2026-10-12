import { CHIP_CLASS, SKILLS } from "../constants";
import Reveal from "./Reveal";

// Grouped exactly as the brief's skills section. Text chips rather than brand
// icons: half of these (Chainlink CRE, Foundry, viem, EIP-712, TDD) have no
// icon, and a mixed row reads as if the iconless ones mattered less.
const Skills = () => {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-24 border-b border-neutral-900 pb-20"
    >
      <Reveal
        as="h2"
        id="skills-heading"
        className="my-20 text-center text-4xl"
      >
        Skills
      </Reveal>

      <Reveal as="dl" from="fade" className="mx-auto max-w-4xl space-y-6">
        {SKILLS.map(({ group, items }) => (
          <div key={group} className="flex flex-col gap-3 sm:flex-row sm:gap-6">
            <dt className="text-xs uppercase tracking-widest text-neutral-400 sm:w-44 sm:shrink-0 sm:pt-2">
              {group}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <li key={item} className={CHIP_CLASS}>
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </Reveal>
    </section>
  );
};

export default Skills;
