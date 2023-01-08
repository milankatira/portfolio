import { motion } from "framer-motion";
import React from "react";
import SectionTitle from "./design/SectionTitle";
import { Experiances } from "../constant/Experiances";

const Experiance = () => {

  return (
    <div className="h-screen pt-20 sm:px-24 px-4">
      <SectionTitle text="Experiance" />
      <motion.div
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center items-center"
      >
        <ol className="mx-auto w-full md:w-1/2 mt-4 border-gray-300 dark:border-gray-700">
          {Experiances.map((data) => (
            <li
              key={data.position}
              className="mb-10 ml-6 opacity-100 hover:opacity-40 transition-all duration-700 cursor-pointer"
            >
              <div className="flex">
                <img className="h-20 w-20 rounded-full mr-4" src={data.img} alt={data.position} />
                <div>
                  <h2 className="flex items-center mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                    {data.position}
                  </h2>
                  <h2 className="flex items-center mb-1 text-xl font-semibold text-gray-600 dark:text-gray-500">
                    Inara consultancy services, Ahmedabad
                  </h2>
                  <br />
                  <time className="block mb-8 text-base font-normal leading-none text-gray-400 dark:text-gray-500">
                    {data.duration}
                  </time>
                  <p
                    className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: data.skills }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  );

};

export default Experiance;
