import { FaLinkedin, FaGithub, FaWhatsapp, FaInstagram } from "react-icons/fa";
import logo from "../assets/dilsherSinghLogo2.png";

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      {/* Logo with optimized alt text */}
      <div className="flex flex-shrink-0 items-center">
        <img className="mx-2 w-32" src={logo} alt="Dilsher Singh Logo" />
      </div>

      {/* Social Media Links */}
      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <a
          href="https://www.linkedin.com/in/dilsher07singh/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Dilsher Singh's LinkedIn Profile"
          aria-label="LinkedIn Profile of Dilsher Singh"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://github.com/dilsher07singh"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Dilsher Singh's GitHub Profile"
          aria-label="GitHub Profile of Dilsher Singh"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.instagram.com/dilsher.07/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Dilsher Singh's Instagram Profile"
          aria-label="Instagram Profile of Dilsher Singh"
        >
          <FaInstagram />
        </a>

        <a
          href="https://wa.me/919740071441"
          target="_blank"
          rel="noopener noreferrer"
          title="Message Dilsher Singh on WhatsApp"
          aria-label="WhatsApp Dilsher Singh"
        >
          <FaWhatsapp />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
