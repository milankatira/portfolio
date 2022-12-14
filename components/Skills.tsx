import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "./design/SectionTitle";
import { Skill } from "../constant/Skill";

function Skills() {

  return (
    <div className="h-full md:h-screen sm:h- pt-20">
      <SectionTitle text="Skills" />

      <section
        className="bg-blue-50 dark:bg-gray-900
      rounded-2xl flex flex-row flex-wrap justify-center items-center mt-0 md:mt-20 mx-auto w-[90%] sm:w-[60%]"
      >
        {Skill.map((item) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="m-4 sm:mx-8 mx-4 flex flex-col justify-center items-center text-gray-500 dark:text-gray-400"
            key={item.name}
          >
            <img src={item.icon} className="h-10 w-10 hover:scale-125 cursor-pointer transition-all duration-300" />
            <p>{item.name}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );

}

export default Skills;
