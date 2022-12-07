import React from "react";
import { SocialIcon } from "react-social-icons";
type Props = {};
import { motion } from "framer-motion";
import DarkModeSwitch from "../components/design/DarkModeSwitch";
export default function Header({}: Props) {
  return (
    <header className="h-20 sticky shadow-md overflow-hidden bottom-0 px-5 flex items-center xl:items-center justify-center w-full mx-auto z-60">
      <motion.div
        initial={{
          y: 500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center h-[50px]"
      >
        <SocialIcon
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
          url="https://github.com/milankatira"
          fgColor="gray dark:white"
          bgColor="white"
        />
      </motion.div>
    </header>
  );
}
