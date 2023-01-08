import React from "react";
import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";
import { Projects } from "../constant/Projects";

export default function Project() {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row
        max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">Projects</h3>
      <div
        className="relative w-full h-[620px] flex overflow-x-scroll overflow-y-hidden snap-x
        snap-madatory z-20 scrollbar  scrollbar-track-[#48BF53]/20 scrollbar-thumb-[#004D25]/80"
      >
        {Projects.map((data) => (
          <div
            key={data.title}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen"
          >
            <motion.img
              initial={{
                y: -100,
                opacity: 0,
              }}
              transition={{ duration: 1.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src={data.img}
              alt={data.title}
              className="h-36 rounded-lg w-36 object-cover"
            />
            <div className="space-y-1 px-0 md:px-10 max-w-6xl">
              <h4 className="md:text-3xl lg:text-4xl font-semibold text-center">
                <span className="underline decoration-[#F7AB0A]/50">{data.title}</span>
              </h4>
              <div className="flex items-center space-x-2 justify-center"></div>
              <p className="text-sm text-center md:text-left">{data.description}</p>
              <div className="flex justify-center">
                {data.github && <SocialIcon bgColor="transparent" fgColor="gray" url={data.github} />}

                <svg className="h-6 w-6 my-auto fill-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="w-full absolute top-[30%] bg-[#004D25]/10 left-0 h-[340px]
        -skew-y-12"
      />
    </motion.div>
  );

}
