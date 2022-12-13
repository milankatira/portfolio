import { motion } from "framer-motion";
import React from "react";
import { Experiances } from "../constant/Experiances";
import SectionTitle from "./design/SectionTitle";

function Experiance() {

  return (
    <div className="sm:ml-24  ml-8 h-full sm:h-screen pt-20">
      <SectionTitle text="Experiance" />
      <motion.section
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="text-gray-600 body-font flex flex-col"
      >
        <div className="container w-full flex flex-wrap">
          {Experiances.map((data, index) => (
            <div key={index} className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mr-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none" />
              </div>
              <motion.div
                initial={{
                  x: 0,
                  opacity: 0,
                }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                }}
                className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm"
              >
                {index + 1}
              </motion.div>
              <motion.div
                initial={{
                  x: +200,
                  opacity: 0,
                }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                }}
                className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row"
              >
                <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                  <img src={data.img} className="rounded-full" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 dark:text-gray-300 mb-1 text-xl">
                    {data.position}
                  </h2>
                  <p
                    className="leading-relaxed text-gray-600 dark:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: data.skills }}
                  />
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">{data.duration}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );

}

export default Experiance;
