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
        className="overflow-hidden mx-auto my-auto"
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full sm:w-6/12">
              <div className="flex items-center">
                <div className="sm:w-full w-50 px-3 sm:px-4 xl:w-1/2 flex mx-auto">
                  <div className="my-4 opacity-100 hover:opacity-40 transition-all duration-700 cursor-pointer">
                    <motion.img
                      initial={{
                        x: -200,
                        opacity: 0,
                      }}
                      whileInView={{
                        x: 0,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      src="https://cdn.tailgrids.com/1.0/assets/images/services/image-3.jpg"
                      alt=""
                      className="rounded-full w-[100px] h-[100px] sm:w-full sm:h-full sm:rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>

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
              dark:hover:text-gray-300 transition-all duration-300"
              >
                <p className="mb-8 text-base mr-12 px-4">
                  I am a Full Stack Developer with 2 years of experience, specializing in NodeJS, ReactJs, and NextJs.
                  <br />
                  <br />
                  <p className="hidden lg:block">
                    I have extensive experience in HTML, CSS, JavaScript, and various open-source frameworks such as
                    NodeJS, ExpressJS, ReactJS, MongoDB, and NextJS. I am skilled in the use of these frameworks to
                    develop web applications based on Single Page Applications (SPA) architectures. I also possess
                    skills in writing complex no SQL queries using popular database servers such as MongoDB.
                    <br />
                    <br />
                  </p>
                  My goal is always to build applications that are scalable and efficient under the hood while providing
                  engaging, pixel-perfect user experiences.
                </p>
                <button
                  className="sm:mx-4 mx-auto w-40  dark:border-white text-black border-2 border-black active:bg-black text-lg uppercase  rounded opacity-100 hover:shadow-2xl hover: outline-none focus:outline-none ease-linear transition-all duration-300"
                >
                  <a
                    href="/milan_katira.pdf"
                    download
                    className="px-2 py-2 flex hover:bg-black hover:text-white dark:hover:text-black dark:text-white dark:hover:text-white hover:text-black dark:hover:bg-white duration-300 font-semibold transition-all flex justify-center items-center"
                  >
                    Resume
                  </a>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );

}

export default Abouts;
