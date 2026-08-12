import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-24 pb-20">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="my-10 text-center text-4xl"
      >
        Get in Touch
      </motion.h2>

      <div className="text-center tracking-tight">
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-neutral-400"
        >
          I&apos;m open to conversations about backend and infrastructure roles,
          or anything involving systems that have to be correct with money on
          the line.
        </motion.p>

        {CONTACT.address && (
          <motion.address
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-6 not-italic text-neutral-400"
          >
            {CONTACT.address}
          </motion.address>
        )}

        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-4"
        >
          <a
            href={`mailto:${CONTACT.email}`}
            className="border-b border-purple-400/40 text-lg text-purple-400 transition-colors hover:text-purple-300"
          >
            {CONTACT.email}
          </a>
        </motion.p>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-6 text-2xl"
        >
          <a
            href="https://www.linkedin.com/in/dilsher07singh/"
            target="_blank"
            rel="noopener noreferrer"
            title="Dilsher Singh on LinkedIn"
            aria-label="Dilsher Singh on LinkedIn"
            className="transition-colors hover:text-purple-400"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/dilsher07singh"
            target="_blank"
            rel="noopener noreferrer"
            title="Dilsher Singh on GitHub"
            aria-label="Dilsher Singh on GitHub"
            className="transition-colors hover:text-purple-400"
          >
            <FaGithub />
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            title="Message Dilsher Singh on WhatsApp"
            aria-label="Message Dilsher Singh on WhatsApp"
            className="transition-colors hover:text-purple-400"
          >
            <FaWhatsapp />
          </a>
        </motion.div>

        <p className="mt-16 text-sm text-neutral-500">
          © {new Date().getFullYear()} Dilsher Singh
        </p>
      </div>
    </section>
  );
};

export default Contact;
