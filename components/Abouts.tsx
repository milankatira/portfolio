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
        className="overflow-hidden"
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full sm:w-6/12">
              <div className="flex items-center">
                <div className="sm:w-full w-50 px-3 sm:px-4 xl:w-1/2 flex mx-auto">
                  <div className="my-4">
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
              <div className="mt-0 md:mt-10">
                <p className="text-gray-600 mb-8 text-base mr-12">
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
                    My goal is always to build applications that are scalable and efficient under the hood while
                    providing engaging, pixel-perfect user experiences.
                </p>
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
                    duration: 0.5,
                  }}
                  className="bg-blue-800 inline-flex items-center justify-center rounded-lg py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <a href="/img/css.png" download className="flex">
                      Resume
                    <svg className="ml-4 h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                      <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );

}

export default Abouts;
