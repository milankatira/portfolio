'use client'
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "@/components/ui/MagicButton";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export const Footer = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  return (
    <footer className="w-full pt-20 pb-10 bg-white dark:bg-black-100" id="contact">

      {/* <div className="relative mx-auto mb-8 h-px w-full bg-transparent"><div className="absolute top-0 left-1/2 w-[224px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[2px] h-[2px]"></div></div> */}
      {/* background grid */}
      <div className="w-full absolute left-0 bottom-0 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-cyan-500">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <motion.div variants={itemVariants}>
          <Button
            asChild
            size="lg"
            className={cn(
              "relative group bg-gradient-to-br from-black to-gray-900 border border-gray-800",
              "hover:shadow-md hover:border-gray-700 hover:from-black hover:to-gray-800",
              "transition-all duration-300 ease-out"
            )}
          >

            <a href="mailto:milankatira26@gmail.com" className="flex items-center gap-2 text-white">
              <span>Let's get in touch</span>
              <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-200">
                <FaLocationArrow className="h-4 w-4" />
              </span>

              <span className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-blue-600/20 to-purple-600/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
            </a>
          </Button>
        </motion.div>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-center items-center opacity-70">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © {new Date().getFullYear()}  milankatira
        </p>
      </div>
    </footer>
  );
};


