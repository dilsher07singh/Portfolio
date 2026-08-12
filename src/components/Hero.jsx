import { HERO_CONTENT, METRICS } from "../constants";
import profilePic from "../assets/optimized/dilsherSinghProfile.webp";
import Reveal from "./Reveal";

// Entry animation length for the above-the-fold hero text. See the note beside
// the elements below: on this page it is paid directly in LCP.
const HERO_DURATION = 0.3;

const Hero = () => {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="scroll-mt-24 pb-4 border-b border-neutral-900 lg:mb-16"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Content Section */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            {/*
              These four are above the fold, and on narrow viewports — where the
              avatar drops below it — the h1 and the bio are the LCP candidates.
              Chrome does not record an opacity-transitioning element as painted
              until the transition finishes, so every element's delay AND
              duration are added straight onto LCP. Both are therefore kept
              short and staggered tightly: the whole hero settles in 0.45s,
              where it previously took 1.7s. Anything below the fold keeps the
              default 0.5s, since it has scrolled into view long after LCP.
            */}
            <Reveal
              as="h1"
              id="hero-heading"
              from="left"
              duration={HERO_DURATION}
              className="pb-4 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
            >
              Dilsher Singh
            </Reveal>

            <Reveal
              as="span"
              from="left"
              duration={HERO_DURATION}
              delay={0.05}
              className="text-3xl tracking-tight text-transparent bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text"
            >
              Senior Full Stack Engineer
            </Reveal>

            <Reveal
              as="p"
              from="left"
              duration={HERO_DURATION}
              delay={0.1}
              className="mt-3 text-sm tracking-tight text-neutral-400"
            >
              Hong Kong · BEng Computer Engineering, HKUST
            </Reveal>

            <Reveal
              as="p"
              from="left"
              duration={HERO_DURATION}
              delay={0.15}
              className="max-w-xl py-6 my-2 font-light leading-relaxed tracking-tight"
            >
              {HERO_CONTENT}
            </Reveal>
          </div>
        </div>

        {/* Profile Picture Section */}
        <div className="w-full lg:w-1/2 lg:p-8">
          {/*
            Deliberately NOT wrapped in a Reveal. This is the LCP element, and
            an entry animation holds it at opacity 0 — which browsers do not
            count as painted — until React has hydrated and the observer has
            fired. Rendering it plainly makes the largest paint happen on the
            very first frame, independent of when (or whether) JavaScript runs.

            `fetchPriority` makes the prerender build print "React does not
            recognize the fetchPriority prop". That warning is EXPECTED and
            cosmetic: React DOM 18's server renderer has no fetchPriority in
            its known-prop list (the client renderer does), but it still emits
            the attribute, and the HTML parser lowercases attribute names, so
            the browser sees fetchpriority="high" either way. Do not "fix" it
            by lowercasing the JSX — that trades the warning for a
            react/no-unknown-property lint ERROR. It resolves itself on React 19.
          */}
          <div className="flex justify-center">
            <img
              className="max-w-xs rounded-2xl lg:max-w-sm"
              src={profilePic}
              width={384}
              height={384}
              loading="eager"
              fetchPriority="high"
              alt="Dilsher Singh, Senior Full Stack Engineer"
            />
          </div>
        </div>
      </div>

      {/* Headline metrics */}
      <Reveal
        as="dl"
        from="below"
        duration={0.6}
        delay={0.2}
        className="mt-12 grid grid-cols-2 gap-6 border-t border-neutral-700 pt-8 lg:grid-cols-4 lg:gap-8"
      >
        {/*
          The label is a real <dt> now, not a screen-reader-only copy sitting
          above a visible duplicate of the same string — that arrangement had
          every metric announced twice.

          The pair is reversed visually rather than in the DOM: a definition
          list has to be term-then-definition, but the design shows the figure
          first and the label beneath it. Reversing the flex direction keeps
          the markup order the semantics require while the rendering is
          unchanged to the pixel.
        */}
        {METRICS.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col-reverse text-center lg:text-left"
          >
            <dt className="mt-1 text-sm leading-snug text-neutral-400">
              {metric.label}
            </dt>
            <dd className="text-3xl font-semibold tracking-tight text-purple-400 lg:text-4xl">
              {metric.value}
            </dd>
          </div>
        ))}
      </Reveal>
    </section>
  );
};

export default Hero;
