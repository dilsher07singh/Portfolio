import { CHIP_CLASS, EXPERIENCES } from "../constants";
import Reveal from "./Reveal";

const Experience = () => {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 border-b border-neutral-900 pb-4"
    >
      <Reveal
        as="h2"
        id="experience-heading"
        className="my-20 text-center text-4xl"
      >
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
              <p className="mb-3 text-sm text-neutral-400">{experience.year}</p>
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
                  <span key={tech} className={CHIP_CLASS} title={tech}>
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
