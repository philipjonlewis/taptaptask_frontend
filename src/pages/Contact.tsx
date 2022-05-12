import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const people = ["Daylinda", "Albert", "Mark", "Abigail", "Philip"];

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: "0",
      transition: {
        type: "spring",
        // delay: 0.5,
        mass: 0.4,
        damping: 8,
        delayChildren: 0.5,
        staggerChildren: 0.5,
      },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      x: -20,
      opacity: 1,
      transition: { delay: 2 },
    },
    hover: {
      scale: 1.2,
      transition: { duration: 0.5 },
      originX: 0,
    },
  };

  return (
    <motion.div
      className="text-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-64 mx-auto mt-4 p-4 bg-white  shadow-lg rounded-md   flex flex-col">
        <AnimatePresence>
          {people.map((person) => {
            return (
              <motion.div
                key={person}
                className="pt-1 pb-1  display-inline w-32 h-auto mb-1"
                variants={childVariants}
                whileHover="hover"
                drag
                dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
                dragElastic={1}
              >
                <motion.p exit={{ opacity: 0 }}>{person}</motion.p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Contact;
