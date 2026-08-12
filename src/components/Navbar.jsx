import {
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/dilsherSinghLogo2.png";
import { CONTACT, NAV_LINKS } from "../constants";

const SOCIALS = [
  {
    href: "https://www.linkedin.com/in/dilsher07singh/",
    label: "Dilsher Singh on LinkedIn",
    Icon: FaLinkedin,
  },
  {
    href: "https://github.com/dilsher07singh",
    label: "Dilsher Singh on GitHub",
    Icon: FaGithub,
  },
  {
    href: CONTACT.whatsapp,
    label: "Message Dilsher Singh on WhatsApp",
    Icon: FaWhatsapp,
  },
  {
    href: "https://www.instagram.com/dilsher.07/",
    label: "Dilsher Singh on Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.youtube.com/@dilsher07singh",
    label: "Dilsher Singh on YouTube",
    Icon: FaYoutube,
  },
];

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
          <img className="w-28" src={logo} alt="Dilsher Singh" />
        </a>

        {/* Section anchors */}
        <ul className="flex max-w-full items-center gap-5 overflow-x-auto text-sm text-neutral-400">
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
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={href}
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
