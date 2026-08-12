import { HERO_CONTENT, METRICS } from "../constants";
import profilePic from "../assets/dilsherSinghProfile.png";
import { motion } from "framer-motion";

// Modular container for animation control
const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const Hero = () => {
  return (
    <section
      id="hero"
      className="scroll-mt-24 pb-4 border-b border-neutral-900 lg:mb-16"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Content Section */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className="pb-4 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
            >
              Dilsher Singh
            </motion.h1>

            <motion.span
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="text-3xl tracking-tight text-transparent bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text"
            >
              Senior Full Stack Engineer
            </motion.span>

            <motion.p
              variants={container(0.75)}
              initial="hidden"
              animate="visible"
              className="mt-3 text-sm tracking-tight text-neutral-400"
            >
              Hong Kong · BEng Computer Engineering, HKUST
            </motion.p>

            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="max-w-xl py-6 my-2 font-light leading-relaxed tracking-tight"
            >
              {HERO_CONTENT}
            </motion.p>
          </div>
        </div>

        {/* Profile Picture Section */}
        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <motion.img
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="max-w-xs rounded-2xl lg:max-w-sm"
              src={profilePic}
              width={384}
              height={384}
              loading="eager"
              alt="Dilsher Singh, Senior Full Stack Engineer"
            />
          </div>
        </div>
      </div>

      {/* Headline metrics */}
      <motion.dl
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 grid grid-cols-2 gap-6 border-t border-neutral-800 pt-8 lg:grid-cols-4 lg:gap-8"
      >
        {METRICS.map((metric) => (
          <div key={metric.label} className="text-center lg:text-left">
            <dt className="sr-only">{metric.label}</dt>
            <dd>
              <span className="block text-3xl font-semibold tracking-tight text-purple-400 lg:text-4xl">
                {metric.value}
              </span>
              <span className="mt-1 block text-sm leading-snug text-neutral-400">
                {metric.label}
              </span>
            </dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
};

export default Hero;
