import { ABOUT_TEXT } from "../constants";
import { motion } from "framer-motion";

const HIGHLIGHTS = [
  { label: "Currently", value: "Senior Full Stack Engineer at Dualmint" },
  { label: "Leading", value: "A team of 5, owning backend and infrastructure" },
  { label: "Based in", value: "Hong Kong · Permanent Resident" },
  { label: "Education", value: "BEng Computer Engineering, HKUST (2018–2022)" },
];

const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-b border-neutral-900 pb-8"
    >
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="my-20 text-center text-4xl"
      >
        About <span className="text-neutral-500">Me</span>
      </motion.h2>

      <div className="flex flex-wrap items-start">
        {/* Bio */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -60 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-3/5 lg:pr-12"
        >
          {ABOUT_TEXT.split("\n\n").map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mb-5 font-light leading-relaxed text-neutral-300"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* At-a-glance highlights */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 60 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 w-full lg:mt-0 lg:w-2/5"
        >
          <dl className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="mb-5 last:mb-0">
                <dt className="text-xs uppercase tracking-widest text-neutral-500">
                  {item.label}
                </dt>
                <dd className="mt-1 text-neutral-300">{item.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
