import React from "react";
import { motion } from "framer-motion";
import AddProjectForm from "./AddProjectForm";
import AddPhaseForm from "./AddPhaseForm";
import AddTaskForm from "./AddTaskForm";
const ExpressWindow = () => {
  return (
    <motion.div drag style={{ position: "absolute", top: 100, right: 300 }}>
      <AddTaskForm />
    </motion.div>
  );
};

export default ExpressWindow;
