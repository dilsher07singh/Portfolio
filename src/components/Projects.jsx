import { CHIP_CLASS, GITHUB_URL, PROJECTS } from "../constants";
import Reveal from "./Reveal";
import { FaArrowRight } from "react-icons/fa";

const Projects = () => {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 border-b border-neutral-900 pb-4"
    >
      <Reveal
        as="h2"
        id="projects-heading"
        className="my-20 text-center text-4xl"
      >
        Projects
      </Reveal>

      <div className="space-y-8">
        {PROJECTS.map((project, index) => {
          // The link wraps the whole card, so its accessible name is what a
          // screen reader announces for it. Name it from the heading plus the
          // new-tab hint rather than an aria-label: aria-label would replace
          // the card's own text, and the previous one also claimed to open a
          // details page when the href is the live external site.
          const titleId = `project-title-${index}`;
          const newTabId = `project-new-tab-${index}`;

          return (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.title}
              className="block"
              aria-labelledby={`${titleId} ${newTabId}`}
            >
              <div className="flex flex-wrap rounded-xl border border-neutral-700 bg-neutral-900/40 p-6 transition-colors duration-300 hover:border-purple-600/60 lg:justify-center">
                {/* Screenshot */}
                <Reveal from="left" className="w-full lg:w-1/4">
                  <img
                    src={project.image}
                    width={project.imageSize.width}
                    height={project.imageSize.height}
                    loading="lazy"
                    alt={`Screenshot of the project ${project.title}`}
                    className="mb-6 w-full max-w-[200px] rounded-lg object-cover"
                  />
                </Reveal>

                {/* Detail */}
                <Reveal
                  from="right"
                  duration={1}
                  className="w-full max-w-xl lg:w-3/4"
                >
                  <h3 id={titleId} className="mb-2 text-xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="mb-4 leading-relaxed text-neutral-300">
                    {project.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className={CHIP_CLASS} title={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center text-purple-400 transition-colors hover:text-purple-300">
                    <span className="mr-2 font-semibold">View Project</span>
                    <span id={newTabId} className="sr-only">
                      (opens in a new tab)
                    </span>
                    <FaArrowRight aria-hidden="true" />
                  </div>
                </Reveal>
              </div>
            </a>
          );
        })}
      </div>

      {/* Link out to the rest */}
      <div className="mt-10 flex justify-center">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8 flex items-center text-purple-400 transition-colors hover:text-purple-300"
          aria-label="View all projects on GitHub"
        >
          <span className="mr-2 font-semibold">All Projects</span>
          <FaArrowRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Projects;
