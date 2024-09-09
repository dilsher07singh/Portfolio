import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa"; // Import arrow icon

const Projects = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-20 text-center text-4xl"
      >
        Projects
      </motion.h1>
      <div className="space-y-8">
        {PROJECTS.map((project, index) => (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="block mb-8 transition-transform transform hover:scale-105" // Hover effect
          >
            <div className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg flex flex-wrap lg:justify-center">
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full lg:w-1/4"
              >
                <img
                  src={project.image}
                  width={150}
                  height={150}
                  alt={project.title}
                  className="mb-6 rounded"
                />
              </motion.div>
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 1 }}
                className="w-full max-w-xl lg:w-3/4"
              >
                <h6 className="mb-2 font-semibold text-xl">{project.title}</h6>
                <p className="mb-4 text-neutral-400">{project.description}</p>
                <div className="mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="mr-2 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-900"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center text-purple-600 hover:text-purple-500 transition-colors">
                  <span className="mr-2 font-semibold">View Project</span>
                  <FaArrowRight /> {/* Arrow icon next to text */}
                </div>
              </motion.div>
            </div>
          </a>
        ))}
      </div>
      {/* Add the "All Projects" button here with the same style as "View Project" */}
      <div className="mt-10 flex justify-center">
        <a
          href={"https://github.com/dilsher07singh"}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-8 transition-transform transform hover:scale-105" // Hover effect
        >
          <div className="mt-4 flex items-center text-purple-600 hover:text-purple-500 transition-colors cursor-pointer">
            <span className="mr-2 font-semibold">All Projects</span>
            <FaArrowRight /> {/* Arrow icon next to text */}
          </div>
        </a>
      </div>
    </div>
  );
};

export default Projects;
