import { CONTACT, SOCIALS } from "../constants";
import Reveal from "./Reveal";

// This section shows the three channels someone would actually reach out on;
// the navbar carries the full set. Selecting by id keeps the displayed order
// and the set itself explicit here, while the hrefs, labels and icons stay
// defined once in src/constants.
const CONTACT_SOCIAL_IDS = ["linkedin", "github", "whatsapp"];
const CONTACT_SOCIALS = CONTACT_SOCIAL_IDS.map((id) =>
  SOCIALS.find((social) => social.id === id)
);

// The copyright line that used to close this section now lives in the <footer>
// in App.jsx, outside <main>, so it is exposed as a contentinfo landmark. The
// vertical space it occupied moved with it: this section's former bottom
// padding and the line's own top margin are now the footer's own padding, so
// the rendered page height is unchanged.
//
// NOTE: do not name Tailwind utilities in prose here. Tailwind scans this file
// for class names and would emit dead CSS for any it finds (see PERF-003).
const Contact = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24"
    >
      <Reveal
        as="h2"
        id="contact-heading"
        className="my-10 text-center text-4xl"
      >
        Get in Touch
      </Reveal>

      <div className="text-center tracking-tight">
        <Reveal
          as="p"
          from="below"
          duration={0.6}
          className="mx-auto max-w-xl text-neutral-400"
        >
          I&apos;m open to conversations about backend and infrastructure roles,
          or anything involving systems that have to be correct with money on
          the line.
        </Reveal>

        {CONTACT.address && (
          <Reveal
            as="address"
            from="below"
            duration={0.6}
            className="my-6 not-italic text-neutral-400"
          >
            {CONTACT.address}
          </Reveal>
        )}

        <Reveal as="p" from="below" duration={0.6} className="my-4">
          <a
            href={`mailto:${CONTACT.email}`}
            className="border-b border-purple-400/70 text-lg text-purple-400 transition-colors hover:text-purple-300"
          >
            {CONTACT.email}
          </a>
        </Reveal>

        <Reveal
          from="below"
          duration={0.6}
          className="mt-8 flex items-center justify-center gap-6 text-2xl"
        >
          {CONTACT_SOCIALS.map(({ id, href, label, Icon }) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              aria-label={label}
              className="transition-colors hover:text-purple-400"
            >
              <Icon />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
