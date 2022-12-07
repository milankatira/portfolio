import React from "react";

type Props = {};
import styles from "../styles";
import { footerVariants, headerVariants } from "../utils/motion";
import { motion } from "framer-motion";
import SectionTitle from "./design/SectionTitle";

export default function Project({}: Props) {
  const projects = [
    {
      title: "mm",
      description: "eee",
    },
    {
      title: "mm",
      description: "eee",
    },
    {
      title: "mm",
      description: "eee",
    },
    {
      title: "mm",
      description: "eee",
    },
  ];
  return (
    <div className="h-screen pt-20">

      <SectionTitle text="Project" />
      <div className="relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0">
        <div className="w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20">
          {projects.map(
            (project: { title: string; description: string }, index) => (
              <div
                key={index}
                className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen"
              >
                <motion.div
                  variants={headerVariants}
                  initial="hidden"
                  whileInView="show"
                  className={`${styles.xPaddings} overflow-hidden`}
                >
                  <img
                    src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                    className="w-48 h-48"
                  />
                </motion.div>
                <motion.div
                  variants={footerVariants}
                  initial="hidden"
                  whileInView="show"
                  className={`${styles.xPaddings} overflow-hidden`}
                >
                  <div className="space-y-10 px-0 md:px-10 max-w-6xl">
                    <span className="text-4xl font-semibold border-b-4 border-blue-400">
                      Case Study - {index + 1} of {projects.length}:
                    </span>
                    <span className="text-4xl font-semibold">
                      {project.title}
                    </span>
                    <h4>{project.description}</h4>
                  </div>
                </motion.div>
              </div>
            )
          )}
        </div>
        <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12"></div>
      </div>
    </div>
  );
}
