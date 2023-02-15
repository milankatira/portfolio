import { motion } from "framer-motion";
import React from "react";
import SectionTitle from "./design/SectionTitle";

function Abouts() {

  return (
    <div className="h-screen pt-20">
      <SectionTitle text="About us" />
      <motion.section
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="overflow-hidden mx-auto my-auto flex mt-auto"
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center">
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
              className="w-full px-4 sm:w-1/2 xl:w-5/12"
            >
              <div
                className="flex flex-col mt-0 md:mt-10 text-gray-600 hover:text-gray-900
              dark:hover:text-gray-100 dark:text-gray-300 transition-all duration-300"
              >
                <p className="mb-8 text-base px-4">
                  I am a Full Stack Developer with 2 years of experience, specializing in NodeJS, ReactJs, and NextJs.
                  <br />
                  <p className="mt-2 sm:mt-4">
                    I have extensive experience in HTML, CSS, JavaScript, and various open-source frameworks such as
                    NodeJS, ExpressJS, ReactJS, MongoDB, and NextJS. I am skilled in the use of these frameworks to
                    develop web applications based on Single Page Applications (SPA) architectures. I also possess
                    skills in writing complex no SQL queries using popular database servers such as MongoDB.
                  </p>
                  <p className="mt-2 sm:mt-4">
                    My goal is always to build applications that are scalable and efficient under the hood while
                    providing engaging, pixel-perfect user experiences.
                  </p>
                </p>
                {/* <button
                  className="mx-auto w-40 border-2 dark:border-white border-black hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white duration-300 text-sm font-bold uppercase px-6 py-3 rounded  hover:shadow-2xl outline-none focus:outline-none ease-linear transition-all duration-300"
                  type="button"
                >
                  <a href="/milan_katira.pdf" download>
                    Resume
                  </a>
                </button> */}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );

}

export default Abouts;
