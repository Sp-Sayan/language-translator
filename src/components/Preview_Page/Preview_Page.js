import React, { useContext } from "react";
import "./Preview.css";
import { motion, animate, inView } from "framer-motion";
import { Preview } from "../../App";
import { loadFull } from "tsparticles";
import Particles_config from "../Particles/particles_config";
const AnimationVariants = (key) => ({
  hover: {
    scale: 1.2,
  },
  tap: {
    scale: 0.8,
  },
  slideIn: {
    x: 0,
    transition: {
      duration: 1 * key,
    },
  },
  initial: {
    x: "-100vw",
  },
});
export default function Preview_Page() {
  const [isPreview, setIsPreview] = useContext(Preview);
  const HandleClick = () => {
    setIsPreview(false);
  };
  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };
  return (
    <div className="preview-heading">
      <Particles_config className="preview-bg" />
      {/* <video autoPlay muted loop className="bg-video" src={previewBg} alt="" /> */}
      <span className="preview-header-text">
        <motion.h1
          variants={AnimationVariants(1)}
          initial="initial"
          animate="slideIn"
        >
          Speech to Text Translator
        </motion.h1>
      </span>
      <motion.p
        variants={AnimationVariants(1.2)}
        initial="initial"
        animate="slideIn"
      >
        A simple tool designed by me to translate between various languages
      </motion.p>
      <motion.span
        variants={AnimationVariants(1.3)}
        whileHover="hover"
        whileTap="tap"
        initial="initial"
        animate="slideIn"
        onClick={HandleClick}
        className="preview-start-btn"
      ></motion.span>
    </div>
  );
}
