import { HERO_CONTENT, METRICS } from "../constants";
import profilePic from "../assets/optimized/dilsherSinghProfile.webp";
import Reveal from "./Reveal";

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
            <Reveal
              as="h1"
              from="left"
              className="pb-4 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
            >
              Dilsher Singh
            </Reveal>

            <Reveal
              as="span"
              from="left"
              delay={0.5}
              className="text-3xl tracking-tight text-transparent bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text"
            >
              Senior Full Stack Engineer
            </Reveal>

            <Reveal
              as="p"
              from="left"
              delay={0.75}
              className="mt-3 text-sm tracking-tight text-neutral-400"
            >
              Hong Kong · BEng Computer Engineering, HKUST
            </Reveal>

            <Reveal
              as="p"
              from="left"
              delay={1}
              className="max-w-xl py-6 my-2 font-light leading-relaxed tracking-tight"
            >
              {HERO_CONTENT}
            </Reveal>
          </div>
        </div>

        {/* Profile Picture Section */}
        <div className="w-full lg:w-1/2 lg:p-8">
          <Reveal
            from="right"
            duration={1}
            delay={1.2}
            className="flex justify-center"
          >
            <img
              className="max-w-xs rounded-2xl lg:max-w-sm"
              src={profilePic}
              width={384}
              height={384}
              loading="eager"
              alt="Dilsher Singh, Senior Full Stack Engineer"
            />
          </Reveal>
        </div>
      </div>

      {/* Headline metrics */}
      <Reveal
        as="dl"
        from="below"
        duration={0.6}
        delay={0.2}
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
      </Reveal>
    </section>
  );
};

export default Hero;
