import { ABOUT_TEXT } from "../constants";
import Reveal from "./Reveal";

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
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-b border-neutral-900 pb-8"
    >
      <Reveal as="h2" id="about-heading" className="my-20 text-center text-4xl">
        About <span className="text-neutral-500">Me</span>
      </Reveal>

      <div className="flex flex-wrap items-start">
        {/* Bio */}
        <Reveal from="left" distance={60} className="w-full lg:w-3/5 lg:pr-12">
          {ABOUT_TEXT.split("\n\n").map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mb-5 font-light leading-relaxed text-neutral-300"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        {/* At-a-glance highlights */}
        <Reveal
          from="right"
          distance={60}
          className="mt-8 w-full lg:mt-0 lg:w-2/5"
        >
          <dl className="rounded-xl border border-neutral-700 bg-neutral-900/40 p-6">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="mb-5 last:mb-0">
                <dt className="text-xs uppercase tracking-widest text-neutral-400">
                  {item.label}
                </dt>
                <dd className="mt-1 text-neutral-300">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
