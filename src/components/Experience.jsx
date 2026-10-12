import { EDUCATION, EXPERIENCES } from "../constants";
import Reveal from "./Reveal";

// Kept short on purpose: the brief puts the depth in Selected work, so each
// role here is dates, title and a few lines.
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

      <div className="mx-auto max-w-4xl">
        {EXPERIENCES.map((experience) => (
          <Reveal
            as="article"
            key={`${experience.company}-${experience.year}`}
            from="below"
            className="mb-12 flex flex-col gap-2 lg:flex-row lg:gap-8"
          >
            <p className="text-sm text-neutral-400 lg:w-1/4 lg:pt-1">
              {experience.year}
            </p>

            <div className="lg:w-3/4">
              <h3 className="mb-2 font-semibold text-neutral-100">
                {experience.role}
                <span className="font-normal text-purple-200">
                  {" "}
                  · {experience.company}
                  {experience.location && `, ${experience.location}`}
                </span>
              </h3>

              <ul className="ml-5 list-disc space-y-2 leading-relaxed text-neutral-300">
                {experience.description.map((desc) => (
                  <li key={desc}>{desc}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}

        <Reveal
          as="article"
          from="below"
          className="mb-12 flex flex-col gap-2 lg:flex-row lg:gap-8"
        >
          <p className="text-sm text-neutral-400 lg:w-1/4 lg:pt-1">
            {EDUCATION.year}
          </p>
          <div className="lg:w-3/4">
            <h3 className="font-semibold text-neutral-100">
              {EDUCATION.degree}
              <span className="font-normal text-purple-200">
                {" "}
                · {EDUCATION.school}
              </span>
            </h3>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Experience;
