import React from "react";
import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    x: 30
  },
  animate: {
    opacity: 1,
    x: 0
  },
  exit: {
    opacity: 0,
    x: -30
  }
};

export default function PageTransition({ children, keyValue }) {
  return (
    <motion.div
      key={keyValue}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}
