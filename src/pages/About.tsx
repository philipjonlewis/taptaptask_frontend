import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
const About = () => {
  const [count, setCount] = useState(1);
  const [thing, setThing] = useState(100);

  useEffect(() => {
    setThing(thing - 1);
    console.log("Use Effect Running");
  }, [count]);

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 1.5, duration: 1.5 },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="container mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-blue display-flex fd-column jc-center ai-center">
        <div>{count}</div>
        <button
          className="bg-red-500 hover:bg-red-300 m-2  text-white text-lg py-2 px-4 rounded-full"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Increment
        </button>
        <div>{thing}</div>
      </div>
    </motion.div>
  );
};

export default About;
