import { HERO, METRICS, SOCIALS } from "../constants";
import profilePic from "../assets/optimized/dilsherSinghProfile.webp";
import dimensions from "../assets/optimized/dimensions.json";

const profileSize = dimensions["dilsherSinghProfile.webp"];

// No entry animation anywhere in the hero. The brief asks for no heavy
// animation here, and every reveal on an above-the-fold element is paid
// directly in LCP: Chrome does not record an opacity-transitioning element as
// painted until the transition finishes.
const Hero = () => {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="scroll-mt-24 border-b border-neutral-900 pb-4 lg:mb-16"
    >
      <div className="flex flex-col gap-10 pt-10 lg:flex-row lg:items-center lg:pt-16">
        <div className="w-full lg:w-3/5">
          <h1
            id="hero-heading"
            className="text-5xl font-thin tracking-tight sm:text-6xl lg:text-7xl"
          >
            {HERO.name}
          </h1>
          <p className="mt-3 bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-2xl tracking-tight text-transparent sm:text-3xl">
            {HERO.title}
          </p>

          <p className="mt-8 max-w-2xl text-2xl font-light leading-snug tracking-tight text-neutral-100 sm:text-3xl">
            {HERO.tagline}
          </p>
          <p className="mt-4 max-w-xl font-light leading-relaxed text-neutral-300">
            {HERO.subline}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2 text-sm text-neutral-300">
            {HERO.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-neutral-700 bg-neutral-900/60 px-3 py-1"
              >
                {badge}
              </li>
            ))}
          </ul>

          {/*
            The brief's calls to action. Email is the primary one, so it is the
            filled button; LinkedIn and GitHub are outlined. Icons are
            decorative: each link is named by its visible text.
          */}
          <div className="mt-8 flex flex-wrap gap-3">
            {SOCIALS.map(({ id, href, text, Icon }) => {
              const external = href.startsWith("https://");
              return (
                <a
                  key={id}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={
                    id === "email"
                      ? "inline-flex items-center gap-2 rounded-lg bg-purple-500 px-4 py-2.5 font-medium text-neutral-950 transition-colors hover:bg-purple-400"
                      : "inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2.5 font-medium text-neutral-200 transition-colors hover:border-purple-400 hover:text-purple-300"
                  }
                >
                  <Icon aria-hidden="true" />
                  {text}
                  {external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              );
            })}
          </div>
        </div>

        {/*
          The LCP element on wide viewports, so it is rendered plainly with a
          high fetch priority rather than wrapped in a reveal.

          `fetchPriority` makes the prerender build print "React does not
          recognize the fetchPriority prop". That warning is EXPECTED and
          cosmetic: React DOM 18's server renderer has no fetchPriority in its
          known-prop list, but it still emits the attribute, and the HTML parser
          lowercases attribute names, so the browser sees fetchpriority="high"
          either way. Lowercasing the JSX would trade it for a lint error.
        */}
        <div className="flex w-full justify-center lg:w-2/5">
          <img
            className="w-full max-w-[240px] rounded-2xl sm:max-w-[288px]"
            src={profilePic}
            width={profileSize.width}
            height={profileSize.height}
            loading="eager"
            fetchPriority="high"
            alt="Dilsher Singh"
          />
        </div>
      </div>

      {/*
        The label is a real <dt>, reversed visually rather than in the DOM: a
        definition list has to be term-then-definition, but the design shows
        the figure first. `justify-end` packs content at the top of the
        column-reverse box so figures line up when labels wrap differently.
      */}
      <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-neutral-700 pt-8 lg:grid-cols-4 lg:gap-8">
        {METRICS.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col-reverse justify-end text-center lg:text-left"
          >
            <dt className="mt-1 text-sm leading-snug text-neutral-400">
              {metric.label}
            </dt>
            <dd className="text-3xl font-semibold tracking-tight text-purple-400 lg:text-4xl">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Hero;
