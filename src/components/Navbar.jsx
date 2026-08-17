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
          {/*
            alt="" is deliberate, not an omission. The anchor already carries
            an aria-label, so the image is decorative within it; any alt text
            here would either be ignored or announced as a second name for the
            same link. Keep the attribute present — dropping it entirely makes
            the image an unnamed graphic instead of a hidden one.
          */}
          <img className="w-28" src={logo} width={562} height={106} alt="" />
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
        {/*
          `py-1.5` on the anchors, not the <li>: WCAG 2.2 SC 2.5.8 measures the
          target — the clickable box — so padding has to land on the <a> itself.
          The 14px text line box is 17px tall, which the 4px+4px of vertical
          padding lifts to 25px. `gap-5` (20px) already clears the horizontal
          side. The row does not grow: the navbar is taller than 25px, so the
          extra height is absorbed by `items-center`.
        */}
        <ul className="-m-1 flex max-w-full items-center gap-5 overflow-x-auto scroll-p-1 p-1 text-sm text-neutral-400">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block whitespace-nowrap py-1.5 transition-colors hover:text-purple-400 focus-visible:text-purple-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Social links */}
        {/*
          The icons are decorative: each anchor is named by its aria-label, so
          react-icons' own role="img" svg would otherwise sit inside the link
          as a second, unnamed graphic node. Same treatment as Technologies.jsx
          and the arrows in Projects.jsx.
        */}
        {/*
          `p-1` on each anchor takes the icons from 20x20 to 28x28. At text-xl
          the glyph is 20px and the gap between icons is 16px, so BOTH halves of
          SC 2.5.8 failed: under the 24x24 minimum, and too close together to
          claim the spacing exception. Padding is the fix rather than a bigger
          glyph, because it grows the target without changing the design.

          `-m-1` on the row cancels the padding at the container's outer edge so
          the row occupies the same space in the navbar as before. Measured
          after the change: targets are 28x28 with 16px still between them —
          `gap-4` sits between flex items, so the negative margin does not close
          it. That is fine; the 24x24 minimum is met on size alone, and the
          spacing exception is only needed for targets that stay under it.
        */}
        <div className="-m-1 flex items-center justify-center gap-4 p-1 text-xl lg:text-2xl">
          {SOCIALS.map(({ id, href, label, Icon }) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              aria-label={label}
              className="p-1 transition-colors hover:text-purple-400"
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
