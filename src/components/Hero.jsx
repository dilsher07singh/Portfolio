import { HERO_CONTENT } from "../constants";
import profilePic from "../assets/dilsherSinghProfile.png";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35">
      <div className="flex flex-col lg:flex-row">
        {/* Content Section */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1
              animate={{ x: 100 }}
              className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
            >
              Dilsher Singh
            </motion.h1>
            <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl tracking-tight text-transparent">
              Full Stack Developer
            </span>
            <p className="my-2 max-w-xl py-6 font-light tracking-tighter">
              {HERO_CONTENT}
            </p>
          </div>
        </div>

        {/* Profile Picture Section */}
        <div className="w-full lg:w-1/2 lg:p-8">
          <img src={profilePic} alt="Dilsher Singh" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
