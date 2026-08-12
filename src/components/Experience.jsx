import { EXPERIENCES } from "../constants";
import Reveal from "./Reveal";

// Kept identical to the chip in Projects.jsx.
const CHIP =
  "rounded border border-purple-900/40 bg-purple-950/40 px-2 py-1 text-sm font-medium text-purple-300";

const Experience = () => {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-b border-neutral-900 pb-4"
    >
      <Reveal as="h2" className="my-20 text-center text-4xl">
        Experience
      </Reveal>

      <div>
        {EXPERIENCES.map((experience) => (
          <article
            key={`${experience.company}-${experience.year}`}
            className="mb-12 flex flex-wrap lg:justify-center"
          >
            {/* Dates */}
            <Reveal from="left" duration={1} className="w-full lg:w-1/4">
              <p className="mb-3 text-sm text-neutral-500">{experience.year}</p>
            </Reveal>

            {/* Role, achievements and stack */}
            <Reveal
              from="right"
              duration={1}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h3 className="mb-2 font-semibold">
                {experience.role} -{" "}
                <span className="text-sm text-purple-100">
                  {experience.company}
                </span>
              </h3>

              <ul className="mb-4 ml-5 list-disc space-y-2 text-neutral-300">
                {experience.description.map((desc) => (
                  <li key={desc} className="leading-relaxed">
                    {desc}
                  </li>
                ))}
              </ul>

              <div className="mb-4 flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span key={tech} className={CHIP} title={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
