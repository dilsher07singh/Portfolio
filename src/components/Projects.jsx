import { PROJECTS } from "../constants";
import Reveal from "./Reveal";
import { FaArrowRight } from "react-icons/fa";

// Kept identical to the chip in Experience.jsx.
const CHIP =
  "rounded border border-purple-900/40 bg-purple-950/40 px-2 py-1 text-sm font-medium text-purple-300";

const Projects = () => {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-b border-neutral-900 pb-4"
    >
      <Reveal as="h2" className="my-20 text-center text-4xl">
        Projects
      </Reveal>

      <div className="space-y-8">
        {PROJECTS.map((project) => (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            key={project.title}
            className="block"
            aria-label={`View details about the project ${project.title}`}
          >
            <div className="flex flex-wrap rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 transition-colors duration-300 hover:border-purple-600/60 lg:justify-center">
              {/* Screenshot */}
              <Reveal from="left" className="w-full lg:w-1/4">
                <img
                  src={project.image}
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
                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                <p className="mb-4 leading-relaxed text-neutral-300">
                  {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className={CHIP} title={tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center text-purple-400 transition-colors hover:text-purple-300">
                  <span className="mr-2 font-semibold">View Project</span>
                  <FaArrowRight aria-hidden="true" />
                </div>
              </Reveal>
            </div>
          </a>
        ))}
      </div>

      {/* Link out to the rest */}
      <div className="mt-10 flex justify-center">
        <a
          href="https://github.com/dilsher07singh"
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
