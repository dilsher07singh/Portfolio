/* eslint-disable react/prop-types --
   CaseSection, BulletList and ProjectCard are file-private helpers;
   see Reveal.jsx for why this repo does not take on the prop-types package. */
import { CASE_STUDIES, CHIP_CLASS, EARLIER_PROJECT } from "../constants";
import { useEffect } from "react";
import Reveal from "./Reveal";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";

const BulletList = ({ items }) => (
  <ul className="ml-5 list-disc space-y-2 leading-relaxed text-neutral-300">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

// A string is one paragraph, an array is a bullet list. Optional sections
// (evals, limits) are left out entirely when a case study has none.
const CaseSection = ({ heading, content }) =>
  content ? (
    <div>
      <h4 className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
        {heading}
      </h4>
      {Array.isArray(content) ? (
        <BulletList items={content} />
      ) : (
        <p className="leading-relaxed text-neutral-300">{content}</p>
      )}
    </div>
  ) : null;

// Problem, constraints, design and result, in the order the brief asks for,
// with evals and limits where a case study has them.
const SECTIONS = [
  ["Problem", "problem"],
  ["Constraints", "constraints"],
  ["Design", "design"],
  ["Evals", "evals"],
  ["Result", "results"],
  ["Limits", "limits"],
];

const LINK_CLASS =
  "inline-flex items-center gap-2 font-semibold text-purple-400 transition-colors hover:text-purple-300";

// A card for a project outside the case studies. The link sits inside rather
// than wrapping the card, so the description stays selectable text. `id` keeps
// the aria-labelledby targets unique.
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
      </div>
    </div>
  </Reveal>
);

// Each card's heading carries id="work-<id>", so a link to #work-<id> names
// one card. Gap left between the header and the card after scrolling.
const cardHash = (id) => `#work-${id}`;
const SCROLL_GAP = 16;

// Distance from the top of the document, from layout alone, so CSS transforms
// do not count.
/** @param {HTMLElement} element */
const layoutTop = (element) => {
  let top = 0;
  for (
    let node = element;
    node;
    node = /** @type {HTMLElement | null} */ (node.offsetParent)
  ) {
    top += node.offsetTop;
  }
  return top;
};

// Scrolls the card to just below the header. The jump is instant, overriding
// the site's smooth scrolling: animating thousands of pixels on page load
// reads as a glitch, and the header check below needs the final position.
// The card is measured with layoutTop rather than getBoundingClientRect,
// because a card that has not revealed yet is still translated by its entry
// animation. The header is measured after the jump rather than trusting its
// CSS, so the offset is only applied when it really covers the viewport.
/** @param {HTMLElement} card */
const scrollToCard = (card) => {
  window.scrollTo({
    top: Math.max(0, layoutTop(card) - SCROLL_GAP),
    behavior: "instant",
  });
  const header = document.querySelector("header");
  const covered = header ? header.getBoundingClientRect().bottom : 0;
  if (covered > 0) window.scrollBy({ top: -covered, behavior: "instant" });
};

// Opens the card named by the URL hash, if there is one, and scrolls to it.
const openCardFromHash = () => {
  const study = CASE_STUDIES.find(
    ({ id }) => cardHash(id) === window.location.hash,
  );
  if (!study) return;
  const card = document.querySelector(
    `article[aria-labelledby="work-${study.id}"]`,
  );
  const details = card?.querySelector("details");
  if (!(card instanceof HTMLElement) || !details) return;

  details.open = true;
  scrollToCard(card);

  // On a first visit the webfont usually lands after this runs, re-wrapping
  // the text above the card and pushing it down. Re-align once fonts are in,
  // unless the visitor has scrolled in the meantime.
  const landedAt = window.scrollY;
  document.fonts?.ready.then(() => {
    if (window.scrollY === landedAt) scrollToCard(card);
  });
};

// Keeps the URL shareable: opening a card puts its hash in the address bar,
// and closing it removes the hash so the link does not reopen a closed card.
// replaceState rather than pushState or assigning location.hash, so toggling
// cards neither fills the back button's history nor makes the page jump.
const syncHash = (id) => (event) => {
  const hash = cardHash(id);
  const { pathname, search } = window.location;
  if (event.currentTarget.open) {
    if (window.location.hash !== hash) history.replaceState(null, "", hash);
  } else if (window.location.hash === hash) {
    history.replaceState(null, "", pathname + search);
  }
};

const Work = () => {
  // After hydration rather than during render: the prerendered markup has no
  // hash to read, and React does not manage `open`, so setting it on the DOM
  // cannot cause a mismatch.
  useEffect(() => {
    openCardFromHash();
    window.addEventListener("hashchange", openCardFromHash);
    return () => window.removeEventListener("hashchange", openCardFromHash);
  }, []);

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
            <details className="group" onToggle={syncHash(study.id)}>
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
                {SECTIONS.map(([heading, key]) => (
                  <CaseSection
                    key={key}
                    heading={heading}
                    content={study[key]}
                  />
                ))}
                {study.tags && (
                  <ul aria-label="Technologies" className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <li key={tag} className={CHIP_CLASS}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          </Reveal>
        ))}

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
