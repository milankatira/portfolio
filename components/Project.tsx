import React from "react";
import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";
import SectionTitle from "./design/SectionTitle";
import styles from "../styles";
import { footerVariants, headerVariants } from "../utils/motion";
import { Projects } from "../Data/Projects";

export default function Project() {

  return (
    <div className="h-screen pt-20">
      <SectionTitle text="Project" />
      <div className="relative flex overflow-hidden flex-col text-left md:flex-row max-w-full mx-auto items-center z-0">
        <div className="w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20">
          {Projects.map(
            (
              project: {
                title: string;
                description: string;
                img: string;
                github?: string;
              },
              index,
            ) => (
              <div key={index} className="w-screen flex-shrink-0 snap-center flex flex-col items-center h-screen">
                <motion.div
                  variants={headerVariants}
                  initial="hidden"
                  whileInView="show"
                  className={`${styles.xPaddings} overflow-hidden`}
                >
                  <img src={project.img} className="w-48 h-48 rounded-xl object-cover" />
                </motion.div>
                <motion.div
                  variants={footerVariants}
                  initial="hidden"
                  whileInView="show"
                  className={`${styles.xPaddings} overflow-hidden`}
                >
                  <div className="mt-8 px-0 md:px-10 max-w-6xl flex  flex-col items-center">
                    <span className="text-4xl font-semibold">{project.title}</span>
                    <h4 className="text-gray-500">{project.description}</h4>
                    <div className="flex items-center">
                      {project?.github && (
                        <SocialIcon
                          url={project?.github}
                          fgColor="gray"
                          bgColor="transparent"
                          className="hover:scale-125 transition-all duration-300"
                        />
                      )}

                      <img src="/img/web.png" className="h-8 w-8 hover:scale-125 transition-all duration-300" />
                    </div>
                  </div>
                </motion.div>
              </div>
            ),
          )}
        </div>
        <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12" />
      </div>
    </div>
  );

}
