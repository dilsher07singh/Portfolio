/* eslint-disable react/prop-types --
   CaseSection and BulletList are file-private helpers with one caller each;
   see Reveal.jsx for why this repo does not take on the prop-types package. */
import {
  CASE_STUDIES,
  CHIP_CLASS,
  EARLIER_PROJECT,
  PERSONAL_PROJECT,
} from "../constants";
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

const LINK_CLASS =
  "inline-flex items-center gap-2 font-semibold text-purple-400 transition-colors hover:text-purple-300";

// A card for a project outside the case studies. The links are separate rather
// than wrapping the card, because a project with a video needs two and links
// cannot nest. `id` keeps the aria-labelledby targets unique across cards.
const ProjectCard = ({ id, label, project }) => (
  <Reveal from="below">
    <h3 className="mb-4 mt-12 text-center text-sm uppercase tracking-widest text-neutral-400">
      {label}
    </h3>
    <div className="flex flex-col gap-6 rounded-xl border border-neutral-700 bg-neutral-900/40 p-6 transition-colors hover:border-purple-600/60 sm:flex-row">
      <img
        src={project.image}
        width={project.imageSize.width}
        height={project.imageSize.height}
        loading="lazy"
        alt={`Screenshot of ${project.title}`}
        className="h-auto w-full max-w-[200px] self-start rounded-lg object-cover"
      />
      <div>
        <p id={`${id}-title`} className="mb-2 text-xl font-semibold text-neutral-100">
          {project.title}
        </p>
        <p className="mb-4 leading-relaxed text-neutral-300">
          {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className={CHIP_CLASS}>
              {tech}
            </span>
          ))}
        </div>
        <span id={`${id}-new-tab`} className="sr-only">
          (opens in a new tab)
        </span>
        <div className="flex flex-wrap gap-6">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-labelledby={`${id}-title ${id}-new-tab`}
            className={LINK_CLASS}
          >
            Visit the site
            <FaArrowRight aria-hidden="true" />
          </a>
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              aria-labelledby={`${id}-video ${id}-title ${id}-new-tab`}
              className={LINK_CLASS}
            >
              <span id={`${id}-video`}>Watch the video</span>
              <FaArrowRight aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  </Reveal>
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

        {/* Labelled as a learning project so its AI features read as such. */}
        <ProjectCard
          id="personal-project"
          label="Learning project"
          project={PERSONAL_PROJECT}
        />

        {/* Earlier work: kept on the site by decision, see the brief. */}
        <ProjectCard
          id="earlier-project"
          label="Earlier work"
          project={EARLIER_PROJECT}
        />
      </div>
    </section>
  );
};

export default Work;
