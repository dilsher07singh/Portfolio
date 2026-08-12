import logo from "../assets/dilsherSinghLogo2.png";
import { NAV_LINKS, SOCIALS } from "../constants";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-900/80 bg-neutral-950/70 backdrop-blur">
      <nav
        aria-label="Primary"
        className="container mx-auto flex flex-col items-center gap-3 px-8 py-4 lg:flex-row lg:justify-between lg:gap-6"
      >
        {/* Logo / back to top */}
        <a
          href="#hero"
          className="flex flex-shrink-0 items-center"
          aria-label="Dilsher Singh — back to top"
        >
          <img
            className="w-28"
            src={logo}
            width={562}
            height={106}
            alt="Dilsher Singh"
          />
        </a>

        {/* Section anchors */}
        {/*
          `overflow-x-auto` makes this a scroll container, which clips its
          children — including the 2px focus ring and its 2px offset. Without
          headroom the ring loses its top and bottom bars outright, and the
          first and last links lose their outer bar. `p-1` gives the clip box
          the 4px the ring needs on every side and `scroll-p-1` keeps that
          room in view when tabbing scrolls a link horizontally; the matching
          `-m-1` cancels the padding so the navbar's layout is unchanged.
        */}
        <ul className="-m-1 flex max-w-full items-center gap-5 overflow-x-auto scroll-p-1 p-1 text-sm text-neutral-400">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap transition-colors hover:text-purple-400 focus-visible:text-purple-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 text-xl lg:text-2xl">
          {SOCIALS.map(({ id, href, label, Icon }) => (
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
