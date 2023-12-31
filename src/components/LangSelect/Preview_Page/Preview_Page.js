import React, { useContext } from "react";
import "./Preview.css";
import { motion, animate, inView } from "framer-motion";
import { Preview } from "../../App";
import previewBg from "../../assets/preview-bg.mp4";
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

  return (
    <div className="preview-heading">
      <video autoPlay muted loop className="bg-video" src={previewBg} alt="" />
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
