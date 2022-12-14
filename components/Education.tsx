import { motion } from "framer-motion";
import React from "react";
import { Educations } from "../constant/Educations";
import SectionTitle from "./design/SectionTitle";

const Education = () => {
  return (
    <div className="h-screen pt-20 sm:px-24 px-4">
      <SectionTitle text="Education" />
      <motion.div
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center items-center"
      >
        <ol className="mx-auto w-full md:w-1/2 mt-4 border-gray-300 dark:border-gray-700">
          {Educations.map((data) => (
            <li
              key={data.course}
              className="mb-10 ml-6 opacity-100 hover:opacity-40 transition-all duration-700 cursor-pointer"
            >
              <div className="flex">
                <motion.img
                  whileInView={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="h-20 w-20 rounded-full mr-4 p-5 bg-white"
                  src={data.img}
                />
                <div
                >
                  <h2 className="flex items-center mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                    {data.course}
                  </h2>
                  <p
                    className="text-lg font-light text-gray-500 dark:text-gray-400"
                  >{data.collage}</p>
                  <br />
                  <time className="block mb-8 text-base font-normal leading-none text-gray-400 dark:text-gray-500">
                    {data.duration}
                  </time>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  );
};

export default Education;
