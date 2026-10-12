/* eslint-disable react/prop-types --
   CaseSection and BulletList are file-private helpers with one caller each;
   see Reveal.jsx for why this repo does not take on the prop-types package. */
import { CASE_STUDIES, CHIP_CLASS, EARLIER_PROJECT } from "../constants";
import Reveal from "./Reveal";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";

// Problem, constraints, design and result, in the order the brief asks for.
const CaseSection = ({ heading, children }) => (
  <div>
    <h4 className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
      {heading}
    </h4>
    {children}
  </div>
);

const BulletList = ({ items }) => (
  <ul className="ml-5 list-disc space-y-2 leading-relaxed text-neutral-300">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const Work = () => {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 border-b border-neutral-900 pb-12"
    >
      <Reveal as="h2" id="work-heading" className="my-20 text-center text-4xl">
        Selected work
      </Reveal>

      {/*
        Native <details>, so the full write-up is in the prerendered HTML for
        crawlers and works with JavaScript off, while the title, the two-line
        summary and the result stay visible without a click as the brief asks.
      */}
      <div className="mx-auto max-w-3xl space-y-6">
        {CASE_STUDIES.map((study) => (
          <Reveal
            as="article"
            key={study.id}
            from="below"
            aria-labelledby={`work-${study.id}`}
            className="rounded-xl border border-neutral-700 bg-neutral-900/40 transition-colors hover:border-purple-600/60"
          >
            <details className="group">
              <summary className="cursor-pointer list-none p-6 [&::-webkit-details-marker]:hidden">
                <h3 id={`work-${study.id}`} className="text-xl font-semibold text-neutral-100">
                  {study.title}
                </h3>
                <p className="mt-2 leading-relaxed text-neutral-300">
                  {study.summary}
                </p>
                <p className="mt-3 font-semibold text-purple-400">
                  {study.result}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-neutral-400 group-hover:text-purple-300">
                  <span className="group-open:hidden">Read how it works</span>
                  <span className="hidden group-open:inline">Show less</span>
                  <FaChevronDown
                    aria-hidden="true"
                    className="transition-transform group-open:rotate-180"
                  />
                </span>
              </summary>

              <div className="space-y-6 border-t border-neutral-800 px-6 pb-6 pt-6">
                <CaseSection heading="Problem">
                  <p className="leading-relaxed text-neutral-300">
                    {study.problem}
                  </p>
                </CaseSection>
                <CaseSection heading="Constraints">
                  <BulletList items={study.constraints} />
                </CaseSection>
                <CaseSection heading="Design">
                  <BulletList items={study.design} />
                </CaseSection>
                <CaseSection heading="Result">
                  <BulletList items={study.results} />
                </CaseSection>
              </div>
            </details>
          </Reveal>
        ))}

        {/* Earlier work: kept on the site by decision, see the brief. */}
        <Reveal from="below">
          <h3 className="mb-4 mt-12 text-center text-sm uppercase tracking-widest text-neutral-400">
            Earlier work
          </h3>
          <a
            href={EARLIER_PROJECT.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-labelledby="earlier-project-title earlier-project-new-tab"
            className="flex flex-col gap-6 rounded-xl border border-neutral-700 bg-neutral-900/40 p-6 transition-colors hover:border-purple-600/60 sm:flex-row"
          >
            <img
              src={EARLIER_PROJECT.image}
              width={EARLIER_PROJECT.imageSize.width}
              height={EARLIER_PROJECT.imageSize.height}
              loading="lazy"
              alt={`Screenshot of ${EARLIER_PROJECT.title}`}
              className="h-auto w-full max-w-[200px] self-start rounded-lg object-cover"
            />
            <div>
              <p
                id="earlier-project-title"
                className="mb-2 text-xl font-semibold text-neutral-100"
              >
                {EARLIER_PROJECT.title}
              </p>
              <p className="mb-4 leading-relaxed text-neutral-300">
                {EARLIER_PROJECT.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {EARLIER_PROJECT.technologies.map((tech) => (
                  <span key={tech} className={CHIP_CLASS}>
                    {tech}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 font-semibold text-purple-400">
                Visit the site
                <span id="earlier-project-new-tab" className="sr-only">
                  (opens in a new tab)
                </span>
                <FaArrowRight aria-hidden="true" />
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Work;
