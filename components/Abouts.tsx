import { motion } from "framer-motion";
import React from "react";
import { fadeIn } from "../utils/motion";
import SectionTitle from "./design/SectionTitle";

const Abouts = () => {
  return (
    <div className="h-screen pt-20">
      <SectionTitle text="About us" />
      <section className="overflow-hidden pb-12 lg:pt-[120px] lg:pb-[90px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap items-center justify-between">
            <div className="w-full lg:w-6/12">
              <div className="-mx-3 flex items-center sm:-mx-4">
                <div className="sm:w-full w-50 px-3 sm:px-4 xl:w-1/2 flex mx-auto">
                  <div className="my-4">
                    <img
                      src="https://cdn.tailgrids.com/1.0/assets/images/services/image-3.jpg"
                      alt=""
                      className="rounded-full w-[100px] h-[100px] sm:w-full sm:h-full sm:rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              variants={fadeIn("left", "tween", 0.2, 1)}
              className="w-full px-4 lg:w-1/2 xl:w-5/12"
            >
              {/* <div className="w-full px-4 lg:w-1/2 xl:w-5/12"> */}
                <div className="mt-10 lg:mt-0">
                  <p className="text-gray-600 font-sans mb-8 text-base mr-12">
                    I am a Full Stack Developer with 2 years of experience,
                    specializing in NodeJS, ReactJs, and NextJs.
                    <br />
                    <br />I have extensive experience in HTML, CSS, JavaScript,
                    and various open-source frameworks such as NodeJS,
                    ExpressJS, ReactJS, MongoDB, and NextJS. I am skilled in the
                    use of these frameworks to develop web applications based on
                    Single Page Applications (SPA) architectures. I also possess
                    skills in writing complex no SQL queries using popular
                    database servers such as MongoDB.
                    <br />
                    <br />
                    My goal is always to build applications that are scalable
                    and efficient under the hood while providing engaging,
                    pixel-perfect user experiences.
                  </p>

                  <a className="bg-purple-700 inline-flex items-center justify-center rounded-lg py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Get Started
                  </a>
                </div>
              {/* </div> */}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Abouts;
