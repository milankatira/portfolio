'use client'
import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail } from "lucide-react";

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
    <footer className="w-full pt-20 pb-10 bg-white dark:bg-black-100 relative" id="contact">
      {/* Background grid */}
      <div className="w-full absolute left-0 bottom-0 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-60"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading w-full lg:max-w-[45vw]">
          Ready to <span className="text-cyan-500">build</span> something extraordinary together?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
        Let's connect to discuss how I can help bring your technical vision to life.
        </p>
        <motion.div variants={itemVariants}>
          <Button
            asChild
            size="lg"
            className={cn(
              "relative group ",
              "hover:shadow-md",
              "transition-all duration-300 ease-out"
            )}
          >
            <a href="mailto:milankatira26@gmail.com" className="flex items-center gap-2 text-black">
              <span>Let&apos;s get in touch</span>
              <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-200">
                <FaLocationArrow className="h-4 w-4" />
              </span>
              <span className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-gray-600 to-purple-600/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
            </a>
          </Button>
        </motion.div>
      </div>

      <div className="flex mt-16 md:flex-row flex-col items-center opacity-70 justify-between">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © {new Date().getFullYear()} Milan Katira
        </p>
<motion.div variants={itemVariants} className="flex gap-4">
  <motion.a
    href="https://github.com/milankatira"
    target="_blank"
    rel="noopener noreferrer"
    className="group p-2 bg-gray-900/50 hover:bg-gray-800 rounded-full transition-colors duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <Github className="h-5 w-5 text-gray-200 group-hover:text-white transition-colors" />
  </motion.a>

  <motion.a
    href="https://linkedin.com/in/milankatira"
    target="_blank"
    rel="noopener noreferrer"
    className="group p-2 bg-gray-900/50 hover:bg-blue-600 rounded-full transition-colors duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <Linkedin className="h-5 w-5 text-gray-200 group-hover:text-white transition-colors" />
  </motion.a>

  <motion.a
    href="mailto:milankatira26@gmail.com"
    className="group p-2 bg-gray-900/50 hover:bg-cyan-600 rounded-full transition-colors duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <Mail className="h-5 w-5 text-gray-200 group-hover:text-white transition-colors" />
  </motion.a>
</motion.div>
      </div>
    </footer>
  );
};

