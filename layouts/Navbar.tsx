import React from "react";
import { SocialIcon } from "react-social-icons";
type Props = {};
import { motion } from "framer-motion";
import DarkModeSwitch from "../components/design/DarkModeSwitch";
export default function Header({}: Props) {
  
  return (
    <header className="h-20 sticky shadow-md overflow-hidden bg-white dark:bg-[#0e1017] top-0 pl-5 flex items-center xl:items-center justify-between w-full mx-auto z-50 border-b-[1px]">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center h-[50px]"
      >
        <SocialIcon
          url="https://github.com/milankatira"
          fgColor="gray"
          bgColor="transparent"
        />
        <SocialIcon
          url="https://www.linkedin.com/in/milan-katira/"
          fgColor="gray"
          bgColor="transparent"
        />{" "}
        <SocialIcon
          url="https://medium.com/@milankatira26"
          fgColor="gray"
          bgColor="transparent"
        />{" "}
      </motion.div>

      <motion.div
        initial={{
          x: 500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center justify-center text-gray-300 h-[50px]"
      >
        <SocialIcon
          url="mailto:milankatira26@gmail.com"
          fgColor="gray"
          bgColor="transparent"
        />

        <p className="uppercase hidden md:inline-flex text-sm text-gray-400 cursor-default">
          Get In Touch
        </p>
        <DarkModeSwitch />
      </motion.div>
    </header>
  );
}
