import { CONTACT } from "../constants";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="border-b border-neutral-900 pb-20">
      {/* SEO Optimized Heading */}
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-10 text-center text-4xl"
      >
        Get in Touch
      </motion.h1>

      {/* Contact Details */}
      <div className="text-center tracking-tighter">
        {/* Address Section */}
        <motion.address
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          className="not-italic my-4"
          aria-label="Physical address"
        >
          {CONTACT.address}
        </motion.address>

        {/* Phone Number with "tel" href */}
        <motion.p
          className="my-4"
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
        >
          <a
            href={`tel:${CONTACT.phoneNo}`}
            aria-label="Call phone number"
            className="text-purple-600 hover:text-purple-500 transition-colors"
          >
            {CONTACT.phoneNo}
          </a>
        </motion.p>

        {/* Email Address with "mailto" href */}
        <motion.p
          className="my-4"
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
        >
          <a
            href={`mailto:${CONTACT.email}`}
            aria-label="Send an email"
            className="border-b text-purple-600 hover:text-purple-500 transition-colors"
          >
            {CONTACT.email}
          </a>
        </motion.p>
      </div>
    </div>
  );
};

export default Contact;
